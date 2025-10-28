import { NextResponse } from 'next/server';

export async function GET() {
  const data = Array.from({ length: 10 }).map((_, i) => ({
    address: `0x${(Math.random() * 1e16).toString(16).slice(0, 8)}...${i}`,
    share: Math.round(Math.random() * 15 + 5),
  }));
  return NextResponse.json(data);
}
