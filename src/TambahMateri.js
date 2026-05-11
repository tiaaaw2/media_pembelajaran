import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { ArrowLeft, FileText, Upload, Trash2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import db from '../database';

const TambahMateri = () => {
  const navigation = useNavigation();

  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [errorJudul, setErrorJudul] = useState('');

  const uploadMedia = () => {
    // Simulasi upload file
    const dummyFile = {
      name: 'lecture_intro_video.mp4',
      size: '12.4 MB',
      uri: 'file:///dummy/lecture_intro_video.mp4',
    };
    setMediaFiles(prev => [...prev, dummyFile]);
  };

  const removeMedia = index => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSave = () => {
    if (!judul.trim()) {
      setErrorJudul('Title is required');
      return;
    }
    setErrorJudul('');

    const tanggal = new Date().toISOString();

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO materi (judul, isi, tanggal_dibuat) VALUES (?, ?, ?)`,
        [judul, deskripsi, tanggal],
        () => {
          Alert.alert('Success', 'Material saved successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() },
          ]);
        },
        error => {
          console.log('Insert materi error:', error);
          Alert.alert('Error', 'Failed to save material');
        },
      );
    });
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#4A6CF7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Material</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.label}>Material Title</Text>
        <TextInput
          placeholder="e.g. Introduction to Quantum Physics"
          placeholderTextColor="#A1A1AA"
          style={[styles.input, errorJudul ? styles.inputError : null]}
          value={judul}
          onChangeText={text => {
            setJudul(text);
            if (errorJudul) setErrorJudul('');
          }}
        />
        {errorJudul ? <Text style={styles.errorText}>{errorJudul}</Text> : null}

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Provide a detailed summary of this learning material..."
          placeholderTextColor="#A1A1AA"
          multiline
          numberOfLines={6}
          style={[styles.input, styles.textArea]}
          value={deskripsi}
          onChangeText={setDeskripsi}
        />

        {/* Media Attachment */}
        <Text style={styles.label}>Media Attachment</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={uploadMedia}
          activeOpacity={0.7}
        >
          <Upload size={36} color="#4A6CF7" />
          <Text style={styles.uploadText}>
            Click to upload or drag and drop{'\n'}
            Video or High-Res Images (Max 50MB)
          </Text>
        </TouchableOpacity>

        {/* List uploaded media */}
        {mediaFiles.length > 0 &&
          mediaFiles.map((file, index) => (
            <View style={styles.mediaFile} key={index}>
              <FileText size={24} color="#A1A1AA" />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text numberOfLines={1} style={styles.mediaFileName}>
                  {file.name || file}
                </Text>
                <Text style={styles.mediaFileSize}>{file.size || ''}</Text>
              </View>
              <TouchableOpacity onPress={() => removeMedia(index)}>
                <Trash2 size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}

        {/* Save button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={onSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save Material</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TambahMateri;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#1F2937',
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    color: '#374151',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 15,
    color: '#111827',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    marginTop: 6,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 12,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    marginTop: 8,
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: 14,
  },
  mediaFile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  mediaFileName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#374151',
  },
  mediaFileSize: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },
  saveButton: {
    backgroundColor: '#4A6CF7',
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});
