import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Regis = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Judul */}
      <Text style={styles.title}>Register</Text>

      {/* Input Nama */}
      <TextInput
        placeholder="Nama Lengkap"
        placeholderTextColor="#999"
        style={styles.input}
      />

      {/* Input Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        style={styles.input}
      />

      {/* Input Password */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
      />

      {/* Input Konfirmasi Password */}
      <TextInput
        placeholder="Konfirmasi Password"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
      />

      {/* Tombol Register */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>

      {/* Link Login */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>sudah punya akun?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Regis;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4A6CF7',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderRadius: 10,
    padding: 17,
    backgroundColor: '#F2F4F8',
    borderRadius: 15,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4A6CF7',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  loginText: {
    color: '#555',
  },

  loginLink: {
    color: '#4A6CF7',
    fontWeight: 'bold',
  },
});
