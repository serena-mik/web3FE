import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { metaMask, walletConnect, injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
//   connectors: [
//     metaMask(),
//     walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID! }),
//     injected(),
//   ],
  transports: {
    [mainnet.id]: http("https://mainnet.infura.io/v3/4599d96961934f2e9a1fd3828bd78a73"),
    [sepolia.id]: http(),
  },
});