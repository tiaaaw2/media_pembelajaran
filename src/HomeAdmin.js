import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { BookOpen, ChevronRight, Edit2, Trash2 } from 'lucide-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import db from '../database';

const HomeAdmin = () => {
  const [materi, setMateri] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getMateri();  
    }, [])
  );

  function getMateri() {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM materi ORDER BY tanggal_dibuat DESC',
        [],
        (_, results) => {
          const rows = results.rows.raw();
          setMateri(rows);
          console.log('Materi loaded:', rows);
        },
        error => {
          setMateri([]);
          console.log('Error retrieving materi: ', error);
        },
      );
    });
  }

  const confirmDelete = id => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus materi ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            db.transaction(tx => {
              tx.executeSql(
                'DELETE FROM materi WHERE id_materi = ?',
                [id],
                () => {
                  Alert.alert('Berhasil', 'Materi berhasil dihapus');
                  getMateri(); // reload daftar
                },
                error => {
                  Alert.alert('Error', 'Gagal menghapus materi');
                  console.log('Delete error:', error);
                },
              );
            });
          },
        },
      ],
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MateriDetail', { item })}
      activeOpacity={0.8}
    >
      {/* Icon kiri */}
      <View style={styles.iconBox}>
        <BookOpen size={22} color="#4A6CF7" />
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.judul}</Text>
        <Text style={styles.subtitle}>
          Added on {new Date(item.tanggal_dibuat).toLocaleDateString()}
        </Text>
      </View>

      {/* Tombol edit */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('EditMateri', { id: item.id_materi })
        }
        style={styles.actionButton}
      >
        <Edit2 size={20} color="#4A6CF7" />
      </TouchableOpacity>

      {/* Tombol hapus */}
      <TouchableOpacity
        onPress={() => confirmDelete(item.id_materi)}
        style={styles.actionButton}
      >
        <Trash2 size={20} color="#FF3B30" />
      </TouchableOpacity>

      {/* Panah kanan */}
      <ChevronRight size={22} color="#4A6CF7" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Materi</Text>

      <FlatList
        data={materi}
        keyExtractor={item => item.id_materi.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('TambahMateri')}
        activeOpacity={0.5}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
    padding: 15,
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
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  actionButton: {
    marginHorizontal: 6,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#4A6CF7',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 32,
    lineHeight: 34,
    fontWeight: '700',
  },
});

export default HomeAdmin;
