import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const h = request.headers;
  const city = h.get("x-vercel-ip-city");
  const country = h.get("x-vercel-ip-country");
  const lat = h.get("x-vercel-ip-latitude");
  const lon = h.get("x-vercel-ip-longitude");

  if (!city || !country || !lat || !lon) {
    return NextResponse.json(null);
  }

  return NextResponse.json({
    city: decodeURIComponent(city),
    country,
    lat: Number(lat),
    lon: Number(lon),
  });
}
