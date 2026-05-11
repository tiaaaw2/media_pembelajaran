import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';

import {
  ArrowLeft,
  ImagePlus,
  Save,
  FileText,
} from 'lucide-react-native';

import db from '../database';

import {launchImageLibrary} from 'react-native-image-picker';

function Materi() {

  const navigation = useNavigation();

  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [imageUri, setImageUri] = useState(null);

  const [imageName, setImageName] = useState(null);

  // HANDLE SAVE
  function HandleMateri() {

    saveData({
      judul,
      deskripsi,
      imageUri,
    });
  }

  // SIMPAN DATA
  function saveData(data) {

    if (!data.judul || !data.deskripsi) {

      setIsModalVisible(true);

      return;
    }

    setIsLoading(true);

    db.transaction(tx => {

      tx.executeSql(
        'INSERT INTO materi (judul, deskripsi, gambar, tgl_dibuat) VALUES (?, ?, ?, ?)',
        [
          data.judul,
          data.deskripsi,
          data.imageUri,
          new Date(),
        ],

        () => {

          console.log('Data saved successfully!');

          setTimeout(() => {

            setIsLoading(false);

            navigation.goBack();

          }, 700);
        },

        error => {

          console.error('Error saving data:', error);

          setTimeout(() => {

            setIsLoading(false);

          }, 700);
        },
      );
    });
  }

  const closeModal = () => {

    setIsModalVisible(false);
  };

  // IMAGE PICKER
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  const handleChoosePhoto = () => {

    launchImageLibrary(options, response => {

      if (response.didCancel) {

        console.log('User cancelled image picker');

      } else if (response.errorMessage) {

        console.log('ImagePicker Error:', response.errorMessage);

        Alert.alert(
          'Error',
          'Gagal memilih gambar',
        );

      } else {

        const source = {
          uri: response.assets[0].uri,
        };

        setImageUri(source.uri);

        setImageName(
          response.assets[0].fileName,
        );
      }
    });
  };

  return (

    <View style={styles.container}>

      {/* LOADING */}
      {isLoading && (

        <View style={styles.loadingContainer}>

          <ActivityIndicator
            size="large"
            color="#4F46E5"
          />

        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >

            <ArrowLeft
              size={24}
              color="#111827"
            />

          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Tambah Materi
          </Text>

          <Text style={styles.headerSubtitle}>
            Buat materi pembelajaran baru
          </Text>

        </View>

        {/* FORM */}
        <View style={styles.formContainer}>

          {/* JUDUL */}
          <View style={styles.inputCard}>

            <View style={styles.labelContainer}>

              <FileText
                size={18}
                color="#4F46E5"
              />

              <Text style={styles.label}>
                Judul Materi
              </Text>

            </View>

            <TextInput
              value={judul}
              onChangeText={text => setJudul(text)}
              placeholder="Masukkan judul materi"
              placeholderTextColor="#9CA3AF"
              style={styles.titleInput}
            />

          </View>

          {/* DESKRIPSI */}
          <View style={styles.inputCard}>

            <Text style={styles.label}>
              Deskripsi
            </Text>

            <TextInput
              value={deskripsi}
              onChangeText={text => setDeskripsi(text)}
              placeholder="Tulis deskripsi materi..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              style={styles.descriptionInput}
            />

          </View>

          {/* IMAGE */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleChoosePhoto}
            style={styles.imageButton}
          >

            <ImagePlus
              size={28}
              color="#4F46E5"
            />

            <Text style={styles.imageButtonText}>
              Pilih Gambar
            </Text>

          </TouchableOpacity>

          {/* PREVIEW IMAGE */}
          {imageUri && (

            <View style={styles.previewContainer}>

              <Image
                source={{uri: imageUri}}
                style={styles.previewImage}
              />

              <Text
                numberOfLines={1}
                style={styles.imageName}
              >
                {imageName}
              </Text>

            </View>
          )}

        </View>

      </ScrollView>

      {/* BUTTON SAVE */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => HandleMateri()}
        style={styles.saveButton}
      >

        <Save
          size={24}
          color="#FFFFFF"
        />

      </TouchableOpacity>

      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >

        <View style={styles.centeredView}>

          <View style={styles.modalView}>

            <Text style={styles.modalTitle}>
              Peringatan
            </Text>

            <Text style={styles.modalText}>
              Judul dan deskripsi tidak boleh kosong!
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeModal}
            >

              <Text style={styles.modalButtonText}>
                OK
              </Text>

            </TouchableOpacity>

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

  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 20,
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },

  formContainer: {
    padding: 20,
  },

  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    elevation: 3,
  },

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },

  titleInput: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  descriptionInput: {
    minHeight: 140,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },

  imageButton: {
    height: 65,
    backgroundColor: '#EEF2FF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
  },

  imageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
    marginLeft: 10,
  },

  previewContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 18,
    elevation: 3,
  },

  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: 14,
  },

  imageName: {
    marginTop: 10,
    fontSize: 13,
    color: '#6B7280',
  },

  saveButton: {
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
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  modalView: {
    width: '82%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },

  modalText: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },

  modalButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 12,
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },

  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    zIndex: 999,
  },

});

export default Materi;