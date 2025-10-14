'use client';
import Link from 'next/link';

export default function Home() {
  const routes = [
    'state', 'reducer', 'context', 'effect',
    'callback', 'memo', 'ref', 'layout'
  ];

  return (
    <main style={{ textAlign: 'center', padding: 50 }}>
      <h1> React Hooks Demo (Next.js)</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {routes.map((r) => (
          <li key={r} style={{ margin: '10px 0' }}>
            <Link href={`/${r}`} style={{ color: '#0070f3', fontSize: '18px' }}>
              {r.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
