// src/hooks/useWeather.ts
import { useState } from "react";
import axios from "axios";

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

const CACHE_KEY = "weather_cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export default function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);

    // Vérifier le cache
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
    if (cache[city] && Date.now() - cache[city].timestamp < CACHE_TTL) {
      setWeather(cache[city].data);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/weather/?city=${city}`);
      console.log("API Response:", response.data); // 🔍 Affiche exactement ce que renvoie Django
      setWeather(response.data);
      
      // Mettre en cache
      cache[city] = { data: response.data, timestamp: Date.now() };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));

    } catch (err) {
      setError("Impossible de récupérer la météo");
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather };
}
