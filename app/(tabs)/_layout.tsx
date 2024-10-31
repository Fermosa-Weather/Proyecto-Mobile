import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
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
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Acerca',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'info' : 'info-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login" // Nombre de la ruta de la pantalla de Login
        options={{
          title: 'Iniciar Sesión',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} /> // Ícono para Login
          ),
        }}
      />
      <Tabs.Screen
        name="noticias" // Nombre de la ruta de la pantalla de Noticias
        options={{
          title: 'Noticias',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'newspaper' : 'newspaper-outline'} color={color} /> // Ícono para Noticias
          ),
        }}
      />
      <Tabs.Screen
        name="weather" // Nombre de la ruta de la pantalla de Weather
        options={{
          title: 'Clima', // Título de la pestaña
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cloud' : 'cloud-outline'} color={color} /> // Ícono para Clima
          ),
        }}
      />
      <Tabs.Screen
        name="map" // Nombre de la ruta de la pantalla de Mapa
        options={{
          title: 'Mapa', // Título de la pestaña
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} /> // Ícono para Mapa
          ),
        }}
      />
    </Tabs>
  );
}
