'use client';
import { useMemo, useState } from 'react';

export default function MemoPage() {
  const [count, setCount] = useState(0);
  const expensiveValue = useMemo(() => {
    console.log('计算中...');
    return count * 1000;
  }, [count]);

  return (
    <main style={{ textAlign: 'center', padding: 40 }}>
      <h2>useMemo 示例</h2>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
      >
        +1
      </button>
      <button onClick={() => setCount(count -1)}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
      >
        -1
      </button>
    </main>
  );
}
