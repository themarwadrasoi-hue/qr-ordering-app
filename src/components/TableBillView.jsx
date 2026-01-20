import React from 'react'

export default function TableBillView({ bill, tableId, onClose, onCallWaiter }) {
    if (!bill || !bill.orders || bill.orders.length === 0) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.9)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div className="glass-panel" style={{
                    maxWidth: '500px',
                    width: '100%',
                    padding: '30px',
                    textAlign: 'center'
                }}>
                    <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Your Bill</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                        No orders yet. Start ordering from the menu!
                    </p>
                    <button onClick={onClose} className="btn btn-primary">
                        Back to Menu
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: 1000,
            overflowY: 'auto',
            padding: '20px'
        }}>
            <div className="glass-panel" style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '30px',
                position: 'relative'
            }}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        color: '#fff',
                        fontSize: '1.5rem',
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    ×
                </button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '10px' }}>
                        THE MARWAD RASOI
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Table {tableId}</p>
                    <div style={{
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                        margin: '20px 0'
                    }} />
                </div>

                {/* Orders */}
                <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ marginBottom: '15px', color: 'var(--text-main)' }}>Order Details</h3>
                    {bill.orders.map((order, orderIdx) => (
                        <div key={order.id} style={{
                            marginBottom: '20px',
                            paddingBottom: '15px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '10px',
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)'
                            }}>
                                <span>Order #{orderIdx + 1}</span>
                                <span>{new Date(order.timestamp).toLocaleTimeString()}</span>
                            </div>
                            {order.items.map((item, itemIdx) => (
                                <div key={itemIdx} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '8px',
                                    paddingLeft: '10px'
                                }}>
                                    <span style={{ color: 'var(--text-main)' }}>
                                        {item.qty}x {item.title}
                                        {item.variant && <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}> ({item.variant})</span>}
                                    </span>
                                    <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>
                                        ₹{(item.price * item.qty).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div style={{
                    background: 'rgba(255, 193, 7, 0.1)',
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                            Total Amount
                        </span>
                        <span style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)' }}>
                            ₹{bill.total.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <button
                        onClick={() => {
                            onCallWaiter()
                            onClose()
                        }}
                        style={{
                            padding: '15px',
                            background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                            color: '#000',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        <span>🔔 Service Please for Payment</span>
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '12px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: 'var(--text-main)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Continue Ordering
                    </button>
                </div>
            </div>
        </div>
    )
}
