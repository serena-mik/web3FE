'use client';
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function Child() {
  const theme = useContext(ThemeContext);
  return <p>当前主题：{theme}</p>;
}

export default function ContextPage() {
  const [theme, setTheme] = useState('light');
  return (
    // ThemeContext.Provider 把 theme 这个值提供给所有子组件使用
    <ThemeContext.Provider value={theme}> 
      <main style={{ textAlign: 'center', padding: 40 }}>
        <h2>useContext 示例</h2>
        <Child />
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
        >
          切换主题
        </button>
      </main>
    </ThemeContext.Provider>
  );
}
