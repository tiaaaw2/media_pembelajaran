import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  BookPlus,
  List,
  LogOut,
  ChevronRight,
  Calculator,
} from 'lucide-react-native';

import { useNavigation } from '@react-navigation/native';

const dataAdmin = [
  {
    id: 1,
    title: 'Tambah Materi',
    subtitle: 'Menambahkan materi pembelajaran',
    screen: 'Materi',
    icon: BookPlus,
  },

  {
    id: 2,
    title: 'List Materi',
    subtitle: 'Melihat dan mengedit materi',
    screen: 'ListMateri',
    icon: List,
  },

  {
    id: 3,
    title: 'OHI-S',
    subtitle: 'Perhitungan OHI-S',
    screen: 'OHIS',
    icon: Calculator,
  },

  {
    id: 4,
    title: 'Logout',
    subtitle: 'Keluar dari akun admin',
    screen: 'Login',
    icon: LogOut,
  },
];

const HomeAdmin = () => {

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.header}>
        Admin Panel
      </Text>

      {dataAdmin.map(item => {

        const IconComponent = item.icon;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
          >

            {/* Icon kiri */}
            <View style={styles.iconBox}>
              <IconComponent
                size={22}
                color="#4A6CF7"
              />
            </View>

            {/* Text */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.subtitle}>
                {item.subtitle}
              </Text>
            </View>

            {/* Arrow kanan */}
            <ChevronRight
              size={22}
              color="#4A6CF7"
            />

          </TouchableOpacity>
        );

      })}

    </ScrollView>
  );
};

export default HomeAdmin;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 30,
  },

  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 10,
    color: '#1F2937',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 5,
  },

  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },

});