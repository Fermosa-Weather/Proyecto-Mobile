import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Para navegar entre pantallas

const AcercaNosotros = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Sobre RAF Estaciones</Text>
        
        <View style={styles.block}>
          <Text style={styles.paragraph}>
            En <Text style={styles.boldText}>RAF</Text> nos dedicamos a proporcionar datos climáticos precisos y en tiempo real de toda la provincia de Formosa, 
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6d28d9',
    padding: 16,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 900,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#fff',
  },
  block: {
    marginBottom: 16,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
  
  },
  mission: {
    backgroundColor: 'rgba(37, 99, 235, 0.3)',
  },
  vision: {
    backgroundColor: 'rgba(79, 70, 229, 0.3)',
  },
  contact: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#fff',
  },
  paragraph: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#6d28d9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AcercaNosotros;
