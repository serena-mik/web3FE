import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    { "name": "Uniswap", "volume24h": 320000000, "volume7d": 1200000000, "volume30d": 5400000000 },
    { "name": "SushiSwap", "volume24h": 180000000, "volume7d": 890000000, "volume30d": 4000000000 },
    { "name": "Curve", "volume24h": 240000000, "volume7d": 1800000000, "volume30d": 7200000000 },
    { "name": "Balancer", "volume24h": 90000000, "volume7d": 680000000, "volume30d": 9800000000 },
  ];
  return NextResponse.json(data);
}
