// src/hooks/useWeather.ts
import { useState } from "react";
import axios from "axios";

// src/hooks/useWeather.ts

export interface CurrentWeather {
  Date: string;
  Jour: string;
  City: string;
  Temperature: number;
  Description: string;
  Humidité: number;
  "Vitesse du vent": number;
}

export interface HourlyForecast {
  Moment: string;
  Date: string;
  Heure: string;
  Jour: string;
  Temperature: number;
  Description: string;
  Humidité: number;
  "Vitesse du vend": number;
}

export interface DailyForecast {
  date: string;
  temp_min: number;
  temp_max: number;
  description: string;
}

export interface WeatherData {
  "Méteo Actuelle": CurrentWeather;
  "Prévision horaire": HourlyForecast[];
  "Prévisions quotidiennes": DailyForecast[];
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
