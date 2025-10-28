'use client';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import ChartCard from './ChartCard';

interface Candle {
  date: string;
  values: [number, number, number, number]; // [open, close, low, high]
}

export default function TokenKLine() {
  const [data, setData] = useState<Candle[]>([]);

  useEffect(() => {
    fetch('/api/token-price').then(res => res.json()).then(setData);
  }, []);

  const option = {
    tooltip: { trigger: 'axis' },
    grid: { containLabel: true },
    xAxis: { type: 'category', data: data.map(d => d.date) },
    yAxis: { scale: true },
    series: [
      {
        type: 'candlestick',
        data: data.map(d => d.values),
      },
    ],
  };

  return (
    <ChartCard title="代币价格走势(K线图)">
      <ReactECharts option={option} style={{ height: 400 }} />
    </ChartCard>
  );
}
