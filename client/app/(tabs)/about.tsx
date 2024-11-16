import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de importar el icono

const AcercaNosotros = () => {
  const navigation = useNavigation();

  // Definir screenWidth
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Icon name="info-circle" size={30} color="#1565c0" style={styles.icon} />
            <Text style={styles.header}>Sobre CIFOR</Text>
          </View>

          <View style={styles.block}>
            <Text style={styles.paragraph}>
              En <Text style={styles.boldText}>CIFOR</Text> nos dedicamos a proporcionar datos climáticos precisos y en tiempo real de toda la provincia de Formosa, 
              recopilados de nuestras 10 estaciones meteorológicas. Nuestro objetivo es mejorar los pronósticos del tiempo, desarrollar modelos 
              agrícolas y generar estadísticas climáticas confiables, contribuyendo así al conocimiento y la gestión del cambio climático.
            </Text>
          </View>

          <View style={[styles.block, styles.mission]}>
            <Text style={styles.sectionHeader}>Nuestra Misión</Text>
            <Text style={styles.paragraph}>
              Mejorar la precisión de los pronósticos meteorológicos para la provincia de Formosa mediante la recopilación y análisis de datos 
              de nuestras estaciones meteorológicas. Queremos apoyar a los agricultores y a la comunidad en general con información confiable 
              para la gestión del cambio climático.
            </Text>
          </View>

          <View style={[styles.block, styles.vision]}>
            <Text style={styles.sectionHeader}>Nuestra Visión</Text>
            <Text style={styles.paragraph}>
              Ser la principal fuente de datos climáticos en Formosa, expandiendo nuestras capacidades y mejorando continuamente la calidad 
              y precisión de nuestras predicciones. Buscamos ser un referente en la investigación y desarrollo de soluciones para el cambio 
              climático y el manejo agrícola.
            </Text>
          </View>

          <View style={[styles.block, styles.contact]}>
            <Text style={styles.sectionHeader}>Contáctanos</Text>
            <Text style={styles.paragraph}>
              Nuestro equipo de soporte está aquí para ayudarte. Revisaremos tu consulta con la mayor prontitud posible y nos pondremos en contacto contigo a la brevedad.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Celeste claro de fondo
    padding: 16,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 900,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10, // Espacio entre el icono y el texto
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1565c0', // Azul oscuro
  },
  block: {
    marginBottom: 16,
    padding: 18,
    backgroundColor: '#b3e5fc', // Fondo celeste suave
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  mission: {
    backgroundColor: '#81d4fa', // Azul claro para misión
  },
  vision: {
    backgroundColor: '#4fc3f7', // Azul medio para visión
  },
  contact: {
    backgroundColor: '#29b6f6', // Azul más oscuro para contacto
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#01579b', // Azul oscuro
  },
  paragraph: {
    fontSize: 16,
    color: '#0d47a1', // Azul más oscuro
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#0277bd', // Azul para resaltar
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#1565c0', // Azul intenso para botón
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AcercaNosotros;
