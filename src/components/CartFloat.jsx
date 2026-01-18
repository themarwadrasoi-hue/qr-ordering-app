import React from 'react'

export default function CartFloat({ count, total, onClick }) {
    if (count === 0) return null

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 100,
            pointerEvents: 'none' // wrapper transparent
        }}>
            <button
                onClick={onClick}
                style={{
                    pointerEvents: 'auto',
                    background: 'var(--primary)',
                    color: '#000',
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-full)',
                    boxShadow: '0 10px 25px rgba(212, 175, 55, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontWeight: '700',
                    fontSize: '1rem',
                    minWidth: '200px',
                    justifyContent: 'space-between',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <span style={{
                    background: 'rgba(0,0,0,0.1)',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem'
                }}>{count}</span>

                <span>View Order</span>

                <span>₹{total}</span>
            </button>
        </div>
    )
}
