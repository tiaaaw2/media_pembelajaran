import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from '../database';
import CustomModal from './components/CustomModal'; // pastikan path sesuai

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // state modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success'); // success, error, warning
  const [modalClose, setModalClose] = useState(() => () => setModalVisible(false));

  const handleLogin = () => {
    if (!username || !password) {
      setModalTitle('Peringatan');
      setModalMessage('Username dan password wajib diisi');
      setModalType('warning');
      setModalVisible(true);
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (_, result) => {
          if (result.rows.length > 0) {
            const user = result.rows.item(0);

            setModalTitle('Login Berhasil');
            setModalMessage(`Selamat datang ${user.nama}`);
            setModalType('success');
            setModalVisible(true);

            const onCloseModal = () => {
              setModalVisible(false);
              if (user.role === 'admin') navigation.replace('AdminTabs');
              else navigation.replace('UserTabs');
            };

            setModalClose(() => onCloseModal);
          } else {
            setModalTitle('Error');
            setModalMessage('Username atau password salah');
            setModalType('error');
            setModalVisible(true);
          }
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text>Belum punya akun?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Regis')}>
          <Text style={styles.registerLink}> Daftar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <CustomModal
        visible={modalVisible}
        onClose={modalClose}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F5F7FB' },
  title: { fontSize: 32, fontWeight: '700', textAlign: 'center', marginBottom: 50, color: '#4A6CF7' },
  input: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
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
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
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
