import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';
import { menuItems, categories as initialCategories } from './src/data/menu.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = createServer(app);
// Increase limit for image uploads
app.use(express.json({ limit: '10mb' }));
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const DATA_FILE = path.join(__dirname, 'data.json');

// Serve static files from the React build
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());

// In-Memory Database (replaces localStorage)
let orders = [];
let orderHistory = []; // Store completed orders
let menu = menuItems;
let whatsappNumber = '919602755557';
let categories = initialCategories;

// NEW: Table Bills and Waiter Calls
let tableBills = {}; // { tableId: { orders: [], total: 0 } }
let waiterCalls = []; // [{ tableId, timestamp }]
let restaurantLocation = { latitude: 26.909948, longitude: 75.722024 }; // Fixed Location (The Marwar Rasoi)
let currentOTP = null;
let isStoreOpen = true; // Default to open

// Inventory Management
let inventory = [
    { id: 'potato', name: 'Potato', unit: 'kg', stock: 50, minStock: 10, usedToday: 0 },
    { id: 'cheese', name: 'Cheese', unit: 'kg', stock: 20, minStock: 5, usedToday: 0 },
    { id: 'bread', name: 'Bread Buns', unit: 'pcs', stock: 100, minStock: 20, usedToday: 0 },
    { id: 'tomato', name: 'Tomato', unit: 'kg', stock: 30, minStock: 8, usedToday: 0 },
    { id: 'onion', name: 'Onion', unit: 'kg', stock: 25, minStock: 7, usedToday: 0 },
    { id: 'lettuce', name: 'Lettuce', unit: 'kg', stock: 15, minStock: 5, usedToday: 0 },
    { id: 'chicken', name: 'Chicken', unit: 'kg', stock: 40, minStock: 10, usedToday: 0 },
    { id: 'oil', name: 'Cooking Oil', unit: 'liters', stock: 25, minStock: 5, usedToday: 0 },
];

// Expense Tracking
let expenses = [];


// --- DATA PERSISTENCE ---
const loadData = () => {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const rawData = fs.readFileSync(DATA_FILE);
            const data = JSON.parse(rawData);

            if (data.orders && Array.isArray(data.orders)) orders = data.orders;
            if (data.orderHistory && Array.isArray(data.orderHistory)) orderHistory = data.orderHistory;
            // if (data.menu) menu = data.menu; // DISABLED: Force sync from src/data/menu.js
            // if (data.categories) categories = data.categories; // DISABLED: Force sync from src/data/menu.js
            if (data.whatsappNumber) whatsappNumber = data.whatsappNumber;
            if (data.tableBills) tableBills = data.tableBills;

            // Only overwrite if data has valid coordinates
            if (data.restaurantLocation && data.restaurantLocation.latitude) {
                restaurantLocation = data.restaurantLocation;
            } else {
                // Fallback/Force the hardcoded one if missing in file
                restaurantLocation = { latitude: 26.909948, longitude: 75.722024 };
            }

            if (data.inventory) inventory = data.inventory;
            if (data.expenses) expenses = data.expenses;
            if (data.isStoreOpen !== undefined) isStoreOpen = data.isStoreOpen;

            console.log('✅ Data loaded from disk');
        }
    } catch (err) {
        console.error('❌ Error loading data:', err);
    }
};

let saveTimeout = null;
const saveData = () => {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        try {
            const data = {
                orders,
                orderHistory,
                menu,
                categories,
                whatsappNumber,
                tableBills,
                restaurantLocation,
                inventory,
                expenses,
                isStoreOpen
            };
            fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), (err) => {
                if (err) console.error('❌ Error saving data:', err);
                else console.log('💾 Data saved to disk');
            });
        } catch (err) {
            console.error('❌ Error preparing data for save:', err);
        }
    }, 500); // Faster debounce: 500ms
};

// Load data on startup
loadData();


// API Endpoints for OTP
app.post('/api/send-otp', (req, res) => {
    const { phone } = req.body;
    console.log(`Sending OTP to ${phone}...`);
    // User requested fixed code 130289
    currentOTP = "130289";
    console.log(`[AUTH] OTP for ${phone} is: ${currentOTP}`);
    res.json({ success: true, message: 'OTP sent successfully (Check server console)' });
});

