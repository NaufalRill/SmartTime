import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

export default function UbahProgres() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Text style={styles.headerTitle}>Ubah Progres</Text>
        <View style={styles.headerLine} />

        {/* Notifikasi Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🔔</Text>
            <Text style={styles.cardTitle}>Notifikasi</Text>
          </View>

          {/* List */}
          {/* Item 1 */}
          <View style={styles.listItem}>
            <Text style={styles.listText}>Rekayasa Interaksi</Text>
            <Text style={styles.checkIcon}>✔</Text>
          </View>
          {/* Item 2 */}
          <View style={styles.listItem}>
            <Text style={styles.listText}>Pra Skripsi</Text>
            <Text style={styles.checkIcon}>✔</Text>
          </View>
          {/* Item 3 */}
          <View style={styles.listItem}>
            <Text style={styles.listText}>Praktikum PKPL</Text>
            <Text style={styles.checkIcon}>✔</Text>
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Simpan</Text>
          </TouchableOpacity>
        </View>

        {/* Statistik Header */}
        <Text style={styles.statsHeader}>Stastistik Tugas</Text>

        {/* Statistik List */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Tugas Selesai</Text>
            <Text style={styles.statsValue}>2</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Tugas Berjalan</Text>
            <Text style={styles.statsValue}>3</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Tugas Belum Dimulai</Text>
            <Text style={styles.statsValue}>1</Text>
          </View>
        </View>

        {/* Progress Circle */}
        <View style={styles.circleContainer}>
          <View style={styles.circleWrapper}>
            {/* Background Circle (Grey) */}
            <View style={styles.circleBase} />
            {/* Progress Arc (Indigo) - Rotated to look like 40% */}
            <View style={styles.circleProgress} />
            {/* Inner Text */}
            <View style={styles.circleTextContainer}>
              <Text style={styles.circleText}>40%</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation - NOTE: If you use Expo Router (tabs), you might not need this manually */}
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="/(tabs)/pages/home"><Ionicons name="home" size={28} /></Link>
        <Link href="/(tabs)/pages/home"><Ionicons name="briefcase" size={28} /></Link>
        <Link href="/(tabs)/tambah_tugas"><Ionicons name="add-circle-outline" size={36} /></Link>
        <Link href="/(tabs)/pages/notifikasi"><Ionicons name="notifications" size={28} /></Link>
        <Link href="/(tabs)/pages/PengaturanReminder"><Ionicons name="settings" size={28} /></Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Add padding for bottom nav
  },
  // Header Styles
  headerTitle: {
    fontSize: 30, // text-4xl
    fontWeight: "bold",
    color: "#4338ca", // text-indigo-700
  },
  headerLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#c7d2fe", // bg-indigo-200
    marginTop: 8,
  },
  // Card Styles
  card: {
    marginTop: 24,
    backgroundColor: "#4338ca", // bg-indigo-700
    borderRadius: 24, // rounded-3xl
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  cardIcon: {
    fontSize: 20,
    color: "white",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  listText: {
    color: "white",
    fontSize: 16,
  },
  checkIcon: {
    color: "#4ade80", // text-green-400
    fontSize: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 12,
    borderRadius: 9999, // rounded-full
    marginTop: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: "#4338ca", // text-indigo-700
    fontWeight: "600",
    fontSize: 16,
  },
  // Stats Styles
  statsHeader: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#374151", // text-gray-700
    marginTop: 32,
  },
  statsContainer: {
    marginTop: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  statsLabel: {
    fontSize: 18,
    color: "#1f2937", // text-gray-800
  },
  statsValue: {
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "bold",
  },
  // Progress Circle Styles
  circleContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  circleWrapper: {
    position: "relative",
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  circleBase: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 80,
    borderWidth: 8,
    borderColor: "#d1d5db", // border-gray-300
  },
  circleProgress: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 80,
    borderWidth: 8,
    borderColor: "#4338ca", // indigo-700
    borderTopColor: "transparent", // Create the 'gap'
    transform: [{ rotate: "140deg" }], // Rotate to match image
  },
  circleTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#374151",
  },
  // Bottom Nav Styles
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