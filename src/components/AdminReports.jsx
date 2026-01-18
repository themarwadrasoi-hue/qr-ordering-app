import React from 'react'

export default function AdminReports({ history }) {
    // Calculate Totals
    const today = new Date().toDateString()

    // Filter for Today's sales (assuming we want daily report by default)
    const todaysOrders = history.filter(o => new Date(o.completedAt).toDateString() === today)

    const totalSales = todaysOrders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = todaysOrders.length

    return (
        <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Daily Sales Report</h2>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ background: 'var(--primary)', color: '#000', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', opacity: 0.8 }}>TOTAL SALES (TODAY)</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>₹{totalSales.toLocaleString()}</div>
                </div>
                <div style={{ background: '#333', color: '#fff', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', opacity: 0.8 }}>TOTAL ORDERS</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{totalOrders}</div>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Transaction History</h3>

            {history.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No completed orders yet.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={thStyle}>Time</th>
                                <th style={thStyle}>Table</th>
                                <th style={thStyle}>Items</th>
                                <th style={thStyle}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Show newest first */}
                            {[...history].reverse().map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={tdStyle}>{new Date(order.completedAt || order.timestamp).toLocaleTimeString()}</td>
                                    <td style={tdStyle}>{order.tableId}</td>
                                    <td style={tdStyle}>
                                        {order.items.map(i => (
                                            <div key={i.id}>{i.qty}x {i.title} {i.variant ? `(${i.variant})` : ''}</div>
                                        ))}
                                    </td>
                                    <td style={{ ...tdStyle, color: 'var(--primary)', fontWeight: 'bold' }}>₹{order.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
    verticalAlign: 'top'
}
