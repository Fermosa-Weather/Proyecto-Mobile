import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/images/fondo2.jpg')} 
      style={styles.background} // Usamos un solo estilo aquí
      resizeMode="cover" // Cambiado a "cover" para ajustar la imagen
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenido a CIFOR</Text>
          <Text style={styles.description}>
            Aquí encontrarás toda la información meteorológica que necesitas para mantenerte actualizado sobre el
            clima en tu región. Desde pronósticos detallados hasta mapas interactivos, nuestro sitio web te brinda las
            herramientas y datos precisos que necesitas para planificar tus actividades con confianza.
          </Text>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.btnText}>Ver más</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/images/logo-cifor.png')}
          style={styles.image}
          resizeMode="contain"
          accessibilityLabel="Imagen del clima"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ocupar toda la pantalla
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center', // Centrar horizontalmente
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    maxWidth: 350,
    marginLeft: -600, // Mantén este valor para mover el contenedor más a la izquierda
  },
  content: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0c443a',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#0c443a',
    textAlign: 'justify',
    maxWidth: 700,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#25d1b2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
});
