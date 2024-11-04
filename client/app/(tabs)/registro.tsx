import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, CheckBox } from 'react-native';
//import { FaEnvelope, FaTag, FaUser, FaLock } from 'react-icons/fa'; // Nota: Los íconos pueden no funcionar en React Native
//import axios from '../../api/axiosInstance';
import { useNavigation } from '@react-navigation/native'; 
import Swal from 'sweetalert2'; // Asegúrate de tener esta biblioteca para alertas

// Imagen de contacto
// import contactoImage from '../../../src/images2/register_2.jpg';

export function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false, // Para términos y condiciones
    });

    const { name, email, password, confirmPassword, terms } = formData;
    const navigation = useNavigation(); // Hook para redirigir

    const handleChange = (field: string, value: string | boolean) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        // Validar si las contraseñas coinciden
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        if (!terms) {
            Alert.alert('Error', 'Debes aceptar los términos y condiciones');
            return;
        }

        try {
            // Enviar los datos del formulario al backend
            await axios.post('/auth/register', { name, email, password });
            Alert.alert('Éxito', 'Usuario registrado con éxito');

            // Limpiar el formulario
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                terms: false,
            });

            // Redirigir al login después del registro exitoso
            navigation.navigate('cuenta'); // Ruta para el componente LoginPage
        } catch (err) {
            Alert.alert('Error', err.response?.data?.message || 'Error al registrar');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <Image
                    source={contactoImage}
                    style={styles.image}
                    resizeMode="cover"
                />

                <Text style={styles.title}>Crear cuenta</Text>
                <Text style={styles.subtitle}>Regístrate para obtener una cuenta</Text>

                <View style={styles.inputContainer}>
                    <View style={styles.inputGroup}>
                        <FaUser style={styles.icon} />
                        <TextInput
                            value={name}
                            onChangeText={(value) => handleChange('name', value)}
                            placeholder="Ingrese su nombre completo"
                            style={styles.input}
                            required
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <FaEnvelope style={styles.icon} />
                        <TextInput
                            value={email}
                            onChangeText={(value) => handleChange('email', value)}
                            placeholder="Ingrese su correo"
                            style={styles.input}
                            required
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <FaLock style={styles.icon} />
                        <TextInput
                            value={password}
                            onChangeText={(value) => handleChange('password', value)}
                            placeholder="Ingrese su contraseña"
                            secureTextEntry
                            style={styles.input}
                            required
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <FaLock style={styles.icon} />
                        <TextInput
                            value={confirmPassword}
                            onChangeText={(value) => handleChange('confirmPassword', value)}
                            placeholder="Confirme su contraseña"
                            secureTextEntry
                            style={styles.input}
                            required
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={terms}
                            onValueChange={() => handleChange('terms', !terms)}
                        />
                        <Text style={styles.checkboxLabel}>Acepto los términos y condiciones</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>

                    <Text style={styles.footerText}>
                        ¿Ya tienes una cuenta? 
                        <Text onPress={() => navigation.navigate('cuenta')} style={styles.link}> Iniciar sesión</Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F9FAFB',
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    subtitle: {
        textAlign: 'center',
        color: '#4B5563',
    },
    inputContainer: {
        marginTop: 20,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 4,
        marginBottom: 15,
    },
    icon: {
        padding: 10,
        color: '#6B7280',
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    checkboxLabel: {
        marginLeft: 10,
        color: '#374151',
    },
    button: {
        backgroundColor: '#4F46E5',
        borderRadius: 4,
        paddingVertical: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    footerText: {
        textAlign: 'center',
        marginTop: 15,
        color: '#6B7280',
    },
    link: {
        color: '#4F46E5',
        textDecorationLine: 'underline',
    },
});
