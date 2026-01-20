import React, { useState } from 'react'

export default function AdminTableBills({ tableBills, onClearBill }) {
    const [selectedTable, setSelectedTable] = useState(null)
    const [confirmClear, setConfirmClear] = useState(null)

    const tableIds = Object.keys(tableBills).sort((a, b) => a - b)

    if (tableIds.length === 0) {
        return (
            <div style={{
                padding: 'var(--spacing-md)',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
            }}>
                <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Table Bills</h2>
                <p style={{ color: 'var(--text-muted)' }}>No active table bills.</p>
            </div>
        )
    }

    const handleClearBill = (tableId) => {
        if (confirmClear === tableId) {
            onClearBill(tableId)
            setConfirmClear(null)
            setSelectedTable(null)
        } else {
            setConfirmClear(tableId)
            setTimeout(() => setConfirmClear(null), 3000)
        }
    }

    return (
        <div style={{
            padding: 'var(--spacing-md)',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 'var(--radius-md)'
        }}>
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>
                Table Bills ({tableIds.length} Active)
            </h2>

            {/* Grid View */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-lg)'
            }}>
                {tableIds.map(tableId => {
                    const bill = tableBills[tableId]
                    const orderCount = bill.orders.length
                    const lastOrder = bill.orders[bill.orders.length - 1]
                    const timeSinceLastOrder = lastOrder
                        ? Math.floor((Date.now() - lastOrder.timestamp) / 60000)
                        : 0

                    return (
                        <div
                            key={tableId}
                            style={{
                                background: 'var(--bg-card)',
                                border: '2px solid var(--border-subtle)',
                                borderRadius: 'var(--radius-md)',
                                padding: 'var(--spacing-md)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                borderColor: selectedTable === tableId ? 'var(--primary)' : 'var(--border-subtle)'
                            }}
                            onClick={() => setSelectedTable(selectedTable === tableId ? null : tableId)}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '10px'
                            }}>
                                <h3 style={{ color: tableId === 'Delivery' ? 'var(--accent)' : 'var(--primary)', fontSize: '1.5rem', margin: 0 }}>
                                    {tableId === 'Delivery' ? '🚀 DELIVERY' : `Table ${tableId}`}
                                </h3>
                                <span style={{
                                    background: 'rgba(255, 193, 7, 0.2)',
                                    color: 'var(--primary)',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold'
                                }}>
                                    {orderCount} order{orderCount !== 1 ? 's' : ''}
                                </span>
                            </div>

                            <div style={{
                                fontSize: '2rem',
                                fontWeight: '900',
                                color: 'var(--text-main)',
                                marginBottom: '10px'
                            }}>
                                ₹{bill.total.toFixed(2)}
                            </div>

                            <div style={{
                                fontSize: '0.8rem',
                                color: 'var(--text-secondary)',
                                marginBottom: '15px'
                            }}>
                                Last order: {timeSinceLastOrder === 0 ? 'Just now' : `${timeSinceLastOrder}m ago`}
                            </div>

                            {selectedTable === tableId && (
                                <div style={{
                                    borderTop: '1px solid var(--border-subtle)',
                                    paddingTop: '15px',
                                    marginTop: '10px'
                                }}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleClearBill(tableId)
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            background: confirmClear === tableId
                                                ? 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)'
                                                : 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: '0.9rem',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {confirmClear === tableId ? '⚠️ Click Again to Confirm' : '✓ Clear Bill & Reset Table'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Detailed View */}
            {selectedTable && (
                <div style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--primary)'
                }}>
                    <h3 style={{ marginBottom: '15px', color: selectedTable === 'Delivery' ? 'var(--accent)' : 'var(--primary)' }}>
                        {selectedTable === 'Delivery' ? '🚀 DELIVERY ORDER' : `Table ${selectedTable}`} - Detailed Bill
                    </h3>

                    {tableBills[selectedTable].orders.map((order, idx) => (
                        <div
                            key={order.id}
                            style={{
                                marginBottom: '15px',
                                paddingBottom: '15px',
                                borderBottom: idx < tableBills[selectedTable].orders.length - 1
                                    ? '1px solid rgba(255, 255, 255, 0.1)'
                                    : 'none'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)'
                            }}>
                                <span>Order #{idx + 1}</span>
                                <span>{new Date(order.timestamp).toLocaleString()}</span>
                            </div>
                            {order.items.map((item, itemIdx) => (
                                <div
                                    key={itemIdx}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '4px',
                                        paddingLeft: '10px',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <span>
                                        {item.qty}x {item.title}
                                        {item.variant && ` (${item.variant})`}
                                    </span>
                                    <span style={{ fontWeight: '600' }}>₹{(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                            <div style={{
                                textAlign: 'right',
                                marginTop: '8px',
                                paddingTop: '8px',
                                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                fontWeight: 'bold'
                            }}>
                                Order Total: ₹{order.total.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
