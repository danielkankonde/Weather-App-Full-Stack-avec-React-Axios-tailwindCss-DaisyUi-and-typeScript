from datetime import datetime
from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .services.weather_service import WeatherService
from .serializers import WeatherSerializer


class WeatherAPIView(APIView):
    """
    Endpoint principal pour récupérer la météo par ville.
    """

    def get(self, request):
        """
        GET /api/weather/?city=Paris

        Étapes :
        1. Récupérer la ville depuis la query
        2. Appeler le service météo
        3. Transformer les données
        4. Valider avec le serializer
        5. Retourner une réponse propre
        """

        city = request.query_params.get("city")

        if not city:
            return Response(
                {"error": "Le paramètre 'city' est requis"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Météo actuelle
            current_data = WeatherService.get_weather_by_city(city)

            # Jour en français
            now = datetime.now()
            days_fr = {
                "Monday": "Lundi", "Tuesday": "Mardi", "Wednesday": "Mercredi",
                "Thursday": "Jeudi", "Friday": "Vendredi", "Saturday": "Samedi",
                "Sunday": "Dimanche"
            }
            day_fr = days_fr[now.strftime("%A")]

            
            current_weather_data = {
                "Date" : now.strftime("%Y-%m-%d"),
                "Jour" : day_fr,
                "City": current_data["name"],
                "Temperature": current_data["main"]["temp"],
                "Description": current_data["weather"][0]["description"],
                "Humidité": current_data["main"]["humidity"],
                "Vitesse du vent": current_data["wind"]["speed"],
            }
        
            # 2 Prévisions horaires (toutes les 3h) 
            forecast_raw = WeatherService.get_forecast_by_city(city)
            forecast_hourly = []
            forecast_daily = {}

            for item in forecast_raw["list"]:
                # Pour afficher la date et le jour
                date_str = item["dt_txt"].split(" ")[0]
                dt = datetime.strptime(item["dt_txt"], "%Y-%m-%d %H:%M:%S")
                day_of_week = dt.strftime("%A")

                days_fr = {
                    "Monday": "Lundi", "Tuesday": "Mardi", "Wednesday": "Mercredi",
                    "Thursday": "Jeudi", "Friday": "Vendredi", "Saturday": "Samedi", "Sunday": "Dimanche"
                }

                day_fr = days_fr[day_of_week]

                # Convertir la date/heure de la prévision
                dt = datetime.strptime(item["dt_txt"], "%Y-%m-%d %H:%M:%S")
                day_fr_forecast = days_fr[dt.strftime("%A")]
                hour_forecast = dt.strftime("%H:%M:%S")

                hour_forecast = dt.hour  # ← l'heure de la prévision

                if 5 <= hour_forecast < 12:
                        moment = "Matin"
                elif 12 <= hour_forecast < 18:
                        moment = "Après-midi"
                elif 18 <= hour_forecast < 22:
                        moment = "Soir"
                else:
                    moment = "Nuit"


                # Regrouper par jour
                if date_str not in forecast_daily:
                    forecast_daily[date_str] = {
                    "moment" : moment,
                    "date": day_fr_forecast,
                    "heure": hour_forecast,
                    "day": day_fr,  # ← on ajoute le jour ici
                    "temp_min": item["main"]["temp_min"],
                    "temp_max": item["main"]["temp_max"],
                    "description": item["weather"][0]["description"],
                }

                # Ajouter chaque relevé dans la liste horaire
                forecast_hourly.append({
                    "Moment": moment,
                    "Date": dt.strftime("%Y-%m-%d"),  # date et heure
                    "Heure": f"{hour_forecast}h",
                    "Jour" : day_fr,
                    "Temperature": item["main"]["temp"],
                    "Description": item["weather"][0]["description"],
                    "Humidité": item["main"]["humidity"],
                    "Vitesse du vend": item["wind"]["speed"],
                })

                # Regrouper par jour pour avoir prévisions journalières
                date = item["dt_txt"].split(" ")[0]
                if date not in forecast_daily:
                    forecast_daily[date] = {
                        "date": date,
                        "temp_min": item["main"]["temp_min"],
                        "temp_max": item["main"]["temp_max"],
                        "description": item["weather"][0]["description"],
                    }
                else:
                    # Mettre à jour min/max si nécessaire
                    forecast_daily[date]["temp_min"] = min(forecast_daily[date]["temp_min"], item["main"]["temp_min"])
                    forecast_daily[date]["temp_max"] = max(forecast_daily[date]["temp_max"], item["main"]["temp_max"])

            # Transformer le dict en liste pour le front
            forecast_daily_list = list(forecast_daily.values())

            # 3 Construire la réponse
            data = {
                "Méteo Actuelle": current_weather_data,
                "Prévision horaire": forecast_hourly,
                "Prévisions quotidiennes": forecast_daily_list,
            }

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
