import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomModal = ({ visible, onClose, title, message, type }) => {
  // type: "success" | "error" | "warning"
  const colors = {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors[type] || '#4A6CF7' }]}>
            {title}
          </Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors[type] || '#4A6CF7' },
            ]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomModal;
