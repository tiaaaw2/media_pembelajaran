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
import db from '../database'; // SESUAIKAN PATH DB KAMU

const Regis = () => {
  const navigation = useNavigation();

  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');

  const handleRegister = () => {
    if (!nama || !username || !password || !konfirmasiPassword) {
      Alert.alert('Peringatan', 'Semua field wajib diisi');
      return;
    }

    if (password !== konfirmasiPassword) {
      Alert.alert('Error', 'Password tidak sama');
      return;
    }

    db.transaction(tx => {
      // Cek username sudah ada atau belum
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (_, result) => {
          if (result.rows.length > 0) {
            Alert.alert('Error', 'Username sudah digunakan');
          } else {
            // Insert user baru
            tx.executeSql(
              `INSERT INTO users (username, password, role, nama, foto)
               VALUES (?, ?, ?, ?, ?)`,
              [username, password, 'user', nama, null],
              () => {
                Alert.alert('Sukses', 'Registrasi berhasil', [
                  {
                    text: 'OK',
                    onPress: () => navigation.replace('Login'),
                  },
                ]);
              },
              error => {
                console.log(error);
                Alert.alert('Error', 'Registrasi gagal');
              },
            );
          }
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Nama Lengkap"
        value={nama}
        onChangeText={setNama}
        style={styles.input}
      />

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TextInput
        placeholder="Konfirmasi Password"
        secureTextEntry
        value={konfirmasiPassword}
        onChangeText={setKonfirmasiPassword}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Sudah punya akun?</Text>
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
    backgroundColor: '#F2F4F8',
    borderRadius: 15,
    padding: 16,
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
