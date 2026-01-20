import React, { useState } from 'react'

export default function CartModal({ cart, total, onClose, onPlaceOrder, tableId, whatsappNumber }) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleCheckout = () => {
        setLoading(true)

        // Digital Ordering Logic (via Socket.io in App.jsx)
        setTimeout(() => {
            onPlaceOrder()
            setLoading(false)
            setSuccess(true)
            setTimeout(onClose, 3000)
        }, 1200) // Slight delay for premium feel
    }

    if (success) {
        return (
            <div className="glass" style={{
                position: 'fixed', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(20px)',
                background: 'rgba(0,0,0,0.9)',
                textAlign: 'center',
                padding: '20px'
            }}>
                <div style={{ color: 'var(--primary)', fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>✓</div>
                <h2>Order Placed!</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: '1.6' }}>
                    Thank you for Ordering Food from <strong style={{ color: '#E4B565' }}>THE MARWAD RASOI</strong> be patient your food is preparing.<br />
                    <span>Table {tableId}</span>
                </p>
            </div>
        )
    }

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 110,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            animation: 'fadeIn 0.2s'
        }}>
            <div className="glass" style={{
                width: '100%',
                maxWidth: '600px',
                background: '#121212',
                borderTopLeftRadius: 'var(--radius-lg)',
                borderTopRightRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-md)',
                maxHeight: '80vh',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                    <h3>Your Order (Table {tableId})</h3>
                    <button onClick={onClose} style={{ color: 'var(--text-secondary)' }}>Close</button>
                </div>

                {cart.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>Cart is empty</p>
                ) : (
                    <div style={{ flex: 1 }}>
                        {cart.map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 'var(--spacing-sm)',
                                paddingBottom: 'var(--spacing-sm)',
                                borderBottom: '1px solid var(--border-subtle)'
                            }}>
                                <div>
                                    <div style={{ fontWeight: '500' }}>
                                        {item.title} {item.variant ? `(${item.variant})` : ''} x {item.qty}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>₹{item.price * item.qty}</div>
                                </div>
                                {/* Simplified remove for now */}
                            </div>
                        ))}

                        <div style={{
                            marginTop: 'var(--spacing-md)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            color: 'var(--primary)'
                        }}>
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>
                )}

                {cart.length > 0 && (
                    <button
                        onClick={handleCheckout}
                        disabled={loading}
                        style={{
                            marginTop: 'var(--spacing-lg)',
                            width: '100%',
                            padding: '16px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--primary)',
                            color: '#000',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Confirming...' : 'Place Order'}
                    </button>
                )}
            </div>
        </div>
    )
}
