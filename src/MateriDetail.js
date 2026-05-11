import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import {
  useCallback,
  useState,
} from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  ArrowLeft,
  CalendarDays,
  Pencil,
  Trash2,
  BookOpen,
} from 'lucide-react-native';

import db from '../database';

function MateriDetail({route}) {

  const {id} = route.params;

  const navigation = useNavigation();

  const width = Dimensions.get('screen').width;

  const [materiDetail, setMateriDetail] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [loading, setLoading] = useState(true);

  // DELETE
  function DeleteMateri() {

    setIsModalVisible(true);
  }

  function confirmDelete(id) {

    deleteData(id);

    setIsModalVisible(false);
  }

  function cancelDelete() {

    setIsModalVisible(false);
  }

  function deleteData(id) {

    db.transaction(tx => {

      tx.executeSql(
        'DELETE FROM materi WHERE id = ?',
        [id],

        () => {

          console.log('Data deleted successfully!');

          setTimeout(() => {

            navigation.goBack();

          }, 500);
        },

        error => {

          console.error(
            'Error deleting data:',
            error,
          );
        },
      );
    });
  }

  // FORMAT DATE
  function convertDate(timestamp) {

    if (!timestamp) return '';

    const date = new Date(timestamp);

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString(
      'id-ID',
      options,
    );
  }

  // GET DETAIL
  function getMateriDetail() {

    setLoading(true);

    db.transaction(tx => {

      tx.executeSql(
        `SELECT * FROM materi WHERE id = ?`,
        [id],

        (_, results) => {

          const rows = results.rows.raw();

          if (rows.length === 0) {

            setMateriDetail(null);

          } else {

            setMateriDetail(rows[0]);
          }

          setLoading(false);
        },

        error => {

          console.error(
            'Error fetching data:',
            error,
          );

          setLoading(false);
        },
      );
    });
  }

  useFocusEffect(
    useCallback(() => {

      getMateriDetail();

    }, []),
  );

  // LOADING
  if (loading) {

    return (

      <View style={styles.loadingContainer}>

        <ActivityIndicator
          size="large"
          color="#4F46E5"
        />

      </View>
    );
  }

  return (

    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER IMAGE */}
        <ImageBackground
          imageStyle={styles.headerImage}
          style={styles.imageBackground}
          source={{
            uri:
              materiDetail?.gambar ||
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
          }}
        >

          <View style={styles.overlay}>

            {/* BACK BUTTON */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() =>
                navigation.goBack()
              }
            >

              <ArrowLeft
                size={24}
                color="#FFFFFF"
              />

            </TouchableOpacity>

          </View>

        </ImageBackground>

        {/* CONTENT */}
        <View style={styles.contentContainer}>

          {/* TITLE */}
          <View style={styles.titleContainer}>

            <View style={styles.iconContainer}>

              <BookOpen
                size={28}
                color="#4F46E5"
              />

            </View>

            <Text style={styles.title}>
              {materiDetail?.judul}
            </Text>

          </View>

          {/* DATE */}
          <View style={styles.dateContainer}>

            <CalendarDays
              size={18}
              color="#6B7280"
            />

            <Text style={styles.dateText}>
              {convertDate(
                materiDetail?.tgl_dibuat,
              )}
            </Text>

          </View>

          {/* DESCRIPTION */}
          <View style={styles.descriptionCard}>

            <Text style={styles.descriptionTitle}>
              Deskripsi Materi
            </Text>

            <Text style={styles.description}>
              {materiDetail?.deskripsi}
            </Text>

          </View>

        </View>

      </ScrollView>

      {/* FLOAT BUTTONS */}
      <View style={styles.buttonContainer}>

        {/* EDIT */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {

            navigation.navigate(
              'EditDetails',
              {materiDetail},
            );
          }}
          style={styles.editButton}
        >

          <Pencil
            size={22}
            color="#FFFFFF"
          />

        </TouchableOpacity>

        {/* DELETE */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={DeleteMateri}
          style={styles.deleteButton}
        >

          <Trash2
            size={22}
            color="#FFFFFF"
          />

        </TouchableOpacity>

      </View>

      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {

          setIsModalVisible(false);
        }}
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>
              Hapus Materi
            </Text>

            <Text style={styles.modalText}>
              Apakah Anda yakin ingin
              menghapus materi ini?
            </Text>

            <View style={styles.modalButtonRow}>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={cancelDelete}
              >

                <Text
                  style={
                    styles.cancelButtonText
                  }
                >
                  Batal
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteModalButton}
                onPress={() =>
                  confirmDelete(
                    materiDetail?.id,
                  )
                }
              >

                <Text
                  style={
                    styles.deleteModalText
                  }
                >
                  Hapus
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },

  imageBackground: {
    width: '100%',
    height: 320,
  },

  headerImage: {
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 25,
    paddingHorizontal: 20,
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    padding: 20,
    marginTop: -35,
  },

  titleContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    elevation: 4,
  },

  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginLeft: 5,
  },

  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },

  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    marginBottom: 120,
    elevation: 4,
  },

  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 14,
  },

  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 28,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    flexDirection: 'row',
  },

  editButton: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    elevation: 6,
  },

  deleteButton: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '82%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 25,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },

  modalText: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },

  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancelButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 14,
    borderRadius: 14,
    marginRight: 10,
  },

  cancelButtonText: {
    textAlign: 'center',
    color: '#111827',
    fontWeight: '600',
  },

  deleteModalButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 14,
    marginLeft: 10,
  },

  deleteModalText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },

});

export default MateriDetail;