'use client';
import { useLayoutEffect, useRef } from 'react';

export default function LayoutEffectPage() {
  const boxRef = useRef();

  useLayoutEffect(() => {
    boxRef.current.style.backgroundColor = 'lightgreen';
    boxRef.current.style.padding = '20px';
  }, []);

  return (
    <main style={{ textAlign: 'center', padding: 40 }}>
      <h2>useLayoutEffect 示例</h2>
      <div ref={boxRef}>这个盒子在渲染前被修改样式</div>
    </main>
  );
}
