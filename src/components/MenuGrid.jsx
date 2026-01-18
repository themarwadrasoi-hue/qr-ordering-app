import React from 'react'
import MenuItem from './MenuItem'

export default function MenuGrid({ items, onAdd }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--spacing-md)'
        }}>
            {items.map(item => (
                <MenuItem key={item.id} item={item} onAdd={onAdd} />
            ))}
        </div>
    )
}
