import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function NotifikasiScreen() {
  const [selected, setSelected] = useState("Reminder");

  const data = [
    { title: "Rekayasa Interaksi", daysLeft: 1, progress: 0.75 },
    { title: "Pra Skripsi", daysLeft: 5, progress: 0.45 },
    { title: "Praktikum PKPL", daysLeft: 14, progress: 0.25 },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Notifikasi</Text>

      {/* Garis Di Bawah Judul */}
      <View style={styles.line} />

      {/* Filter Buttons */}
      <View style={styles.filterWrapper}>
        <TouchableOpacity
          onPress={() => setSelected("Reminder")}
          style={[
            styles.filterBtn,
            selected === "Reminder" && styles.activeFilter,
          ]}
        >
          <Link href="/(tabs)/popup"
            style={[
              styles.filterText,
              selected === "Reminder" && styles.activeFilterText,
            ]}
          >
            Reminder
          </Link>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelected("Semua")}
          style={[
            styles.filterBtn,
            selected === "Semua" && styles.activeFilter,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              selected === "Semua" && styles.activeFilterText,
            ]}
          >
            Semua
          </Text>
        </TouchableOpacity>
      </View>

      {/* List Notifikasi */}
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.daysLeft} hari lagi</Text>

            {/* Progress Bar */}
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${item.progress * 100}%` },
                ]}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="/(tabs)/pages/home"><Ionicons name="home" size={28} /></Link>
        <Link href="/(tabs)/tambahkegiatan"><Ionicons name="briefcase" size={28} /></Link>
        <Link href="/(tabs)/tambahtugas"><Ionicons name="add-circle-outline" size={36} /></Link>
        <Link href="/(tabs)/pages/notifikasi"><Ionicons name="notifications" size={28} /></Link>
        <Link href="/(tabs)/pages/PengaturanReminder"><Ionicons name="settings" size={28} /></Link>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 30,
    fontWeight: "700",
    color: "#3E2CD2",
    textAlign: "center",
    marginTop: 70,
    marginBottom: 10,
  },

  /* GARIS BARU */
  line: {
    height: 2,
    backgroundColor: "#E6D6F7",
    marginHorizontal: 0,
    marginBottom: 15,
  },

  filterWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    paddingBottom: 10,
  },

  filterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 45,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  filterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  activeFilter: {
    backgroundColor: "#3E2CD2",
    borderColor: "#3E2CD2",
  },

  activeFilterText: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#3E2CD2",
    marginHorizontal: 35,
    marginTop: 25,
    padding: 18,
    borderRadius: 20,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  cardSubtitle: {
    color: "#fff",
    marginTop: 5,
    marginBottom: 15,
    fontSize: 14,
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#D4D4D4",
    borderRadius: 10,
  },

  progressFill: {
    height: 8,
    backgroundColor: "red",
    borderRadius: 10,
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
});
