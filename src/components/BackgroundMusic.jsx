import React, { useState, useRef, useEffect } from 'react'

export default function BackgroundMusic({ isPlaying = true, src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }) {
    const [muted, setMuted] = useState(false)
    const [userInteracted, setUserInteracted] = useState(false)
    const audioRef = useRef(null)

    // Suggestion: Replace this URL with your own hosted MP3 for specific taste
    // Current: "SoundHelix Song 1" (Placeholder)
    const MUSIC_URL = src

    useEffect(() => {
        // Attempt auto-play on mount
        if (audioRef.current && isPlaying && !muted) {
            // Low volume for background
            audioRef.current.volume = 0.2
            const playPromise = audioRef.current.play()

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Auto-play prevented (User interaction needed):", error)
                    // We don't force it, just wait for interaction
                })
            }
        } else if (audioRef.current) {
            audioRef.current.pause()
        }
    }, [isPlaying, muted])

    // Handle User Interaction to unlock Audio Context
    useEffect(() => {
        const unlockAudio = () => {
            if (!userInteracted) {
                setUserInteracted(true)
                if (audioRef.current && isPlaying && !muted) {
                    audioRef.current.play().catch(e => console.log("Play error", e))
                }
            }
        }

        window.addEventListener('click', unlockAudio)
        return () => window.removeEventListener('click', unlockAudio)
    }, [userInteracted, isPlaying, muted])

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 9999, // Above most things
        }}>
            <audio ref={audioRef} loop src={MUSIC_URL} />

            <button
                onClick={() => setMuted(!muted)}
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: muted ? 'rgba(0,0,0,0.6)' : 'var(--primary)',
                    color: muted ? '#aaa' : '#000',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    transition: 'all 0.3s ease'
                }}
                title={muted ? "Unmute Music" : "Mute Music"}
            >
                {muted ? '🔇' : '🎵'}
            </button>
        </div>
    )
}
