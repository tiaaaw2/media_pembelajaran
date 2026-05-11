import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { BookOpen, ChevronRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import db from '../database';

const Home = () => {
  const [materi, setMateri] = useState([]);
  const navigation = useNavigation();

  // Ambil data saat komponen mount
  useEffect(() => {
    getMateri();
  }, []);

  function getMateri() {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM materi',
        [],
        (_, results) => {
          const rows = results.rows.raw();
          if (rows.length === 0) {
            setMateri([]);
            console.log('No materi found');
          } else {
            setMateri(rows);
            console.log('Materi loaded:', rows);
          }
        },
        error => {
          setMateri([]);
          console.log('Error retrieving materi: ', error);
        },
      );
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Materi</Text>

      <ScrollView>
        {materi.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={
              () => navigation.navigate('MateriDetail', { item }) // kirim data ke detail
            }
          >
            {/* Icon kiri */}
            <View style={styles.iconBox}>
              <BookOpen size={22} color="#4A6CF7" />
            </View>

            {/* Text */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>

            {/* Arrow kanan */}
            <ChevronRight size={22} color="#4A6CF7" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
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

export default Home;
