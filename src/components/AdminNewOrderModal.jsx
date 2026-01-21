import React, { useState } from 'react'

export default function AdminNewOrderModal({ menu, onClose, onPlaceOrder }) {
    const [selectedTable, setSelectedTable] = useState('1')
    const [cart, setCart] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const filteredMenu = menu.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const addToCart = (item, variant = null) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id && i.variant === variant)
            if (existing) {
                return prev.map(i => i.id === item.id && i.variant === variant ? { ...i, qty: i.qty + 1 } : i)
            }
            const price = variant ? item.variants[variant] : item.price
            return [...prev, { ...item, qty: 1, variant, price }]
        })
    }

    const removeFromCart = (itemId, variant) => {
        setCart(prev => prev.filter(i => !(i.id === itemId && i.variant === variant)))
    }

    const updateQty = (itemId, variant, delta) => {
        setCart(prev => prev.map(i => {
            if (i.id === itemId && i.variant === variant) {
                const newQty = Math.max(1, i.qty + delta)
                return { ...i, qty: newQty }
            }
            return i
        }))
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)

    const handleSubmit = () => {
        if (cart.length === 0) return alert('Please add items to the order')

        const newOrder = {
            id: 'ADMIN-' + Date.now(),
            tableId: selectedTable,
            items: cart,
            total: total,
            timestamp: Date.now(),
            status: 'pending',
            isAdminOrder: true
        }

        onPlaceOrder(newOrder)
        onClose()
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ color: 'var(--primary)', margin: 0 }}>Manual New Order</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                {/* Table Selection */}
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Select Table</label>
                    <select
                        value={selectedTable}
                        onChange={e => setSelectedTable(e.target.value)}
                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: '#fff', borderRadius: '8px' }}
                    >
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num.toString()}>Table {num}</option>
                        ))}
                        <option value="Delivery">🚀 Delivery</option>
                    </select>
                </div>

                {/* Search & Menu Selection */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '0' }}>
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: '#fff', borderRadius: '8px' }}
                    />

                    <div style={{ flex: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '10px', maxHeight: '200px' }}>
                        {filteredMenu.map(item => (
                            <div key={item.id} style={{ padding: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{item.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>₹{item.price} {item.variants && '(Multiple)'}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    {item.variants ? Object.keys(item.variants).map(v => (
                                        <button
                                            key={v}
                                            onClick={() => addToCart(item, v)}
                                            style={{ padding: '4px 8px', background: 'var(--primary)', color: '#000', border: 'none', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}
                                        >
                                            + {v}
                                        </button>
                                    )) : (
                                        <button
                                            onClick={() => addToCart(item)}
                                            style={{ padding: '4px 8px', background: 'var(--primary)', color: '#000', border: 'none', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}
                                        >
                                            + Add
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart Preview */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '15px' }}>
                    <h4 style={{ margin: '0 0 10px 0' }}>Order Summary</h4>
                    <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '10px' }}>
                        {cart.length === 0 ? <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No items added yet</p> : cart.map(item => (
                            <div key={`${item.id}-${item.variant}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <div style={{ fontSize: '0.9rem' }}>
                                    {item.title} {item.variant && <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>({item.variant})</span>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', padding: '2px 5px' }}>
                                        <button onClick={() => updateQty(item.id, item.variant, -1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>-</button>
                                        <span style={{ fontSize: '0.8rem', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                                        <button onClick={() => updateQty(item.id, item.variant, 1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>+</button>
                                    </div>
                                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', minWidth: '60px', textAlign: 'right' }}>₹{item.price * item.qty}</div>
                                    <button onClick={() => removeFromCart(item.id, item.variant)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary)' }}>
                        <span>Total Amount:</span>
                        <span>₹{total}</span>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    style={{ width: '100%', padding: '15px', background: 'var(--primary)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: cart.length > 0 ? 'pointer' : 'not-allowed', opacity: cart.length > 0 ? 1 : 0.5 }}
                >
                    Create Order Now
                </button>
            </div>
        </div>
    )
}
