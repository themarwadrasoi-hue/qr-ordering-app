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
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());

// In-Memory Database (replaces localStorage)
let orders = [];
let orderHistory = []; // Store completed orders
let menu = []; // We can populate this initially if needed, or sync from first client
let whatsappNumber = '919602755557';

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Send initial state to the connected client
    socket.emit('sync-state', { orders, menu, whatsappNumber, orderHistory });

    // Handle New Order
    socket.on('place-order', (order) => {
        console.log('New Order:', order);
        orders.unshift(order); // Add to top
        io.emit('orders-updated', orders); // Broadcast to ALL clients (Admin & Customer)
        io.emit('new-order', order); // Specific event for notifications
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

