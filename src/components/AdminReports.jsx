import React from 'react'

export default function AdminReports({ history }) {
    // Calculate Totals
    const today = new Date().toDateString()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    // Filter for Today's sales
    const todaysOrders = history.filter(o => new Date(o.completedAt).toDateString() === today)

    // Filter for This Month's sales
    const thisMonthOrders = history.filter(o => {
        const orderDate = new Date(o.completedAt)
        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear
    })

    const totalSales = todaysOrders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = todaysOrders.length

    const monthlyTotalSales = thisMonthOrders.reduce((sum, order) => sum + order.total, 0)
    const monthlyTotalOrders = thisMonthOrders.length
    const monthlyAvgOrder = monthlyTotalOrders > 0 ? monthlyTotalSales / monthlyTotalOrders : 0

    // Get month name
    const monthName = new Date().toLocaleString('default', { month: 'long' })

    return (
        <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Sales Reports</h2>

            {/* Daily Summary Cards */}
            <h3 style={{ marginBottom: '15px', color: 'var(--text-secondary)', fontSize: '1rem' }}>📅 Today's Summary</h3>
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

            {/* Monthly Summary Cards */}
            <h3 style={{ marginBottom: '15px', color: 'var(--text-secondary)', fontSize: '1rem' }}>📊 {monthName} {currentYear} Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', opacity: 0.9 }}>MONTHLY SALES</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>₹{monthlyTotalSales.toLocaleString()}</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#fff', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', opacity: 0.9 }}>MONTHLY ORDERS</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{monthlyTotalOrders}</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: '#000', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', opacity: 0.8 }}>AVG ORDER VALUE</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>₹{Math.round(monthlyAvgOrder)}</div>
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
                                <th style={thStyle}>Location</th>
                                <th style={thStyle}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Show newest first */}
                            {[...history].reverse().map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={tdStyle}>{new Date(order.completedAt || order.timestamp).toLocaleTimeString()}</td>
                                    <td style={tdStyle}>{order.tableId === 'Delivery' ? '🚀 DELIVERY' : order.tableId}</td>
                                    <td style={tdStyle}>
                                        {order.items.map(i => (
                                            <div key={i.id}>{i.qty}x {i.title} {i.variant ? `(${i.variant})` : ''}</div>
                                        ))}
                                    </td>
                                    <td style={tdStyle}>
                                        {order.location ? (
                                            <div style={{ fontSize: '0.85rem' }}>
                                                <div style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                                    📍 {order.location.latitude.toFixed(6)}, {order.location.longitude.toFixed(6)}
                                                </div>
                                                <a
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${order.location.latitude},${order.location.longitude}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        color: 'var(--primary)',
                                                        textDecoration: 'none',
                                                        fontSize: '0.8rem',
                                                        display: 'inline-block',
                                                        padding: '4px 8px',
                                                        background: 'rgba(255, 193, 7, 0.1)',
                                                        borderRadius: '4px',
                                                        border: '1px solid var(--primary)'
                                                    }}
                                                >
                                                    🗺️ View on Map
                                                </a>
                                            </div>
                                        ) : (
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>-</span>
                                        )}
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
