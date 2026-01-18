import React from 'react'

export default function CategoryTabs({ categories, activeCategory, onSelect }) {
    return (
        <div style={{
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            paddingBottom: 'var(--spacing-sm)',
            marginBottom: 'var(--spacing-md)',
            // Hide scrollbar
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
        }}>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                {categories.map(cat => {
                    const isActive = activeCategory === cat.id
                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelect(cat.id)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: isActive ? '#000' : 'var(--text-secondary)',
                                fontWeight: isActive ? '600' : '400',
                                border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {cat.name}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
