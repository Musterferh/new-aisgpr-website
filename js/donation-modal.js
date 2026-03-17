/* African Institute for Strategic Governance and Policy Research — Donation Modal (React + Tailwind) */
const { useState, useEffect, useRef } = React;

const DonationModal = () => {
    const [open, setOpen] = useState(false);
    const [currency, setCurrency] = useState('NGN');
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const customInputRef = useRef(null);

    const ngnAmounts = [
        { label: '₦5,000',  value: 5000  },
        { label: '₦10,000', value: 10000 },
        { label: '₦50,000', value: 50000 },
    ];

    const usdAmounts = [
        { label: '$5',   value: 5   },
        { label: '$10',  value: 10  },
        { label: '$50',  value: 50  },
        { label: '$100', value: 100 },
    ];

    /* Expose open function to vanilla JS */
    useEffect(() => {
        window.openDonationModal = () => setOpen(true);
        return () => { delete window.openDonationModal; };
    }, []);

    /* Reset selections on currency switch */
    useEffect(() => {
        setSelectedAmount(null);
        setCustomAmount('');
    }, [currency]);

    /* Lock body scroll while modal is open */
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const handleClose = () => setOpen(false);
    const amounts = currency === 'NGN' ? ngnAmounts : usdAmounts;
    const symbol  = currency === 'NGN' ? '₦' : '$';

    const selectOther = () => {
        setSelectedAmount(null);
        setCustomAmount('');
        setTimeout(() => customInputRef.current?.focus(), 50);
    };

    const isOtherActive = !selectedAmount && customAmount !== '';

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
            onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl w-full overflow-hidden"
                style={{ maxWidth: '460px', margin: '0 16px', fontFamily: "'Poppins', sans-serif" }}
            >
                {/* ── Header ─────────────────────────────────── */}
                <div style={{ background: 'linear-gradient(135deg, #166534, #16a34a)', padding: '28px 28px 24px', position: 'relative' }}>
                    <button
                        onClick={handleClose}
                        style={{
                            position: 'absolute', top: '16px', right: '16px',
                            background: 'rgba(255,255,255,0.15)', border: 'none',
                            color: '#fff', width: '32px', height: '32px', borderRadius: '50%',
                            cursor: 'pointer', fontSize: '14px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontWeight: 700,
                            transition: 'background .2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                        aria-label="Close"
                    >✕</button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                            width: '52px', height: '52px', borderRadius: '16px',
                            background: 'rgba(255,255,255,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px'
                        }}></div>
                        <div>
                            <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.25rem', margin: 0 }}>
                                Support African Institute for Strategic Governance and Policy Research
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', margin: '2px 0 0' }}>
                                Empowering youth climate action in Bauchi State
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Body ───────────────────────────────────── */}
                <div style={{ padding: '24px 28px 28px' }}>

                    {/* Currency Toggle */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '22px' }}>
                        {['NGN', 'USD'].map(cur => (
                            <button
                                key={cur}
                                onClick={() => setCurrency(cur)}
                                style={{
                                    flex: 1, padding: '13px', borderRadius: '14px',
                                    fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
                                    border: currency === cur ? '2px solid #16a34a' : '2px solid #dcfce7',
                                    background: currency === cur ? '#16a34a' : '#f0fdf4',
                                    color: currency === cur ? '#fff' : '#166534',
                                    transition: 'all .25s',
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', gap: '8px'
                                }}
                            >
                                <span>{cur === 'NGN' ? '' : ''}</span>
                                <span>Donate in {cur}</span>
                            </button>
                        ))}
                    </div>

                    {/* Amount Label */}
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '2px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
                        Select Amount
                    </p>

                    {/* Amount Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                        {amounts.map(amt => (
                            <button
                                key={amt.value}
                                onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                                style={{
                                    padding: '14px', borderRadius: '14px', cursor: 'pointer',
                                    fontWeight: 800, fontSize: '1rem',
                                    border: selectedAmount?.value === amt.value ? '2px solid #16a34a' : '2px solid #dcfce7',
                                    background: selectedAmount?.value === amt.value ? '#16a34a' : '#f0fdf4',
                                    color: selectedAmount?.value === amt.value ? '#fff' : '#166534',
                                    transition: 'all .2s',
                                    transform: selectedAmount?.value === amt.value ? 'scale(1.03)' : 'scale(1)',
                                }}
                            >
                                {amt.label}
                            </button>
                        ))}

                        {/* "Other Amount" button — full width, always last */}
                        <button
                            onClick={selectOther}
                            style={{
                                padding: '14px', borderRadius: '14px', cursor: 'pointer',
                                fontWeight: 700, fontSize: '0.9rem',
                                gridColumn: amounts.length % 2 === 0 ? 'span 2' : 'span 1',
                                border: isOtherActive ? '2px solid #16a34a' : '2px dashed #a7f3d0',
                                background: isOtherActive ? '#f0fdf4' : 'transparent',
                                color: '#16a34a', transition: 'all .2s',
                            }}
                        >
                             Other Amount
                        </button>
                    </div>

                    {/* Custom Amount Input */}
                    <div style={{ position: 'relative', marginBottom: '20px' }}>
                        <span style={{
                            position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                            color: '#6b7280', fontWeight: 600, fontSize: '1rem', pointerEvents: 'none'
                        }}>{symbol}</span>
                        <input
                            ref={customInputRef}
                            type="number"
                            min="1"
                            placeholder="Enter custom amount"
                            value={customAmount}
                            onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                            style={{
                                width: '100%', paddingLeft: '36px', paddingRight: '16px',
                                paddingTop: '13px', paddingBottom: '13px',
                                border: isOtherActive ? '2px solid #16a34a' : '2px solid #dcfce7',
                                borderRadius: '14px', fontSize: '0.95rem', color: '#1f2937',
                                background: '#f0fdf4', outline: 'none',
                                fontFamily: "'Poppins', sans-serif",
                                transition: 'border-color .2s, box-shadow .2s',
                                boxSizing: 'border-box',
                                boxShadow: isOtherActive ? '0 0 0 3px rgba(22,163,74,0.1)' : 'none',
                            }}
                        />
                    </div>

                    {/* Pay Button */}
                    {currency === 'NGN' ? (
                        <a
                            href="#"
                            onClick={e => e.preventDefault()}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                width: '100%', padding: '16px',
                                background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                                color: '#fff', fontWeight: 800, fontSize: '1rem',
                                borderRadius: '16px', textDecoration: 'none',
                                boxShadow: '0 8px 24px rgba(22,163,74,0.35)',
                                transition: 'all .25s', cursor: 'pointer',
                                fontFamily: "'Poppins', sans-serif",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(22,163,74,0.45)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(22,163,74,0.35)'; }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                            Pay with Paystack
                        </a>
                    ) : (
                        <a
                            href="#"
                            onClick={e => e.preventDefault()}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                width: '100%', padding: '16px',
                                background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                                color: '#fff', fontWeight: 800, fontSize: '1rem',
                                borderRadius: '16px', textDecoration: 'none',
                                boxShadow: '0 8px 24px rgba(79,70,229,0.35)',
                                transition: 'all .25s', cursor: 'pointer',
                                fontFamily: "'Poppins', sans-serif",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(79,70,229,0.45)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,70,229,0.35)'; }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                            Pay with Stripe
                        </a>
                    )}

                    {/* Trust note */}
                    <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.75rem', marginTop: '14px', marginBottom: 0 }}>
                         Secure &amp; encrypted — All donations fund Bauchi climate programs
                    </p>
                </div>
            </div>
        </div>
    );
};

/* Mount */
const _donationRoot = ReactDOM.createRoot(document.getElementById('donation-root'));
_donationRoot.render(<DonationModal />);
