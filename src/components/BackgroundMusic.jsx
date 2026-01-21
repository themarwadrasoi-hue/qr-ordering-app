import React, { useState, useRef, useEffect } from 'react'

export default function BackgroundMusic({ isPlaying = true, playlist = ["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"] }) {
    const [muted, setMuted] = useState(false)
    const [hasBegan, setHasBegan] = useState(false)
    const [isActuallyPlaying, setIsActuallyPlaying] = useState(false)
    const audioRef = useRef(null)
    const playlistRef = useRef(playlist)

    // Select a random song once
    const [currentSrc] = useState(() => {
        const list = playlistRef.current || []
        return list[Math.floor(Math.random() * list.length)]
    })

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        audio.volume = 0.1

        const handlePlay = () => setIsActuallyPlaying(true)
        const handlePause = () => setIsActuallyPlaying(false)

        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)

        if (isPlaying && !muted && hasBegan) {
            audio.play().catch(e => console.log("Playback failed", e))
        } else {
            audio.pause()
        }

        return () => {
            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('pause', handlePause)
        }
    }, [isPlaying, muted, hasBegan])

    // Global listener to unlock audio on first interaction
    useEffect(() => {
        const unlock = () => {
            if (!hasBegan) {
                setHasBegan(true)
                // Remove listener after first interaction
                window.removeEventListener('pointerdown', unlock)
                window.removeEventListener('keydown', unlock)
            }
        }
        window.addEventListener('pointerdown', unlock)
        window.addEventListener('keydown', unlock)
        return () => {
            window.removeEventListener('pointerdown', unlock)
            window.removeEventListener('keydown', unlock)
        }
    }, [hasBegan])

    return (
        <div style={{
            position: 'fixed',
            bottom: '25px',
            left: '25px',
            zIndex: 10001,
        }}>
            <audio ref={audioRef} loop src={currentSrc} />

            <button
                onClick={() => {
                    setHasBegan(true)
                    setMuted(!muted)
                }}
                className={!isActuallyPlaying && isPlaying ? "pulse-audio" : ""}
                style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: muted || !isActuallyPlaying ? 'rgba(0,0,0,0.8)' : 'var(--primary)',
                    color: muted || !isActuallyPlaying ? '#888' : '#000',
                    border: '2px solid rgba(255,255,255,0.1)',
                    boxShadow: isActuallyPlaying ? '0 0 20px var(--primary-glow)' : '0 4px 15px rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                {muted || !isActuallyPlaying ? '🔇' : '🎵'}
            </button>

            <style>{`
                @keyframes audioPulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 var(--primary-glow); }
                    50% { transform: scale(1.1); box-shadow: 0 0 0 15px rgba(255,183,3,0); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,183,3,0); }
                }
                .pulse-audio {
                    animation: audioPulse 2s infinite;
                    background: var(--primary) !important;
                    color: #000 !important;
                }
            `}</style>
        </div>
    )
}
