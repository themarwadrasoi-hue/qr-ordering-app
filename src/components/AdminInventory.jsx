import React, { useState } from 'react'

export default function AdminInventory({ inventory, onUpdateInventory, onAddItem, onDeleteItem }) {
    const [editingItem, setEditingItem] = useState(null)
    const [isFullEdit, setIsFullEdit] = useState(false)
    const [editData, setEditData] = useState(null)

    const [adjustAmount, setAdjustAmount] = useState('')
    const [adjustReason, setAdjustReason] = useState('purchase')

    const [isAdding, setIsAdding] = useState(false)
    const [newItem, setNewItem] = useState({ name: '', unit: 'kg', stock: 0, minStock: 5, usedToday: 0 })

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

    const handleSaveFullEdit = () => {
        if (!editData.name || !editData.unit) return
        onUpdateInventory(editData)
        setEditingItem(null)
        setIsFullEdit(false)
    }

    const handleAddNewItem = (e) => {
        e.preventDefault()
        if (!newItem.name) return
        const id = newItem.name.toLowerCase().replace(/\s+/g, '_')
        onAddItem({ ...newItem, id, lastUpdated: Date.now() })
        setIsAdding(false)
        setNewItem({ name: '', unit: 'kg', stock: 0, minStock: 5, usedToday: 0 })
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
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        style={{
                            background: isAdding ? '#f44336' : 'var(--primary)',
                            color: '#000',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '900',
                            boxShadow: isAdding ? 'none' : '0 4px 15px rgba(255, 193, 7, 0.3)',
                            transform: isAdding ? 'none' : 'scale(1.05)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isAdding ? '✕ Close Form' : '➕ ADD NEW ITEM'}
                    </button>
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
            </div>

            {/* Add New Item Form */}
            {isAdding && (
                <div style={{ marginBottom: '25px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,193,7,0.3)' }}>
                    <h4 style={{ marginBottom: '15px' }}>Add New Ingredient</h4>
                    <form onSubmit={handleAddNewItem} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                        <input
                            placeholder="Name (e.g. Potato)"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                            style={inputStyle}
                            required
                        />
                        <input
                            placeholder="Unit (kg, pcs, liters)"
                            value={newItem.unit}
                            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                            style={inputStyle}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Initial Stock"
                            value={newItem.stock}
                            onChange={(e) => setNewItem({ ...newItem, stock: parseFloat(e.target.value) })}
                            style={inputStyle}
                        />
                        <input
                            type="number"
                            placeholder="Min Stock Alert"
                            value={newItem.minStock}
                            onChange={(e) => setNewItem({ ...newItem, minStock: parseFloat(e.target.value) })}
                            style={inputStyle}
                        />
                        <button type="submit" style={actionButtonStyle('var(--primary)', '#000')}>Save Item</button>
                    </form>
                </div>
            )}

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
                            <th style={thStyle}>Stock Control</th>
                            <th style={thStyle}>Threshold</th>
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
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <span style={{ fontSize: '1.2rem' }}>{status.icon}</span>
                                            <span style={{ fontSize: '0.6rem', color: status.color, fontWeight: 'bold' }}>{status.text}</span>
                                        </div>
                                    </td>
                                    <td style={tdStyle}>
                                        {isEditing && isFullEdit ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                <input
                                                    value={editData.name}
                                                    onChange={e => setEditData({ ...editData, name: e.target.value })}
                                                    style={{ ...inputStyle, width: '120px' }}
                                                />
                                                <input
                                                    value={editData.unit}
                                                    onChange={e => setEditData({ ...editData, unit: e.target.value })}
                                                    style={{ ...inputStyle, width: '60px', fontSize: '0.7rem' }}
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Unit: {item.unit}</div>
                                            </>
                                        )}
                                    </td>
                                    <td style={tdStyle}>
                                        {isEditing && !isFullEdit ? (
                                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                                <input
                                                    type="number"
                                                    value={adjustAmount}
                                                    onChange={(e) => setAdjustAmount(e.target.value)}
                                                    placeholder="±Value"
                                                    style={{ width: '70px', ...inputStyle }}
                                                />
                                                <button onClick={() => handleManualAdjust(item)} style={actionButtonStyle('#4caf50')}>✓</button>
                                                <button onClick={() => { setEditingItem(null); setAdjustAmount('') }} style={actionButtonStyle('#f44336')}>✕</button>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ color: status.color, fontWeight: 'bold', fontSize: '1.2rem' }}>
                                                    {item.stock}
                                                </div>
                                                <div style={{ display: 'flex', gap: '2px' }}>
                                                    <button onClick={() => handleAdjustStock(item, 1)} style={miniButtonStyle('#4caf50')}>+</button>
                                                    <button onClick={() => handleAdjustStock(item, -1)} style={miniButtonStyle('#f44336')}>-</button>
                                                </div>
                                            </div>
                                        )}
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Today: {item.usedToday} {item.unit}</div>
                                    </td>
                                    <td style={tdStyle}>
                                        {isEditing && isFullEdit ? (
                                            <input
                                                type="number"
                                                value={editData.minStock}
                                                onChange={e => setEditData({ ...editData, minStock: parseFloat(e.target.value) })}
                                                style={{ ...inputStyle, width: '60px' }}
                                            />
                                        ) : (
                                            <span>Min: {item.minStock}</span>
                                        )}
                                    </td>
                                    <td style={tdStyle}>
                                        {isEditing && isFullEdit ? (
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <button onClick={handleSaveFullEdit} style={actionButtonStyle('var(--success)')}>SAVE</button>
                                                <button onClick={() => { setEditingItem(null); setIsFullEdit(false) }} style={actionButtonStyle('#555')}>CANCEL</button>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <button
                                                    onClick={() => {
                                                        setEditingItem(item.id);
                                                        setIsFullEdit(true);
                                                        setEditData({ ...item });
                                                    }}
                                                    style={actionButtonStyle('rgba(255,255,255,0.1)', 'var(--primary)')}
                                                    title="Edit Details"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => setEditingItem(item.id)}
                                                    style={actionButtonStyle('rgba(255,255,255,0.1)')}
                                                    title="Custom Stock"
                                                >
                                                    ⚖️
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm(`Delete ${item.name}?`)) {
                                                            onDeleteItem(item.id)
                                                        }
                                                    }}
                                                    style={actionButtonStyle('rgba(244, 67, 54, 0.1)', '#f44336')}
                                                    title="Delete"
                                                >
                                                    🗑️
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

const inputStyle = {
    padding: '8px',
    background: '#222',
    border: '1px solid #444',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '0.85rem'
}

const actionButtonStyle = (bg, color = '#fff') => ({
    padding: '6px 10px',
    background: bg,
    color: color,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 'bold'
})

const miniButtonStyle = (bg) => ({
    padding: '2px 8px',
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold'
})

