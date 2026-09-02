import { useState } from 'react'

const colors = [
  { name: 'Ink', hex: '#1C1917', token: '--color-ink', dark: true },
  { name: 'Ink Mid', hex: '#6B6460', token: '--color-ink-mid', dark: true },
  { name: 'Sage', hex: '#6B7C65', token: '--color-sage', dark: true },
  { name: 'Sage Light', hex: '#E8EDE7', token: '--color-sage-light', dark: false },
  { name: 'Parchment', hex: '#EDE8DF', token: '--color-parchment', dark: false },
  { name: 'White', hex: '#FAF8F5', token: '--color-white', dark: false },
]

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '32px', paddingBottom: '12px', borderBottom: '1px solid var(--color-rule)' }}>
      <span style={{ fontSize: '11px', color: 'var(--color-ink-mid)', letterSpacing: '0.12em', fontWeight: 500 }}>{n}</span>
      <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>{children}</h2>
    </div>
  )
}

function ColorSwatch({ name, hex, token, dark }: { name: string; hex: string; token: string; dark: boolean }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200) }}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
      className="group"
    >
      <div style={{ backgroundColor: hex, height: '88px', borderRadius: '3px', border: '1px solid rgba(0,0,0,0.07)', marginBottom: '10px', transition: 'box-shadow 0.15s' }}
        className="group-hover:shadow-md"
      />
      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-ink)' }}>{name}</div>
      <div style={{ fontSize: '12px', color: 'var(--color-ink-mid)', marginTop: '2px', fontVariantNumeric: 'tabular-nums' }}>
        {copied ? 'Copied!' : hex}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--color-rule)', marginTop: '2px', letterSpacing: '0.02em' }}>{token}</div>
    </button>
  )
}

