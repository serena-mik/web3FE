"use client";

import TokenKLine from "@/components/TokenKLine";

export default function PricesPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-8"> 价格仪表盘</h2>
      <TokenKLine />
    </div>
  );
}