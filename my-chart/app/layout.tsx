// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "DeFi Dashboard",
  description: "DeFi 数据可视化仪表盘（TVL、DEX、Holders、Price）",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="bg-gray-100 min-h-screen">
        <nav className="bg-white shadow p-4 flex gap-6 justify-center">
          <Link href="/">首页</Link>
          <Link href="/charts">仪表盘</Link>
          <Link href="/charts/tvl">TVL</Link>
          <Link href="/charts/dex">DEX</Link>
          <Link href="/charts/holders">持仓</Link>
          <Link href="/charts/price">价格</Link>
        </nav>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
