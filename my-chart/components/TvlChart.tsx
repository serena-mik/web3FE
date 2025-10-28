"use client";
import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const TvlChart = () => {
  const [data, setData] = useState<{ date: string; tvl: number }[]>([]);

  useEffect(() => {
    axios.get("/api/tvl").then((res) => setData(res.data));
  }, []);

  const option = {
    title: { text: "DeFi 借贷TVL变化", left: "center" },
    tooltip: { trigger: "axis" },
    grid: { top:'15%', bottom:'15%', left:'10%', right:'10%', containLabel: true },
    xAxis: { type: "category", data: data.map((i) => i.date) },
    yAxis: { type: "value", name: "TVL (亿美元)" },
    series: [
      {
        type: "line",
        smooth: true,
        center: ['50%', '50%'],
        data: data.map((i) => i.tvl),
        areaStyle: {},
      },
    ],
  };

  return (
    <div className="my-10 bg-white shadow rounded-lg p-4">
      <ReactECharts option={option} style={{ height: 400 }} />
    </div>
  );
};

export default TvlChart;
