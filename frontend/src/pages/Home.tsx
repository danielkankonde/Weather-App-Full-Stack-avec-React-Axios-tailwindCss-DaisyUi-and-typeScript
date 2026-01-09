import React from "react";
import { useNavigate } from "react-router-dom";
import WeatherForm from "../components/WeatherForm";
import WeatherCard from "../components/WeatherCard";
import Loader from "../components/Loader";
import useWeather from "../hooks/useWeather";

const Home: React.FC = () => {
  const { weather, loading, error, fetchWeather } = useWeather();
  const navigate = useNavigate();

    const goToForecast = () => {
    const cityName = (weather as any)?.["Méteo Actuelle"]?.City;
    if (!cityName) {
        alert("Aucune ville sélectionnée !");
        return;
    }
    navigate("/forecast", { state: { city: cityName } });
    };
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-start p-6">
      <h1 className="text-4xl font-bold mb-6">🌦️ App Météo</h1>

      <WeatherForm onSearch={fetchWeather} />

      {loading && <Loader />}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {weather && (
        <>
          <WeatherCard data={weather} />
          <button
            className="btn btn-primary mt-4"
            onClick={goToForecast}
          >
            Voir les prévisions météo
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
