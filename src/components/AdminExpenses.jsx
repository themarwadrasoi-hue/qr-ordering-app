import React, { useState } from 'react'

export default function AdminExpenses({ expenses, onAddExpense, onDeleteExpense }) {
    const [isAdding, setIsAdding] = useState(false)
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0])

    const [formData, setFormData] = useState({
        category: 'ingredients',
        section: 'general',
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
    })

    const categories = [
        { id: 'ingredients', name: '🥬 Ingredients', color: '#4caf50' },
        { id: 'utilities', name: '⚡ Utilities', color: '#2196f3' },
        { id: 'staff', name: '👥 Staff Salary', color: '#ff9800' },
        { id: 'rent', name: '🏠 Rent', color: '#f44336' },
        { id: 'maintenance', name: '🔧 Maintenance', color: '#9c27b0' },
        { id: 'other', name: '📦 Other', color: '#607d8b' }
    ]

    const storeSections = [
        { id: 'general', name: '🏢 General', color: '#fff' },
        { id: 'cafe', name: '☕ Cafe', color: '#ff9800' },
        { id: 'restaurant', name: '🍽️ Restaurant', color: '#4caf50' },
        { id: 'hut', name: '🏠 Hut', color: '#2196f3' }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.description || !formData.amount) return

        const newExpense = {
            id: Date.now().toString(),
            ...formData,
            amount: parseFloat(formData.amount),
            timestamp: Date.now()
        }

        onAddExpense(newExpense)
        setFormData({
            category: 'ingredients',
            section: 'general',
            description: '',
            amount: '',
            date: new Date().toISOString().split('T')[0]
        })
        setIsAdding(false)
    }

    // Calculate totals
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    // Filter by selected date
    const selectedDateStr = new Date(filterDate).toDateString()
    const filteredExpenses = expenses.filter(e => new Date(e.date).toDateString() === selectedDateStr)

    const monthExpenses = expenses.filter(e => {
        const expDate = new Date(e.date)
        return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear
    })

    const selectedDayTotal = filteredExpenses.reduce((sum, e) => sum + e.amount, 0)
    const monthTotal = monthExpenses.reduce((sum, e) => sum + e.amount, 0)

    // Group by category (Monthly)
    const monthExpensesByCategory = categories.map(cat => ({
        ...cat,
        total: monthExpenses.filter(e => e.category === cat.id).reduce((sum, e) => sum + e.amount, 0)
    }))

    // Group by section (Monthly)
    const monthExpensesBySection = storeSections.map(sec => ({
        ...sec,
        total: monthExpenses.filter(e => e.section === sec.id).reduce((sum, e) => sum + e.amount, 0)
    }))

    const monthName = new Date().toLocaleString('default', { month: 'long' })

    return (
        <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h2>Expense Management</h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    style={{
                        background: isAdding ? '#f44336' : 'var(--primary)',
                        color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                    }}
                >
                    {isAdding ? '✕ Cancel' : '+ Add Expense'}
                </button>
            </div>

            {/* History Filter */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px',
                padding: '15px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '10px',
                borderLeft: '4px solid var(--primary)'
            }}>
                <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>📅 View specific date:</label>
                <input
                    type="date"
                    value={filterDate}
                    onChange={e => setFilterDate(e.target.value)}
                    style={inputStyle}
                />
                {filterDate === new Date().toISOString().split('T')[0] && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--success)' }}>Showing Today</span>
                )}
            </div>

            {/* Summary Cards (Dynamic based on selected date) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#fff', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', opacity: 0.8 }}>EXPENSES ON {new Date(filterDate).toLocaleDateString()}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>₹{selectedDayTotal.toLocaleString()}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '5px' }}>{filteredExpenses.length} entries</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', opacity: 0.8 }}>{monthName.toUpperCase()} {currentYear} TOTAL</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>₹{monthTotal.toLocaleString()}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '5px' }}>{monthExpenses.length} entries in month</div>
                </div>
            </div>

            {/* Monthly Breakdowns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                {/* Category Breakdown */}
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px' }}>
                    <h4 style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>📊 {monthName} by Category</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {monthExpensesByCategory.filter(cat => cat.total > 0).map(cat => (
                            <div key={cat.id} style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', borderLeft: `3px solid ${cat.color}` }}>
                                <div style={{ fontSize: '0.7rem' }}>{cat.name}</div>
                                <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>₹{cat.total.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section Breakdown */}
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px' }}>
                    <h4 style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>🏢 {monthName} by Section</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {monthExpensesBySection.filter(sec => sec.total > 0).map(sec => (
                            <div key={sec.id} style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', borderLeft: `3px solid ${sec.color}` }}>
                                <div style={{ fontSize: '0.7rem' }}>{sec.name}</div>
                                <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>₹{sec.total.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Expense Form */}
            {isAdding && (
                <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--primary)' }}>
                    <h3 style={{ marginBottom: '15px' }}>Add New Expense</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    style={inputStyle}
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Store Section</label>
                                <select
                                    value={formData.section}
                                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                    style={inputStyle}
                                    required
                                >
                                    {storeSections.map(sec => (
                                        <option key={sec.id} value={sec.id}>{sec.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Date</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    style={inputStyle}
                                    required
                                />
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Description (e.g. Milk 5 liters for Cafe)"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            style={inputStyle}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Amount (₹)"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            style={inputStyle}
                            step="0.01"
                            min="0"
                            required
                        />
                        <button type="submit" style={actionButtonStyle('var(--primary)', '#000')}>💾 Save Expense Entry</button>
                    </form>
                </div>
            )}

            {/* Expense List (Filtered by Date) */}
            <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                Entries for {new Date(filterDate).toLocaleDateString()}
            </h3>
            {filteredExpenses.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
                    No expenses recorded for this date.
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={thStyle}>Section</th>
                                <th style={thStyle}>Category</th>
                                <th style={thStyle}>Description</th>
                                <th style={thStyle}>Amount</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...filteredExpenses].reverse().map(expense => {
                                const cat = categories.find(c => c.id === expense.category)
                                const sec = storeSections.find(s => s.id === expense.section)
                                return (
                                    <tr key={expense.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={tdStyle}>
                                            <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: sec?.color || '#fff' }}>
                                                {sec?.name || 'General'}
                                            </span>
                                        </td>
                                        <td style={tdStyle}>
                                            <span style={{ color: cat?.color || '#fff' }}>{cat?.name || expense.category}</span>
                                        </td>
                                        <td style={tdStyle}>{expense.description}</td>
                                        <td style={{ ...tdStyle, color: 'var(--primary)', fontWeight: 'bold' }}>₹{expense.amount.toLocaleString()}</td>
                                        <td style={tdStyle}>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Delete this expense?')) {
                                                        onDeleteExpense(expense.id)
                                                    }
                                                }}
                                                style={{
                                                    background: 'rgba(244, 67, 54, 0.1)',
                                                    color: '#f44336',
                                                    border: '1px solid #f44336',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

const inputStyle = {
    padding: '10px',
    background: '#222',
    border: '1px solid #444',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '0.9rem'
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

const actionButtonStyle = (bg, color = '#fff') => ({
    padding: '12px 20px',
    background: bg,
    color: color,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold'
})
