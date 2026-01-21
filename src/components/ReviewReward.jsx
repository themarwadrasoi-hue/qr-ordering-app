import React, { useState } from 'react'
import confetti from 'canvas-confetti'

export default function ReviewReward({ onClose, restaurantName = "THE MARWAD FOOD ORDERING SYSTEM" }) {
    const [rating, setRating] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    // Replace with your actual Google Review Link
    const googleReviewLink = "https://g.page/r/YOUR_REVIEW_LINK_HERE/review"

    const handleRating = (stars) => {
        setRating(stars)
        if (stars >= 3) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFB703', '#FFFFFF', '#FB8500']
            })
        }
    }

    const getDiscountMessage = () => {
        if (rating === 3) return "💖 10% OFF on your next visit!"
        if (rating === 4) return "🔥 15% OFF on your next visit!"
        if (rating === 5) return "👑 20% OFF on your next visit!"
        return "Thank you for your feedback!"
    }

    if (submitted) {
        return (
            <div style={modalOverlayStyle}>
                <div className="glass-panel" style={modalContentStyle}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💝</div>
                    <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Coupon Saved!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.6' }}>
                        We've noted your reward. Simply show your rating to the manager on your next visit to claim your discount.
                    </p>
                    <button onClick={onClose} style={actionButtonStyle('#333', '#fff')}>Close</button>
                </div>
            </div>
        )
    }

    return (
        <div style={modalOverlayStyle}>
            <div className="glass-panel" style={modalContentStyle}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🌟</div>
                <h2 style={{ marginBottom: '10px' }}>Rate Your Experience</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                    How was your food at {restaurantName}?
                </p>

                {/* Star Rating Interface */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => handleRating(star)}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '2.5rem',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                transform: rating >= star ? 'scale(1.2)' : 'scale(1)',
                                filter: rating >= star ? 'grayscale(0)' : 'grayscale(1)',
                                opacity: rating >= star ? 1 : 0.4
                            }}
                        >
                            ⭐
                        </button>
                    ))}
                </div>

                {rating > 0 && (
                    <div style={{
                        animation: 'fadeIn 0.3s ease-out',
                        background: 'rgba(255, 183, 3, 0.1)',
                        padding: '15px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        border: '1px dashed var(--primary)'
                    }}>
                        <div style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.1rem' }}>
                            {getDiscountMessage()}
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {rating >= 3 && (
                        <a
                            href={googleReviewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setSubmitted(true)}
                            style={{
                                ...actionButtonStyle('var(--primary)', '#000'),
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            <span>✍️ Post Review on Google</span>
                        </a>
                    )}

                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    )
}

const modalOverlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.9)',
    backdropFilter: 'blur(10px)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
}

const modalContentStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '40px 20px',
    textAlign: 'center',
    background: '#1a1a1a',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.1)'
}

const actionButtonStyle = (bg, color) => ({
    padding: '16px 24px',
    background: bg,
    color: color,
    border: 'none',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s'
})
