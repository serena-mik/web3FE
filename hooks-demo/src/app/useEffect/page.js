'use client';
import { useEffect, useState } from 'react';

export default function EffectPage() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(id); // 清理定时器
  }, []);

  return (
    <main style={{ textAlign: 'center', padding: 40 }}>
      <h2>useEffect 示例</h2>
      <p 
        style={{ fontSize: '24px', margin: '20px 0' }}
      >  
        当前时间：{time}
      </p>
    </main>
  );
}
