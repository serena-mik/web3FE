import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const INFURA_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

if (!INFURA_ID) {
  console.warn('NEXT_PUBLIC_INFURA_ID is not set');
}

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(`https://mainnet.infura.io/v3/${INFURA_ID}`),
});


