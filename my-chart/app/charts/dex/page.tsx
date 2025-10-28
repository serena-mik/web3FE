"use client";
import DexVolumeChart from "@/components/DexVolumeChart";

export default function DexPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-8">DEX 仪表盘</h2>
      <DexVolumeChart />
    </div>
  );
}