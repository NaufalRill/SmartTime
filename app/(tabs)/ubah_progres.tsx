import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Platform,
  ActivityIndicator
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { BottomNav } from "@/components/bottomnav";
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../service/api';

export default function UbahProgres() {
  const router = useRouter();

  const { id } = useLocalSearchParams(); 

  const [isLoadingData, setIsLoadingData] = useState(true); // Loading saat ambil data awal
  const [isSaving, setIsSaving] = useState(false); // Loading saat tombol simpan ditekan

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [kesulitan, setKesulitan] = useState("");
  const [prioritas, setPrioritas] = useState("");
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [filterOpen, setFilterOpen] = useState(false);
  const [kesulitanOpen, setKesulitanOpen] = useState(false);

  const filterOptions = ["Tugas", "Kuliah", "Organisasi", "Semua"];
  const kesulitanOptions = ["Mudah", "Sedang", "Sulit"];

  const closeAllDropdowns = () => {
    setFilterOpen(false);
    setKesulitanOpen(false);
  };


  const [deadline, setDeadline] = useState(new Date()); 
  const [showPicker, setShowPicker] = useState(false);

  // 2. USE EFFECT: Ambil data lama berdasarkan ID saat halaman dibuka
  useEffect(() => {
    if (id) {
      fetchDetailTugas();
    }
  }, [id]);

  const fetchDetailTugas = async () => {
    try {
      const response = await api.get(`/tugas/${id}`);
      if (response.data.success) {
        const data = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
        
        // Isi form dengan data dari database
        setJudul(data.judul);
        setDeskripsi(data.deskripsi || "");
        setFilter(data.filter || "Filter");
        setKesulitan(data.kesulitan || "");
        setPrioritas(data.prioritas || "");
        setProgress(data.progress || ""); // Asumsi DB simpan 0.5, Slider butuh 50
        
        // Konversi string tanggal dari DB ke Object Date JS
        if (data.deadline) {
            setDeadline(new Date(data.deadline));
        }
      }
    } catch (error) {
      console.error("Gagal ambil data:", error);
      Alert.alert("Error", "Gagal mengambil data tugas.");
    } finally {
      setIsLoadingData(false);
    }
  };

  // 3. Tambahkan fungsi helper untuk handle perubahan tanggal
  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false); // Tutup picker di Android setelah memilih
    }
    if (selectedDate) {
      setDeadline(selectedDate);
    }
  };


