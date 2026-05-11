import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import db from '../database';


const Login = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // FUNCTION LOGIN
  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Warning', 'Username dan password wajib diisi');
      return;
    }

    setLoading(true);

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM pengguna WHERE username=? AND password=?',
        [username, password],
        (txObj, resultSet) => {
          setLoading(false);

          try {
            if (resultSet.rows.length > 0) {
              const user = resultSet.rows.item(0);

              // redirect sesuai role
              if (user.role === 'admin') {
                navigation.replace('HomeAdmin', { user });
              } else {
                navigation.replace('Home', { user });
              }
            } else {
              Alert.alert('Login gagal', 'Username atau password salah');
            }
          } catch (error) {
            console.log('Parse Error:', error);
            Alert.alert('Error', 'Terjadi kesalahan saat login');
          }
        },
        (txObj, error) => {
          setLoading(false);
          console.log('DB Error:', error);
          Alert.alert('Error', 'Terjadi kesalahan database');
        }
      );
    });
  };

  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>Login</Text>

      {/* Username */}
      <TextInput
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Button Login */}
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : 'Masuk'}
        </Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text>Belum punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Regis')}>
          <Text style={styles.registerLink}> Daftar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F5F7FB' },
  title: { fontSize: 32, fontWeight: '700', textAlign: 'center', marginBottom: 50, color: '#4A6CF7' },
  input: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4A6CF7',
    textAlign: 'center',
    marginBottom: 40,
  },

  input: {
    padding: 17,
    backgroundColor: '#F2F4F8',
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D1D9E6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    fontSize: 16,
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

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#4A6CF7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  registerLink: { color: '#4A6CF7', fontWeight: '700', marginLeft: 5 },
});