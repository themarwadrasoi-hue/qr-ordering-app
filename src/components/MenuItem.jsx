import React from 'react'

export default function MenuItem({ item, onAdd }) {
    const hasVariants = item.variants && Object.keys(item.variants).length > 0
    const [selectedVariant, setSelectedVariant] = React.useState(hasVariants ? 'half' : null)

    const currentPrice = hasVariants ? item.variants[selectedVariant] : item.price

    const handleAdd = () => {
        onAdd({
            ...item,
            variant: selectedVariant, // 'half' | 'full' | null
            price: currentPrice
        })
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: item.isAvailable ? '1px solid var(--border-subtle)' : '1px solid transparent',
            position: 'relative',
            opacity: item.isAvailable ? 1 : 0.6,
            filter: item.isAvailable ? 'none' : 'grayscale(0.8)'
        }}>
            <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {!item.isAvailable && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold'
                    }}>
                        OUT OF STOCK
                    </div>
                )}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                }} />
            </div>

            <div style={{ padding: 'var(--spacing-md)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-xs)' }}>
                    <h3 style={{ fontSize: '1.125rem' }}>{item.title}</h3>
                    <span style={{ color: 'var(--primary)', fontWeight: '700' }}>₹{currentPrice}</span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 'var(--spacing-md)', flex: 1 }}>
                    {item.desc}
                </p>

                {item.subCategory && (
                    <div style={{
                        alignSelf: 'flex-start',
                        fontSize: '0.7rem',
                        background: 'rgba(255,255,255,0.1)',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        marginBottom: '10px',
                        color: 'var(--primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 'bold'
                    }}>
                        {item.subCategory}
                    </div>
                )}

                {hasVariants && item.isAvailable && (
                    <div style={{
                        display: 'flex',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '4px',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        {Object.keys(item.variants).map(v => (
                            <button
                                key={v}
                                onClick={() => setSelectedVariant(v)}
                                style={{
                                    flex: 1,
                                    padding: '6px',
                                    borderRadius: '4px',
                                    background: selectedVariant === v ? 'var(--primary)' : 'transparent',
                                    color: selectedVariant === v ? '#000' : 'var(--text-secondary)',
                                    fontWeight: '600',
                                    fontSize: '0.85rem',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                )}

                <button
                    onClick={handleAdd}
                    disabled={!item.isAvailable}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: item.isAvailable ? 'var(--primary)' : '#333',
                        border: 'none',
                        color: item.isAvailable ? '#000' : '#888',
                        fontWeight: '700',
                        fontSize: '1rem',
                        transition: 'opacity 0.2s',
                        cursor: item.isAvailable ? 'pointer' : 'not-allowed'
                    }}
                >
                    {item.isAvailable ? 'Add to Order' : 'Unavailable'}
                </button>
            </div>
        </div>
    )
}
