import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ArrowLeft, FileText } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const materiDetail = {
  id: 1,
  title: 'Aljabar',
  content: `
Aljabar adalah cabang matematika yang mempelajari penggunaan huruf atau simbol 
untuk mewakili suatu bilangan.

1. Unsur-unsur Aljabar
- Variabel: x, y, z
- Konstanta: bilangan tetap
- Koefisien: bilangan pengali variabel

Contoh:
3x + 5 − 2
Variabel: x
Koefisien: 3
Konstanta: 5 dan −2

2. Operasi Aljabar
Penjumlahan:
(ax + b) + (cx + d) = (a + c)x + (b + d)

Perkalian:
(ax + b)(cx + d) = acx² + (ad + bc)x + bd

3. Persamaan Linear
Bentuk umum:
ax + b = 0
x = −b / a
`,
};

const MateriDetail = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#4A6CF7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{materiDetail.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.content}>{materiDetail.content}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MateriDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 20,
  },
  content: {
    fontSize: 17,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'justify',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#1F2937',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 1.8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
});
