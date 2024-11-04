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
} from 'lucide-react-native'; // Asegúrate de tener los íconos en React Native

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
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  currentCondition: {
    fontSize: 16,
  },
  details: {
    marginLeft: 16,
  },
  detailText: {
    fontSize: 14,
  },
  detailsContainer: {
    padding: 16,
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
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  hourlyForecastItem: {
    alignItems: 'center',
  },
  hourText: {
    fontSize: 12,
  },
  hourTemp: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hourCondition: {
    fontSize: 12,
  },
  dailyCard: {
    marginBottom: 16,
    backgroundColor: '#E1BEE7',
    borderRadius: 8,
    padding: 16,
  },
  dailyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  dailyProbabilities: {
    marginTop: 8,
  },
  probabilityText: {
    fontSize: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 8,
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
});

export default WeatherPage;
