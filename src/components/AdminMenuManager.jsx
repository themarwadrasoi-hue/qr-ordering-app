import React, { useState, useRef } from 'react'

export default function AdminMenuManager({ menu, categories, onUpdate, onUpdateCategories }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editItem, setEditItem] = useState(null)
    const [isManagingCategories, setIsManagingCategories] = useState(false)
    const fileInputRef = useRef(null)

    const initialForm = {
        id: '',
        title: '',
        desc: '',
        price: '',
        category: categories[0]?.id || '',
        subCategory: '',
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60'
    }

    const [formData, setFormData] = useState(initialForm)
    const [newCategory, setNewCategory] = useState({ id: '', name: '' })

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
            updatedMenu = menu.map(m => m.id === editItem.id ? { ...formData, price: Number(formData.price) } : m)
        } else {
            updatedMenu = [...menu, { ...formData, price: Number(formData.price) }]
        }
        onUpdate(updatedMenu)
        setIsEditing(false)
    }

    const handleImportMenu = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target.result)
                if (Array.isArray(imported)) {
                    onUpdate(imported)
                    alert('Menu imported successfully!')
                } else if (imported.menu && imported.categories) {
                    onUpdate(imported.menu)
                    onUpdateCategories(imported.categories)
                    alert('Menu and Categories imported successfully!')
                }
            } catch (err) {
                alert('Invalid JSON file')
            }
        }
        reader.readAsText(file)
    }

    const handleAddCategory = () => {
        if (!newCategory.id || !newCategory.name) return
        onUpdateCategories([...categories, newCategory])
        setNewCategory({ id: '', name: '' })
    }

    const handleDeleteCategory = (id) => {
        if (window.confirm('Delete this category? Items in this category will remain but may not show up correctly.')) {
            onUpdateCategories(categories.filter(c => c.id !== id))
        }
    }

    return (
        <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)', flexWrap: 'wrap', gap: '15px' }}>
                <h2 style={{ margin: 0 }}>Menu Management</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        📤 Import JSON
                    </button>
                    <input type="file" ref={fileInputRef} hidden accept=".json" onChange={handleImportMenu} />

                    <button
                        onClick={() => setIsManagingCategories(!isManagingCategories)}
                        style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        📁 Categories
                    </button>

                    <button
                        onClick={handleAddNew}
                        style={{ background: 'var(--primary)', color: '#000', fontWeight: '700', padding: '8px 16px', borderRadius: '8px' }}
                    >
                        + Add Item
                    </button>
                </div>
            </div>

            {isManagingCategories && (
                <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h3>Manage Categories</h3>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <input
                            placeholder="ID (e.g. burgers)"
                            value={newCategory.id}
                            onChange={e => setNewCategory({ ...newCategory, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                            style={{ flex: 1, padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                        />
                        <input
                            placeholder="Display Name"
                            value={newCategory.name}
                            onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                            style={{ flex: 1, padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                        />
                        <button onClick={handleAddCategory} style={{ background: 'var(--primary)', color: '#000', padding: '10px 20px', borderRadius: '4px', fontWeight: 'bold' }}>Add</button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {categories.map(cat => (
                            <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '20px' }}>
                                <span>{cat.name} ({cat.id})</span>
                                <button onClick={() => handleDeleteCategory(cat.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
                        <img src={item.image} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} alt="" />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600' }}>{item.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{item.category}</div>
                            <div style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>₹{item.price} {!item.isAvailable && '(Unavailable)'}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <button
                                onClick={() => handleToggleAvailable(item)}
                                style={{
                                    fontSize: '0.75rem', padding: '4px 8px',
                                    background: item.isAvailable ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                                    color: item.isAvailable ? '#4caf50' : '#ff9800',
                                    borderRadius: '4px', border: '1px solid'
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
                    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div className="glass" style={{
                        background: '#121212', padding: 'var(--spacing-lg)',
                        borderRadius: 'var(--radius-md)', width: '90%', maxWidth: '500px'
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
                                placeholder="Sub-category (Optional)"
                                value={formData.subCategory || ''}
                                onChange={e => setFormData({ ...formData, subCategory: e.target.value })}
                                style={{ padding: '10px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
                            />
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