// 3. Handle UPDATE (Bukan Save/Post lagi)
  const handleUpdate = async () => {
    if (!judul) {
      Alert.alert("Error", "Judul tugas wajib diisi!");
      return;
    }

    setIsSaving(true);
    const formattedDeadline = deadline.toISOString().split('T')[0];
    
    // Konversi progress slider (0-100) kembali ke desimal (0.0-1.0) jika DB butuh desimal
    // Jika DB butuh 0-100, biarkan saja `progress`.
    // Disini saya asumsi DB simpan desimal (sesuai kode home screen sebelumnya):
    

    try {
      // Panggil endpoint PATCH
      const response = await api.patch(`/tugas/${id}`, {
        filter,
        judul,
        deskripsi,
        deadline: formattedDeadline,
        kesulitan,
        prioritas,
        progress, // Kirim progress yang sudah diupdate
      });

      if (response.data.success) {
        Alert.alert("Sukses", "Data berhasil diperbarui!", [
            { text: "OK", onPress: () => router.push("/(tabs)/pages/home") }
        ]);
      } else {
        Alert.alert("Gagal", response.data.message || "Gagal mengupdate tugas.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Tidak dapat terhubung ke server!");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingData) {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color="#3F2B96" />
        </View>
    );
  }

  return (
    <>
      <Pressable style={{ flex: 1 }} onPress={closeAllDropdowns}>
        <ScrollView style={styles.container} nestedScrollEnabled>

          {/* HEADER BARU: Dengan Tombol Back */}
          <View style={styles.headerContainer}>
            {/* Tombol Back */}
            <TouchableOpacity style={styles.backButton}>
              <Link href={{
              pathname: "/(tabs)/pages/detail-tugas",
              params: { id: id },
              }}
              style={styles.backButton}> 
              
              <Ionicons name="arrow-back" size={28} color="#3F2B96" />

              </Link>

            </TouchableOpacity>

            {/* Judul */}
            <Text style={styles.headerTitle}>Ubah Progres</Text>
            
            {/* View Kosong (Dummy) agar judul tetap presisi di tengah */}
            <View style={{ width: 28 }} />
          </View>

          <View style={styles.line} />

          {/* FILTER */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.row}>
              <View style={{ width: "50%" }}>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  activeOpacity={0.9}
                  onPress={(e) => {
                    e.stopPropagation();
                    setFilterOpen(!filterOpen);
                    setKesulitanOpen(false);
                  }}
                >
                  <Text style={styles.dropdownButtonText}>
                    {filter || "Filter"}
                  </Text>
                  <Ionicons
                    name={filterOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#444"
                  />
                </TouchableOpacity>

                {filterOpen && (
                  <View style={styles.dropdownList}>
                    {filterOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setFilter(option);
                          setFilterOpen(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* JUDUL */}
          <View style={styles.formRow}>
            <Text style={styles.label}>Judul Tugas :</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama Tugas"
              value={judul}
              onChangeText={setJudul}
            />
          </View>

          {/* DESKRIPSI */}
          <View style={styles.formRow}>
            <Text style={styles.label}>Deskripsi :</Text>
            <TextInput
              style={styles.input}
              placeholder="Deskripsi"
              value={deskripsi}
              onChangeText={setDeskripsi}
            />
          </View>

          {/* DEADLINE */}
          <View style={styles.formRow}>
            <Text style={styles.label}>Deadline :</Text>
            {/* Ganti TextInput dengan TouchableOpacity (Tombol) */}
            <TouchableOpacity 
              style={styles.input} // Gunakan style input yang sama agar tampilan konsisten
              onPress={() => setShowPicker(true)}
            >
              {/* Tampilkan tanggal format Indonesia untuk User */}
              <Text style={{ marginTop: 5 }}>
                {deadline.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </Text>
            </TouchableOpacity>

            {/* Munculkan Picker jika showPicker true */}
            {showPicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={deadline}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
              />
            )}
          </View>

          {/* KESULITAN */}
          <View style={styles.formRow}>
            <Text style={styles.label}>Kesulitan :</Text>

            <TouchableOpacity
              style={[styles.input, styles.dropdownButton]}
              onPress={(e) => {
                e.stopPropagation();
                setKesulitanOpen(!kesulitanOpen);
                setFilterOpen(false);
              }}
            >
              <Text style={styles.dropdownButtonText}>
                {kesulitan || "Select an option"}
              </Text>
              <Ionicons
                name={kesulitanOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color="#444"
              />
            </TouchableOpacity>

            {kesulitanOpen && (
              <View style={[styles.dropdownList, { width: "65%", right: 0 }]}>
                {kesulitanOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setKesulitan(option);
                      setKesulitanOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* PRIORITAS */}
          <View style={[styles.formRow, { alignItems: "flex-start" }]}>
            <Text style={styles.label}>Prioritas :</Text>

            <View style={{ width: "65%" }}>
              {["Urgent", "Sedang", "Rendah"].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.radioItem}
                  onPress={() => setPrioritas(item)}
                >
                  <View style={styles.radioOuter}>
                    {prioritas === item && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioLabel}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* PROGRESS */}
          <View style={styles.progressRow}>
            <Text style={styles.label}>Progress :</Text>
            <Text style={styles.percent}>{progress}%</Text>
          </View>

          <Slider
            value={progress}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#E53935"
            thumbTintColor="#E53935"
            onValueChange={(value) => setProgress(Math.round(value))}
          />

          <Text style={styles.sliderText}>Geser untuk menyesuaikan</Text>

          {/* BUTTONS */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => router.back()}
            >
              <Text style={styles.btnText}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSave} onPress={handleUpdate}>
              <Text style={styles.btnText}>
                {isSaving ? "Menyimpan" : "Update"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 150 }} />
        </ScrollView>
      </Pressable>

      {/* NAV BAWAH */}
      <BottomNav />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },

  header: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    color: "#3F2B96",
    marginTop: 60,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Agar tombol di kiri, judul di tengah, dummy di kanan
    marginTop: 60,
    marginBottom: 0, 
  },
  
  headerTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: "#3E2CD2",
    textAlign: "center",
    // Hapus marginTop dari sini karena sudah di handle container
  },

  backButton: {
    padding: 5, // Area sentuh lebih luas
  },

  

  line: {
    height: 2,
    backgroundColor: "#E6D6F7",
    marginHorizontal: 0,
    marginTop: 10,
    marginBottom: 25,
  },

  label: {
    width: "35%",
    fontSize: 18,
    fontWeight: "500",
  },

  formRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    width: "100%",
  },

  input: {
    width: "65%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 12,
    marginTop: 0,
  },

  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#F8F8F8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownButtonText: {
    fontSize: 16,
    color: "#333",
  },

  dropdownList: {
    position: "absolute",
    top: 48,
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    zIndex: 20,
    elevation: 6,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },

  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#3F2B96",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  radioInner: {
    width: 12,
    height: 12,
    backgroundColor: "#3F2B96",
    borderRadius: 12,
  },

  radioLabel: {
    fontSize: 18,
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  percent: {
    fontSize: 20,
    fontWeight: "700",
  },

  sliderText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 35,
  },

  btnCancel: {
    backgroundColor: "#3F2B96",
    paddingVertical: 14,
    paddingHorizontal: 45,
    borderRadius: 15,
  },

  btnSave: {
    backgroundColor: "#3F2B96",
    paddingVertical: 14,
    paddingHorizontal: 45,
    borderRadius: 15,
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },


});
