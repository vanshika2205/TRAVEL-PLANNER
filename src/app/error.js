"use client";

import Link from 'next/link';

export default function Error({ error }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#070b16', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', width: '100%', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(15, 23, 42, 0.96)', boxShadow: '0 30px 80px rgba(15, 23, 42, 0.35)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Oops! Something went wrong.</h1>
        <p style={{ color: '#cbd5e1', marginBottom: '1.25rem' }}>
          EasyGo ran into an unexpected issue while loading the page. Please refresh or return to the homepage.
        </p>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>{error?.message ?? 'An unknown error occurred.'}</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ padding: '0.85rem 1.25rem', borderRadius: '12px', background: '#7c3aed', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
            Return to Home
          </Link>
          <button type="button" onClick={() => window?.location?.reload()} style={{ padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.3)', background: 'transparent', color: '#e2e8f0', cursor: 'pointer' }}>
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}
