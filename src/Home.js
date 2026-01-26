import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { BookOpen, ChevronRight } from 'lucide-react-native';

const dataMateri = [
  { id: 1, title: 'Aljabar', subtitle: 'Konsep dasar dan operasi aljabar' },
  {
    id: 2,
    title: 'Matematika Komputer',
    subtitle: 'Logika, algoritma, dan perhitungan',
  },
  {
    id: 3,
    title: 'Bahasa Indonesia',
    subtitle: 'Tata bahasa dan keterampilan menulis',
  },
  {
    id: 4,
    title: 'Bahasa Inggris',
    subtitle: 'Grammar, vocabulary, dan conversation',
  },
];

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Materi</Text>

      {dataMateri.map(item => (
        <TouchableOpacity key={item.id} style={styles.card}>
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
  );
};

export default Home;
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
