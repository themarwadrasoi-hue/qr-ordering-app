import React, { useState } from 'react'

export default function AdminExpenses({ expenses, onAddExpense, onDeleteExpense }) {
    const [isAdding, setIsAdding] = useState(false)
    const [formData, setFormData] = useState({
        category: 'ingredients',
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
            description: '',
            amount: '',
            date: new Date().toISOString().split('T')[0]
        })
        setIsAdding(false)
    }

    // Calculate totals
    const today = new Date().toDateString()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const todayExpenses = expenses.filter(e => new Date(e.date).toDateString() === today)
    const monthExpenses = expenses.filter(e => {
        const expDate = new Date(e.date)
        return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear
    })

    const todayTotal = todayExpenses.reduce((sum, e) => sum + e.amount, 0)
    const monthTotal = monthExpenses.reduce((sum, e) => sum + e.amount, 0)

    // Group by category
    const expensesByCategory = categories.map(cat => ({
        ...cat,
        total: monthExpenses.filter(e => e.category === cat.id).reduce((sum, e) => sum + e.amount, 0)
    }))

    const monthName = new Date().toLocaleString('default', { month: 'long' })

    return (
        <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h2>Daily Expenses</h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    style={{
                        background: 'var(--primary)',
                        color: '#000',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    {isAdding ? '✕ Cancel' : '+ Add Expense'}
                </button>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#fff', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', opacity: 0.9 }}>TODAY'S EXPENSES</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>₹{todayTotal.toLocaleString()}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '5px' }}>{todayExpenses.length} entries</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', opacity: 0.9 }}>{monthName.toUpperCase()} TOTAL</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>₹{monthTotal.toLocaleString()}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '5px' }}>{monthExpenses.length} entries</div>
                </div>
            </div>

            {/* Category Breakdown */}
            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '15px', fontSize: '1rem', color: 'var(--text-secondary)' }}>📊 {monthName} Breakdown by Category</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {expensesByCategory.filter(cat => cat.total > 0).map(cat => (
                        <div key={cat.id} style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: `4px solid ${cat.color}` }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{cat.name}</div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: cat.color }}>₹{cat.total.toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Expense Form */}
            {isAdding && (
                <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h3 style={{ marginBottom: '15px' }}>Add New Expense</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
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
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                style={inputStyle}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Description (e.g., Vegetables purchase)"
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
                        <button
                            type="submit"
                            style={{
                                background: 'var(--primary)',
                                color: '#000',
                                padding: '12px',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            💾 Save Expense
                        </button>
                    </form>
                </div>
            )}

            {/* Expense List */}
            <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Recent Expenses</h3>
            {expenses.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No expenses recorded yet.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={thStyle}>Date</th>
                                <th style={thStyle}>Category</th>
                                <th style={thStyle}>Description</th>
                                <th style={thStyle}>Amount</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...expenses].reverse().map(expense => {
                                const cat = categories.find(c => c.id === expense.category)
                                return (
                                    <tr key={expense.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={tdStyle}>{new Date(expense.date).toLocaleDateString()}</td>
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
                                                    background: 'rgba(244, 67, 54, 0.2)',
                                                    color: '#f44336',
                                                    border: '1px solid #f44336',
                                                    padding: '4px 10px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                Delete
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
