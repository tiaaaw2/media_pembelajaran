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

  // FUNCTION LOGIN
  const handleLogin = () => {

    db.transaction(tx => {

      tx.executeSql(
        'SELECT * FROM pengguna WHERE username=? AND password=?',
        [username, password],

        (txObj, resultSet) => {

          // JIKA USER DITEMUKAN
          if (resultSet.rows.length > 0) {

            const user = resultSet.rows.item(0);

            // CEK ROLE
            if (user.role === 'admin') {

              navigation.replace('HomeAdmin');

            } else {

              navigation.replace('Home');

            }

          } else {

            Alert.alert(
              'Login Gagal',
              'Username atau password salah'
            );

          }

        },

        (txObj, error) => {
  console.log(JSON.stringify(error));
}
      );

    });

  };

  return (
    <View style={styles.container}>

      {/* Judul */}
      <Text style={styles.title}>Login</Text>

      {/* Username */}
      <TextInput
        placeholder="Username"
        placeholderTextColor="#999"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
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

      {/* Tombol Login */}
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>

      {/* Register */}
      <View style={styles.registerContainer}>

        <Text style={styles.registerText}>
          Belum punya akun?
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Regis')}
        >
          <Text style={styles.registerLink}>
            {' '}Daftar
          </Text>
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