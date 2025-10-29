'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme, Theme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { config } from './config';


const queryClient = new QueryClient();

// 🎨 自定义主题（从 darkTheme 扩展）
const customTheme: Theme = {
  ...darkTheme({
    accentColor: '#6366f1', // 主色 (Tailwind indigo-500)
    accentColorForeground: '#ffffff',
    borderRadius: 'large',
    overlayBlur: 'small',
  }),
  colors: {
    ...darkTheme().colors,
    modalBackground: '#1e1e2f', // Modal 背景更深
    modalText: '#e0e0e0',
    menuItemBackground: '#2d2d44',
    connectButtonBackground: '#6366f1',
    connectButtonText: '#ffffff',
  },
  radii: {
    ...darkTheme().radii,
    connectButton: '1rem', // 圆角更大
  },
};

export default function Providers({ children }: { children: ReactNode }) {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
            appName: 'Serena Web3 App',
          }}
          theme={customTheme}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
