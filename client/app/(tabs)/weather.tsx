import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Badge, Progress } from '@/components/ui'; // Asegúrate de tener componentes similares en React Native
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  Wind,
  CloudFog,
  Droplet,
  CloudDrizzle,
  Thermometer,
  Umbrella,
  Sunrise,
  Sunset,
} from 'lucide-react-native'; // Asegúrate de tener los íconos en React Native

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/formosa%20argentina?unitGroup=metric&key=UMQ9KWF37S9T6WL8J4WLN5Q23&contentType=json'
      );
      const data = await response.json();
      setWeatherData(data);
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando datos meteorológicos...</Text>
      </View>
    );
  }

  const current = weatherData.currentConditions;
  const currentCondition = {
    Clear: 'Despejado',
    'Partly Cloudy': 'Parcialmente Nublado',
    Cloudy: 'Nublado',
    Rain: 'Lluvia',
    Thunderstorms: 'Tormentas',
    Snow: 'Nieve',
    Fog: 'Niebla',
    Windy: 'Ventoso',
    Overcast: 'Cubierto',
    Drizzle: 'Llovizna',
    Showers: 'Aguaceros',
    'Freezing Rain': 'Lluvia Helada',
    Sleet: 'Aguacero de Hielo',
  }[current.conditions] || current.conditions;

  const weatherIcons = {
    Clear: <Sun style={styles.icon} />,
    'Partly Cloudy': <Cloud style={styles.icon} />,
    Cloudy: <Cloud style={styles.icon} />,
    Rain: <CloudRain style={styles.icon} />,
    Thunderstorms: <CloudLightning style={styles.icon} />,
    Snow: <Snowflake style={styles.icon} />,
    Fog: <CloudFog style={styles.icon} />,
    Windy: <Wind style={styles.icon} />,
    Overcast: <Cloud style={styles.icon} />,
    Drizzle: <CloudDrizzle style={styles.icon} />,
    Showers: <CloudRain style={styles.icon} />,
    'Freezing Rain': <CloudRain style={styles.icon} />,
    Sleet: <CloudRain style={styles.icon} />,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronóstico del Tiempo - Formosa, Argentina</Text>

      <ScrollView>
        <View style={styles.currentConditionsContainer}>
          <Text style={styles.currentConditionsTitle}>Condiciones actuales</Text>
          <View style={styles.currentConditions}>
            <View style={styles.currentConditionsInfo}>
              {weatherIcons[current.conditions] || <Droplet style={styles.icon} />}
              <Text style={styles.currentTemp}>{current.temp}°C</Text>
              <Text style={styles.currentCondition}>{currentCondition}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailText}>Sensación térmica: {current.feelslike}°C</Text>
              <Text style={styles.detailText}>Humedad: {current.humidity}%</Text>
              <Text style={styles.detailText}>Viento: {current.windspeed} km/h</Text>
            </View>
          </View>
        </View>

        <Card>
          <Text style={styles.detailsTitle}>Detalles</Text>
          <View style={styles.detailsContainer}>
            <DetailRow icon={<Sunrise />} label="Amanecer" value={current.sunrise} />
            <DetailRow icon={<Sunset />} label="Atardecer" value={current.sunset} />
            <DetailRow icon={<Umbrella />} label="Precipitación" value={`${current.precip} mm`} />
            <DetailRow icon={<Thermometer />} label="Presión" value={`${current.pressure} hPa`} />
          </View>
        </Card>

        <Card>
          <Text style={styles.forecastTitle}>Pronóstico por horas</Text>
          <View style={styles.hourlyForecastContainer}>
            {weatherData.days[0].hours.map((hour: any, index: number) => (
              <View key={index} style={styles.hourlyForecastItem}>
                <Text style={styles.hourText}>{hour.datetime.slice(0, 5)}</Text>
                {weatherIcons[hour.conditions] || <Droplet style={styles.iconSmall} />}
                <Text style={styles.hourTemp}>{hour.temp}°C</Text>
                <Text style={styles.hourCondition}>{hour.conditions}</Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.dailyForecastContainer}>
          {weatherData.days.slice(1, 8).map((day: any) => {
            const dailyCondition =
              {
                Clear: 'Despejado',
                'Partly Cloudy': 'Parcialmente Nublado',
                Cloudy: 'Nublado',
                Rain: 'Lluvia',
                Thunderstorms: 'Tormentas',
                Snow: 'Nieve',
                Fog: 'Niebla',
                Windy: 'Ventoso',
                Overcast: 'Cubierto',
                Drizzle: 'Llovizna',
                Showers: 'Aguaceros',
                'Freezing Rain': 'Lluvia Helada',
                Sleet: 'Aguacero de Hielo',
              }[day.conditions] || day.conditions;

            const dailyIcon = weatherIcons[day.conditions] || <Droplet style={styles.iconMedium} />;

            return (
              <Card key={day.datetime} style={styles.dailyCard}>
                <Text style={styles.dailyTitle}>
                  {new Date(day.datetime).toLocaleDateString('es-AR', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
                <View style={styles.dailyContent}>
                  <View style={styles.dailyInfo}>
                    {dailyIcon}
                    <View style={styles.dailyText}>
                      <Text style={styles.dailyTemp}>{day.temp}°C</Text>
                      <Badge>{dailyCondition}</Badge>
                    </View>
                  </View>
                  <View style={styles.dailyDetails}>
                    <Text style={styles.dailyDetailText}>Máx: {day.tempmax}°C</Text>
                    <Text style={styles.dailyDetailText}>Mín: {day.tempmin}°C</Text>
                  </View>
                </View>
                <View style={styles.dailyProbabilities}>
                  <Text style={styles.probabilityText}>Probabilidad de lluvia</Text>
                  <Progress value={day.precipprob} />
                  <Text style={styles.probabilityText}>Humedad</Text>
                  <Progress value={day.humidity} />
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const DetailRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailIcon}>{icon}</View>
    <Text>{label}</Text>
    <Text>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F8FF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  currentConditionsContainer: {
    marginBottom: 16,
    backgroundColor: '#E0F7FA',
    padding: 16,
    borderRadius: 8,
  },
  currentConditionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  currentConditions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentConditionsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentTemp: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  currentCondition: {
    fontSize: 18,
  },
  details: {
    alignItems: 'flex-end',
  },
  detailText: {
    fontSize: 16,
  },
  detailsContainer: {
    marginTop: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dailyForecastContainer: {
    marginTop: 16,
  },
  hourlyForecastContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hourlyForecastItem: {
    width: '20%',
    alignItems: 'center',
    marginBottom: 8,
  },
  hourText: {
    fontSize: 16,
  },
  hourTemp: {
    fontSize: 16,
  },
  hourCondition: {
    fontSize: 14,
  },
  dailyCard: {
    marginBottom: 16,
  },
  dailyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dailyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dailyText: {
    marginLeft: 8,
  },
  dailyTemp: {
    fontSize: 20,
  },
  dailyDetailText: {
    fontSize: 14,
  },
  dailyProbabilities: {
    marginTop: 8,
  },
  probabilityText: {
    fontSize: 14,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  iconSmall: {
    width: 30,
    height: 30,
  },
  iconMedium: {
    width: 35,
    height: 35,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailIcon: {
    marginRight: 8,
  },
});

export default WeatherPage;
