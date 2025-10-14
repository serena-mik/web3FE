'use client'
import Board from "./components/Board";

export default function Page() {

    return(
        <main style={{ display: 'flex', flexDirection: 'column',alignItems: 'center',justifyContent:'center', padding:40 }}>
            <h1 style={{ fontSize: '48px',  fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0,0,0,0.1)', marginBottom: '20px'}}>
                🎮 井字棋游戏
            </h1>
            <Board />
        </main>
    );
    
}