'use client';
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}

export default function ReducerPage() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <main style={{ textAlign: 'center', padding: 40 }}>
      <h2>useReducer 示例</h2>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        +1
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        -1
      </button>
    </main>
  );
}
