import React from "react";
import type { WeatherData } from "../hooks/useWeather"; // <- type-only import

interface WeatherCardProps {
  data: WeatherData | null; // autoriser null si pas encore chargé
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  if (!data || !data["Méteo Actuelle"]) return null;

  const current = data["Méteo Actuelle"];

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl mb-4 border border-base-300">
      <div className="card-body">
        <h2 className="card-title">{current.City}</h2>
        <p className="text-lg capitalize">
          {current.Description} | 🌡️ {current.Temperature}°C
        </p>
        {current["Humidité"] !== undefined && <p>💧 Humidité : {current["Humidité"]}%</p>}
        {current["Vitesse du vent"] !== undefined && <p> 💨 Vent : {current["Vitesse du vent"]} m/s</p>}
        <div className="card-actions justify-end">
          <span className="badge badge-primary" translate="no">Météo actuelle</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
