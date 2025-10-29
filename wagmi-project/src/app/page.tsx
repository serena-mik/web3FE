// 'use client'

// import { createConfig, http, WagmiProvider, useAccount, useConnect, useDisconnect } from 'wagmi'
// import { mainnet, sepolia } from 'viem/chains'

// export const config = createConfig({
//   chains: [mainnet, sepolia],
//   transports:{
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   }
// })

// function App() {
//   const account = useAccount()
//   const { connectors, connect, status, error } = useConnect()
//   const { disconnect } = useDisconnect()

//   return (
//     <>
//       <WagmiProvider config={config}>
//         <div>
//           <h2>Account</h2>

//           <div>
//             status: {account.status}
//             <br />
//             addresses: {JSON.stringify(account.addresses)}
//             <br />
//             chainId: {account.chainId}
//           </div>

//           {account.status === 'connected' && (
//             <button type="button" onClick={() => disconnect()}>
//               Disconnect
//             </button>
//           )}
//         </div>

//         <div>
//           <h2>Connect</h2>
//           {connectors.map((connector) => (
//             <button
//               key={connector.uid}
//               onClick={() => connect({ connector })}
//               type="button"
//             >
//               {connector.name}
//             </button>
//           ))}
//           <div>{status}</div>
//           <div>{error?.message}</div>
//         </div>
//       </WagmiProvider>
//     </>
//   )
// }

// export default App


// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { http, WagmiProvider, createConfig } from "wagmi";
// import { mainnet, sepolia } from "wagmi/chains";
// import { metaMask } from "wagmi/connectors";

// const configs = createConfig({
//   ssr: true, // Make sure to enable this for server-side rendering (SSR) applications.
//   chains: [mainnet, sepolia],
//   connectors: [metaMask()],
//   transports: {
//     [mainnet.id]: http("https://mainnet.infura.io/v3/4599d96961934f2e9a1fd3828bd78a73"),
//     [sepolia.id]: http("https://sepolia.infura.io/v3/4599d96961934f2e9a1fd3828bd78a73"),
//   },
// });

// const client = new QueryClient();

// const App = () => {
//   return (
//     <WagmiProvider config={configs}>
//       <QueryClientProvider client={client}>
//         <Component {...pageProps} />
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// };


// import { useAccount, useConnect, useDisconnect } from "wagmi"

// export const ConnectButton = () => {
//   const { address } = useAccount()
//   const { connectors, connect } = useConnect()
//   const { disconnect } = useDisconnect()

//   return (
//     <div>
//       {address ? (
//         <button onClick={() => disconnect()}>Disconnect</button>
//       ) : (
//         connectors.map((connector) => (
//           <button key={connector.uid} onClick={() => connect({ connector })}>
//             {connector.name}
//           </button>
//         ))
//       )}
//     </div>
//   )
// }

// 'use client';
// import { ConnectButton } from '@rainbow-me/rainbowkit';

// export default function Home() {
//   return (
//     <main className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold mb-6">🌈 我的 Web3 DApp</h1>
//       <ConnectButton />
//     </main>
//   );
// }
// app/page.tsx
'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';

export default function Page() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address as `0x${string}` | undefined,
  });

  return (
    <main style={{ padding: 24 }}>
      <h1>Serena's Web3 App</h1>
      <ConnectButton />
      {isConnected && (
        <div style={{ marginTop: 20 }}>
          <div>Address: {address}</div>
          <div>ETH Balance: {balance ? `${balance.formatted} ${balance.symbol}` : 'Loading...'}</div>
        </div>
      )}
    </main>
  );
}
