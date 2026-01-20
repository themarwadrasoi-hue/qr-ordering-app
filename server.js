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
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

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
        restaurantLocation
    });

    // Handle Restaurant Location Update
    socket.on('update-restaurant-location', (loc) => {
        console.log('Restaurant Location Updated:', loc);
        restaurantLocation = loc;
        io.emit('restaurant-location-updated', loc);
    });

    // Handle New Order
    socket.on('place-order', (order) => {
        console.log('New Order:', order);
        orders.unshift(order); // Add to active orders list (for kitchen display)

        // Update Table Bill
        const tId = order.tableId || 'Walk-in';
        if (!tableBills[tId]) {
            tableBills[tId] = { orders: [], total: 0 };
        }
        tableBills[tId].orders.push(order);
        tableBills[tId].total += order.total;

        io.emit('orders-updated', orders);
        io.emit('new-order', order);
        io.emit('table-bills-updated', tableBills); // Broadcast to all for sync
    });

    // Handle Waiter Call
    socket.on('call-waiter', (data) => {
        console.log(`Waiter call from Table ${data.tableId}`);
        // Only add if not already in list to avoid duplicates
        if (!waiterCalls.find(c => c.tableId === data.tableId)) {
            waiterCalls.push(data);
            io.emit('waiter-call-received', data);
            io.emit('waiter-calls-updated', waiterCalls);
        }
    });

    // Handle Waiter Call Acknowledgment
    socket.on('acknowledge-waiter-call', (tableId) => {
        console.log(`Acknowledged call for Table ${tableId}`);
        waiterCalls = waiterCalls.filter(c => c.tableId !== tableId);
        io.emit('waiter-call-acknowledged', { tableId });
        io.emit('waiter-calls-updated', waiterCalls);
    });

    // Handle Clear Table Bill
    socket.on('clear-table-bill', (tableId) => {
        console.log(`Clearing bill for Table ${tableId}`);
        if (tableBills[tableId]) {
            // Optional: You could archive this session here if needed
            delete tableBills[tableId];
            io.emit('table-bills-updated', tableBills);
            io.emit('table-bill-cleared', { tableId });
        }
    });

    // Handle Order Status Update (Admin)
    socket.on('update-order-status', ({ orderId, status }) => {
        const existingOrder = orders.find(o => o.id === orderId);

        if (status === 'completed' && existingOrder) {
            const completedOrder = { ...existingOrder, status: 'completed', completedAt: Date.now() };
            orderHistory.push(completedOrder);
            orders = orders.filter(o => o.id !== orderId);

            if (orderHistory.length > 500) orderHistory.shift();
            io.emit('history-updated', orderHistory);
        } else {
            orders = orders.map(o => o.id === orderId ? { ...o, status } : o);
        }

        io.emit('orders-updated', orders);
    });

    // Handle Menu Updates (Admin)
    socket.on('update-menu', (newMenu) => {
        menu = newMenu;
        io.emit('menu-updated', menu);
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
app.use((req, res) => {
    // If the request for an asset fails, don't serve index.html (to avoid MIME type errors)
    if (req.url.startsWith('/assets/') || req.url.includes('.')) {
        return res.status(404).send('Not found');
    }

    const indexPath = path.join(__dirname, 'dist', 'index.html');
    console.log(`[Request] ${req.method} ${req.url}`);
    console.log(`[Debug] Trying to serve: ${indexPath}`);

    if (!fs.existsSync(indexPath)) {
        console.error(`[Error] File not found at: ${indexPath}`);
        console.error(`[Error] Current directory: ${process.cwd()}`);
        console.error(`[Error] __dirname: ${__dirname}`);
        try {
            console.error(`[Error] dist contents:`, fs.readdirSync(path.join(__dirname, 'dist')));
        } catch (e) {
            console.error(`[Error] Could not list dist: ${e.message}`);
        }
        return res.status(404).send(`Server Error: index.html not found at ${indexPath}. Please run 'npm run build'.`);
    }

    // Robust Fallback: Read file completely and send
    try {
        const html = fs.readFileSync(indexPath, 'utf8');
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.send(html);
    } catch (err) {
        console.error("Error reading/sending file:", err);
        res.status(500).send("Server Error: Could not load application.");
    }
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Serving files from: ${path.join(__dirname, 'dist')}`);
});

