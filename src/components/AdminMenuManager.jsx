import React, { useState } from 'react'
import { categories } from '../data/menu'

export default function AdminMenuManager({ menu, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editItem, setEditItem] = useState(null) // null = new item

    const initialForm = {
        id: '',
        title: '',
        desc: '',
        price: '',
        category: 'burgers',
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60'
    }

    const [formData, setFormData] = useState(initialForm)

    const handleEdit = (item) => {
        setEditItem(item)
        setFormData(item)
        setIsEditing(true)
    }

    const handleToggleAvailable = (item) => {
        const updated = menu.map(m => m.id === item.id ? { ...m, isAvailable: !m.isAvailable } : m)
        onUpdate(updated)
    }

    const handleAddNew = () => {
        setEditItem(null)
        setFormData({ ...initialForm, id: Date.now().toString() })
        setIsEditing(true)
    }

    const handleDelete = (id) => {
        if (window.confirm('Delete this item?')) {
            const updated = menu.filter(m => m.id !== id)
            onUpdate(updated)
        }
    }

    const handleSave = (e) => {
        e.preventDefault()
        let updatedMenu
        if (editItem) {
            // Update existing
            updatedMenu = menu.map(m => m.id === editItem.id ? { ...formData, price: Number(formData.price) } : m)
        } else {
            // Add new
            updatedMenu = [...menu, { ...formData, price: Number(formData.price) }]
        }
        onUpdate(updatedMenu)
        setIsEditing(false)
    }

    return (
        <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h2 style={{ margin: 0 }}>Menu Management</h2>
                <button
                    onClick={handleAddNew}
                    style={{
                        background: 'var(--primary)',
                        color: '#000',
                        fontWeight: '700',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-sm)'
                    }}
                >
                    + Add Item
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--spacing-md)' }}>
                {menu.map(item => (
                    <div key={item.id} style={{
                        background: 'var(--bg-card)',
                        padding: 'var(--spacing-sm)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        gap: '12px',
                        opacity: item.isAvailable ? 1 : 0.6
                    }}>
                        <img src={item.image} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600' }}>{item.title}</div>
                            <div style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>₹{item.price} {!item.isAvailable && '(Unavailable)'}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <button
                                onClick={() => handleToggleAvailable(item)}
                                style={{
                                    fontSize: '0.75rem',
                                    padding: '4px 8px',
                                    background: item.isAvailable ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                                    color: item.isAvailable ? '#4caf50' : '#ff9800',
                                    borderRadius: '4px',
                                    border: '1px solid'
                                }}
                            >
                                {item.isAvailable ? 'Available' : 'Out Stock'}
                            </button>
                            <button
                                onClick={() => handleEdit(item)}
                                style={{ fontSize: '0.75rem', padding: '4px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff' }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                style={{ fontSize: '0.75rem', padding: '4px 8px', background: 'rgba(255,50,50,0.1)', color: '#ff4d4d', borderRadius: '4px' }}
                            >
                                Del
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isEditing && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 200,
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div className="glass" style={{
                        background: '#121212',
                        padding: 'var(--spacing-lg)',
                        borderRadius: 'var(--radius-md)',
                        width: '90%',
                        maxWidth: '500px'
                    }}>
                        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>{editItem ? 'Edit Item' : 'New Item'}</h3>
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input
                                placeholder="Title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                                style={{ padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                            />
                            <textarea
                                placeholder="Description"
                                value={formData.desc}
                                onChange={e => setFormData({ ...formData, desc: e.target.value })}
                                style={{ padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px', height: '80px' }}
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    required
                                    style={{ flex: 1, padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                />
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    style={{ flex: 1, padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                                >
                                    {categories.filter(c => c.id !== 'all').map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <input
                                placeholder="Image URL"
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                style={{ padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                            />

                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '4px' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.isAvailable}
                                    onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                                />
                                <span>Item Available</span>
                            </label>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--primary)', color: '#000', fontWeight: 'bold', borderRadius: '8px' }}>Save Changes</button>
                                <button type="button" onClick={() => setIsEditing(false)} style={{ flex: 1, padding: '12px', background: '#333', color: '#fff', borderRadius: '8px' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
