import React from 'react';
import { View, StyleSheet } from 'react-native';

const Weather: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Aquí puedes agregar otros componentes o contenido relacionado con "Tiempo" */}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
  },
});
