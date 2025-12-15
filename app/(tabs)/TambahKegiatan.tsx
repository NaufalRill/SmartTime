import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

import { BottomNav } from "@/components/bottomnav";
import api from '../service/api';

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

  const [nama_kegiatan, setNamaKegiatan] = useState('');
  const [kategori, setKategori] = useState('Pilih opsi');
  const [tanggal, setTanggal] = useState('');
  const [waktu_mulai, setWaktuMulai] = useState('');
  const [waktu_selesai, setWaktuSelesai] = useState('');
  const [catatan, setCatatan] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const kategoriOptions = ['Kuliah', 'Tugas', 'Organisasi'];

  const convertTanggal = (input: string) => {
    if (!input.includes('/')) return input;
    const [dd, mm, yyyy] = input.split('/');
    return `${yyyy}-${mm}-${dd}`;
  };

  const convertWaktu = (input: string) => {
    if (input.length === 5) return input + ':00';
    return input;
  };

  const handleSimpan = async () => {
    if (!nama_kegiatan || kategori === 'Pilih opsi' || !tanggal || !waktu_mulai || !waktu_selesai) {
      Alert.alert('Peringatan', 'Semua field wajib diisi!');
      return;
    }

    try {
      const response = await api.post('/tambahkegiatan', {
        nama_kegiatan,
        kategori,
        tanggal: convertTanggal(tanggal),
        waktu_mulai: convertWaktu(waktu_mulai),
        waktu_selesai: convertWaktu(waktu_selesai),
        catatan: catatan || null,
      });

      if (response.data.success) {
        Alert.alert('Sukses', 'Kegiatan berhasil ditambahkan!', [
          { text: 'OK', onPress: () => router.push('/(tabs)/pages/home') },
        ]);
      } else {
        Alert.alert('Gagal', response.data.message);
      }
    } catch {
      Alert.alert('Error', 'Gagal terhubung ke server');
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER (SAMA DENGAN TAMBAH TUGAS) */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Tambah Kegiatan </Text>
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
              <Ionicons name={dropdownOpen ? 'chevron-up' : 'chevron-down'} size={16} />
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
          <TextInput
            value={tanggal}
            onChangeText={setTanggal}
            placeholder="DD/MM/YYYY"
            mode="outlined"
            style={styles.textInput}
            dense
          />
        </FormRow>

        <FormRow label="Waktu Mulai">
          <TextInput
            value={waktu_mulai}
            onChangeText={setWaktuMulai}
            placeholder="HH:MM"
            mode="outlined"
            style={styles.textInput}
            dense
          />
        </FormRow>

        <FormRow label="Waktu Selesai">
          <TextInput
            value={waktu_selesai}
            onChangeText={setWaktuSelesai}
            placeholder="HH:MM"
            mode="outlined"
            style={styles.textInput}
            dense
          />
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

        {/* BUTTON (SAMA PERSIS DENGAN TAMBAH TUGAS) */}
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
  header: { fontSize: 26, fontWeight: '700', textAlign: 'center', color: '#3F2B96' },
  line: { height: 2, backgroundColor: '#E6D6F7', marginTop: 8 },

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

  /* BUTTON STYLE (DIAMBIL DARI TAMBAH TUGAS) */
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
