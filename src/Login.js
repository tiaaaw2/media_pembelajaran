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

      {/* Register */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Belum punya akun?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Regis')}>
          <Text style={styles.registerLink}> Daftar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Login;

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
    marginBottom: 40,
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

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  registerText: {
    color: '#555',
  },

  registerLink: {
    color: '#4A6CF7',
    fontWeight: 'bold',
  },
});