import React from 'react'
import MenuItem from './MenuItem'

export default function MenuGrid({ items, onAdd }) {
    return (
        <div className="menu-grid">
            {items.map(item => (
                <MenuItem key={item.id} item={item} onAdd={onAdd} />
            ))}
        </div>
    )
}
