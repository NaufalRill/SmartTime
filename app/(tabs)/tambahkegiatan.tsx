import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

import { BottomNav } from '@/components/bottomnav';
import api from '../service/api';
import { useAuth } from '../service/AuthContext'; 

interface FormRowProps {
  label: string;
  children: React.ReactNode;
}

const FormRow: React.FC<FormRowProps> = ({ label, children }) => (
  <View style={styles.formRow}>
    <Text style={styles.label}>{label} :</Text>
    <View style={styles.inputContainer}>{children}</View>
  </View>
);

const TambahKegiatan: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [nama_kegiatan, setNamaKegiatan] = useState('');
  const [kategori, setKategori] = useState('Pilih opsi');

  const [tanggal, setTanggal] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [waktu_mulai, setWaktuMulai] = useState('');
  const [waktu_selesai, setWaktuSelesai] = useState('');

  const [waktuMulaiDate, setWaktuMulaiDate] = useState<Date>(new Date());
  const [waktuSelesaiDate, setWaktuSelesaiDate] = useState<Date>(new Date());

  const [showTimeMulaiPicker, setShowTimeMulaiPicker] = useState(false);
  const [showTimeSelesaiPicker, setShowTimeSelesaiPicker] = useState(false);

  const [catatan, setCatatan] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const kategoriOptions = ['Kuliah', 'Tugas', 'Organisasi'];

  const onChangeTanggal = (_: any, selected?: Date) => {
    setShowDatePicker(false);
    if (selected) setTanggal(selected);
  };


