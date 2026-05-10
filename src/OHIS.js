import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';

function OHIS() {
  const [debris, setDebris] = useState('');
  const [kalkulus, setKalkulus] = useState('');
  const [gigi, setGigi] = useState('');
  const [hasil, setHasil] = useState(null);

  const scale = useRef(new Animated.Value(1)).current;

  const animate = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.97,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hitungOHIS = () => {
    animate();

    const d = parseFloat(debris);
    const k = parseFloat(kalkulus);
    const g = parseFloat(gigi);

    if (isNaN(d) || isNaN(k) || isNaN(g) || g <= 0) {
      Alert.alert('Validasi', 'Input tidak valid');
      return;
    }

    const dis = d / g;
    const cis = k / g;
    const ohis = dis + cis;

    let kategori = '';
    let color = '';

    if (ohis <= 1.2) {
      kategori = 'BAIK';
      color = '#16A34A';
    } else if (ohis <= 3.0) {
      kategori = 'SEDANG';
      color = '#F59E0B';
    } else {
      kategori = 'BURUK';
      color = '#DC2626';
    }

    setHasil({dis, cis, ohis, kategori, color});
  };

  const reset = () => {
    setDebris('');
    setKalkulus('');
    setGigi('');
    setHasil(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* HEADER */}
      <Text style={styles.header}>OHIS Calculator</Text>
      <Text style={styles.subHeader}>
        Oral Hygiene Index Simplified
      </Text>

      {/* FORM CARD */}
      <View style={styles.card}>

        <Text style={styles.label}>Skor Debris</Text>
        <TextInput
          placeholder="0 - 3"
          placeholderTextColor={"#79797958"}
          keyboardType="numeric"
          value={debris}
          onChangeText={setDebris}
          style={styles.input}
        />

        <Text style={styles.label}>Skor Kalkulus</Text>
        <TextInput
          placeholder="0 - 3"
          placeholderTextColor={"#79797958"}
          keyboardType="numeric"
          value={kalkulus}
          onChangeText={setKalkulus}
          style={styles.input}
        />

        <Text style={styles.label}>Jumlah Gigi Diperiksa</Text>
        <TextInput
          placeholder="contoh: 6"
          placeholderTextColor={"#79797958"}
          keyboardType="numeric"
          value={gigi}
          onChangeText={setGigi}
          style={styles.input}
        />

        {/* BUTTON HITUNG */}
        <Animated.View style={{transform: [{scale}]}}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={hitungOHIS}>
            <Text style={styles.primaryText}>Hitung OHIS</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* RESET */}
        <TouchableOpacity style={styles.secondaryButton} onPress={reset}>
          <Text style={styles.secondaryText}>Reset</Text>
        </TouchableOpacity>

      </View>

      {/* RESULT */}
      {hasil && (
        <View style={[styles.resultCard, {borderLeftColor: hasil.color}]}>

          <Text style={styles.resultTitle}>Hasil Evaluasi</Text>

          <View style={styles.row}>
            <Text style={styles.text}>DI-S</Text>
            <Text style={styles.value}>{hasil.dis.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>CI-S</Text>
            <Text style={styles.value}>{hasil.cis.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.textBold}>OHIS</Text>
            <Text style={[styles.valueBold, {color: hasil.color}]}>
              {hasil.ohis.toFixed(2)}
            </Text>
          </View>

          {/* BADGE */}
          <View style={[styles.badge, {backgroundColor: hasil.color}]}>
            <Text style={styles.badgeText}>{hasil.kategori}</Text>
          </View>

        </View>
      )}

    </ScrollView>
  );
}

export default OHIS;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8FAFC',
    flexGrow: 1,
  },

  header: {
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    color: '#0F172A',
    marginTop: 20,
  },

  subHeader: {
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    elevation: 6,
  },

  label: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 5,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#F1F5F9',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  primaryButton: {
    backgroundColor: '#4F46E5',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  primaryText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },

  secondaryButton: {
    backgroundColor: '#CBD5E1',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  secondaryText: {
    color: '#0F172A',
    textAlign: 'center',
    fontWeight: '700',
  },

  resultCard: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    borderLeftWidth: 6,
    elevation: 4,
  },

  resultTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
    color: '#0F172A',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },

  text: {
    color: '#475569',
  },

  textBold: {
    fontWeight: '700',
    color: '#0F172A',
  },

  value: {
    color: '#334155',
  },

  valueBold: {
    fontWeight: '800',
  },

  badge: {
    marginTop: 12,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  badgeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
  },
});