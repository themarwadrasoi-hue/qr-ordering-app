import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';

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
let menu = [];
let whatsappNumber = '919602755557';
let categories = [
    { id: 'all', name: 'All Items' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'chinese', name: 'Chinese' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'dessert', name: 'Desserts' }
];

// NEW: Table Bills and Waiter Calls
let tableBills = {}; // { tableId: { orders: [], total: 0 } }
let waiterCalls = []; // [{ tableId, timestamp }]
let restaurantLocation = null; // { latitude, longitude }
let currentOTP = null;

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

            if (data.orders) orders = data.orders;
            if (data.orderHistory) orderHistory = data.orderHistory;
            if (data.menu) menu = data.menu;
            if (data.categories) categories = data.categories;
            if (data.whatsappNumber) whatsappNumber = data.whatsappNumber;
            if (data.tableBills) tableBills = data.tableBills;
            if (data.restaurantLocation) restaurantLocation = data.restaurantLocation;
            if (data.inventory) inventory = data.inventory;
            if (data.expenses) expenses = data.expenses;

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
                expenses
            };
            fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), (err) => {
                if (err) console.error('❌ Error saving data:', err);
                else console.log('💾 Data saved to disk');
            });
        } catch (err) {
            console.error('❌ Error preparing data for save:', err);
        }
    }, 1000); // Debounce save by 1 second
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
        expenses
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
        // Only add if not already in list to avoid duplicates
        if (!waiterCalls.find(c => c.tableId === data.tableId)) {
            waiterCalls.push(data);
            io.emit('waiter-call-received', data);
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
            // Find orders for this table and mark them as paid/archived if needed
            // For now, we just move them to history if not already there (which they should be if completed)
            // But usually active orders are part of the bill.

            // Move active orders to history if bill is cleared (assuming payment means completion)
            const tableOrders = tableBills[tableId].orders;
            const totalAmount = tableBills[tableId].total;

            tableOrders.forEach(o => {
                if (orders.find(ao => ao.id === o.id)) {
                    orderHistory.push({ ...o, status: 'completed', completedAt: Date.now() });
                }
            });
            orders = orders.filter(o => o.tableId !== tableId); // Remove active orders for this table

            delete tableBills[tableId];
            io.emit('table-bills-updated', tableBills);
            io.emit('orders-updated', orders);
            io.emit('history-updated', orderHistory);

            // Notify the specific table that bill is cleared (Trigger Scratch Card)
            io.emit('table-bill-cleared', { tableId, totalAmount });
            saveData();
        }
    });

    // Handle Order Status Update (Admin)
    socket.on('update-order-status', ({ orderId, status }) => {
        console.log(`Order ${orderId} status updated to ${status}`);

        if (status === 'completed') {
            const completedOrder = orders.find(o => o.id === orderId);
            if (completedOrder) {
                // Deduct Inventory
                completedOrder.items.forEach(item => {
                    // Logic to deduct items... simplified for now as mapping is complex
                    // Ideally each menu item would have an 'ingredients' array
                });

                orderHistory.push({ ...completedOrder, status: 'completed', completedAt: Date.now() });
                orders = orders.filter(o => o.id !== orderId);

                io.emit('history-updated', orderHistory);
            }
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

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Catch-all handler to serve React App for any route (client-side routing)
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'dist', 'index.html');

    // Don't serve index.html for likely asset requests or API
    if (req.url.startsWith('/api') || req.url.startsWith('/assets')) {
        return res.status(404).send('Not found');
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

