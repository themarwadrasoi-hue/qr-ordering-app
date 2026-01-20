import React, { useState } from 'react'

export default function AdminInventory({ inventory, onUpdateInventory }) {
    const [editingItem, setEditingItem] = useState(null)
    const [adjustAmount, setAdjustAmount] = useState('')
    const [adjustReason, setAdjustReason] = useState('purchase')

    const getStockStatus = (item) => {
        if (item.stock <= 0) return { icon: '🔴', text: 'OUT OF STOCK', color: '#f44336' }
        if (item.stock <= item.minStock) return { icon: '🟡', text: 'LOW STOCK', color: '#ff9800' }
        return { icon: '🟢', text: 'GOOD', color: '#4caf50' }
    }

    const handleAdjustStock = (item, amount) => {
        const newStock = Math.max(0, item.stock + amount)
        const updatedItem = { ...item, stock: newStock, lastUpdated: Date.now() }
        onUpdateInventory(updatedItem)
        setEditingItem(null)
        setAdjustAmount('')
    }

    const handleManualAdjust = (item) => {
        const amount = parseInt(adjustAmount)
        if (isNaN(amount) || amount === 0) return
        handleAdjustStock(item, amount)
    }

    const handleResetDailyUsage = () => {
        if (confirm('Reset daily usage counters for all items?')) {
            inventory.forEach(item => {
                onUpdateInventory({ ...item, usedToday: 0 })
            })
        }
    }

    const lowStockItems = inventory.filter(item => item.stock <= item.minStock)
    const totalUsedToday = inventory.reduce((sum, item) => sum + item.usedToday, 0)
    const mostUsed = [...inventory].sort((a, b) => b.usedToday - a.usedToday).slice(0, 3)

    return (
        <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h2>Inventory Management</h2>
                <button
                    onClick={handleResetDailyUsage}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        color: 'var(--text-main)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        padding: '8px 15px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                    }}
                >
                    🔄 Reset Daily Usage
                </button>
            </div>

            {/* Daily Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '15px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Items Used Today</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800' }}>{totalUsedToday}</div>
                </div>
                <div style={{ background: lowStockItems.length > 0 ? '#f44336' : '#4caf50', color: '#fff', padding: '15px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Low Stock Alerts</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800' }}>{lowStockItems.length}</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: '#000', padding: '15px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Total Items</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800' }}>{inventory.length}</div>
                </div>
            </div>

            {/* Most Used Today */}
            {mostUsed.some(item => item.usedToday > 0) && (
                <div style={{ marginBottom: '20px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                    <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>📊 Most Used Today</h4>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {mostUsed.filter(item => item.usedToday > 0).map(item => (
                            <div key={item.id} style={{ padding: '8px 12px', background: 'rgba(255,193,7,0.1)', borderRadius: '6px', fontSize: '0.85rem' }}>
                                <strong>{item.name}</strong>: {item.usedToday} {item.unit}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Inventory Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.1)', textAlign: 'left' }}>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Ingredient</th>
                            <th style={thStyle}>Current Stock</th>
                            <th style={thStyle}>Used Today</th>
                            <th style={thStyle}>Min Stock</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map(item => {
                            const status = getStockStatus(item)
                            const isEditing = editingItem === item.id

                            return (
                                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={tdStyle}>
                                        <span style={{ fontSize: '1.2rem' }}>{status.icon}</span>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Unit: {item.unit}</div>
                                    </td>
                                    <td style={{ ...tdStyle, color: status.color, fontWeight: 'bold', fontSize: '1.1rem' }}>
                                        {item.stock} {item.unit}
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{ color: 'var(--primary)' }}>{item.usedToday} {item.unit}</span>
                                    </td>
                                    <td style={tdStyle}>
                                        {item.minStock} {item.unit}
                                    </td>
                                    <td style={tdStyle}>
                                        {isEditing ? (
                                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                                <input
                                                    type="number"
                                                    value={adjustAmount}
                                                    onChange={(e) => setAdjustAmount(e.target.value)}
                                                    placeholder="±Amount"
                                                    style={{
                                                        width: '80px',
                                                        padding: '5px',
                                                        background: '#222',
                                                        border: '1px solid #444',
                                                        color: '#fff',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                                <select
                                                    value={adjustReason}
                                                    onChange={(e) => setAdjustReason(e.target.value)}
                                                    style={{
                                                        padding: '5px',
                                                        background: '#222',
                                                        border: '1px solid #444',
                                                        color: '#fff',
                                                        borderRadius: '4px',
                                                        fontSize: '0.8rem'
                                                    }}
                                                >
                                                    <option value="purchase">Purchase</option>
                                                    <option value="wastage">Wastage</option>
                                                    <option value="adjustment">Adjustment</option>
                                                </select>
                                                <button
                                                    onClick={() => handleManualAdjust(item)}
                                                    style={actionButtonStyle('#4caf50')}
                                                >
                                                    ✓
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingItem(null)
                                                        setAdjustAmount('')
                                                    }}
                                                    style={actionButtonStyle('#f44336')}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <button
                                                    onClick={() => handleAdjustStock(item, 10)}
                                                    style={actionButtonStyle('#4caf50')}
                                                    title="Add 10"
                                                >
                                                    +10
                                                </button>
                                                <button
                                                    onClick={() => handleAdjustStock(item, -10)}
                                                    style={actionButtonStyle('#f44336')}
                                                    title="Remove 10"
                                                >
                                                    -10
                                                </button>
                                                <button
                                                    onClick={() => setEditingItem(item.id)}
                                                    style={actionButtonStyle('#2196f3')}
                                                    title="Custom adjustment"
                                                >
                                                    ✏️
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Low Stock Warning */}
            {lowStockItems.length > 0 && (
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    background: 'rgba(255, 152, 0, 0.1)',
                    border: '2px solid #ff9800',
                    borderRadius: '8px'
                }}>
                    <h4 style={{ color: '#ff9800', marginBottom: '10px' }}>⚠️ Low Stock Alert</h4>
                    <div style={{ fontSize: '0.9rem' }}>
                        {lowStockItems.map(item => (
                            <div key={item.id} style={{ marginBottom: '5px' }}>
                                <strong>{item.name}</strong>: Only {item.stock} {item.unit} remaining (Min: {item.minStock})
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const thStyle = {
    padding: '12px',
    color: 'var(--text-secondary)',
    fontWeight: '600'
}

const tdStyle = {
    padding: '12px',
    verticalAlign: 'middle'
}

const actionButtonStyle = (bg) => ({
    padding: '6px 10px',
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 'bold'
})
