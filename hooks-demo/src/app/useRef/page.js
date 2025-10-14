'use client';
import { useRef } from 'react';

export default function RefPage() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <main style={{ textAlign: 'center', padding: 40 }}>
      <h2>useRef 示例</h2>
      <input ref={inputRef} placeholder="点按钮聚焦我" />
      <br /><br />
      <button onClick={focusInput}>聚焦输入框</button>
    </main>
  );
}
