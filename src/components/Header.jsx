import React from 'react'

export default function Header({ tableId = '15', total = 0, onViewBill, onSwitchMenu }) {
    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            padding: 'var(--spacing-md) 0',
            marginBottom: 'var(--spacing-md)'
        }} className="glass">
            <div className="container" style={{ paddingBottom: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 onClick={onSwitchMenu} style={{ fontSize: '1rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0, cursor: 'pointer' }}>THE MARWAD FOOD ORDERING SYSTEM</h2>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {total > 0 && (
                        <button
                            onClick={onViewBill}
                            style={{
                                background: 'rgba(255, 193, 7, 0.15)',
                                color: 'var(--primary)',
                                border: '1px solid var(--primary)',
                                padding: '6px 12px',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 193, 7, 0.25)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 193, 7, 0.15)'}
                        >
                            Bill: ₹{total.toFixed(0)}
                        </button>
                    )}

                    <button
                        onClick={onSwitchMenu}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '6px 10px',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        🔄 Switch
                    </button>

                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {tableId === 'Delivery' ? 'Mode' : 'Table'}
                        </span>
                        <span style={{ fontWeight: '700', color: tableId === 'Delivery' ? 'var(--primary)' : 'var(--text-primary)' }}>
                            {tableId === 'Delivery' ? 'DELIVERY' : (tableId || '--')}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}
