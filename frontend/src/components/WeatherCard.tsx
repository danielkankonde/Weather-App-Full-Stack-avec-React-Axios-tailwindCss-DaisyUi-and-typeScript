import React from "react";

interface WeatherCardProps {
  data: any; // plus tard on pourra typer correctement
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  if (!data || !data["Méteo Actuelle"]) return null;

  const current = data["Méteo Actuelle"];

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300 rounded-xl p-4 mb-6">
      <div className="card-body space-y-2">
        {/* Ville */}
        <h2 className="text-3xl font-bold">{current.City}</h2>

        {/* Description météo */}
        <p className="text-lg italic text-white-600 capitalize">
          {current.Description}
        </p>

        {/* Température */}
        <p className="text-2xl font-semibold">🌡️ {current.Temperature}°C</p>

        {/* Humidité */}
        {current["Humidité"] !== undefined && (
          <p className="text-md">💧 Humidité : {current["Humidité"]}%</p>
        )}

        {/* Vent */}
        {current["Vitesse du vent"] !== undefined && (
          <p className="text-md">💨 Vent : {current["Vitesse du vent"]} m/s</p>
        )}

        {/* Badge */}
        <div className="card-actions justify-end">
          <span className="badge badge-primary">Météo actuelle</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
