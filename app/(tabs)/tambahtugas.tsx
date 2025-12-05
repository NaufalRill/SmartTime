import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

export default function TambahTugasScreen() {
  const router = useRouter();

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [deadline, setDeadline] = useState("");
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

  const API_URL = "http://172.16.60.91:3000/api/tambahtugas";

  // 🔥🔥 FUNGSI SIMPAN KE BACKEND (TIDAK MENGUBAH UI)
  const handleSave = async () => {
    if (!judul) {
      Alert.alert("Error", "Judul tugas wajib diisi!");
      return;
    }
    if (!kesulitan) {
      Alert.alert("Error", "Pilih tingkat kesulitan!");
      return;
    }
    if (!prioritas) {
      Alert.alert("Error", "Pilih prioritas!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filter,
          judul,
          deskripsi,
          deadline,
          kesulitan,
          prioritas,
          progress,
        }),
      });

      const json = await response.json();

      if (json.success) {
        Alert.alert("Berhasil", "Tugas berhasil ditambahkan!");

        // Reset form
        setJudul("");
        setDeskripsi("");
        setDeadline("");
        setKesulitan("");
        setPrioritas("");
        setProgress(0);
        setFilter("");

        router.push("/(tabs)/pages/home");
      } else {
        Alert.alert("Gagal", json.message || "Gagal menyimpan tugas.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Tidak dapat terhubung ke server!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Pressable style={{ flex: 1 }} onPress={closeAllDropdowns}>
        <ScrollView style={styles.container} nestedScrollEnabled>
          <Text style={styles.header}>Tambah Tugas</Text>
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
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              value={deadline}
              onChangeText={setDeadline}
            />
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
              onPress={() => {
                setJudul("");
                setDeskripsi("");
                setDeadline("");
                setKesulitan("");
                setPrioritas("");
                setProgress(0);
                setFilter("");
                closeAllDropdowns();
              }}
            >
              <Text style={styles.btnText}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
              <Text style={styles.btnText}>
                {isLoading ? "..." : "Simpan"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 150 }} />
        </ScrollView>
      </Pressable>

      {/* NAV BAWAH */}
      <View style={styles.bottomNav}>
        <Link href="/(tabs)/pages/home">
          <Ionicons name="home" size={28} />
        </Link>
        <Link href="/(tabs)/tambahkegiatan">
          <Ionicons name="briefcase" size={28} />
        </Link>
        <Link href="/(tabs)/tambahtugas">
          <Ionicons name="add-circle-outline" size={36} />
        </Link>
        <Link href="/(tabs)/pages/notifikasi">
          <Ionicons name="notifications" size={28} />
        </Link>
        <Link href="/(tabs)/pages/PengaturanReminder">
          <Ionicons name="settings" size={28} />
        </Link>
      </View>
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

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
