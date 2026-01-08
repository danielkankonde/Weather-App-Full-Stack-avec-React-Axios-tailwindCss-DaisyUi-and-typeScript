# 🌤️ Weather App — Full Stack

Application météo moderne développée avec une architecture **full-stack professionnelle**.
Le backend expose une API REST avec Django, et le frontend consomme cette API avec React et TypeScript.

---

## Fonctionnalités

- Recherche météo par ville
- Température actuelle
- Description météo
- Humidité
- Vitesse du vent
- Indicateur de chargement
- Gestion des erreurs

---

## Stack technique

### Backend
- Python
- Django
- Django REST Framework
- API OpenWeatherMap
- Variables d’environnement (`.env`)

### Frontend
- React
- TypeScript
- Axios
- TailwindCSS
- daisyUI

---

## Architecture du projet

weather-app/
│
├── backend/ # API Django REST
└── frontend/ # Application React


---

## Installation & lancement

### Backend

cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver

.env 
SECRET_KEY=pg&*+b^_2_*n9wyv-vugvwu*u_!r^_8q_gyj7-_j#9r4-o#f2c
WEATHER_API_KEY=7f3f1929479ae5be74614280f993b253



