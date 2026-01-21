import React, { useState, useEffect } from 'react'

export default function CallWaiterButton({ tableId, socket, onCallPlaced, serviceNumbers }) {
    const [isCalling, setIsCalling] = useState(false)
    const [acknowledged, setAcknowledged] = useState(false)

    useEffect(() => {
        if (!socket) return

        // Listen for acknowledgment from waiter
        socket.on('waiter-call-acknowledged', (data) => {
            if (data.tableId === tableId) {
                setIsCalling(false)
                setAcknowledged(true)
                setTimeout(() => setAcknowledged(false), 3000)
            }
        })

        return () => {
            socket.off('waiter-call-acknowledged')
        }
    }, [socket, tableId])

    const handleCallWaiter = () => {
        if (isCalling || !socket) return

        setIsCalling(true)

        // IMPORTANT: Emit to socket for Admin Panel Audio
        if (socket) {
            socket.emit('call-waiter', { tableId: tableId, timestamp: Date.now() });
        }

        if (onCallPlaced) onCallPlaced()

        // Auto-reset after 30 seconds if not acknowledged
        setTimeout(() => {
            setIsCalling(false)
        }, 30000)
    }

    if (acknowledged) {
        return (
            <div style={{
                position: 'fixed',
                bottom: '100px',
                right: '20px',
                background: '#4caf50',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '50px',
                fontWeight: 'bold',
                boxShadow: '0 4px 20px rgba(76, 175, 80, 0.4)',
                zIndex: 999,
                animation: 'popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <span style={{ fontSize: '1.2rem' }}>✓</span>
                <span>Service Coming!</span>
            </div>
        )
    }

    return (
        <button
            onClick={handleCallWaiter}
            disabled={isCalling}
            style={{
                position: 'fixed',
                bottom: '100px',
                right: '20px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: isCalling
                    ? 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)'
                    : 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                border: 'none',
                color: '#000',
                fontSize: '1.8rem',
                cursor: isCalling ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(255, 193, 7, 0.4)',
                zIndex: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                animation: isCalling ? 'pulse 1.5s infinite' : 'none',
                opacity: isCalling ? 0.8 : 1
            }}
        >
            {isCalling ? '⏳' : '🔔'}
        </button>
    )
}
