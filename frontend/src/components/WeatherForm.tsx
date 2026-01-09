// src/components/WeatherForm.tsx
import React, { useState, type FormEvent } from "react";

interface Props {
  onSearch: (city: string) => void;
}

const WeatherForm: React.FC<Props> = ({ onSearch }) => {
  const [city, setCity] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!city) return;
    onSearch(city.trim());
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Entrez une ville..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input input-bordered flex-1"
      />
      <button type="submit" className="btn btn-primary" translate="no">
         Rechercher
      </button>
    </form>
  );
};

export default WeatherForm;
