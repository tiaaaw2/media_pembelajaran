import React, { useCallback, useState } from 'react';

import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';

import {
  Plus,
  BookOpen,
  CalendarDays,
} from 'lucide-react-native';

import db from '../database';

function ListMateri() {

  const navigation = useNavigation();

  const [materi, setMateri] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getMateri();
    }, []),
  );

  const onRefresh = useCallback(() => {

    setRefreshing(true);

    setTimeout(() => {
      getMateri();
      setRefreshing(false);
    }, 1000);

  }, []);

  function getMateri() {

    db.transaction(tx => {

      tx.executeSql(
        `SELECT * FROM materi ORDER BY id DESC`,
        [],
        (_, results) => {

          const rows = results.rows.raw();

          if (rows.length === 0) {

            setMateri([]);

          } else {

            setMateri(rows);

          }
        },
        error => {

          setMateri([]);
          console.error('Error fetching data:', error);

        },
      );
    });
  }

  function convertDate(timestamp) {

    const date = new Date(timestamp);

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('id-ID', options);
  }

  return (

    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.headerContainer}>

        <Text style={styles.headerTitle}>
          Daftar Materi
        </Text>

        <Text style={styles.headerSubtitle}>
          Kelola materi pembelajaran dengan mudah
        </Text>

      </View>

      {/* LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={styles.scrollContainer}
      >

        {materi.length === 0 ? (

          <View style={styles.emptyContainer}>

            <BookOpen
              size={70}
              color="#9CA3AF"
            />

            <Text style={styles.emptyTitle}>
              Belum Ada Materi
            </Text>

            <Text style={styles.emptyText}>
              Tambahkan materi baru untuk mulai mengelola pembelajaran
            </Text>

          </View>

        ) : (

          materi.map((item, index) => {

            return (

              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                onPress={() => {
                  navigation.navigate('MateriDetail', {
                    id: item.id,
                  });
                }}
                style={styles.card}
              >

                <View style={styles.cardTop}>

                  <View style={styles.iconContainer}>
                    <BookOpen
                      size={24}
                      color="#4F46E5"
                    />
                  </View>

                  <View style={styles.dateContainer}>

                    <CalendarDays
                      size={14}
                      color="#6B7280"
                    />

                    <Text style={styles.tanggal}>
                      {convertDate(item.tgl_dibuat)}
                    </Text>

                  </View>

                </View>

                <Text
                  numberOfLines={1}
                  style={styles.judul}
                >
                  {item.judul}
                </Text>

                <Text
                  numberOfLines={2}
                  style={styles.deskripsi}
                >
                  {item.deskripsi}
                </Text>

              </TouchableOpacity>
            );
          })

        )}

      </ScrollView>

      {/* FLOATING BUTTON */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Materi')}
        style={styles.buttonTambah}
      >

        <Plus
          size={30}
          color="#FFFFFF"
        />

      </TouchableOpacity>

    </View>
  );
}

export default ListMateri;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#4F46E5',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#E0E7FF',
    marginTop: 5,
  },

  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tanggal: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 5,
  },

  judul: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 14,
  },

  deskripsi: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 8,
    lineHeight: 22,
  },

  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginTop: 20,
  },

  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },

  buttonTambah: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#4F46E5',
    position: 'absolute',
    right: 20,
    bottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

});