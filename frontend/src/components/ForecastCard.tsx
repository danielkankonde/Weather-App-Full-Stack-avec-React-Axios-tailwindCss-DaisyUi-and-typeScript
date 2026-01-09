import React from "react";

interface ForecastCardProps {
  dayData: {
    date: string;
    temp_min: number;
    temp_max: number;
    description: string;
  };
}

const ForecastCard: React.FC<ForecastCardProps> = ({ dayData }) => {
  return (
    <div className="card bg-base-100 shadow-md rounded-lg p-4 text-center border border-base-300">
      <h3 className="font-semibold text-lg mb-2">{dayData.date}</h3>
      <p className="capitalize text-blue-600 mb-2">{dayData.description}</p>
      <p className="text-md">
        🌡️ Min: {dayData.temp_min}°C / Max: {dayData.temp_max}°C
      </p>
    </div>
  );
};

export default ForecastCard;
