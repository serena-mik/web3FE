'use client';
import { useCallback, useState } from 'react';

export default function CallbackPage() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('按钮点击', count);
    setCount(count + 1);
  }, [count]);

  return (
    <main style={{ textAlign: 'center', padding: 40 }}>
      <h2>useCallback 示例</h2>
      <p>Count: {count}</p>
      <button onClick={handleClick}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        点击我
      </button>
    </main>
  );
}
