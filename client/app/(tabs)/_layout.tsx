import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Dimensions, Platform, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width, height } = Dimensions.get('window');

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: styles.tabBarContainer,
        tabBarBackground: () => (
          <LinearGradient
            colors={['#4B0082', '#0000FF']} // Gradiente de violeta a azul
            start={[0, 0]} // Esquina superior izquierda
            end={[1, 1]} // Esquina inferior derecha
            style={StyleSheet.absoluteFillObject} // Rellenar todo el espacio disponible
          />
        ),
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
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    height: Platform.OS === 'ios' ? 70 : 60, // Altura ajustada para iOS y Android
    paddingBottom: Platform.OS === 'ios' ? 10 : 5,
    paddingTop: Platform.OS === 'ios' ? 10 : 5,
    width: '100%', // Ancho completo
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden', // Asegura que el gradiente no se desborde
    paddingHorizontal: 10, // Margen horizontal
  },
});
