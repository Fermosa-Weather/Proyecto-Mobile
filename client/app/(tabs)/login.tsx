import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ScrollView } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Reemplaza con la URL de tu API backend
    const url = 'http://localhost:4000/api';

    // Datos que enviarás al backend
    const payload = {
      email: email,
      password: password,
    };

    try {
      // Enviar la solicitud POST al backend
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Verificar si la respuesta es exitosa
      if (response.ok) {
        const data = await response.json();

        // Si el login es exitoso (según los datos de la respuesta)
        if (data.success) {
          Alert.alert('¡Inicio de sesión exitoso!', 'Has iniciado sesión correctamente.');
          navigation.replace('index'); // O cualquier otra pantalla en tus Tabs
        } else {
          Alert.alert('Error de inicio de sesión', data.message || 'Credenciales inválidas.');
        }
      } else {
        Alert.alert('Error', 'Algo salió mal. Por favor, intenta nuevamente más tarde.');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      Alert.alert('Error', 'Error de red. Por favor, revisa tu conexión a internet.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Iniciar sesión" onPress={handleLogin} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // para sombra en Android
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
