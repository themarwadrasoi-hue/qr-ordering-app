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
import AdminTableBills from './components/AdminTableBills'
import AdminInventory from './components/AdminInventory'
import AdminExpenses from './components/AdminExpenses'
import CallWaiterButton from './components/CallWaiterButton'
import WaiterCallNotification from './components/WaiterCallNotification'
import TableBillView from './components/TableBillView'
import BackgroundMusic from './components/BackgroundMusic'
import ReviewReward from './components/ReviewReward'

// Socket.io
import { io } from 'socket.io-client'

function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.pathname.startsWith('/admin'))
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(sessionStorage.getItem('isAdminAuth') === 'true')
  const [tableId, setTableId] = useState(new URLSearchParams(window.location.search).get('table') || null)
  const [adminView, setAdminView] = useState('orders') // 'orders' | 'menu' | 'qr' | 'settings' | 'reports' | 'bills' | 'inventory'
  const [customerView, setCustomerView] = useState('choice') // 'choice' | 'menu'
  const [selectedMenuType, setSelectedMenuType] = useState(null) // 'cafe' | 'restaurant' | 'hut'

  // App State
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [socket, setSocket] = useState(null)

  // Notification State
  const [notifications, setNotifications] = useState([]) // Array of { id, msg, type }

  const addNotification = (msg, type = 'info') => {
    const id = Date.now() + Math.random()
    setNotifications(prev => [...prev, { id, msg, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }

  // Data State (Synced via Server)
  const [menu, setMenu] = useState(initialMenuItems)
  const [categoriesState, setCategoriesState] = useState(categories)
  const [orders, setOrders] = useState([])
  const [orderHistory, setOrderHistory] = useState([])
  const [whatsappNumber, setWhatsappNumber] = useState('919602755557')

  // NEW State
  const [tableBills, setTableBills] = useState({})
  const [waiterCalls, setWaiterCalls] = useState([])
  const [isBillOpen, setIsBillOpen] = useState(false)
  const [restaurantLocation, setRestaurantLocation] = useState(null) // { latitude, longitude }
  const [inventory, setInventory] = useState([])
  const [expenses, setExpenses] = useState([])
  const [showReviewReward, setShowReviewReward] = useState(false)
  const [isStoreOpen, setIsStoreOpen] = useState(true) // Default true
  const [audioAllowed, setAudioAllowed] = useState(false) // User interaction required for audio
  const [distanceDebug, setDistanceDebug] = useState(null)
  const [locationError, setLocationError] = useState(null)
  const [isTooFar, setIsTooFar] = useState(false)

  // Initialize Socket Connection
  useEffect(() => {
    // If URL changes, update tableId
    const params = new URLSearchParams(window.location.search)
    const tId = params.get('table')
    if (tId) setTableId(tId)

    const isDev = window.location.hostname === 'localhost' && window.location.port === '5173'
    let socketUrl = isDev ? 'http://localhost:3000' : window.location.origin

    const newSocket = io(socketUrl)
    setSocket(newSocket)

    // Listeners
    newSocket.on('sync-state', (data) => {
      if (data.menu && data.menu.length > 0) setMenu(data.menu)
      if (data.categories && data.categories.length > 0) setCategoriesState(data.categories)
      if (data.orders) setOrders(data.orders)
      if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber)
      if (data.orderHistory) setOrderHistory(data.orderHistory)
      if (data.tableBills) setTableBills(data.tableBills)
      if (data.waiterCalls) setWaiterCalls(data.waiterCalls)
      if (data.restaurantLocation) setRestaurantLocation(data.restaurantLocation)
      if (data.inventory) setInventory(data.inventory)
      if (data.inventory) setInventory(data.inventory)
      if (data.expenses) setExpenses(data.expenses)
      if (data.isStoreOpen !== undefined) setIsStoreOpen(data.isStoreOpen)
    })

    newSocket.on('store-status-updated', (status) => {
      setIsStoreOpen(status)
      if (!status) addNotification("⛔ The Store is now CLOSED.", 'error')
    })

    newSocket.on('order-error', (msg) => {
      addNotification("❌ " + msg, 'error')
    })

    newSocket.on('new-order', (order) => {
      // Show notification on Admin page
      if (window.location.pathname.startsWith('/admin')) {
        addNotification(`New Order from Table ${order.tableId || 'Unknown'}`, 'order')
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
          audio.play()
        } catch (e) { }
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

    newSocket.on('categories-updated', (newCats) => {
      setCategoriesState(newCats)
    })

    newSocket.on('settings-updated', (settings) => {
      if (settings.whatsappNumber !== undefined) setWhatsappNumber(settings.whatsappNumber)
    })

    // NEW Listeners
    newSocket.on('table-bills-updated', (newBills) => {
      setTableBills(newBills)
    })

    newSocket.on('waiter-call-received', (call) => {
      // Logic handled by waiter-calls-updated primarily
    })

    newSocket.on('waiter-calls-updated', (calls) => {
      setWaiterCalls(calls)
      // Play Sound if new call added (simple check: if updated list is longer than previous, or just on every update if not empty)
      // Better: trigger from 'waiter-call-received' but persistence syncs here.
    })

    newSocket.on('waiter-call-received', (call) => {
      // Audio handled by WaiterCallNotification component for Admin
      // Just show notification toast here if needed
      if (Notification.permission === 'granted') {
        new Notification(`🔔 Table ${call.tableId} needs service!`)
      }
      addNotification(`🔔 Table ${call.tableId} Service Request!`, 'service')
    })

    newSocket.on('restaurant-location-updated', (loc) => {
      setRestaurantLocation(loc)
    })

    newSocket.on('inventory-updated', (newInventory) => {
      setInventory(newInventory)
    })

    newSocket.on('expenses-updated', (newExpenses) => {
      setExpenses(newExpenses)
    })

    newSocket.on('table-bill-cleared', (data) => {
      if (tableId === data.tableId) {
        setIsBillOpen(false)
        addNotification("Your bill has been cleared. Thank you!", 'success')
      }
    })

    return () => newSocket.close()
  }, [tableId])

  // NEW: Continuous Location Check (Geofence on Load)
  useEffect(() => {
    if (tableId && !isAdmin && restaurantLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const dist = calculateDistance(
              restaurantLocation.latitude, restaurantLocation.longitude,
              pos.coords.latitude, pos.coords.longitude
            )
            setDistanceDebug(dist.toFixed(3) + ' km')
            const limit = tableId === 'Delivery' ? 1.0 : 0.2
            if (tableId === 'TEST') setIsTooFar(false) // TEST table bypass
            else if (dist > limit) setIsTooFar(true)
            else setIsTooFar(false)
          },
          (err) => {
            setLocationError(err.message)
            // If strict mode, we could block here too. For now let them browse but fail at order.
          },
          { enableHighAccuracy: true }
        )
      }
    }
  }, [tableId, isAdmin, restaurantLocation])


  const [orderPlaced, setOrderPlaced] = useState(false)

  // Handlers (Emitting Events)
  const updateMenu = (newMenu) => {
    setMenu(newMenu) // Optimistic update
    socket?.emit('update-menu', newMenu)
  }

  const toggleStoreStatus = () => {
    const newStatus = !isStoreOpen
    setIsStoreOpen(newStatus)
    socket?.emit('update-store-status', newStatus)
  }

  const updateCategories = (newCats) => {
    setCategoriesState(newCats)
    socket?.emit('update-categories', newCats)
  }

  const updateWhatsapp = (num) => {
    setWhatsappNumber(num) // Optimistic
    socket?.emit('update-settings', { whatsappNumber: num })
  }

  const completeOrder = (orderId) => {
    socket?.emit('update-order-status', { orderId, status: 'completed' })
  }

  const acknowledgeWaiterCall = (tId) => {
    socket?.emit('acknowledge-waiter-call', tId)
  }

  const clearTableBill = (tId) => {
    socket?.emit('clear-table-bill', tId)
  }

  const updateRestaurantLocation = (loc) => {
    setRestaurantLocation(loc)
    socket?.emit('update-restaurant-location', loc)
  }

  const updateInventory = (updatedItem) => {
    socket?.emit('update-inventory', updatedItem)
  }

  const addInventoryItem = (newItem) => {
    socket?.emit('add-inventory-item', newItem)
  }

  const deleteInventoryItem = (itemId) => {
    socket?.emit('delete-inventory-item', itemId)
  }

  const addExpense = (expense) => {
    socket?.emit('add-expense', expense)
  }

  const deleteExpense = (expenseId) => {
    socket?.emit('delete-expense', expenseId)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuth')
    setIsAdminAuthenticated(false)
  }

  // Haversine Distance Helper
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  const placeOrder = () => {
    // Capture customer location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => sendOrderCheck(position),
        (error) => {
          console.log('Location error:', error.message);

          // For delivery, show error and don't proceed
          if (tableId === 'Delivery') {
            addNotification("📍 Location access is required for Delivery. Enable permissions.", 'error');
            return;
          }

          // For Dine-in: Enforce Geofencing if Restaurant Location is set
          if (restaurantLocation && tableId !== 'TEST') {
            addNotification("📍 Location access required to verify you are at the restaurant.", 'error');
            return;
          }

          // Fallback if no restaurant location set (Legacy/Dev mode)
          sendOrderCheck();
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    } else {
      if (restaurantLocation) {
        addNotification("📍 Browser doesn't support location. Cannot verify position.", 'error');
        return;
      }
      sendOrderCheck();
    }
  }

  // Modified sendOrder to enforce location check
  const sendOrderCheck = (pos = null) => {
    if (!isStoreOpen) {
      addNotification("⛔ Store is CLOSED. Cannot place order.", 'error');
      return;
    }

    // Geofencing Logic
    if (restaurantLocation && tableId !== 'TEST') {
      if (!pos) {
        addNotification("📍 Location required to place order.", 'error');
        return;
      }
      const dist = calculateDistance(
        restaurantLocation.latitude,
        restaurantLocation.longitude,
        pos.coords.latitude,
        pos.coords.longitude
      );

      // Thresholds: 1KM for Delivery, 0.2KM (200m) for Dine-in
      const limit = tableId === 'Delivery' ? 1.0 : 0.2;

      if (dist > limit) {
        addNotification(`📍 You are too far to order! (${dist.toFixed(2)}km). Max: ${limit}km`, 'error');
        return;
      }
    }

    // Proceed
    const newOrder = {
      id: Date.now().toString(),
      tableId,
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
      timestamp: Date.now(),
      status: 'pending',
      location: pos ? {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy
      } : null
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
  const filteredItems = (Array.isArray(menu) ? menu : []).filter(i => {
    if (!i) return false;
    const matchesType = !selectedMenuType ||
      (Array.isArray(i.menuType)
        ? i.menuType.includes(selectedMenuType)
        : i.menuType === selectedMenuType)
    const matchesCategory = activeCategory === 'all' || i.category === activeCategory
    return matchesType && matchesCategory
  })

  const filteredCategories = categoriesState.filter(cat => {
    if (cat.id === 'all') return true;
    return (Array.isArray(menu) ? menu : []).some(i => {
      const matchesType = !selectedMenuType ||
        (Array.isArray(i.menuType)
          ? i.menuType.includes(selectedMenuType)
          : i.menuType === selectedMenuType);
      return i.category === cat.id && matchesType;
    });
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const currentTableBill = tableBills[tableId] || { orders: [], total: 0 }

  // Local Cart Logic (Client Only)
  const addToCart = (item) => {
    // Geofence Block for Add to Cart
    if (isTooFar) {
      addNotification("🚫 You are too far from the restaurant to order!", 'error')
      return
    }

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.variant === item.variant)
      if (existing) {
        return prev.map(i => i.id === item.id && i.variant === item.variant ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, qty: 1 }]
    })
    addNotification(`Added ${item.title} to cart`, 'success')
  }

  // Admin View
  if (isAdmin) {
    if (!isAdminAuthenticated) {
      return <AdminLogin onLogin={() => {
        sessionStorage.setItem('isAdminAuth', 'true')
        setIsAdminAuthenticated(true)
      }} />
    }
    return (
      <div className="container" style={{ paddingBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h1 className="no-print" style={{ color: 'var(--primary)', margin: 0 }}>Kitchen Display (Live)</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={toggleStoreStatus}
              style={{
                background: isStoreOpen ? 'var(--success)' : 'var(--danger)',
                color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              {isStoreOpen ? '🟢 Online' : '🔴 Offline'}
            </button>
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(239, 71, 111, 0.15)',
                color: 'var(--danger)',
                border: '1px solid var(--danger)',
                padding: '8px 15px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🚪 Logout
            </button>
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
              📋 Copy Link
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '10px', color: socket ? '#4caf50' : '#f44336', fontSize: '0.8rem' }}>
          {socket ? '● Connected to Server' : '● Disconnected'}
        </div>

        <div className="no-print" style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)', overflowX: 'auto', paddingBottom: '5px' }}>
          <button onClick={() => setAdminView('orders')} style={getTabStyle(adminView === 'orders')}>Orders</button>
          <button onClick={() => setAdminView('bills')} style={getTabStyle(adminView === 'bills')}>Table Bills</button>
          <button onClick={() => setAdminView('reports')} style={getTabStyle(adminView === 'reports')}>Reports</button>
          <button onClick={() => setAdminView('inventory')} style={getTabStyle(adminView === 'inventory')}>Inventory</button>
          <button onClick={() => setAdminView('expenses')} style={getTabStyle(adminView === 'expenses')}>Expenses</button>
          <button onClick={() => setAdminView('menu')} style={getTabStyle(adminView === 'menu')}>Manage Menu</button>
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

            {/* Completed Today section */}
            <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <h3 style={{ color: 'var(--text-secondary)', marginBottom: '15px', fontSize: '1rem' }}>✅ Completed Today</h3>
              {orderHistory.filter(o => new Date(o.completedAt || o.timestamp).toDateString() === new Date().toDateString()).length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No orders completed today yet.</p>
              ) : (
                orderHistory
                  .filter(o => new Date(o.completedAt || o.timestamp).toDateString() === new Date().toDateString())
                  .reverse()
                  .map(order => (
                    <div key={order.id} style={{
                      background: 'rgba(255,255,255,0.03)',
                      padding: '12px',
                      borderRadius: '8px',
                      marginBottom: '10px',
                      borderLeft: '4px solid var(--success)',
                      fontSize: '0.9rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Table {order.tableId}</strong>
                        <span style={{ color: 'var(--text-muted)' }}>{new Date(order.completedAt || order.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {order.items.map(i => `${i.qty}x ${i.title}`).join(', ')}
                      </div>
                      <div style={{ fontWeight: 'bold', marginTop: '4px', color: 'var(--primary)' }}>₹{order.total}</div>
                    </div>
                  ))
              )}
            </div>
          </div>
        ) : adminView === 'bills' ? (
          <AdminTableBills tableBills={tableBills} onClearBill={clearTableBill} />
        ) : adminView === 'reports' ? (
          <AdminReports history={orderHistory} />
        ) : adminView === 'inventory' ? (
          <AdminInventory
            inventory={inventory}
            onUpdateInventory={updateInventory}
            onAddItem={addInventoryItem}
            onDeleteItem={deleteInventoryItem}
          />
        ) : adminView === 'expenses' ? (
          <AdminExpenses expenses={expenses} onAddExpense={addExpense} onDeleteExpense={deleteExpense} />
        ) : adminView === 'menu' ? (
          <AdminMenuManager
            menu={menu}
            categories={categoriesState}
            onUpdate={updateMenu}
            onUpdateCategories={updateCategories}
          />
        ) : adminView === 'qr' ? (
          <AdminQRGenerator
            restaurantLocation={restaurantLocation}
            onUpdateRestaurantLocation={updateRestaurantLocation}
          />
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

        {/* Global Admin Alerts */}
        <WaiterCallNotification
          calls={waiterCalls}
          onAcknowledge={acknowledgeWaiterCall}
        />

        <a href="/" className="no-print" style={{ display: 'block', marginTop: '40px', color: 'var(--text-secondary)', textDecoration: 'underline' }}>
          Back to Menu
        </a>

        {/* Admin Background Music */}
        <BackgroundMusic
          playlist={[
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
          ]}
        />
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
          <strong style={{ color: 'var(--text-main)', fontSize: '1.4rem' }}>THE MARWAD FOOD ORDERING SYSTEM</strong>
        </p>
        <div style={{ marginTop: '40px' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Your food is being prepared.</p>
          <button
            onClick={() => {
              setOrderPlaced(false)
              setCustomerView('choice')
              setSelectedMenuType(null)
            }}
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
        textAlign: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80) center/cover'
      }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>THE MARWAD FOOD ORDERING SYSTEM</h1>
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

  // Store Closed Screen (For Customers)
  if (!isStoreOpen && !isAdmin) {
    return (
      <div style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px', textAlign: 'center', background: '#000', color: '#fff'
      }}>
        <h1 style={{ fontSize: '4rem' }}>⛔</h1>
        <h2 style={{ color: 'var(--danger)' }}>Currently Closed</h2>
        <p>The restaurant is currently not accepting new orders.</p>
        <p style={{ marginTop: '20px', color: '#888' }}>Please check back later.</p>
      </div>
    )
  }

  // Customer Choice Screen (If tableId exists but hasn't entered menu)
  if (tableId && !isAdmin && customerView === 'choice') {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80) center/cover'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>
          {tableId === 'Delivery' ? '🏡 HOME DELIVERY' : 'WELCOME TO'}
        </h1>
        <h2 style={{ fontSize: tableId === 'Delivery' ? '2rem' : '3rem', color: '#fff', marginBottom: '2.5rem', fontWeight: '900' }}>
          THE MARWAD FOOD ORDERING SYSTEM
        </h2>
        {tableId === 'Delivery' ? (
          <p style={{ color: 'var(--primary)', marginBottom: '20px', fontWeight: 'bold' }}>
            📍 Orders delivered within 1KM radius only
          </p>
        ) : isTooFar && (
          <div style={{
            background: 'rgba(239, 71, 111, 0.2)',
            color: 'var(--danger)',
            padding: '15px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '2px solid var(--danger)',
            fontWeight: 'bold',
            animation: 'pulseSubtle 2s infinite'
          }}>
            🚫 You are out of Restaurant Range!<br />
            Please scan the QR code while you are inside the restaurant.
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          width: '100%',
          maxWidth: '500px',
          opacity: (isTooFar && tableId !== 'Delivery') ? 0.4 : 1,
          pointerEvents: (isTooFar && tableId !== 'Delivery') ? 'none' : 'auto',
          filter: (isTooFar && tableId !== 'Delivery') ? 'grayscale(1)' : 'none',
          transition: 'all 0.5s ease'
        }}>
          <button
            onClick={() => {
              setSelectedMenuType('cafe')
              setCustomerView('menu')
              setActiveCategory('all')
            }}
            style={choiceButtonStyle('linear-gradient(135deg, #FF9800 0%, #F44336 100%)')}
          >
            <span style={{ fontSize: '2.5rem' }}>☕</span>
            <span>Cafe Menu</span>
          </button>

          <button
            onClick={() => {
              setSelectedMenuType('restaurant')
              setCustomerView('menu')
              setActiveCategory('all')
            }}
            style={choiceButtonStyle('linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)')}
          >
            <span style={{ fontSize: '2.5rem' }}>🍽️</span>
            <span>Restaurant Menu</span>
          </button>

          <button
            onClick={() => {
              setSelectedMenuType('hut')
              setCustomerView('menu')
              setActiveCategory('all')
            }}
            style={choiceButtonStyle('linear-gradient(135deg, #2196F3 0%, #1565C0 100%)')}
          >
            <span style={{ fontSize: '2.5rem' }}>⛺</span>
            <span>Hut Menu</span>
          </button>

          <button
            onClick={() => {
              if (isTooFar && tableId !== 'TEST') {
                addNotification("📍 You must be at the restaurant to request service.", 'error')
                return
              }
              socket?.emit('call-waiter', { tableId, timestamp: Date.now() })
              addNotification("Service requested for Table " + tableId, 'service')
            }}
            style={choiceButtonStyle('rgba(255,255,255,0.05)', true)}
          >
            <span style={{ fontSize: '2.5rem' }}>🔔</span>
            <span>Service Please</span>
          </button>

          <button
            onClick={() => setShowReviewReward(true)}
            style={choiceButtonStyle('linear-gradient(135deg, #FFD700 0%, #FFA500 100%)')}
          >
            <span style={{ fontSize: '2.5rem' }}>🌟</span>
            <span>Rate & Win Discount</span>
          </button>
        </div>

        <div style={{ marginTop: '20px', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
          Table Number: <strong style={{ color: 'var(--primary)' }}>{tableId}</strong>
        </div>

        {/* Welcome Music moved to global container */}
        {showReviewReward && (
          <ReviewReward
            onClose={() => setShowReviewReward(false)}
          />
        )}
      </div >
    )
  }

  // Customer View
  return (
    <div style={{ position: 'relative' }}>
      <Header
        tableId={tableId}
        total={currentTableBill.total}
        onViewBill={() => setIsBillOpen(true)}
        onSwitchMenu={() => {
          setCustomerView('choice')
          setSelectedMenuType(null)
          setActiveCategory('all')
        }}
      />

      <div className="container" style={{ paddingTop: 0 }}>
        <CategoryTabs categories={filteredCategories} activeCategory={activeCategory} onSelect={setActiveCategory} />
        <MenuGrid items={filteredItems} onAdd={addToCart} />
      </div>

      <CartFloat count={cartCount} total={cartTotal} onClick={() => setIsCartOpen(true)} />



      {!isAdmin && (
        <CallWaiterButton
          tableId={tableId || 'New Guest'}
          socket={socket}
          serviceNumbers={['919602755557', '919602855558', '919588894347', '919521751114', '919782222673']}
          isTooFar={isTooFar}
          onBlocked={() => addNotification("📍 You must be at the restaurant to request service.", 'error')}
        />
      )}

      {/* Background Music for Customers (Theme Based) */}
      {!isAdmin && customerView === 'menu' && (
        <BackgroundMusic
          playlist={
            selectedMenuType === 'cafe' ? [
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
            ] : selectedMenuType === 'restaurant' ? [
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
            ] : [ // Hut / Silent / Light (Alcoholic Area)
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
            ]
          }
        />
      )}

      {isCartOpen && (
        <CartModal
          cart={cart}
          total={cartTotal}
          tableId={tableId}
          onClose={() => setIsCartOpen(false)}
          onPlaceOrder={placeOrder}
          whatsappNumber={whatsappNumber}
        />
      )}

      {/* Table Bill View */}
      {isBillOpen && (
        <TableBillView
          bill={currentTableBill}
          tableId={tableId}
          onClose={() => setIsBillOpen(false)}
          onCallWaiter={() => {
            if (isTooFar && tableId !== 'TEST') {
              addNotification("📍 You must be at the restaurant to request service.", 'error')
              return
            }
            socket?.emit('call-waiter', { tableId, timestamp: Date.now() })
            addNotification("Service requested for payment.", 'service')
          }}
        />
      )}

      <div style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        maxWidth: '400px',
        padding: '0 20px',
        pointerEvents: 'none'
      }}>
        {notifications.map(n => (
          <div key={n.id} style={{
            background: n.type === 'service' ? '#ffc107' : n.type === 'error' ? 'var(--danger)' : n.type === 'success' ? '#4caf50' : '#333',
            color: n.type === 'service' ? '#000' : '#fff',
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)',
            fontWeight: '800',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            border: '2px solid rgba(255,255,255,0.1)',
            animation: 'popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            pointerEvents: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>
                {n.type === 'service' ? '🔔' : n.type === 'order' ? '📜' : n.type === 'success' ? '✅' : 'ℹ️'}
              </span>
              {n.msg}
            </div>
            <button
              onClick={() => setNotifications(prev => prev.filter(nn => nn.id !== n.id))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'inherit', opacity: 0.7 }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* DEBUG FOOTER (Temporary for Verification) */}
      {!isAdmin && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: 'rgba(0,0,0,0.8)', color: '#0f0',
          fontSize: '0.7rem', padding: '5px', textAlign: 'center', zIndex: 9999, pointerEvents: 'none'
        }}>
          Rest: {restaurantLocation ? `${restaurantLocation.latitude.toFixed(4)},${restaurantLocation.longitude.toFixed(4)}` : 'Wait...'} |
          Dist: {distanceDebug || 'Calculating...'} |
          Blocked: {isTooFar ? 'YES' : 'NO'} |
          Err: {locationError || 'None'}
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

const choiceButtonStyle = (bg, isSecondary = false) => ({
  padding: '30px 15px',
  fontSize: '1.2rem',
  fontWeight: '800',
  background: bg,
  color: isSecondary ? '#fff' : '#000',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '28px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  backdropFilter: 'blur(5px)',
  textTransform: 'uppercase',
  letterSpacing: '0.02em'
})

function AdminLogin({ onLogin }) {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1) // 1: Phone, 2: OTP
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOTP = async () => {
    if (!phone) return setError('Please enter phone number')
    setLoading(true)
    setError('')
    try {
      await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      })
      setStep(2)
    } catch (err) {
      setError('Failed to send OTP')
    }
    setLoading(false)
  }

  const handleVerifyOTP = async () => {
    if (!otp) return setError('Please enter OTP')
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
      })
      if (res.ok) {
        onLogin()
      } else {
        setError('Invalid OTP')
      }
    } catch (err) {
      setError('Verification failed')
    }
    setLoading(false)
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'var(--background)'
    }}>
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Admin Login</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '0.9rem' }}>
          Please verify your identity to continue to the Kitchen Display.
        </p>

        {error && (
          <div style={{
            background: 'rgba(239, 71, 111, 0.1)',
            color: 'var(--danger)',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.85rem'
          }}>
            ⚠️ {error}
          </div>
        )}

        {step === 1 ? (
          <>
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ ...inputStyle, marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}
            />
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: '15px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              OTP sent to {phone}. <span onClick={() => setStep(1)} style={{ color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}>Change?</span>
            </p>
            <input
              type="text"
              placeholder="Enter 6-Digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ ...inputStyle, marginBottom: '20px', textAlign: 'center', fontSize: '1.2rem', letterSpacing: '4px' }}
            />
            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              {loading ? 'Verifying...' : 'Login to Dashboard'}
            </button>
            <p style={{ marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              (Note: For testing, use code: 130289)
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default App
