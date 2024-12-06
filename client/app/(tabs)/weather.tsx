import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Dimensions, LogBox } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Importar íconos de clima
import sol from '../../images/icons_weather/sol.png';
import nubes from '../../images/icons_weather/parcialmente_nublado.png';
import parcialmente_nublado from '../../images/icons_weather/nube.png';
import lluvia from '../../images/icons_weather/lluvia.png';
import tormenta from '../../images/icons_weather/tormenta.png';
import nieve from '../../images/icons_weather/niieve.png';
import niebla from '../../images/icons_weather/niebla.png';
import viento from '../../images/icons_weather/viento.png';
import llovizna from '../../images/icons_weather/llovizna.png';

const LoadingSpinner = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.loadingText}>Cargando datos del tiempo...</Text>
  </View>
);

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/formosa%20argentina?unitGroup=metric&key=UMQ9KWF37S9T6WL8J4WLN5Q23&contentType=json');
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const monthsOfYear = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const currentDate = new Date();
  const formattedDate = `${daysOfWeek[currentDate.getDay()]} ${currentDate.getDate()} de ${monthsOfYear[currentDate.getMonth()]}`;

  const current = weatherData.currentConditions;
  const possibleConditions = {
    'Clear': 'Despejado',
    'Partially cloudy': 'Parcialmente Nublado',
    'Rain, Partially cloudy':'Lluvia,Parcial',
    'Cloudy': 'Nublado',
    'Rain': 'Lluvia',
    'Rain, Overcast': 'Lluvia, Cubierto',
    'Rain, Partially cloudy': 'Lluvia, Parcialmente Nublado',
    'Thunderstorms': 'Tormentas',
    'Snow': 'Nieve',
    'Fog': 'Niebla',
    'Windy': 'Ventoso',
    'Overcast': 'Cubierto',
    'Drizzle': 'Llovizna',
    'Showers': 'Aguaceros',
    'Freezing Rain': 'Lluvia Helada',
    'Sleet': 'Aguacero de Hielo',
  };
  const currentCondition = possibleConditions[current.conditions as keyof typeof possibleConditions] || current.conditions;

  const weatherIcons: { [key: string]: any } = {
    'Clear': sol,
    'Partially cloudy': nubes,
    'Cloudy': nubes,
    'Rain': lluvia,
    'Thunderstorms': tormenta,
    'Snow': nieve,
    'Fog': niebla,
    'Windy': viento,
    'Overcast': parcialmente_nublado,
    'Drizzle': llovizna,
    'Showers': lluvia,
    'Freezing Rain': lluvia,
    'Sleet': lluvia,
  };

  const getIcon = (condition: string) => {
    for (const conditionKey in weatherIcons) {
      if (condition.startsWith(conditionKey)) {
        return weatherIcons[conditionKey];
      }
    }
    return null;
  };

  const labels = weatherData.days.slice(1, 16).map((day: any) => new Date(day.datetime).toLocaleDateString('es-AR', { weekday: 'short' }));
  const maxTemps = weatherData.days.slice(1, 16).map((day: any) => day.tempmax);
  const minTemps = weatherData.days.slice(1, 16).map((day: any) => day.tempmin);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pronóstico del Tiempo - Formosa, Argentina</Text>
      <Text style={styles.date}>{formattedDate}</Text>

      <View style={styles.currentConditions}>
        <View style={styles.currentMain}>
          <Image source={getIcon(current.conditions)} style={styles.weatherIcon} />
          <View>
            <Text style={styles.temperature}>{current.temp}°C</Text>
            <Text style={styles.condition}>{currentCondition}</Text>
          </View>
        </View>
        <View style={styles.currentDetails}>
          <Text style={styles.detailText}>Sensación térmica: {current.feelslike}°C</Text>
          <Text style={styles.detailText}>Humedad: {current.humidity}%</Text>
          <Text style={styles.detailText}>Viento: {current.windspeed} km/h</Text>
        </View>
      </View>
      <View style={styles.card}>
  <Text style={styles.cardTitle}>Detalles</Text>
  <View style={styles.detailsGrid}>
    <Text style={styles.detailText}>Amanecer: {current.sunrise}</Text>
    <Text style={styles.detailText}>Atardecer: {current.sunset}</Text>
    <Text style={styles.detailText}>Precipitación: {current.precip ? `${current.precip} mm` : "N/A"}</Text>
    <Text style={styles.detailText}>Presión: {current.pressure} hPa</Text>
  </View>
</View>


      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pronóstico por horas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {weatherData.days[0].hours.map((hour: any, index: number) => (
            <View key={index} style={styles.hourlyForecast}>
              <Text style={styles.hourlyTime}>{hour.datetime.slice(0, 5)}</Text>
              <Image source={getIcon(hour.conditions)} style={styles.smallWeatherIcon} />
              <Text style={styles.hourlyTemp}>{hour.temp}°C</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.dailyForecastContainer}>
        {weatherData.days.slice(1, 10).map((day: any, index: number) => (
          <View key={index} style={styles.dailyForecast}>
            <Text style={styles.dailyDate}>
              {new Date(day.datetime).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' })}
            </Text>
            <Image source={getIcon(day.conditions)} style={styles.smallWeatherIcon} />
            <View style={styles.dailyTemps}>
              <Text style={styles.maxTemp}>{day.tempmax}°C</Text>
              <Text style={styles.minTemp}>{day.tempmin}°C</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.chartContainer}>
        {/* Código para el gráfico */}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  currentConditions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  currentMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  temperature: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 16,
    color: '#555',
  },
  currentDetails: {
    justifyContent: 'space-around',
  },
  detailText: {
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hourlyForecast: {
    width: 60,
    alignItems: 'center',
    marginRight: 10,
  },
  hourlyTime: {
    fontSize: 12,
    marginBottom: 4,
  },
  smallWeatherIcon: {
    width: 30,
    height: 30,
    marginBottom: 4,
  },
  hourlyTemp: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dailyForecastContainer: {
    marginBottom: 20,
  },
  dailyForecast: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dailyDate: {
    fontSize: 14,
    marginRight: 8,
  },
  dailyTemps: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  maxTemp: {
    fontSize: 16,
    color: '#f44336',
  },
  minTemp: {
    fontSize: 16,
    color: '#2196f3',
    marginLeft: 8,
  },
  chartContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  detailsGrid: {
    flexDirection: 'row',   // Los elementos estarán uno al lado del otro
    justifyContent: 'space-between',  // Espacio igual entre cada elemento
    alignItems: 'center',  // Alineación centrada verticalmente
    marginTop: 10,
  },
  detailText: {
    flex: 1,  // Hace que cada texto ocupe el mismo espacio
    textAlign: 'center',  // Alineación centrada
  },
  
});

export default WeatherPage;
