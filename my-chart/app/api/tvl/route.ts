import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const res = await axios.get("https://api.llama.fi/protocol/aave");
  const data = res.data?.tvl.slice(-7).map((i: any) => ({
    date: new Date(i.date * 1000).toLocaleDateString(),
    tvl: i.totalLiquidityUSD / 1e6,
  }));
  return NextResponse.json(data);
}
