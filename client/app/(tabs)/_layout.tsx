import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import LoginScreen from './login'; // Import the Login screen

const { width, height } = Dimensions.get('window');

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: 'Acerca de',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'ios-information-circle' : 'ios-information-circle-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="noticias"
        options={{
          title: 'Noticias',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'newspaper' : 'newspaper-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: 'El Tiempo',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cloud' : 'cloud-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'location' : 'location-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Iniciar sesión',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 70 : 60, // Mayor altura para iOS
    paddingBottom: Platform.OS === 'ios' ? 10 : 5,
    paddingTop: Platform.OS === 'ios' ? 10 : 5,
    width: '100%', // Ajustar al 100% del ancho disponible
    alignSelf: 'center',
    borderRadius: 20, // Bordes redondeados para mejor estética
    backgroundColor: '#fff', // Fondo blanco para mayor contraste
    shadowColor: '#000', // Sombra para iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Elevación para Android
    position: 'absolute',
    bottom: 0, // Colocar la barra en la parte inferior
    left: 0,
    right: 0,
    paddingHorizontal: 10, // Asegurarse de que no toque los bordes
  },
});
