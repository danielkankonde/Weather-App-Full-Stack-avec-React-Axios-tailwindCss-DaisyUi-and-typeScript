import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ForecastCard from "../components/ForecastCard";
import Loader from "../components/Loader";
import useWeather from "../hooks/useWeather";

const Forecast: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cityFromState = (location.state as any)?.city;
  const { weather, loading, error, fetchWeather } = useWeather();
  const [city, setCity] = useState<string>(cityFromState || "");

  useEffect(() => {
    if (city) fetchWeather(city);
  }, [city]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-start p-6">
      <h1 className="text-4xl font-bold mb-6">📅 Prévisions météo</h1>

      <button className="btn btn-secondary mb-6" onClick={() => navigate("/")}>
        ⬅ Retour à l'accueil
      </button>

      {loading && <Loader />}
      {error && <p className="text-red-500 font-semibold">{error}</p>}

      {(weather as any)?.["Prévisions quotidiennes"] && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4">
      {(weather as any)["Prévisions quotidiennes"].map((day: any, index: number) => (
      <ForecastCard key={index} dayData={day} />
      ))}
  </div>
)}
    </div>
  );
};

export default Forecast;
