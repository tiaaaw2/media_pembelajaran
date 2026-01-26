import { useNavigation } from '@react-navigation/native';
import { Camera } from 'lucide-react-native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Profil = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Profile Image */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.cameraIcon}>
          <Camera size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="  Shamim Hossain" />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="yourmail@gmail.com"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} placeholder="  @shamimGraphics" />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="    ********"
        secureTextEntry
      />

      <Text style={styles.label}>Date</Text>
      <TextInput style={styles.input} placeholder="  09 / 2022" />

      {/* Logout Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.logoutBtn}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profil;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 40,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#4A6CF7',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#4A6CF7',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: '#555',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F2F4F8',
    borderRadius: 15,
    padding: 17,
    fontSize: 14,
    marginBottom: 15,
  },
  logoutBtn: {
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor: '#FFECEC',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  logoutText: {
    color: '#FF4D4D',
    fontWeight: '600',
  },
});
