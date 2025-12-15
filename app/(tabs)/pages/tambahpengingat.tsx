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
import DateTimePicker from "@react-native-community/datetimepicker";
import { BottomNav } from "@/components/bottomnav";
import api from "../../service/api";

export default function TambahPengingat() {
  const router = useRouter();

  const [namaTugas, setNamaTugas] = useState("");

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [showFreq, setShowFreq] = useState(false);
  const [frekuensi, setFrekuensi] = useState("Pilih frekuensi");
  const freqOptions = ["Harian", "Mingguan", "Bulanan"];

  const [showJenis, setShowJenis] = useState(false);
  const [jenisPengingat, setJenisPengingat] = useState("Pilih jenis pengingat");
  const jenisOptions = ["Pop-Up", "Kalender", "Pesan"];

  const handleSave = async () => {
    if (
      !namaTugas ||
      !date ||
      !time ||
      frekuensi === "Pilih frekuensi" ||
      jenisPengingat === "Pilih jenis pengingat"
    ) {
      Alert.alert("Error", "Semua kolom harus diisi!");
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];
    const jam = time.getHours();
    const menit = time.getMinutes();

    try {
      const response = await api.post("/tambahpengingat", {
        nama_tugas: namaTugas,
        jam,
        menit,
        tanggal: formattedDate,
        frekuensi,
        jenis_pengingat: jenisPengingat,
      });

      if (response.data.success) {
        Alert.alert("Berhasil", "Pengingat berhasil ditambahkan!");
        router.push("/(tabs)/pages/home");
      } else {
        Alert.alert("Gagal", response.data.message);
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
            <Ionicons name="arrow-back" size={28} color="#000" />
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


        {/* Waktu */}
        <Text style={styles.label}>Waktu Pengingat</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={{ fontSize: 16, color: time ? "#000" : "#999" }}>
            {time
              ? time.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Pilih Waktu"}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={time || new Date()}
            mode="time"
            is24Hour
            display="clock"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) setTime(selectedTime);
            }}
          />
        )}

        {/* Tanggal */}
        <Text style={styles.label}>Tanggal</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ fontSize: 16, color: date ? "#000" : "#999" }}>
            {date ? date.toLocaleDateString("id-ID") : "Pilih Tanggal"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="calendar"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        {/* Frekuensi */}
        <Text style={styles.label}>Frekuensi</Text>
        <TouchableOpacity
          style={styles.selectBox}
          onPress={() => setShowFreq(true)}
        >
          <Text style={styles.selectText}>{frekuensi}</Text>
          <Ionicons name="chevron-down" size={20} />
        </TouchableOpacity>

        {/* Jenis */}
        <Text style={styles.label}>Jenis Pengingat</Text>
        <TouchableOpacity
          style={styles.selectBox}
          onPress={() => setShowJenis(true)}
        >
          <Text style={styles.selectText}>{jenisPengingat}</Text>
          <Ionicons name="chevron-down" size={20} />
        </TouchableOpacity>

        {/* Buttons */}
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

      {/* MODAL JENIS */}
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

      <BottomNav />
    </View>
  );
}

/* ===================== STYLES (TIDAK DIUBAH) ===================== */
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
