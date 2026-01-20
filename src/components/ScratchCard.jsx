import React, { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function ScratchCard({ amount, onClose, onSave }) {
    const [isRevealed, setIsRevealed] = useState(false)
    const [couponCode, setCouponCode] = useState('')
    const [discount, setDiscount] = useState(0)

    // Determine reward based on amount
    useEffect(() => {
        let disc = 0
        if (amount > 2500) disc = 30
        else if (amount > 1500) disc = 20
        else if (amount > 500) disc = 10

        setDiscount(disc)
        setCouponCode(`SAVE${disc}NOW`)
    }, [amount])

    const handleReveal = () => {
        setIsRevealed(true)
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })

        // Save to local storage for next visit ordering
        const couponData = {
            code: `SAVE${discount}NOW`,
            discount: discount,
            expires: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days validity
        }
        localStorage.setItem('nextVisitCoupon', JSON.stringify(couponData))
        if (onSave) onSave(couponData)
    }

    if (discount === 0) return null // No reward for small orders

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            padding: '20px'
        }}>
            <h2 style={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
                🎉 Bill Paid Successfully!
            </h2>

            <div style={{
                width: '100%', maxWidth: '320px',
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                position: 'relative'
            }}>
                {/* Header */}
                <div style={{ background: 'var(--primary)', padding: '15px', textAlign: 'center' }}>
                    <h3 style={{ margin: 0, color: '#000' }}>You won a Reward!</h3>
                    <p style={{ margin: '5px 0 0', opacity: 0.8, fontSize: '0.9rem', color: '#000' }}>
                        For your order of ₹{amount}
                    </p>
                </div>

                {/* Content */}
                <div style={{ padding: '30px 20px', textAlign: 'center', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ color: '#E91E63', fontSize: '3.5rem', margin: 0 }}>{discount}% OFF</h1>
                    <p style={{ color: '#666', marginBottom: '10px' }}>ON YOUR NEXT VISIT</p>
                    <div style={{
                        background: '#eee', padding: '8px 15px',
                        borderRadius: '4px', letterSpacing: '2px',
                        fontWeight: 'bold', border: '1px dashed #999'
                    }}>
                        CODE: {couponCode}
                    </div>
                </div>

                {/* Scratch Overlay */}
                {!isRevealed && (
                    <div
                        onClick={handleReveal}
                        style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(45deg, #FFC107, #F44336)',
                            display: 'flex', flexDirection: 'column',
                            justifyContent: 'center', alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'opacity 0.5s ease'
                        }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎁</div>
                        <h2 style={{ color: '#fff', margin: 0 }}>Tap to Reveal</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Mystery Coupon Inside!</p>
                    </div>
                )}
            </div>

            {isRevealed && (
                <button
                    onClick={onClose}
                    style={{
                        marginTop: '30px',
                        background: 'transparent',
                        border: '2px solid #fff',
                        color: '#fff',
                        padding: '12px 30px',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Close & Continue
                </button>
            )}
        </div>
    )
}
