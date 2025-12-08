import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { 
  Appbar, 
  TextInput, 
  Button, 
  Text, 
  useTheme 
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

import { BottomNav } from "@/components/bottomnav";
// IMPORT API CENTRALIZED (Pastikan path ini sesuai dengan file api.ts Anda)
import api from '../service/api'; 

// 1. Definisikan tipe Props untuk komponen kustom
interface FormRowProps {
  label: string;
  children: React.ReactNode;
}

// Komponen kustom untuk setiap baris input
const FormRow: React.FC<FormRowProps> = ({ label, children }) => {
  return (
    <View style={styles.formRow}>
      <Text style={styles.label}>{label} :</Text>
      <View style={styles.inputContainer}>
        {children}
      </View>
    </View>
  );
};

const TambahKegiatan: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();

  // 2. State Management
  const [nama_kegiatan, setNamaKegiatan] = useState<string>('');
  const [kategori, setKategori] = useState<string>('Pilih opsi');
  const [tanggal, setTanggal] = useState<string>(''); 
  const [waktu_mulai, setWaktuMulai] = useState<string>(''); 
  const [waktu_selesai, setWaktuSelesai] = useState<string>(''); 
  const [catatan, setCatatan] = useState<string>('');
  
  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const kategoriOptions: string[] = ['Kuliah', 'Tugas', 'Organisasi'];

  // 3. Helper Functions
  const convertTanggal = (input: string) => {
    // Dari DD/MM/YYYY → YYYY-MM-DD
    if (!input.includes("/")) return input;
    const [dd, mm, yyyy] = input.split("/");
    return `${yyyy}-${mm}-${dd}`;
  };

  const convertWaktu = (input: string) => {
    // Jika user input "08:30", MySQL butuh "08:30:00"
    if (input.length === 5) return input + ":00";
    return input;
  };

  // 4. Handle Submit dengan AXIOS
  const handleSimpan = async () => {
    // Validasi sederhana
    if (!nama_kegiatan || kategori === 'Pilih opsi' || !tanggal || !waktu_mulai || !waktu_selesai) {
      Alert.alert("Peringatan", "Semua field (kecuali catatan) wajib diisi!");
      return;
    }

    const tanggalDB = convertTanggal(tanggal);
    const mulaiDB = convertWaktu(waktu_mulai);
    const selesaiDB = convertWaktu(waktu_selesai);

    try {
      // --- PERUBAHAN UTAMA DISINI ---
      // Menggunakan api.post, bukan fetch. Tidak perlu URL lengkap.
      const response = await api.post('/tambahkegiatan', {
        nama_kegiatan,
        kategori,
        tanggal: tanggalDB,
        waktu_mulai: mulaiDB,
        waktu_selesai: selesaiDB,
        catatan: catatan || null
      });

      // Axios otomatis mengembalikan data di properti .data
      if (response.data.success) {
        console.log("Berhasil:", response.data.message);
        Alert.alert("Sukses", "Kegiatan berhasil ditambahkan!", [
          { text: "OK", onPress: () => router.push("/(tabs)/pages/home") }
        ]);
      } else {
        Alert.alert("Gagal", response.data.message || "Gagal menyimpan kegiatan.");
      }

    } catch (error: any) {
      console.error("ERR:", error);
      // Menangani error dari Axios/Network
      const pesanError = error.response?.data?.message || "Terjadi kesalahan koneksi ke server.";
      Alert.alert("Error", pesanError);
    }
  };

  const handleBatal = () => {
    router.back(); // Lebih baik kembali ke halaman sebelumnya daripada sekadar alert
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor:  "#fff",}]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.Content 
          title="Tambah Kegiatan" 
          titleStyle={[styles.headerTitle, { color: theme.colors.primary }]} 
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Input Nama Kegiatan */}
        <FormRow label="Nama kegiatan">
          <TextInput
            value={nama_kegiatan}
            onChangeText={setNamaKegiatan}
            placeholder="Nama Kegiatan"
            mode="outlined"
            style={styles.textInput}
            dense={true}
          />
        </FormRow>

        {/* Input Kategori (Dropdown Manual) */}
        <FormRow label="Kategori">
          <View style={{ position: 'relative', zIndex: 1000 }}>
            <Button 
              mode="outlined"
              onPress={() => setDropdownOpen(!dropdownOpen)}
              style={styles.dropdownButton}
              contentStyle={{ justifyContent: 'space-between' }}
              labelStyle={{ fontSize: 14 }}
            >
              {kategori}
              <Ionicons 
                name={dropdownOpen ? "chevron-up" : "chevron-down"} 
                size={16} 
                style={{ marginLeft: 8 }} 
              />
            </Button>

            {dropdownOpen && (
              <View style={styles.dropdownList}>
                {kategoriOptions.map((option) => (
                  <Button
                    key={option}
                    onPress={() => {
                      setKategori(option);
                      setDropdownOpen(false);
                    }}
                    style={styles.dropdownItem}
                    labelStyle={{ fontSize: 14, textAlign: 'left', color: 'black' }}
                    contentStyle={{ justifyContent: 'flex-start' }}
                  >
                    {option}
                  </Button>
                ))}
              </View>
            )}
          </View>
        </FormRow>

        {/* Input Tanggal */}
        <FormRow label="Tanggal">
          <TextInput
            value={tanggal}
            onChangeText={setTanggal}
            placeholder="DD/MM/YYYY"
            mode="outlined"
            style={styles.textInput}
            dense={true}
            keyboardType="numbers-and-punctuation"
          />
        </FormRow>

        {/* Input Waktu Mulai */}
        <FormRow label="Waktu Mulai">
          <TextInput
            value={waktu_mulai}
            onChangeText={setWaktuMulai}
            placeholder="HH:MM"
            mode="outlined"
            style={styles.textInput}
            dense={true}
            keyboardType="numbers-and-punctuation"
          />
        </FormRow>

        {/* Input Waktu Selesai */}
        <FormRow label="Waktu Selesai">
          <TextInput
            value={waktu_selesai}
            onChangeText={setWaktuSelesai}
            placeholder="HH:MM"
            mode="outlined"
            style={styles.textInput}
            dense={true}
            keyboardType="numbers-and-punctuation"
          />
        </FormRow>

        {/* Input Catatan */}
        <FormRow label="Catatan">
          <TextInput
            value={catatan}
            onChangeText={setCatatan}
            placeholder="Tambahkan detail..."
            mode="outlined"
            multiline={true} 
            numberOfLines={4}
            style={styles.textArea}
          />
        </FormRow>

        {/* Tombol Aksi */}
        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            onPress={handleBatal} 
            style={[styles.button, styles.batalButton]}
            labelStyle={styles.buttonLabel}
          >
            Batal
          </Button>
          <Button 
            mode="contained" 
            onPress={handleSimpan} 
            style={[styles.button, styles.simpanButton, { backgroundColor: "#3F2B96", }]} 
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  formRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 }, // Align flex-start agar label pas dengan textarea
  label: { width: '35%', fontSize: 14, fontWeight: '500', marginTop: 12 }, // Margin top agar sejajar teks input
  inputContainer: { flex: 1 },
  textInput: { height: 40, fontSize: 14, backgroundColor: 'white' },
  textArea: { minHeight: 100, fontSize: 14, backgroundColor: 'white' },
  dropdownButton: { borderWidth: 1, borderColor: '#79747E', height: 40, justifyContent: 'center', backgroundColor: '#fff', borderRadius: 4 },
  dropdownList: { position: 'absolute', top: 42, width: '100%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 4, zIndex: 999, elevation: 5 },
  dropdownItem: { borderRadius: 0 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, paddingHorizontal: 10 },
  button: { flex: 1, marginHorizontal: 5, borderRadius: 8, paddingVertical: 5 },
  batalButton: { backgroundColor: 'gray' },
  simpanButton: {},
  buttonLabel: { fontSize: 16, fontWeight: 'bold' },
});

export default TambahKegiatan;