import React from 'react'
import QRCode from 'react-qr-code'

export default function AdminQRGenerator({ restaurantLocation, onUpdateRestaurantLocation }) {
    const tables = Array.from({ length: 20 }, (_, i) => i + 1)
    const [baseUrl, setBaseUrl] = React.useState(window.location.origin)

    // Update base URL if current location changes (or on mount)
    React.useEffect(() => {
        setBaseUrl(window.location.origin)
    }, [])

    const handlePrint = () => {
        window.print()
    }

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

    return (
        <div className="container">
            <div className="no-print" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-lg)',
                padding: 'var(--spacing-md)',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 'var(--radius-md)',
                flexDirection: 'column',
                gap: '12px'
            }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '4px' }}>
                            📍 Restaurant Center Point
                        </div>
                        <div style={{ color: restaurantLocation ? '#4CAF50' : '#FF9800', fontWeight: 'bold' }}>
                            {restaurantLocation
                                ? `${restaurantLocation.latitude.toFixed(6)}, ${restaurantLocation.longitude.toFixed(6)}`
                                : 'Not Set (1KM limit disabled)'}
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                    (pos) => onUpdateRestaurantLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
                                    (err) => alert("Could not get location: " + err.message)
                                )
                            }
                        }}
                        style={{
                            background: 'var(--accent)',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        Set Current Location as Restaurant Center
                    </button>
                </div>

                <div style={{ width: '100%', borderTop: '1px solid var(--border-subtle)', margin: '10px 0' }}></div>

                <div style={{ width: '100%', marginBottom: '10px' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px', fontSize: '0.9rem' }}>
                        Base URL (Scan Link Destination)
                    </label>
                    <input
                        type="text"
                        value={baseUrl}
                        onChange={(e) => setBaseUrl(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: 'rgba(0,0,0,0.3)',
                            border: '1px solid var(--border)',
                            color: '#fff',
                            borderRadius: 'var(--radius-sm)'
                        }}
                    />
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ color: 'var(--primary)', margin: 0 }}>Table QR Codes (1-20)</h2>
                    <button
                        onClick={handlePrint}
                        style={{
                            background: 'var(--primary)',
                            color: '#000',
                            fontWeight: '700',
                            padding: '10px 20px',
                            borderRadius: 'var(--radius-sm)'
                        }}
                    >
                        Print All QRs
                    </button>
                </div>
                {isLocalhost && (
                    <div style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255, 152, 0, 0.1)',
                        border: '1px solid #ff9800',
                        borderRadius: '8px',
                        color: '#ff9800',
                        fontSize: '0.9rem'
                    }}>
                        ⚠️ <strong>Warning:</strong> You are viewing this on <code>localhost</code>.
                        <br />
                        For functional QR codes, please paste your <strong>Public Link</strong> (ending in .life, .net etc) into the "Base URL" box above.
                    </div>
                )}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '40px',
                justifyItems: 'center'
            }}>
                {/* TEST QR CARD */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '12px',
                    color: '#000',
                    border: '4px solid #f44336',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '-25px',
                        background: '#f44336',
                        color: 'white',
                        padding: '5px 30px',
                        transform: 'rotate(-45deg)',
                        fontSize: '0.7rem',
                        fontWeight: 'bold'
                    }}>FOR TESTING</div>
                    <QRCode
                        value={`${baseUrl}/?table=TEST`}
                        size={180}
                        fgColor="#000000"
                        bgColor="#ffffff"
                    />
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: '#f44336' }}>TEST QR</div>
                        <div style={{ fontSize: '0.6rem', color: '#666', marginTop: '4px', maxWidth: '180px', wordBreak: 'break-all' }}>
                            {baseUrl}/?table=TEST
                        </div>
                    </div>
                </div>

                {/* DELIVERY QR CARD */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '12px',
                    color: '#000',
                    border: '4px solid var(--accent)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '-25px',
                        background: 'var(--accent)',
                        color: 'white',
                        padding: '5px 30px',
                        transform: 'rotate(-45deg)',
                        fontSize: '0.7rem',
                        fontWeight: 'bold'
                    }}>DELIVERY</div>
                    <QRCode
                        value={`${baseUrl}/?table=Delivery`}
                        size={180}
                        fgColor="#000000"
                        bgColor="#ffffff"
                    />
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>DELIVERY QR</div>
                        <div style={{ fontSize: '0.6rem', color: '#666', marginTop: '4px', maxWidth: '180px', wordBreak: 'break-all' }}>
                            {baseUrl}/?table=Delivery
                        </div>
                    </div>
                </div>

                {tables.map(id => {
                    const targetUrl = `${baseUrl}/?table=${id}`
                    return (
                        <div key={id} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '20px',
                            background: '#fff',
                            borderRadius: '12px',
                            color: '#000',
                            border: '2px solid #000'
                        }}>
                            <QRCode
                                value={targetUrl}
                                size={180}
                                fgColor="#000000"
                                bgColor="#ffffff"
                            />
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>TABLE {id}</div>
                                <div style={{ fontSize: '0.6rem', color: '#666', marginTop: '4px', maxWidth: '180px', wordBreak: 'break-all' }}>
                                    {targetUrl}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; color: #000 !important; }
          .glass { display: none !important; } /* Hide sticky header if present in parent */
          .container { max-width: 100% !important; padding: 0 !important; }
        }
      `}</style>
        </div>
    )
}
