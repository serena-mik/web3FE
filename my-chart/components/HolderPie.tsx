'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import ChartCard from './ChartCard';

interface HolderData {
  address: string;
  share: number;
}

export default function HolderPie() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<HolderData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/holders');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('获取持仓数据失败:', err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    if (data.length > 0) {
      const option: echarts.EChartsOption = {
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center' },
        series: [
          {
            name: '持仓份额',
            type: 'pie',
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
            label: { show: false, position: 'center' },
            emphasis: {
              label: { show: true, fontSize: 16, fontWeight: 'bold' },
            },
            data: data.map((d) => ({ name: d.address, value: d.share })),
          },
        ],
      };
      chart.setOption(option);
    }

    // 响应式调整大小
    const resizeHandler = () => chart.resize();
    window.addEventListener('resize', resizeHandler);

    // 清理
    return () => {
      window.removeEventListener('resize', resizeHandler);
      chart.dispose();
    };
  }, [data]);

  return (
    <ChartCard title="前10持仓地址份额(饼图)">
      <div
        ref={chartRef}
        style={{ width: '100%', height: '500px' }}
        className="rounded-lg bg-white"
      />
    </ChartCard>
  );
}
