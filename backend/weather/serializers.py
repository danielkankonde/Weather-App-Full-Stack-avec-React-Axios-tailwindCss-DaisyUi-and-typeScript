from rest_framework import serializers


class WeatherSerializer(serializers.Serializer):
    """
    Serializer pour structurer et sécuriser les données envoyées au frontend.
    """

    city = serializers.CharField()
    temperature = serializers.FloatField()
    description = serializers.CharField()
    humidity = serializers.IntegerField()
    wind_speed = serializers.FloatField()
