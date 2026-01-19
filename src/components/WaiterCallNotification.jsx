import React, { useEffect, useRef, useState } from 'react'

export default function WaiterCallNotification({ call, onAcknowledge }) {
    const audioRef = useRef(null)
    const [isAudioBlocked, setIsAudioBlocked] = useState(false)

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.volume = 1.0;
            audioRef.current.play()
                .then(() => setIsAudioBlocked(false))
                .catch(err => {
                    console.log('Audio play blocked:', err)
                    setIsAudioBlocked(true)
                })
        }
    }

    useEffect(() => {
        if (call) {
            playSound();

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
            animation: 'fadeIn 0.3s ease',
            padding: '20px'
        }}>
            {/* Audio Element */}
            <audio ref={audioRef} loop autoPlay>
                <source src="https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3" type="audio/mpeg" />
            </audio>

            {isAudioBlocked && (
                <div
                    onClick={playSound}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        background: '#ffc107',
                        color: '#000',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                        animation: 'pulse 1s infinite',
                        zIndex: 11000
                    }}
                >
                    ⚠️ Click here to enable sound
                </div>
            )}

            {/* Bell Icon Animation */}
            <div style={{
                fontSize: 'clamp(5rem, 15vw, 8rem)',
                marginBottom: '30px',
                animation: 'ringBell 0.8s infinite'
            }}>
                🔔
            </div>

            {/* Table Number */}
            <h1 style={{
                fontSize: 'clamp(2rem, 8vw, 4rem)',
                color: '#ffc107',
                marginBottom: '10px',
                fontWeight: '900',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(255, 193, 7, 0.5)'
            }}>
                Table {call.tableId}
            </h1>

            <p style={{
                fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                color: '#fff',
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                is calling for service
            </p>

            {/* Time */}
            <p style={{
                fontSize: '0.9rem',
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
