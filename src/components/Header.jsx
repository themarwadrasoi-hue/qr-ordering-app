import React from 'react'

export default function Header({ tableId = '15' }) {
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
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>THE MARWAD RASOI</h2>
                </div>

                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Table</span>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{tableId || '--'}</span>
                </div>
            </div>
        </header>
    )
}
