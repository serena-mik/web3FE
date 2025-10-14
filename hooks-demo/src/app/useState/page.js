'use client';
import { useState } from 'react';

export default function StatePage() {
  const [count, setCount] = useState(0);
  return (
    <main style={{ textAlign: 'center', padding: 40 }}>
      <h2>useState 示例</h2>
      <p>当前计数：{count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        +1
      </button>
      <button 
        onClick={() => setCount(count - 1)}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        -1
        </button>
    </main>
  );
}
