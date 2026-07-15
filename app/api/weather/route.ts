import { getSchofieldsWeather } from "@/lib/weather/weatherService";

export type { WeatherData } from "@/lib/weather/weather.types";

export async function GET() {
  try {
    const data = await getSchofieldsWeather();
    return Response.json(data);
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return Response.json({ error: true }, { status: 502 });
  }
}
