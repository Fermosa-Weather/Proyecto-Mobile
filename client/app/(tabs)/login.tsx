import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { LockIcon, MailIcon } from 'lucide-react-native'; // Ensure you have the correct version
import { useNavigation } from '@react-navigation/native';
//import axios from '../../api/axiosInstance'; // Verify this path is correct
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure AsyncStorage is installed

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(''); // Clear any previous message

    try {
      // Send a POST request to the backend with user credentials
      const response = await axios.post('/auth/login', {
        email,
        password,
      });

      // Store the token in local storage
      await AsyncStorage.setItem('token', response.data.token);

      // Redirect to the station info page
      navigation.navigate('InfoEstacion'); // Ensure this route name is defined
    } catch (error) {
      console.error('Error during login:', error);
      setMessage(error.response?.data.error || 'Error during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.loginBackground}>
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>Bienvenido</Text>
        <Text style={styles.loginSubtitle}>Inicia sesión en tu cuenta</Text>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Correo Electrónico</Text>
            <View style={styles.inputContainer}>
              <MailIcon style={styles.icon} size={18} />
              <TextInput 
                style={styles.formInput}
                placeholder="tu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                required 
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Contraseña</Text>
            <View style={styles.inputContainer}>
              <LockIcon style={styles.icon} size={18} />
              <TextInput 
                style={styles.formInput}
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                required 
              />
            </View>
          </View>

          <View style={styles.formActions}>
            <TouchableOpacity style={styles.checkboxContainer}>
              <Text style={styles.checkboxLabel}>Recordarme</Text>
              {/* Implement state for this checkbox if needed */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Iniciar Sesión</Text>}
          </TouchableOpacity>

          {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
        </View>

        <View style={styles.footer}>
          <Text style={styles.signupText}>
            ¿No tienes una cuenta?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
              <Text style={styles.signupLink}>Regístrate</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginBackground: {
    flex: 1,
    backgroundColor: '#0b3252',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginCard: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 16,
    elevation: 5,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#246eee',
    textAlign: 'center',
  },
  loginSubtitle: {
    color: '#718096',
    textAlign: 'center',
  },
  form: {
    marginVertical: 16,
  },
  formGroup: {
    marginBottom: 12,
  },
  formLabel: {
    fontSize: 16,
    color: '#4a5568',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  icon: {
    marginRight: 8,
  },
  formInput: {
    flex: 1,
    fontSize: 16,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#4a5568',
  },
  forgotPassword: {
    color: '#6d28d9',
  },
  submitButton: {
    backgroundColor: '#6d28d9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  errorMessage: {
    color: '#e53e3e',
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#4a5568',
  },
  signupLink: {
    color: '#6d28d9',
  },
});

// Export the component by default
export default Login;
