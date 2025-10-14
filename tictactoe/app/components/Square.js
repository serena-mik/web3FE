'use client';

export default function Square({ value, onClick }) {
  return (
    <button
      className="w-20 h-20 border border-black"
      onClick={onClick}
      style={{
        width: '80px',
        height: '80px',
        fontSize: '32px',
        margin: '4px',
        cursor: 'pointer',
      }}
    >
      {value}
    </button>
  );
}