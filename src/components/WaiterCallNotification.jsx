import React, { useEffect, useRef } from 'react'

export default function WaiterCallNotification({ call, onAcknowledge }) {
    const audioRef = useRef(null)

    useEffect(() => {
        if (call) {
            // Play ringtone
            if (audioRef.current) {
                audioRef.current.play().catch(err => {
                    console.log('Audio play failed:', err)
                })
            }

            // Vibrate if supported
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200, 100, 200])
            }
        }
    }, [call])

    if (!call) return null

    const handleAcknowledge = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }
        onAcknowledge(call.tableId)
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease'
        }}>
            {/* Audio Element */}
            <audio ref={audioRef} loop>
                <source src="https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3" type="audio/mpeg" />
            </audio>

            {/* Bell Icon Animation */}
            <div style={{
                fontSize: '8rem',
                marginBottom: '30px',
                animation: 'ringBell 0.8s infinite'
            }}>
                🔔
            </div>

            {/* Table Number */}
            <h1 style={{
                fontSize: '3rem',
                color: '#ffc107',
                marginBottom: '20px',
                fontWeight: '900',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(255, 193, 7, 0.5)'
            }}>
                Table {call.tableId}
            </h1>

            <p style={{
                fontSize: '1.5rem',
                color: '#fff',
                marginBottom: '40px',
                textAlign: 'center'
            }}>
                is calling for service
            </p>

            {/* Time */}
            <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '40px'
            }}>
                {new Date(call.timestamp).toLocaleTimeString()}
            </p>

            {/* Acknowledge Button */}
            <button
                onClick={handleAcknowledge}
                style={{
                    padding: '20px 60px',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 30px rgba(76, 175, 80, 0.4)',
                    transition: 'all 0.3s ease',
                    animation: 'pulse 2s infinite'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(76, 175, 80, 0.6)'
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(76, 175, 80, 0.4)'
                }}
            >
                ✓ Acknowledge
            </button>

            <style>{`
        @keyframes ringBell {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
        </div>
    )
}
