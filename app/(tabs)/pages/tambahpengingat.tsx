import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import { BottomNav } from "@/components/bottomnav";

export default function TambahPengingat() {
  const router = useRouter();

  const [showFreq, setShowFreq] = useState(false);
  const [frekuensi, setFrekuensi] = useState("Pilih frekuensi");
  const freqOptions = ["Harian", "Mingguan", "Bulanan"];

  const [showJenis, setShowJenis] = useState(false);
  const [jenisPengingat, setJenisPengingat] = useState("Pilih jenis pengingat");
  const jenisOptions = ["Pop-Up", "Kalender", "Pesan"];

  // === INPUT STATE ===
  const [namaTugas, setNamaTugas] = useState("");
  const [jam, setJam] = useState("");
  const [menit, setMenit] = useState("");
  const [tanggal, setTanggal] = useState("");

  // === API URL ===
  const API_URL = "http://172.16.60.91:3000/api/tambahpengingat";

  // ================================================================
  //   PERBAIKAN FORMAT TANGGAL TANPA MERUBAH TAMPILAN
  // ================================================================
  const convertDateToMySQL = (inputDate: string) => {
  // Terima format seperti 10/04/2025, 10-04-2025, 10.04.2025, 10 04 2025
  const cleaned = inputDate.replace(/[-. ]/g, "/");
  const parts = cleaned.split("/");

  if (parts.length !== 3) return null;

  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[2]);

  if (!day || !month || !year) return null;
  if (day < 1 || day > 31) return null;
  if (month < 1 || month > 12) return null;
  if (year < 1900 || year > 2100) return null;

  const dd = day < 10 ? `0${day}` : day;
  const mm = month < 10 ? `0${month}` : month;

  return `${year}-${mm}-${dd}`;
};


  // === FUNGSI SIMPAN TUGAS ===
  const handleSave = async () => {
    if (
      !namaTugas ||
      !jam ||
      !menit ||
      !tanggal ||
      frekuensi === "Pilih frekuensi" ||
      jenisPengingat === "Pilih jenis pengingat"
    ) {
      Alert.alert("Error", "Semua kolom harus diisi!");
      return;
    }

    // Perbaikan konversi tanggal
    const formattedDate = convertDateToMySQL(tanggal);

    if (!formattedDate) {
      Alert.alert("Error", "Format tanggal harus DD/MM/YYYY dan valid.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namatugas: namaTugas,
          jam: parseInt(jam),
          menit: parseInt(menit),
          tanggal: formattedDate,
          frekuensi,
          jenis_pengingat: jenisPengingat,
        }),
      });

      const json = await response.json();

      if (json.success) {
        Alert.alert("Sukses", "Pengingat berhasil ditambahkan!");
        router.push("/(tabs)/pages/home");
      } else {
        Alert.alert("Gagal", json.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Tidak dapat terhubung ke server");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Link href="/(tabs)/pages/home">
            <Ionicons name="arrow-back" size={28} color="#000" />{" "}
          </Link>
          <Text style={styles.headerTitle}>Tambah Pengingat</Text>
        </View>

        <View style={styles.divider} />

        {/* Nama Tugas */}
        <Text style={styles.label}>Nama Tugas</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama Tugas"
          value={namaTugas}
          onChangeText={setNamaTugas}
        />

        {/* Waktu Pengingat */}
        <Text style={styles.label}>Waktu Pengingat</Text>
        <View style={styles.timeRow}>
          <TextInput
            style={styles.timeInput}
            placeholder="Jam"
            keyboardType="numeric"
            value={jam}
            onChangeText={setJam}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.timeInput}
            placeholder="Menit"
            keyboardType="numeric"
            value={menit}
            onChangeText={setMenit}
          />
        </View>

        {/* Tanggal */}
        <Text style={styles.label}>Tanggal</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={tanggal}
          onChangeText={setTanggal}
        />

        {/* Frekuensi */}
        <Text style={styles.label}>Frekuensi</Text>
        <TouchableOpacity
          style={styles.selectBox}
          onPress={() => setShowFreq(true)}
        >
          <Text style={styles.selectText}>{frekuensi}</Text>
          <Ionicons name="chevron-down" size={20} />
        </TouchableOpacity>

        {/* Jenis Pengingat */}
        <Text style={styles.label}>Jenis Pengingat</Text>
        <TouchableOpacity
          style={styles.selectBox}
          onPress={() => setShowJenis(true)}
        >
          <Text style={styles.selectText}>{jenisPengingat}</Text>
          <Ionicons name="chevron-down" size={20} />
        </TouchableOpacity>

        {/* Button Row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btnCancel}>
            <Text style={styles.btnCancelText}>Batal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
            <Text style={styles.btnSaveText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MODAL FREKUENSI */}
      {showFreq && (
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFreq(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Pilih Frekuensi</Text>

              {freqOptions.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.modalOption}
                  onPress={() => {
                    setFrekuensi(item);
                    setShowFreq(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      )}

      {/* MODAL JENIS PENGINGAT */}
      {showJenis && (
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowJenis(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Pilih Jenis Pengingat</Text>

              {jenisOptions.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.modalOption}
                  onPress={() => {
                    setJenisPengingat(item);
                    setShowJenis(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
}

// (styles tidak berubah sama sekali)


// =============== STYLES TIDAK DIUBAH SEDIKITPUN ===================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 10,
    color: "#3E2CD2",
  },
  divider: {
    height: 2,
    backgroundColor: "#E8DDFB",
    marginVertical: 5,
  },
  label: {
    marginHorizontal: 35,
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 35,
    fontSize: 16,
    marginTop: 10,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    marginTop: 10,
  },
  timeInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    textAlign: "center",
  },
  colon: {
    fontSize: 22,
    fontWeight: "700",
    marginHorizontal: 10,
  },
  selectBox: {
    marginHorizontal: 35,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  selectText: {
    fontSize: 16,
    color: "#666",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 35,
    marginTop: 40,
    marginBottom: 60,
  },
  btnCancel: {
    flex: 1,
    backgroundColor: "#3E2CD2",
    paddingVertical: 15,
    borderRadius: 12,
    marginRight: 10,
  },
  btnCancelText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  btnSave: {
    flex: 1,
    backgroundColor: "#3E2CD2",
    paddingVertical: 15,
    borderRadius: 12,
    marginLeft: 10,
  },
  btnSaveText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
    color: "#3E2CD2",
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});

