import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { Ionicons} from "@expo/vector-icons";
import { Link } from "expo-router";

export default function TambahTugasScreen() {
  const [filter, setFilter] = useState("");
  const [kesulitan, setKesulitan] = useState("");
  const [progress, setProgress] = useState(0);

  return (
    <View style={styles.page}>
      {/* Header */}
      <Text style={styles.title}>Tambah Tugas</Text>
      <View style={styles.line} />

      {/* Filter Dropdown */}
      <View style={styles.filterBox}>
        <Picker
          selectedValue={filter}
          onValueChange={setFilter}
          style={styles.picker}
        >
          <Picker.Item label="Filter" value="" />
        </Picker>
        <Ionicons name="chevron-down" size={18} style={styles.dropdownIcon} />
      </View>

      {/* FORM */}
      <View style={styles.form}>
        {/* Judul */}
        <View style={styles.row}>
          <Text style={styles.label}>Judul Tugas :</Text>
          <TextInput style={styles.input} placeholder="Nama tugas" />
        </View>

        {/* Deskripsi */}
        <View style={styles.row}>
          <Text style={styles.label}>Deskripsi :</Text>
          <TextInput style={styles.input} placeholder="Deskripsi" />
        </View>

        {/* Deadline */}
        <View style={styles.row}>
          <Text style={styles.label}>Deadline :</Text>
          <TextInput style={styles.input} placeholder="DD/MM/YYYY" />
        </View>

        {/* Kesulitan */}
        <View style={styles.row}>
          <Text style={styles.label}>Kesulitan :</Text>

          <View style={styles.inputPickerWrapper}>
            <Picker
              selectedValue={kesulitan}
              onValueChange={setKesulitan}
              style={styles.inputPicker}
            >
              <Picker.Item label="Kesulitan" value="" />
              <Picker.Item label="Mudah" value="mudah" />
              <Picker.Item label="Sedang" value="sedang" />
              <Picker.Item label="Sulit" value="sulit" />
            </Picker>
            <Ionicons
              name="chevron-down"
              size={18}
              style={styles.dropdownIconAbsolute}
            />
          </View>
        </View>

        {/* Prioritas */}
<View style={{ marginTop: 10 }}>
  <View style={styles.priorityHeader}>
    <Text style={styles.label}>Prioritas :</Text>

    <View style={styles.priorityRow}>
      <TouchableOpacity
        style={[styles.priorityButton]}
      >
        <Text style={styles.priorityText}>Urgent</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.priorityButton]}
      >
        <Text style={styles.priorityText}>Sedang</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.priorityButton]}
      >
        <Text style={styles.priorityText}>Rendah</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>

        {/* Progress */}
        <View style={styles.progressHeader}>
          <Text style={styles.label}>Progress :</Text>
          <Text style={styles.progressValue}>{progress}%</Text>
        </View>

        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={100}
          value={progress}
          onValueChange={(v) => setProgress(Math.floor(v))}
          minimumTrackTintColor="#E63946"
          maximumTrackTintColor="#D9D9D9"
          thumbTintColor="#E63946"
        />

        <Text style={styles.progressInfo}>Geser untuk menyesuaikan</Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.btnText}>Batal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.btnText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <Link href="/(tabs)/pages/home"><Ionicons name="home" size={28} /></Link>
        <Link href="/(tabs)/tambahkegiatan"><Ionicons name="briefcase" size={28} /></Link>
        <Link href="/(tabs)/tambah_tugas"><Ionicons name="add-circle-outline" size={36} /></Link>
        <Link href="/(tabs)/pages/notifikasi"><Ionicons name="notifications" size={28} /></Link>
        <Link href="/(tabs)/pages/PengaturanReminder"><Ionicons name="settings" size={28} /></Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    alignItems: "center",
  },

  /* TITLE */
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5B3FD3",
  },

  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#E5D9FA",
    marginTop: 8,
    marginBottom: 12,
  },

  /* FILTER */
  filterBox: {
    width: 110,
    height: 27,
    backgroundColor: "#F3F3F3",
    borderRadius: 7,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 6,
    marginBottom: 18,
    alignSelf: "flex-start",
    marginLeft: 20,
  },

  picker: {
    width: "100%",
    height: 28,
    fontSize: 11,
  },

  dropdownIcon: {
    position: "absolute",
    right: 6,
    top: 7,
    color: "gray",
    fontSize: 13,
  },

  /* FORM */
  form: {
    width: "88%",
  },

  row: {
    marginBottom: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 3,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#C9C9C9",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#F8F8F8",
    fontSize: 13,
    height: 36,
  },

  /* PICKER INSIDE FORM */
  inputPickerWrapper: {
    borderWidth: 1,
    borderColor: "#C9C9C9",
    borderRadius: 8,
    backgroundColor: "#F8F8F8",
    height: 36,
    justifyContent: "center",
  },

  inputPicker: {
    width: "100%",
    height: 36,
    fontSize: 13,
  },

  dropdownIconAbsolute: {
    position: "absolute",
    right: 8,
    top: 10,
    color: "gray",
    fontSize: 14,
  },

  /* PRIORITAS — UPDATED */
  priorityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  priorityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    gap: 6,
  },

  priorityButton: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: "#EDEDED",
    borderRadius: 6,
  },

  priorityText: {
    fontSize: 11,
    color: "#333",
  },

  /* RADIO (tidak dipakai lagi) */
  radioRow: {
    display: "none",
  },

  /* PROGRESS */
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  progressValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },

  progressInfo: {
    textAlign: "center",
    marginBottom: 18,
    fontSize: 12.5,
    color: "#444",
  },

  /* BUTTONS */
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancelBtn: {
    backgroundColor: "#5038D3",
    paddingVertical: 9,
    borderRadius: 10,
    width: "47%",
  },

  saveBtn: {
    backgroundColor: "#5038D3",
    paddingVertical: 9,
    borderRadius: 10,
    width: "47%",
  },

  btnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },

  /* NAVBAR */
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
});


