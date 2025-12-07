import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { 
  Appbar, 
  TextInput, 
  Button, 
  Text, 
  useTheme 
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 

import { BottomNav } from "@/components/bottomnav";


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

const tambahkegiatan: React.FC = () => {
  // 2. State dengan tipe eksplisit
  const [nama_kegiatan, setNamaKegiatan] = useState<string>('');
  const [kategori, setKategori] = useState<string>('Pilih opsi');
  const [tanggal, setTanggal] = useState<string>(''); 
  const [waktu_mulai, setWaktuMulai] = useState<string>(''); 
  const [waktu_selesai, setWaktuSelesai] = useState<string>(''); 
  const [catatan, setCatatan] = useState<string>('');
  const kategoriOptions: string[] = ['Kuliah', 'Tugas', 'Organisasi'];
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const API_URL = "http://192.168.1.3:3000/api/tambahkegiatan";

  // Tema dari React Native Paper
  const theme = useTheme();

  // State dan fungsi untuk Menu Kategori
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // 3. Fungsi handler dengan tipe parameter eksplisit
  const handleKategoriSelect = (selectedKategori: string) => {
    setKategori(selectedKategori);
    closeMenu();
  };

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

  const handleSimpan = async () => {
    if (!nama_kegiatan || !kategori || !tanggal || !waktu_mulai || !waktu_selesai) {
      alert("Semua field kecuali catatan wajib diisi!");
      return;
    }

    const tanggalDB = convertTanggal(tanggal);
    const mulaiDB = convertWaktu(waktu_mulai);
    const selesaiDB = convertWaktu(waktu_selesai);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_kegiatan,
          kategori,
          tanggal: tanggalDB,
          waktu_mulai: mulaiDB,
          waktu_selesai: selesaiDB,
          catatan: catatan || null
        }),
      });

      const data = await response.json();
      console.log("HASIL API:", data);

      if (data.success) {
        alert("Kegiatan berhasil disimpan!");
      } else {
        alert("Gagal: " + data.message);
      }

    } catch (error) {
      console.error("ERR:", error);
      alert("Terjadi kesalahan saat mengirim data ke server.");
    }
  };

  const handleBatal = () => {
    console.log('Aksi dibatalkan');
    alert('Aksi dibatalkan.');
  };
  // --------------------------

  // Daftar opsi Kategori
  

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
            value={nama_kegiatan}
            onChangeText={setNamaKegiatan}
            placeholder="Nama kegiatan"
            mode="outlined"
            style={styles.textInput}
            dense={true}
          />
        </FormRow>

        {/* Input Kategori (Menggunakan Menu) */}
        <FormRow label="Kategori">
          <View style={{ position: 'relative' }}>
            
            {/* Input Dropdown */}
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

            {/* LIST OPSI */}
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
                    labelStyle={{ fontSize: 14, textAlign: 'left' }}
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
            value={waktu_mulai}
            onChangeText={setWaktuMulai}
            placeholder="HH:MM"
            mode="outlined"
            style={styles.textInput}
            dense={true}
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
      <BottomNav />
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
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  dropdownList: {
    position: 'absolute',
    top: 45,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    zIndex: 999,
    elevation: 4,
  },

  dropdownItem: {
    justifyContent: 'flex-start',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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

export default tambahkegiatan;