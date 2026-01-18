import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import CategoryTabs from './components/CategoryTabs'
import MenuGrid from './components/MenuGrid'
import CartFloat from './components/CartFloat'
import CartModal from './components/CartModal'
import AdminOrderCard from './components/AdminOrderCard'
import { categories } from './data/menu'
import { menuItems as initialMenuItems } from './data/menu'

import AdminMenuManager from './components/AdminMenuManager'
import AdminQRGenerator from './components/AdminQRGenerator'
import AdminReports from './components/AdminReports'

// Socket.io
import { io } from 'socket.io-client'

function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.pathname.startsWith('/admin'))
  const [tableId, setTableId] = useState(new URLSearchParams(window.location.search).get('table') || null)
  const [adminView, setAdminView] = useState('orders') // 'orders' | 'menu' | 'qr' | 'settings' | 'reports'

  // App State
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [socket, setSocket] = useState(null)

  // Notification State
  const [notification, setNotification] = useState(null)

  // Data State (Synced via Server)
  const [menu, setMenu] = useState(initialMenuItems)
  const [orders, setOrders] = useState([])
  const [orderHistory, setOrderHistory] = useState([])
  const [whatsappNumber, setWhatsappNumber] = useState('919602755557')

  // Initialize Socket Connection
  useEffect(() => {
    // If URL changes, update tableId
    const params = new URLSearchParams(window.location.search)
    const tId = params.get('table')
    if (tId) setTableId(tId)

    const isDev = window.location.hostname === 'localhost' && window.location.port === '5173'
    // If running in an APK (Capacitor), window.location.origin might be localhost. 
    // We want the app to connect to the remote server.
    let socketUrl = isDev ? 'http://localhost:3000' : window.location.origin

    // TIP: If the APK is not connecting on mobile, uncomment and hardcode your public URL here:
    // socketUrl = 'https://your-marwad-rasoi-link.loca.lt'

    const newSocket = io(socketUrl)
    setSocket(newSocket)

    // Listeners
    newSocket.on('sync-state', (data) => {
      if (data.menu && data.menu.length > 0) setMenu(data.menu)
      if (data.orders) setOrders(data.orders)
      if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber)
      if (data.orderHistory) setOrderHistory(data.orderHistory)
    })

    newSocket.on('new-order', (order) => {
      // Show notification on Admin page
      if (window.location.pathname.startsWith('/admin')) {
        setNotification(`New Order from Table ${order.tableId || 'Unknown'}`)
        // Optional: Play sound
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
          audio.play()
        } catch (e) {
          console.log('Audio play failed')
        }
        setTimeout(() => setNotification(null), 5000)
      }
    })

    newSocket.on('orders-updated', (newOrders) => {
      setOrders(newOrders)
    })

    newSocket.on('history-updated', (newHistory) => {
      setOrderHistory(newHistory)
    })

    newSocket.on('menu-updated', (newMenu) => {
      setMenu(newMenu)
    })

    newSocket.on('settings-updated', (settings) => {
      if (settings.whatsappNumber !== undefined) setWhatsappNumber(settings.whatsappNumber)
    })

    return () => newSocket.close()
  }, [])


  const [orderPlaced, setOrderPlaced] = useState(false)

  // Handlers (Emitting Events)
  const updateMenu = (newMenu) => {
    setMenu(newMenu) // Optimistic update
    socket?.emit('update-menu', newMenu)
  }

  const updateWhatsapp = (num) => {
    setWhatsappNumber(num) // Optimistic
    socket?.emit('update-settings', { whatsappNumber: num })
  }

  const completeOrder = (orderId) => {
    socket?.emit('update-order-status', { orderId, status: 'completed' })
  }

  const placeOrder = () => {
    const newOrder = {
      id: Date.now().toString(),
      tableId,
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
      timestamp: Date.now(),
      status: 'pending'
    }

    socket?.emit('place-order', newOrder)
    setCart([])
    setIsCartOpen(false)
    setOrderPlaced(true)
  }

  const copyMenuLink = () => {
    const url = window.location.origin
    navigator.clipboard.writeText(url).then(() => {
      alert('Menu Link Copied: ' + url)
    })
  }

  // Derived
  const filteredItems = activeCategory === 'all'
    ? menu
    : menu.filter(i => i.category === activeCategory)

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  // Local Cart Logic (Client Only)
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.variant === item.variant)
      if (existing) {
        return prev.map(i =>
          (i.id === item.id && i.variant === item.variant)
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  // Admin View
  if (isAdmin) {
    return (
      <div className="container" style={{ paddingBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h1 className="no-print" style={{ color: 'var(--primary)', margin: 0 }}>Kitchen Display (Live)</h1>
          <button
            onClick={copyMenuLink}
            style={{
              background: 'var(--primary)',
              color: '#000',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            📋 Copy Menu Link
          </button>
        </div>

        <div style={{ marginBottom: '10px', color: socket ? '#4caf50' : '#f44336', fontSize: '0.8rem' }}>
          {socket ? '● Connected to Server' : '● Disconnected'}
        </div>

        <div className="no-print" style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)', overflowX: 'auto', paddingBottom: '5px' }}>
          <button onClick={() => setAdminView('orders')} style={getTabStyle(adminView === 'orders')}>Orders</button>
          <button onClick={() => setAdminView('reports')} style={getTabStyle(adminView === 'reports')}>Reports</button>
          <button onClick={() => setAdminView('menu')} style={getTabStyle(adminView === 'menu')}>Edit Menu</button>
          <button onClick={() => setAdminView('qr')} style={getTabStyle(adminView === 'qr')}>QR Codes</button>
          <button onClick={() => setAdminView('settings')} style={getTabStyle(adminView === 'settings')}>Settings</button>
        </div>

        {adminView === 'orders' ? (
          <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Active Orders ({orders.length})</h2>
            {orders.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No active orders.</p>
            ) : (
              orders.map(order => (
                <AdminOrderCard key={order.id} order={order} onComplete={completeOrder} />
              ))
            )}
          </div>
        ) : adminView === 'reports' ? (
          <AdminReports history={orderHistory} />
        ) : adminView === 'menu' ? (
          <AdminMenuManager menu={menu} onUpdate={updateMenu} />
        ) : adminView === 'qr' ? (
          <AdminQRGenerator />
        ) : (
          <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Settings</h2>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Restaurant WhatsApp Number</label>
            <input
              type="text"
              placeholder="e.g. 919876543210"
              value={whatsappNumber}
              onChange={(e) => updateWhatsapp(e.target.value)}
              style={inputStyle}
            />
            <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              This number is now synced across all devices!
            </p>
          </div>
        )}

        <a href="/" className="no-print" style={{ display: 'block', marginTop: '40px', color: 'var(--text-secondary)', textDecoration: 'underline' }}>
          Back to Menu
        </a>
      </div>
    )
  }

  // Success Screen
  if (orderPlaced) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        background: 'var(--background)'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '20px',
          animation: 'popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}>🎉</div>
        <h1 style={{
          color: 'var(--primary)',
          marginBottom: '16px',
          fontSize: '2rem'
        }}>Order Received!</h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.2rem',
          maxWidth: '400px',
          lineHeight: '1.6'
        }}>
          Thank You from<br />
          <strong style={{ color: 'var(--text-main)', fontSize: '1.4rem' }}>THE MARWAD RASOI</strong>
        </p>
        <div style={{ marginTop: '40px' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Your food is being prepared.</p>
          <button
            onClick={() => setOrderPlaced(false)}
            className="btn btn-primary"
          >
            Order More Items
          </button>
        </div>
      </div>
    )
  }

  // Landing Page (No Table ID)
  if (!tableId) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80) center/cover'
      }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>THE MARWAD RASOI</h1>
        <p style={{ color: '#fff', marginBottom: '2rem', fontSize: '1.2rem' }}>Veg & Non Veg • Cafe & Family Restaurant</p>

        <div className="glass-panel" style={{ padding: '30px', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ marginBottom: '20px' }}>Select Your Table</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.9rem' }}>
            Please scan the QR code on your table <br /> OR <br /> enter your table number below:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => setTableId(num.toString())}
                style={{
                  padding: '10px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {num}
              </button>
            ))}
          </div>
          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '15px' }}>
            <a href="/admin" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <span>🔒</span> Admin / Staff Login
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Customer View
  return (
    <div style={{ position: 'relative' }}>
      <Header tableId={tableId} />

      <div className="container" style={{ paddingTop: 0 }}>
        <CategoryTabs categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
        <MenuGrid items={filteredItems} onAdd={addToCart} />
      </div>

      <CartFloat count={cartCount} total={cartTotal} onClick={() => setIsCartOpen(true)} />

      {isCartOpen && (
        <CartModal
          cart={cart}
          total={cartTotal}
          tableId={tableId}
          onClose={() => setIsCartOpen(false)}
          onPlaceOrder={placeOrder} // Now calls socket emit
          whatsappNumber={whatsappNumber}
        />
      )}

      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#ffc107', // Amber/Gold
          color: '#000',
          padding: '16px 32px',
          borderRadius: 'var(--radius-md)',
          fontWeight: '900',
          zIndex: 9999,
          boxShadow: '0 0 40px rgba(255, 193, 7, 0.4)',
          border: '3px solid #000',
          animation: 'popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '1.5rem' }}>🔔</span>
          {notification}
          <button onClick={() => setNotification(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
        </div>
      )}
    </div>
  )
}

const inputStyle = {
  padding: '10px',
  width: '100%',
  maxWidth: '300px',
  borderRadius: '4px',
  border: '1px solid #333',
  background: '#222',
  color: '#fff'
}

const getTabStyle = (isActive) => ({
  padding: '10px 20px',
  background: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
  color: isActive ? '#000' : 'var(--text-secondary)',
  borderRadius: 'var(--radius-sm)',
  fontWeight: 'bold'
})

export default App
