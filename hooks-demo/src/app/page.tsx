'use client'

import Link from 'next/link'

export default function Page() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 40,
        fontFamily: 'sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#222',
          textShadow: '2px 2px 5px rgba(0,0,0,0.1)',
          marginBottom: '30px',
        }}
      >
        ⚛️ React Hooks 演示项目
      </h1>

      <p style={{ fontSize: '18px', color: '#555' }}>
        点击下方链接，查看不同 Hook 的示例 👇
      </p>

      <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
        <li style={{ margin: '10px 0' }}>
          <Link href="/useState" style={{ color: '#0070f3' }}>useState 示例</Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link href="/useRef" style={{ color: '#0070f3' }}>useRef 示例</Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link href="/useContext" style={{ color: '#0070f3' }}>useContext 示例</Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link href="/useEffect" style={{ color: '#0070f3' }}>useEffect 示例</Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link href="/useMemo" style={{ color: '#0070f3' }}>useMemo 示例</Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link href="/useReducer" style={{ color: '#0070f3' }}>useReducer 示例</Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link href="/useCallback" style={{ color: '#0070f3' }}>useCallback 示例</Link>
        </li>
        <li style={{ margin: '10px 0' }}>
          <Link href="/useLayout" style={{ color: '#0070f3' }}>useLayout 示例</Link>
        </li>
      </ul>
    </main>
  );
}
