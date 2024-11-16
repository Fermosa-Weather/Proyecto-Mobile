import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Card from '@/components/ui/Card';
import Progress from '@/components/ui/Progress';
import Badge from '@/components/ui/Badge';

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
} from 'lucide-react-native';

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/formosa%20argentina?unitGroup=metric&key=UMQ9KWF37S9T6WL8J4WLN5Q23&contentType=json'
        );
        if (!response.ok) {
          throw new Error('Error al cargar los datos meteorológicos');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
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
    Clear: <Sun style={styles.icon} color="#FFD700" />,
    'Partly Cloudy': <Cloud style={styles.icon} color="#A9A9A9" />,
    Cloudy: <Cloud style={styles.icon} color="#708090" />,
    Rain: <CloudRain style={styles.icon} color="#4682B4" />,
    Thunderstorms: <CloudLightning style={styles.icon} color="#4B0082" />,
    Snow: <Snowflake style={styles.icon} color="#E0FFFF" />,
    Fog: <CloudFog style={styles.icon} color="#D3D3D3" />,
    Windy: <Wind style={styles.icon} color="#00CED1" />,
    Overcast: <Cloud style={styles.icon} color="#708090" />,
    Drizzle: <CloudDrizzle style={styles.icon} color="#B0E0E6" />,
    Showers: <CloudRain style={styles.icon} color="#4682B4" />,
    'Freezing Rain': <CloudRain style={styles.icon} color="#87CEFA" />,
    Sleet: <CloudRain style={styles.icon} color="#B0C4DE" />,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pronóstico del Tiempo - Formosa, Argentina</Text>

      <ScrollView>
        <View style={styles.currentConditionsContainer}>
          <Text style={styles.currentConditionsTitle}>Condiciones actuales</Text>
          <View style={styles.currentConditions}>
            <View style={styles.currentConditionsInfo}>
              {weatherIcons[current.conditions] || <Droplet style={styles.icon} color="#4A90E2" />}
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

        <Card style={styles.card}>
          <Text style={styles.detailsTitle}>Detalles</Text>
          <View style={styles.detailsContainer}>
            <DetailRow icon={<Sunrise color="#FF6347" />} label="Amanecer" value={current.sunrise} />
            <DetailRow icon={<Sunset color="#FF4500" />} label="Atardecer" value={current.sunset} />
            <DetailRow icon={<Umbrella color="#4682B4" />} label="Precipitación" value={`${current.precip} mm`} />
            <DetailRow icon={<Thermometer color="#FF6347" />} label="Presión" value={`${current.pressure} hPa`} />
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.forecastTitle}>Pronóstico por horas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyForecastContainer}>
            {weatherData.days[0].hours.map((hour: any, index: number) => (
              <View key={index} style={styles.hourlyForecastItem}>
                <Text style={styles.hourText}>{hour.datetime.slice(0, 5)}</Text>
                {weatherIcons[hour.conditions] || <Droplet style={styles.iconSmall} color="#4A90E2" />}
                <Text style={styles.hourTemp}>{hour.temp}°C</Text>
                <Text style={styles.hourCondition}>{hour.conditions}</Text>
              </View>
            ))}
          </ScrollView>
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

            const dailyIcon = weatherIcons[day.conditions] || <Droplet style={styles.iconMedium} color="#4A90E2" />;

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
                      <Badge style={styles.badge}>{dailyCondition}</Badge>
                    </View>
                  </View>
                  <View style={styles.dailyDetails}>
                    <Text style={styles.dailyDetailText}>Máx: {day.tempmax}°C</Text>
                    <Text style={styles.dailyDetailText}>Mín: {day.tempmin}°C</Text>
                  </View>
                </View>
                <View style={styles.dailyProbabilities}>
                  <Text style={styles.probabilityText}>Probabilidad de lluvia</Text>
                  <Progress value={day.precipprob} style={styles.progress} />
                  <Text style={styles.probabilityText}>Humedad</Text>
                  <Progress value={day.humidity} style={styles.progress} />
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
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E6E6FA', // Light purple background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 18,
    color: '#4A90E2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#4B0082', // Indigo
  },
  currentConditionsContainer: {
    marginBottom: 16,
    backgroundColor: '#E0F7FA', // Light cyan
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentConditionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1E90FF', // Dodger blue
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
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#4169E1', // Royal blue
  },
  currentCondition: {
    fontSize: 16,
    color: '#4682B4', // Steel blue
  },
  details: {
    marginLeft: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#4682B4', // Steel blue
  },
  card: {
    backgroundColor: '#F0F8FF', // Alice blue
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsContainer: {
    padding: 8,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4B0082', // Indigo
  },
  dailyForecastContainer: {
    marginTop: 16,
  },
  hourlyForecastContainer: {
    marginTop: 8,
  },
  hourlyForecastItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  hourText: {
    fontSize: 12,
    color: '#4682B4', // Steel blue
  },
  hourTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4169E1', // Royal blue
  },
  hourCondition: {
    fontSize: 12,
    color: '#4682B4', // Steel blue
  },
  dailyCard: {
    marginBottom: 16,
    backgroundColor: '#E6E6FA', // Lavender
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dailyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0082', // Indigo
  },
  dailyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  dailyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dailyText: {
    marginLeft: 8,
  },
  dailyTemp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4169E1', // Royal blue
  },
  dailyProbabilities: {
    marginTop: 8,
  },
  probabilityText: {
    fontSize: 14,
    color: '#4682B4', // Steel blue
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailLabel: {
    flex: 1,
    fontSize: 14,
    color: '#4682B4', // Steel blue
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4169E1', // Royal blue
  },
  icon: {
    width: 40,
    height: 40,
  },
  iconSmall: {
    width: 24,
    height: 24,
  },
  iconMedium: {
    width: 32,
    height: 32,
  },
  badge: {
    backgroundColor:  '#B0E0E6', // Powder blue
    borderColor: '#4682B4', // Steel blue
  },
  progress: {
    backgroundColor: '#B0E0E6', // Powder blue
    fillColor: '#4169E1', // Royal blue
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4B0082', // Indigo
  },
  dailyDetails: {
    alignItems: 'flex-end',
  },
  dailyDetailText: {
    fontSize: 14,
    color: '#4682B4', // Steel blue
  },
});

export default WeatherPage;