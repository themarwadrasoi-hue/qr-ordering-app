import React, { useEffect, useRef, useState } from 'react'

export default function WaiterCallNotification({ calls, onAcknowledge }) {
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
        if (calls && calls.length > 0) {
            playSound();
            // Vibrate if supported
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200, 100, 200])
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
            }
        }
    }, [calls])

    if (!calls || calls.length === 0) return null

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
            padding: '20px',
            overflowY: 'auto'
        }}>
            {/* Audio Element */}
            <audio ref={audioRef} loop autoPlay>
                {/* Louder Emergency Alarm Sound */}
                <source src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" type="audio/mpeg" />
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

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{
                    fontSize: '4rem',
                    animation: 'ringBell 0.8s infinite',
                    display: 'inline-block'
                }}>🔔</div>
                <h1 style={{ color: '#ffc107', fontSize: '2.5rem', fontWeight: '900', margin: '10px 0' }}>
                    SERVICE REQUEST ALERT
                </h1>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                width: '100%',
                maxWidth: '1200px'
            }}>
                {calls.map((call) => (
                    <div
                        key={call.tableId}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '30px',
                            borderRadius: '20px',
                            border: '2px solid var(--primary)',
                            textAlign: 'center',
                            boxShadow: '0 10px 40px rgba(255,193,7,0.1)',
                            animation: 'popIn 0.3s ease'
                        }}
                    >
                        <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '10px' }}>
                            Table {call.tableId}
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>
                            Calling since {new Date(call.timestamp).toLocaleTimeString()}
                        </p>
                        <button
                            onClick={() => onAcknowledge(call.tableId)}
                            style={{
                                padding: '15px 40px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                width: '100%'
                            }}
                        >
                            Acknowledge
                        </button>
                    </div>
                ))}
            </div>

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
                @keyframes popIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    )
}
