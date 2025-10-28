"use client";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface DexVolume {
  name: string;
  volume24h: number;
  volume7d: number;
  volume30d: number;
}

export default function DexVolumeChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DexVolume[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dex-volume");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("加载数据出错:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    if (data.length > 0) {
      const option: echarts.EChartsOption = {
        title: { text: "DEX 交易量比较", left: "center" },
        tooltip: { trigger: "axis" },
        legend: { bottom: 0 },
        grid: { left: "3%", right: "4%", bottom: "10%", containLabel: true },
        xAxis: { type: "category", data: data.map((d) => d.name) },
        yAxis: { type: "value", name: "交易量 (USD)" },
        series: [
          { name: "24小时", type: "bar", data: data.map((d) => d.volume24h) },
          { name: "7天", type: "bar", data: data.map((d) => d.volume7d) },
          { name: "30天", type: "bar", data: data.map((d) => d.volume30d) },
        ],
      };
      chart.setOption(option);
    }

    // 监听窗口大小变化，保持响应式
    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    // 清理 chart 实例
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data]);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "500px" }}
      className="rounded-lg bg-white shadow-md"
    />
  );
}
