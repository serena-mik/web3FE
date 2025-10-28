"use client";
import TvlChart from "@/components/TvlChart";
import DexVolumeChart from "@/components/DexVolumeChart";
import HolderPie from "@/components/HolderPie";
import TokenKLine from "@/components/TokenKLine";

export default function ChartsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-8">综合仪表盘</h2>
      <TvlChart />
      <DexVolumeChart />
      <HolderPie />
      <TokenKLine />
    </div>
  );
}
