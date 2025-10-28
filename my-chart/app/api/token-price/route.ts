import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    { date: '2025-01-01', values: [100, 110, 95, 115] },
    { date: '2025-01-02', values: [110, 108, 105, 120] },
    { date: '2025-01-03', values: [108, 115, 106, 118] },
    { date: '2025-01-04', values: [115, 118, 110, 125] },
    { date: '2025-01-05', values: [118, 112, 111, 122] },
  ];
  return NextResponse.json(data);
}
