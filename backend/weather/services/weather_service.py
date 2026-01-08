import os
import requests
from dotenv import load_dotenv

from config import settings

# Charger les variables d'environnement depuis .env
# ⚠ Important : doit être en tout début du fichier
load_dotenv()


class WeatherService:
    """
    Service responsable de la communication avec l'API météo externe.
    👉 Toute la logique externe est isolée ici (bonne pratique pro).
    """

    BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
    FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"


    @staticmethod
    def get_weather_by_city(city: str) -> dict:
        """
        Récupère la météo d'une ville donnée.

        Pourquoi cette méthode existe ?
        - Centraliser l'appel à l'API externe
        - Faciliter les tests et le cache
        - Éviter la duplication de code

        Comment elle fonctionne ?
        - Construit les paramètres
        - Appelle l'API OpenWeatherMap
        - Retourne la réponse JSON
        """

        api_key = os.getenv("WEATHER_API_KEY")

        if not api_key:
            raise ValueError("Clé API météo manquante")

        params = {
            "q": city,
            "appid": api_key,
            "units": "metric",
            "lang": "fr",
        }

        response = requests.get(WeatherService.BASE_URL, params=params, timeout=10)

        response.raise_for_status()  # Lève une erreur HTTP si problème

        return response.json()
    
    @staticmethod
    def get_forecast_by_city(city: str) -> dict:
            """
            Récupère les prévisions météo (5 jours / 3h) d'une ville donnée.
            """
            api_key = os.getenv("WEATHER_API_KEY")
            if not api_key:
                raise ValueError("Clé API météo manquante")

            params = {
                "q": city,
                "appid": api_key,
                "units": "metric",
                "lang": "fr",
            }

            response = requests.get(WeatherService.FORECAST_URL, params=params, timeout=10)
            response.raise_for_status()

            return response.json()