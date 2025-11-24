import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { 
  Appbar, 
  TextInput, 
  Button, 
  Text, 
  Menu, 
  Divider,
  useTheme 
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import { Link } from "expo-router";


// 1. Definisikan tipe Props untuk komponen kustom
interface FormRowProps {
  label: string;
  children: React.ReactNode;
}

// Komponen kustom untuk setiap baris input (Nama, Kategori, dll.)
// Menambahkan tipe Props ke FormRow
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
  // 2. State dengan tipe eksplisit
  const [namaKegiatan, setNamaKegiatan] = useState<string>('');
  const [kategori, setKategori] = useState<string>('Pilih opsi');
  const [tanggal, setTanggal] = useState<string>(''); 
  const [waktuMulai, setWaktuMulai] = useState<string>(''); 
  const [waktuSelesai, setWaktuSelesai] = useState<string>(''); 
  const [catatan, setCatatan] = useState<string>('');
  
  // State dan fungsi untuk Menu Kategori
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // 3. Fungsi handler dengan tipe parameter eksplisit
  const handleKategoriSelect = (selectedKategori: string) => {
    setKategori(selectedKategori);
    closeMenu();
  };

  // Tema dari React Native Paper
  const theme = useTheme();

  // --- Fungsi Aksi Tombol ---
  const handleSimpan = () => {
    console.log('Data disimpan:', {
      namaKegiatan,
      kategori,
      tanggal,
      waktuMulai,
      waktuSelesai,
      catatan,
    });
    alert('Kegiatan berhasil disimpan!');
  };

  const handleBatal = () => {
    console.log('Aksi dibatalkan');
    alert('Aksi dibatalkan.');
  };
  // --------------------------

  // Daftar opsi Kategori
  const kategoriOptions: string[] = ['Pekerjaan', 'Pribadi', 'Edukasi', 'Olahraga', 'Lainnya'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Appbar - Header (Opsional, tergantung navigasi) */}
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
            value={namaKegiatan}
            onChangeText={setNamaKegiatan}
            placeholder="Nama kegiatan"
            mode="outlined"
            style={styles.textInput}
            dense={true}
          />
        </FormRow>

        {/* Input Kategori (Menggunakan Menu) */}
        <FormRow label="Kategori">
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Button 
                mode="outlined" 
                onPress={openMenu}
                contentStyle={styles.menuButtonContent}
                labelStyle={{ color: kategori === 'Pilih opsi' ? 'gray' : theme.colors.onSurface }}
              >
                {kategori}
              </Button>
            }
            style={styles.menuStyle}
          >
            {kategoriOptions.map((option) => (
              <Menu.Item 
                key={option}
                onPress={() => handleKategoriSelect(option)} 
                title={option} 
              />
            ))}
          </Menu>
        </FormRow>

        {/* Input Tanggal */}
        <FormRow label="Tanggal">
          <TextInput
            value={tanggal}
            // Anotasi tipe untuk event handler yang lebih spesifik (opsional, tapi baik)
            onChangeText={(text: string) => setTanggal(text)}
            placeholder="DD/MM/YYYY"
            mode="outlined"
            style={styles.textInput}
            dense={true}
          />
        </FormRow>

        {/* Input Waktu Mulai */}
        <FormRow label="Waktu Mulai">
          <TextInput
            value={waktuMulai}
            onChangeText={setWaktuMulai}
            placeholder="Mulai"
            mode="outlined"
            style={styles.textInput}
            dense={true}
          />
        </FormRow>

        {/* Input Waktu Selesai */}
        <FormRow label="Waktu Selesai">
          <TextInput
            value={waktuSelesai}
            onChangeText={setWaktuSelesai}
            placeholder="Selesai"
            mode="outlined"
            style={styles.textInput}
            dense={true}
          />
        </FormRow>

        {/* Input Catatan (TextArea) */}
        <FormRow label="Catatan">
          <TextInput
            value={catatan}
            onChangeText={setCatatan}
            placeholder="Catatan"
            mode="outlined"
            multiline={true} 
            numberOfLines={4}
            style={styles.textArea}
          />
        </FormRow>

        {/* --- Area Tombol Aksi --- */}
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
            style={[styles.button, styles.simpanButton, { backgroundColor: '#4433ff' }]} 
            labelStyle={styles.buttonLabel}
          >
            Simpan
          </Button>
        </View>

      </ScrollView>

       {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
              <Link href="/(tabs)/pages/home"><Ionicons name="home" size={28} /></Link>
              <Link href="/(tabs)/TambahKegiatan"><Ionicons name="briefcase" size={28} /></Link>
              <Link href="/(tabs)/tambah_tugas"><Ionicons name="add-circle-outline" size={36} /></Link>
              <Link href="/(tabs)/pages/notifikasi"><Ionicons name="notifications" size={28} /></Link>
              <Link href="/(tabs)/pages/PengaturanReminder"><Ionicons name="settings" size={28} /></Link>
            </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, 
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    width: '35%', 
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flex: 1, 
    minHeight: 40, 
  },
  textInput: {
    height: 40,
    fontSize: 14,
    paddingVertical: 0,
    backgroundColor: 'white', 
  },
  textArea: {
    minHeight: 100, 
    fontSize: 14,
    backgroundColor: 'white',
  },
  menuButtonContent: {
    height: 40,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  menuStyle: {
    width: '50%', 
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
  batalButton: {
    backgroundColor: 'gray', 
  },
  simpanButton: {
    // Dibiarkan kosong karena warna diatur inline
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },

   bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navCenterIcon: {
    fontSize: 30, 
    color: '#4433ff', 
  },
  navLabel: {
    fontSize: 10,
    color: 'gray',
  }
});

export default TambahKegiatan;