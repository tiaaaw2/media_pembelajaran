import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import db from '../database';

const Regis = () => {

  const navigation = useNavigation();

  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');

  // FUNCTION REGISTER
  const handleRegister = () => {

    // VALIDASI
    if (
      nama === '' ||
      username === '' ||
      password === '' ||
      konfirmasiPassword === ''
    ) {

      Alert.alert('Semua field wajib diisi');
      return;

    }

    // PASSWORD TIDAK SAMA
    if (password !== konfirmasiPassword) {

      Alert.alert('Password tidak sama');
      return;

    }

    // INSERT DATABASE
    db.transaction(tx => {

      tx.executeSql(
        `INSERT INTO pengguna
        (username, password, role, nama)
        VALUES (?, ?, ?, ?)`,
        [username, password, 'user', nama],

        () => {

          Alert.alert(
            'Berhasil',
            'Akun berhasil dibuat'
          );

          navigation.navigate('Login');

        },

        error => {
          console.log(error);
        }
      );

    });

  };

  return (
    <View style={styles.container}>

      {/* Judul */}
      <Text style={styles.title}>Register</Text>

      {/* Input Nama */}
      <TextInput
        placeholder="Nama Lengkap"
        placeholderTextColor="#999"
        style={styles.input}
        value={nama}
        onChangeText={setNama}
      />

      {/* Input Username */}
      <TextInput
        placeholder="Username"
        placeholderTextColor="#999"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      {/* Input Password */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Input Konfirmasi Password */}
      <TextInput
        placeholder="Konfirmasi Password"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        value={konfirmasiPassword}
        onChangeText={setKonfirmasiPassword}
      />

      {/* Tombol Register */}
      <TouchableOpacity
        onPress={handleRegister}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>

      {/* Link Login */}
      <View style={styles.loginContainer}>

        <Text style={styles.loginText}>
          Sudah punya akun?
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginLink}>
            {' '}Login
          </Text>
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