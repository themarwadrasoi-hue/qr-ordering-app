import React, { useState } from 'react'

export default function AdminReports({ history }) {
    const [filter, setFilter] = useState('today') // 'today' | 'yesterday' | 'week' | 'month' | 'all'

    // Helper to filter history based on selection
    const getFilteredHistory = () => {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
        const yesterday = today - (24 * 60 * 60 * 1000)
        const lastWeek = today - (7 * 24 * 60 * 60 * 1000)
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).getTime()

        return history.filter(o => {
            const time = new Date(o.completedAt || o.timestamp).getTime()
            if (filter === 'today') return time >= today
            if (filter === 'yesterday') return time >= yesterday && time < today
            if (filter === 'week') return time >= lastWeek
            if (filter === 'month') return time >= lastMonth
            return true
        })
    }

    const filteredHistory = getFilteredHistory()

    // Calculate Totals for filtered data
    const totalSales = filteredHistory.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = filteredHistory.length

    // Item Breakdown
    const getItemBreakdown = () => {
        const stats = {}
        filteredHistory.forEach(order => {
            order.items.forEach(item => {
                const key = `${item.title}${item.variant ? ` (${item.variant})` : ''}`
                if (!stats[key]) {
                    stats[key] = { qty: 0, revenue: 0 }
                }
                stats[key].qty += item.qty
                stats[key].revenue += (item.price * item.qty)
            })
        })
        return Object.entries(stats).sort((a, b) => b[1].qty - a[1].qty)
    }

    const itemBreakdown = getItemBreakdown()

    const exportToJSON = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2))
        const downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute("href", dataStr)
        downloadAnchorNode.setAttribute("download", `sales_report_${new Date().toISOString().split('T')[0]}.json`)
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)', flexWrap: 'wrap', gap: '15px' }}>
                <h2 style={{ margin: 0 }}>Sales Reports (Full Details)</h2>
                <div style={{ display: 'flex', gap: '10px' }} className="no-print">
                    <button onClick={exportToJSON} style={actionBtnStyle('#2196F3')}>📥 Export JSON</button>
                    <button onClick={handlePrint} style={actionBtnStyle('var(--primary)', '#000')}>🖨️ Print Report</button>
                </div>
            </div>

            {/* Date Filtering */}
            <div className="no-print" style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '5px' }}>
                {['today', 'yesterday', 'week', 'month', 'all'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '8px 16px',
                            background: filter === f ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            color: filter === f ? '#000' : '#fff',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            textTransform: 'capitalize'
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Summary Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ background: 'var(--primary)', color: '#000', padding: '20px', borderRadius: '12px', boxShadow: '0 8px 32px rgba(255, 183, 3, 0.2)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', opacity: 0.8 }}>TOTAL SALES ({filter.toUpperCase()})</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>₹{totalSales.toLocaleString()}</div>
                </div>
                <div style={{ background: '#333', color: '#fff', padding: '20px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', opacity: 0.8 }}>ORDERS COUNT</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{totalOrders}</div>
                </div>
            </div>

            {/* Item Breakdown */}
            {itemBreakdown.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>📦 Item-wise Performance</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                        {itemBreakdown.map(([item, stats]) => (
                            <div key={item} style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                                <div style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>{item}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    <span>Quantity: <strong>{stats.qty}</strong></span>
                                    <span>Revenue: <strong style={{ color: 'var(--primary)' }}>₹{stats.revenue}</strong></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Detailed History Table */}
            <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>📜 Detailed Transaction Logs</h3>
            {filteredHistory.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No records found for this period.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={thStyle}>Date & Time</th>
                                <th style={thStyle}>Table / Type</th>
                                <th style={thStyle}>Detailed Items List</th>
                                <th style={thStyle}>Location Info</th>
                                <th style={thStyle}>Final Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...filteredHistory].reverse().map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={tdStyle}>
                                        <div style={{ fontWeight: 'bold' }}>{new Date(order.completedAt || order.timestamp).toLocaleDateString()}</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{new Date(order.completedAt || order.timestamp).toLocaleTimeString()}</div>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            display: 'inline-block',
                                            background: order.tableId === 'Delivery' ? 'rgba(33, 158, 188, 0.2)' : 'rgba(255, 183, 3, 0.1)',
                                            color: order.tableId === 'Delivery' ? 'var(--accent)' : 'var(--primary)',
                                            fontWeight: 'bold'
                                        }}>
                                            {order.tableId === 'Delivery' ? '🚀 DELIVERY' : `Table ${order.tableId}`}
                                        </div>
                                    </td>
                                    <td style={tdStyle}>
                                        {order.items.map((i, idx) => (
                                            <div key={idx} style={{ marginBottom: '4px' }}>
                                                • {i.qty}x {i.title} {i.variant ? <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>({i.variant})</span> : ''}
                                                <span style={{ float: 'right', display: 'none' }}>₹{i.price * i.qty}</span>
                                            </div>
                                        ))}
                                    </td>
                                    <td style={tdStyle}>
                                        {order.location ? (
                                            <div>
                                                <a
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${order.location.latitude},${order.location.longitude}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}
                                                >
                                                    📍 Track Map
                                                </a>
                                            </div>
                                        ) : <span style={{ opacity: 0.5 }}>-</span>}
                                    </td>
                                    <td style={{ ...tdStyle, color: 'var(--primary)', fontWeight: '900', fontSize: '1.1rem' }}>₹{order.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; color: black !important; }
                    table th, table td { color: black !important; border-bottom: 1px solid #ddd !important; }
                }
            `}</style>
        </div>
    )
}

const actionBtnStyle = (bg, color = '#fff') => ({
    padding: '8px 16px',
    background: bg,
    color,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
})

const thStyle = {
    padding: '12px',
    color: 'var(--text-secondary)',
    fontWeight: '600'
}

const tdStyle = {
    padding: '12px',
    verticalAlign: 'top',
    borderBottom: '1px solid rgba(255,255,255,0.05)'
}