export default function App() {
  const [inputVal, setInputVal] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-white)' }}>

      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--color-rule)', position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '54px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>Meridian</span>
            <span style={{ fontSize: '11px', color: 'var(--color-ink-mid)', letterSpacing: '0.1em' }}>STYLE GUIDE</span>
          </div>
          <nav style={{ display: 'flex', gap: '28px' }}>
            {['Colors', 'Typography', 'Elements'].map(t => (
              <a key={t} href={`#${t.toLowerCase()}`} style={{ fontSize: '13px', color: 'var(--color-ink-mid)', textDecoration: 'none', transition: 'color 0.12s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--color-ink)'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--color-ink-mid)'}
              >{t}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: '1040px', margin: '0 auto', padding: '72px 32px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-sage)', letterSpacing: '0.14em', marginBottom: '18px' }}>VISUAL LANGUAGE — V 2.1</div>
            <h1 style={{ fontSize: '56px', fontWeight: 300, lineHeight: 1.08, color: 'var(--color-ink)', letterSpacing: '-0.03em', marginBottom: '22px' }}>
              Design<br /><span style={{ fontWeight: 600 }}>System</span>
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--color-ink-mid)', maxWidth: '360px' }}>
              A reference for Meridian's visual identity — colors, type, and components that compose a coherent shopping experience.
            </p>
          </div>
          {/* Color mosaic */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', height: '160px' }}>
            {['#1C1917','#6B7C65','#E8EDE7','#6B6460','#EDE8DF','#FAF8F5'].map((c, i) => (
              <div key={i} style={{ backgroundColor: c, borderRadius: i === 0 ? '4px 0 0 0' : i === 2 ? '0 4px 0 0' : i === 3 ? '0 0 0 4px' : i === 5 ? '0 0 4px 0' : '0' }} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', marginTop: '56px', backgroundColor: 'var(--color-rule)', borderRadius: '4px', overflow: 'hidden' }}>
          {[
            { n: '6', label: 'Color tokens' },
            { n: '1', label: 'Typeface' },
            { n: '3', label: 'UI sections' },
          ].map(({ n, label }) => (
            <div key={label} style={{ backgroundColor: 'var(--color-parchment)', padding: '22px 28px' }}>
              <div style={{ fontSize: '36px', fontWeight: 300, color: 'var(--color-ink)', letterSpacing: '-0.03em' }}>{n}</div>
              <div style={{ fontSize: '11px', color: 'var(--color-ink-mid)', letterSpacing: '0.08em', marginTop: '3px' }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 32px 100px' }}>

        {/* Colors */}
        <section id="colors" style={{ marginBottom: '72px' }}>
          <SectionLabel n="01">Color Palette</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px 14px' }}>
            {colors.map(c => <ColorSwatch key={c.hex} {...c} />)}
          </div>
          {/* Usage row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '28px' }}>
            {[
              { bg: '#1C1917', fg: '#FAF8F5', label: 'PRIMARY ACTION', desc: 'Ink on White' },
              { bg: '#6B7C65', fg: '#FAF8F5', label: 'SECONDARY ACTION', desc: 'Sage on White' },
              { bg: '#EDE8DF', fg: '#1C1917', label: 'SUBTLE SURFACE', desc: 'Parchment + Ink' },
            ].map(({ bg, fg, label, desc }) => (
              <div key={label} style={{ backgroundColor: bg, padding: '16px 20px', borderRadius: '3px' }}>
                <div style={{ fontSize: '10px', fontWeight: 500, color: fg, opacity: 0.5, letterSpacing: '0.1em', marginBottom: '5px' }}>{label}</div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: fg }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section id="typography" style={{ marginBottom: '72px' }}>
          <SectionLabel n="02">Typography</SectionLabel>

          {/* Specimen */}
          <div style={{ padding: '40px', backgroundColor: 'var(--color-parchment)', borderRadius: '4px', marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-ink-mid)', letterSpacing: '0.12em', marginBottom: '20px' }}>INTER — GOOGLE FONTS</div>
            <div style={{ fontSize: '52px', fontWeight: 300, color: 'var(--color-ink)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '8px' }}>Find your fit.</div>
            <div style={{ fontSize: '52px', fontWeight: 700, color: 'var(--color-ink)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '28px' }}>Shop thousands of styles.</div>
            <p style={{ fontSize: '16px', lineHeight: 1.72, color: 'var(--color-ink-mid)', maxWidth: '520px' }}>
              Free shipping on orders over $75. Easy returns within 30 days. Our curated selection of premium essentials is updated weekly with new arrivals from independent designers.
            </p>
          </div>

          {/* Scale table */}
          <div style={{ border: '1px solid var(--color-rule)', borderRadius: '4px', overflow: 'hidden' }}>
            {[
              { name: 'Display', size: '52px', weight: '300 / 700', sample: 'Free shipping this weekend', actual: 52, fw: 300 },
              { name: 'Heading 1', size: '36px', weight: '600', sample: 'New arrivals — Summer 2026', actual: 36, fw: 600 },
              { name: 'Heading 2', size: '24px', weight: '600', sample: 'Bestselling categories', actual: 24, fw: 600 },
              { name: 'Heading 3', size: '18px', weight: '500', sample: 'Linen overshirts — 14 styles', actual: 18, fw: 500 },
              { name: 'Body', size: '15px', weight: '400', sample: 'Premium quality, ethically sourced materials.', actual: 15, fw: 400 },
              { name: 'Small / Label', size: '12px', weight: '500', sample: 'IN STOCK · FREE RETURNS', actual: 12, fw: 500 },
            ].map(({ name, size, weight, sample, actual, fw }, i) => (
              <div key={name} style={{ display: 'grid', gridTemplateColumns: '130px 80px 110px 1fr', alignItems: 'center', padding: '14px 20px', backgroundColor: i % 2 === 0 ? 'var(--color-white)' : 'var(--color-parchment)', borderBottom: i < 5 ? '1px solid var(--color-rule)' : 'none', gap: '16px' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-ink-mid)', fontWeight: 500 }}>{name}</span>
                <span style={{ fontSize: '11px', color: 'var(--color-sage)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{size}</span>
                <span style={{ fontSize: '11px', color: 'var(--color-ink-mid)' }}>{weight}</span>
                <span style={{ fontSize: `${actual}px`, fontWeight: fw, color: 'var(--color-ink)', lineHeight: 1.2, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', letterSpacing: actual >= 36 ? '-0.02em' : '0' }}>{sample}</span>
              </div>
            ))}
          </div>
        </section>

        {/* UI Elements */}
        <section id="elements" style={{ marginBottom: '72px' }}>
          <SectionLabel n="03">UI Elements</SectionLabel>

          {/* Buttons */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-ink-mid)', letterSpacing: '0.1em', marginBottom: '16px' }}>BUTTONS</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', padding: '32px', backgroundColor: 'var(--color-parchment)', borderRadius: '4px', border: '1px solid var(--color-rule)' }}>
              {[
                { label: 'Add to cart', bg: '#1C1917', fg: '#FAF8F5', hoverBg: '#333', border: 'none' },
                { label: 'Save to wishlist', bg: '#6B7C65', fg: '#FAF8F5', hoverBg: '#5A6955', border: 'none' },
                { label: 'View details', bg: 'transparent', fg: '#1C1917', hoverBg: '#1C1917', hoverFg: '#FAF8F5', border: '1.5px solid #1C1917' },
                { label: 'Learn more', bg: 'transparent', fg: '#6B6460', hoverFg: '#1C1917', border: '1.5px solid #DDD8D0', hoverBorder: '1.5px solid #6B6460' },
              ].map(({ label, bg, fg, hoverBg, hoverFg, border, hoverBorder }) => (
                <button key={label}
                  style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.01em', padding: '10px 22px', backgroundColor: bg, color: fg, border: border || 'none', borderRadius: '3px', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    if (hoverBg) el.style.backgroundColor = hoverBg
                    if (hoverFg) el.style.color = hoverFg
                    if (hoverBorder) el.style.border = hoverBorder
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.backgroundColor = bg
                    el.style.color = fg
                    if (border) el.style.border = border
                    if (hoverBorder) el.style.border = border || 'none'
                  }}
                >{label}</button>
              ))}
              <button disabled style={{ fontSize: '13px', fontWeight: 500, padding: '10px 22px', backgroundColor: 'var(--color-parchment)', color: 'var(--color-rule)', border: '1.5px solid var(--color-rule)', borderRadius: '3px', cursor: 'not-allowed' }}>Out of stock</button>
            </div>
          </div>

          {/* Links */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-ink-mid)', letterSpacing: '0.1em', marginBottom: '16px' }}>LINKS</div>
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center', padding: '32px', backgroundColor: 'var(--color-parchment)', borderRadius: '4px', border: '1px solid var(--color-rule)' }}>
              <a href="#" style={{ fontSize: '15px', color: 'var(--color-ink)', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationThickness: '1px' }}>Default link</a>
              <a href="#" style={{ fontSize: '15px', color: 'var(--color-sage)', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationThickness: '1px' }}>Sage link</a>
              <a href="#" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-ink)', textDecoration: 'none', borderBottom: '1.5px solid var(--color-ink)', paddingBottom: '1px' }}>Underline bold</a>
              <a href="#" style={{ fontSize: '14px', color: 'var(--color-ink-mid)', textDecoration: 'none', borderBottom: '1px dotted var(--color-rule)' }}>Muted dotted</a>
              <a href="#" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-ink)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>Shop now <span style={{ fontSize: '15px' }}>→</span></a>
            </div>
          </div>

          {/* Form inputs */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-ink-mid)', letterSpacing: '0.1em', marginBottom: '16px' }}>FORM INPUTS</div>
            <div style={{ padding: '32px', backgroundColor: 'var(--color-parchment)', borderRadius: '4px', border: '1px solid var(--color-rule)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--color-ink)', letterSpacing: '0.02em', marginBottom: '6px' }}>Email address</label>
                <input type="email" placeholder="you@example.com" value={inputVal} onChange={e => setInputVal(e.target.value)}
                  style={{ width: '100%', fontSize: '14px', padding: '10px 14px', backgroundColor: 'var(--color-white)', color: 'var(--color-ink)', border: '1.5px solid var(--color-rule)', borderRadius: '3px', outline: 'none', transition: 'border-color 0.15s' }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-ink)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-rule)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--color-ink)', letterSpacing: '0.02em', marginBottom: '6px' }}>Size</label>
                <select style={{ width: '100%', fontSize: '14px', padding: '10px 14px', backgroundColor: 'var(--color-white)', color: 'var(--color-ink)', border: '1.5px solid var(--color-rule)', borderRadius: '3px', outline: 'none', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236B6460\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', transition: 'border-color 0.15s' }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-ink)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-rule)'}
                >
                  <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--color-ink)', letterSpacing: '0.02em', marginBottom: '6px' }}>Error state</label>
                <input type="text" defaultValue="not a valid postal code"
                  style={{ width: '100%', fontSize: '14px', padding: '10px 14px', backgroundColor: '#FEF2F2', color: 'var(--color-ink)', border: '1.5px solid #FCA5A5', borderRadius: '3px', outline: 'none' }}
                />
                <p style={{ fontSize: '12px', color: '#B91C1C', marginTop: '5px' }}>Please enter a valid postal code.</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '26px' }}>
                <button onClick={() => setChecked(!checked)}
                  style={{ width: '18px', height: '18px', border: `2px solid ${checked ? 'var(--color-sage)' : 'var(--color-rule)'}`, borderRadius: '3px', backgroundColor: checked ? 'var(--color-sage)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', flexShrink: 0 }}
                >
                  {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#FAF8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </button>
                <span style={{ fontSize: '14px', color: 'var(--color-ink-mid)' }}>Sign me up for the newsletter</span>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-ink-mid)', letterSpacing: '0.1em', marginBottom: '16px' }}>CARDS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              <div style={{ backgroundColor: 'var(--color-white)', border: '1px solid var(--color-rule)', borderRadius: '4px', overflow: 'hidden', transition: 'box-shadow 0.15s', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(28,25,23,0.09)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}
              >
                <div style={{ height: '160px', backgroundColor: 'var(--color-sage-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-sage)', letterSpacing: '0.08em' }}>PRODUCT IMAGE</span>
                </div>
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-sage)', letterSpacing: '0.08em', marginBottom: '6px' }}>LINEN COLLECTION</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-ink)', marginBottom: '4px' }}>Relaxed Overshirt</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-ink-mid)' }}>$128.00</div>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-ink)', borderRadius: '4px', padding: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(250,248,245,0.4)', letterSpacing: '0.1em', marginBottom: '12px' }}>LIMITED OFFER</div>
                <div style={{ fontSize: '22px', fontWeight: 600, color: '#FAF8F5', lineHeight: 1.2, marginBottom: '10px', letterSpacing: '-0.02em' }}>20% off your first order</div>
                <p style={{ fontSize: '13px', color: 'rgba(250,248,245,0.55)', lineHeight: 1.65, marginBottom: '20px' }}>Join our list and get an exclusive welcome discount delivered to your inbox.</p>
                <a href="#" style={{ fontSize: '13px', fontWeight: 500, color: '#E8EDE7', textDecoration: 'none' }}>Subscribe →</a>
              </div>

              <div style={{ backgroundColor: 'var(--color-sage-light)', border: '1px solid rgba(107,124,101,0.18)', borderRadius: '4px', padding: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-sage)', letterSpacing: '0.1em', marginBottom: '16px' }}>CART SUMMARY</div>
                <div style={{ fontSize: '40px', fontWeight: 300, color: 'var(--color-ink)', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '6px' }}>3 <span style={{ fontSize: '18px' }}>items</span></div>
                <div style={{ fontSize: '14px', color: 'var(--color-ink-mid)', marginBottom: '4px' }}>Subtotal: $344.00</div>
                <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-sage)' }}>✓ Qualifies for free shipping</div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--color-rule)', backgroundColor: 'var(--color-parchment)', padding: '28px 32px' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-ink-mid)' }}>Meridian Design System</span>
          <span style={{ fontSize: '11px', color: 'var(--color-rule)', letterSpacing: '0.08em' }}>V 2.1 — AUGUST 2026</span>
        </div>
      </footer>
    </div>
  )
}