app.post('/api/verify-otp', (req, res) => {
    const { otp } = req.body;
    if (otp === currentOTP) {
        res.json({ success: true, token: 'admin-session-' + Date.now() });
    } else {
        res.status(401).json({ success: false, message: 'Invalid OTP' });
    }
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Send initial state to the connected client
    socket.emit('sync-state', {
        orders,
        menu,
        categories,
        whatsappNumber,
        orderHistory,
        tableBills,
        waiterCalls,
        restaurantLocation,
        inventory,
        expenses,
        isStoreOpen
    });

    // Handle Restaurant Location Update
    socket.on('update-restaurant-location', (loc) => {
        console.log('Restaurant Location Updated:', loc);
        restaurantLocation = loc;
        io.emit('restaurant-location-updated', loc);
        saveData();
    });

    // Handle Inventory Update
    socket.on('update-inventory', (updatedItem) => {
        console.log('Inventory Updated:', updatedItem);
        inventory = inventory.map(item =>
            item.id === updatedItem.id ? updatedItem : item
        );
        io.emit('inventory-updated', inventory);
        saveData();
    });

    socket.on('add-inventory-item', (newItem) => {
        console.log('Inventory Item Added:', newItem);
        inventory.push(newItem);
        io.emit('inventory-updated', inventory);
        saveData();
    });

    socket.on('delete-inventory-item', (itemId) => {
        console.log('Inventory Item Deleted:', itemId);
        inventory = inventory.filter(item => item.id !== itemId);
        io.emit('inventory-updated', inventory);
        saveData();
    });

    // Handle Expense Management
    socket.on('add-expense', (expense) => {
        console.log('Expense Added:', expense);
        expenses.push(expense);
        io.emit('expenses-updated', expenses);
        saveData();
    });

    socket.on('delete-expense', (expenseId) => {
        console.log('Expense Deleted:', expenseId);
        expenses = expenses.filter(e => e.id !== expenseId);
        io.emit('expenses-updated', expenses);
        saveData();
    });

    // Handle New Order
    socket.on('place-order', (order) => {
        if (!isStoreOpen) {
            console.log('Order blocked: Store is closed');
            socket.emit('order-error', 'Store is currently closed for new orders.');
            return;
        }
        console.log('New Order:', order);
        orders.push(order);

        // Add to Table Bill
        const tId = order.tableId || 'Walk-in';
        if (!tableBills[tId]) {
            tableBills[tId] = { orders: [], total: 0 };
        }
        tableBills[tId].orders.push(order);
        tableBills[tId].total += order.total;

        io.emit('new-order', order);
        io.emit('orders-updated', orders);
        io.emit('table-bills-updated', tableBills);
        saveData();
    });

    // Handle Waiter Call
    socket.on('call-waiter', (data) => {
        console.log(`Waiter call from Table ${data.tableId}`);
        // ALWAYS emit received event to trigger Admin audio/visual alerts
        io.emit('waiter-call-received', data);

        // Only add if not already in list to avoid duplicates in the main queue
        if (!waiterCalls.find(c => c.tableId === data.tableId)) {
            waiterCalls.push(data);
            io.emit('waiter-calls-updated', waiterCalls);
            saveData();
        }
    });

    // Handle Waiter Call Acknowledgment
    socket.on('acknowledge-waiter-call', (tableId) => {
        console.log(`Acknowledged call for Table ${tableId}`);
        waiterCalls = waiterCalls.filter(c => c.tableId !== tableId);
        io.emit('waiter-call-acknowledged', { tableId });
        io.emit('waiter-calls-updated', waiterCalls);
        saveData();
    });

    // Handle Clear Table Bill
    socket.on('clear-table-bill', (tableId) => {
        console.log(`Clearing bill for Table ${tableId}`);
        if (tableBills[tableId]) {
            const tableOrders = tableBills[tableId].orders;
            const totalAmount = tableBills[tableId].total;

            // Consolidate all items from all orders of this table into one final history entry
            const consolidatedItems = [];
            tableOrders.forEach(order => {
                order.items.forEach(item => {
                    consolidatedItems.push(item);
                });
            });

            // Push single consolidated bill to history
            const finalBillRecord = {
                id: `BILL-${Date.now()}`,
                tableId: tableId,
                items: consolidatedItems,
                total: totalAmount,
                ordersCount: tableOrders.length,
                completedAt: Date.now(),
                status: 'completed'
            };

            orderHistory.push(finalBillRecord);

            // Clean up: Remove active orders from the system for this table
            orders = orders.filter(o => o.tableId !== tableId);

            delete tableBills[tableId];
            io.emit('table-bills-updated', tableBills);
            io.emit('orders-updated', orders);
            io.emit('history-updated', orderHistory);

            // Notify the specific table that bill is cleared (Trigger Review Reward)
            io.emit('table-bill-cleared', { tableId, totalAmount });
            saveData();
        }
    });

    // Handle Order Status Update (Admin)
    socket.on('update-order-status', ({ orderId, status }) => {
        console.log(`Order ${orderId} status updated to ${status}`);

        if (status === 'completed') {
            // Just remove from active orders. 
            // It will be added to history LATER when the WHOLE BILL is cleared (paid).
            orders = orders.filter(o => o.id !== orderId);
        } else {
            orders = orders.map(o => o.id === orderId ? { ...o, status } : o);
        }

        io.emit('orders-updated', orders);
        saveData();
    });

    // Handle Menu Updates (Admin)
    socket.on('update-menu', (newMenu) => {
        menu = newMenu;
        io.emit('menu-updated', menu);
        saveData();
    });

    // Handle Categories Update (Admin)
    socket.on('update-categories', (newCats) => {
        categories = newCats;
        io.emit('categories-updated', categories);
    });

    // Handle Settings Updates (Admin)
    socket.on('update-settings', (settings) => {
        if (settings.whatsappNumber !== undefined) {
            whatsappNumber = settings.whatsappNumber;
        }
        io.emit('settings-updated', { whatsappNumber });
    });

    // Handle Store Status Update
    socket.on('update-store-status', (status) => {
        console.log(`Store Status Changed: ${status ? 'OPEN' : 'CLOSED'}`);
        isStoreOpen = status;
        io.emit('store-status-updated', isStoreOpen);
        saveData();
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Catch-all handler to serve React App for any route (client-side routing)
app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    const indexPath = path.join(__dirname, 'dist', 'index.html');

    // Don't serve index.html for likely asset requests or API
    if (req.url.startsWith('/api') || req.url.startsWith('/assets')) {
        return next();
    }

    if (!fs.existsSync(indexPath)) {
        console.error(`[Error] File not found at: ${indexPath}`);
        return res.status(404).send(`Server Error: Application not built. Run 'npm run build'.`);
    }

    res.sendFile(indexPath);
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Serving files from: ${path.join(__dirname, 'dist')}`);
});

