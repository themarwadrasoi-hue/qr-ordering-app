import React from 'react'

export default function AdminOrderCard({ order, onComplete }) {
    const timeStr = new Date(order.timestamp).toLocaleTimeString()

    return (
        <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-md)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                <h3 style={{ color: 'var(--primary)' }}>Table {order.tableId}</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{timeStr}</span>
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--spacing-sm)' }}>
                {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>{item.qty}x {item.title} {item.variant ? `(${item.variant})` : ''}</span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>₹{order.total}</span>
                <button
                    onClick={() => onComplete(order.id)}
                    style={{
                        background: 'var(--accent)',
                        color: '#fff',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.875rem'
                    }}
                >
                    Complete
                </button>
            </div>
        </div>
    )
}