const onChangeWaktuMulai = (_: any, selected?: Date) => {
  setShowTimeMulaiPicker(false);
  if (selected) {
    setWaktuMulaiDate(selected);
    
    // PERBAIKAN: Gunakan format yang menjamin titik dua (HH:mm)
    const jam = selected.getHours().toString().padStart(2, '0');
    const menit = selected.getMinutes().toString().padStart(2, '0');
    setWaktuMulai(`${jam}:${menit}`); 
  }
};

  const onChangeWaktuSelesai = (_: any, selected?: Date) => {
    setShowTimeSelesaiPicker(false);
    if (selected) {
      setWaktuSelesaiDate(selected);
      setWaktuSelesai(
        selected.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }
  };

  const convertWaktu = (input: string) => {
  // Pastikan input menggunakan titik dua dan tambahkan detik
  const formattedInput = input.replace('.', ':'); 
  return formattedInput.length === 5 ? formattedInput + ':00' : formattedInput;
};

  // ============================
  // 🔥 HANDLE SIMPAN (DISESUAIKAN)
  // ============================
  const handleSimpan = async () => {
    // 🔒 VALIDASI USER
    if (!user || !user.id) {
      Alert.alert('Error', 'ID User tidak ditemukan. Silakan login ulang.');
      return;
    }

    if (
      !nama_kegiatan ||
      kategori === 'Pilih opsi' ||
      !waktu_mulai ||
      !waktu_selesai
    ) {
      Alert.alert('Peringatan', 'Semua field wajib diisi!');
      return;
    }

    try {
      const response = await api.post('/tambahkegiatan', {
        id_user: user.id, // ✅ SIMPAN ID USER
        nama_kegiatan,
        kategori,
        tanggal: tanggal.toISOString().split('T')[0],
        waktu_mulai: convertWaktu(waktu_mulai),
        waktu_selesai: convertWaktu(waktu_selesai),
        catatan: catatan || null,
      });

      if (response.data.success) {
        Alert.alert('Sukses', 'Kegiatan berhasil ditambahkan!', [
          { text: 'OK', onPress: () => router.push('/(tabs)/pages/home') },
        ]);
      } else {
        Alert.alert('Gagal', response.data.message || 'Gagal menyimpan kegiatan');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Gagal terhubung ke server');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Tambah Kegiatan</Text>
        <View style={styles.line} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FormRow label="Nama kegiatan">
          <TextInput
            value={nama_kegiatan}
            onChangeText={setNamaKegiatan}
            placeholder="Nama Kegiatan"
            mode="outlined"
            style={styles.textInput}
            dense
          />
        </FormRow>

        <FormRow label="Kategori">
          <View style={{ position: 'relative' }}>
            <Button
              mode="outlined"
              onPress={() => setDropdownOpen(!dropdownOpen)}
              style={styles.dropdownButton}
              contentStyle={{ justifyContent: 'space-between' }}
            >
              {kategori}
              <Ionicons
                name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
                size={16}
              />
            </Button>

            {dropdownOpen && (
              <View style={styles.dropdownList}>
                {kategoriOptions.map(option => (
                  <Button
                    key={option}
                    onPress={() => {
                      setKategori(option);
                      setDropdownOpen(false);
                    }}
                    contentStyle={{ justifyContent: 'flex-start' }}
                  >
                    {option}
                  </Button>
                ))}
              </View>
            )}
          </View>
        </FormRow>

        <FormRow label="Tanggal">
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              value={tanggal.toLocaleDateString('id-ID')}
              mode="outlined"
              style={styles.textInput}
              dense
              editable={false}
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={tanggal}
              mode="date"
              onChange={onChangeTanggal}
            />
          )}
        </FormRow>

        <FormRow label="Waktu Mulai">
          <TouchableOpacity onPress={() => setShowTimeMulaiPicker(true)}>
            <TextInput
              value={waktu_mulai}
              placeholder="HH:MM"
              mode="outlined"
              style={styles.textInput}
              dense
              editable={false}
            />
          </TouchableOpacity>

          {showTimeMulaiPicker && (
            <DateTimePicker
              value={waktuMulaiDate}
              mode="time"
              is24Hour
              onChange={onChangeWaktuMulai}
            />
          )}
        </FormRow>

        <FormRow label="Waktu Selesai">
          <TouchableOpacity onPress={() => setShowTimeSelesaiPicker(true)}>
            <TextInput
              value={waktu_selesai}
              placeholder="HH:MM"
              mode="outlined"
              style={styles.textInput}
              dense
              editable={false}
            />
          </TouchableOpacity>

          {showTimeSelesaiPicker && (
            <DateTimePicker
              value={waktuSelesaiDate}
              mode="time"
              is24Hour
              onChange={onChangeWaktuSelesai}
            />
          )}
        </FormRow>

        <FormRow label="Catatan">
          <TextInput
            value={catatan}
            onChangeText={setCatatan}
            placeholder="Catatan tambahan"
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
        </FormRow>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => router.back()}
            style={[styles.button, styles.batalButton]}
            labelStyle={styles.buttonLabel}
          >
            Batal
          </Button>

          <Button
            mode="contained"
            onPress={handleSimpan}
            style={[styles.button, styles.simpanButton]}
            labelStyle={styles.buttonLabel}
          >
            Simpan
          </Button>
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
};

export default TambahKegiatan;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  headerContainer: { marginTop: 20, marginBottom: 10, paddingHorizontal: 20 },
  header: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: '#3E2CD2',
  },
  line: {
    height: 2,
    backgroundColor: '#E6D6F7',
    marginTop: 8,
    marginHorizontal: -20,
  },

  scrollContent: { padding: 20, paddingBottom: 120 },

  formRow: { flexDirection: 'row', marginBottom: 15 },
  label: { width: '35%', fontSize: 14, fontWeight: '500', marginTop: 12 },
  inputContainer: { flex: 1 },

  textInput: { height: 40, backgroundColor: 'white' },
  textArea: { minHeight: 100, backgroundColor: 'white' },

  dropdownButton: { height: 40, justifyContent: 'center' },
  dropdownList: {
    position: 'absolute',
    top: 42,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 99,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    paddingVertical: 5,
  },
  batalButton: { backgroundColor: 'gray' },
  simpanButton: { backgroundColor: '#3F2B96' },
  buttonLabel: { fontSize: 16, fontWeight: 'bold' },
});
