import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const ReminderScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Smart Time</Text>
      <View style={styles.line} />

      {/* CARD REMINDER */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Reminder</Text>

        <View style={styles.innerCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Nama</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>Rekayasa Interaksi</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Waktu</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.value}>20:00 Hari Ini</Text>
          </View>

          <Text style={styles.label}>Pesan :</Text>
          <Text style={styles.message}>
            “Ayo kerjakan 15 menit lagi sebelum istirahat”
          </Text>
        </View>

        {/* Button Row */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btnPrimary}>
            <Text style={styles.btnText}>Selesai</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSecondary}>
            <Text style={styles.btnText}>Tunda 30 menit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="/(tabs)/pages/home"><Ionicons name="home" size={28} /></Link>
        <Link href="/(tabs)/TambahKegiatan"><Ionicons name="briefcase" size={28} /></Link>
        <Link href="/(tabs)/tambah_tugas"><Ionicons name="add-circle-outline" size={36} /></Link>
        <Link href="/(tabs)/pages/notifikasi"><Ionicons name="notifications" size={28} /></Link>
        <Link href="/(tabs)/pages/PengaturanReminder"><Ionicons name="settings" size={28} /></Link>
      </View>

    </View>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#fff",
  },

  header: {
    fontSize: 34,
    fontWeight: "700",
    color: "#3E2CD2",
    marginLeft: 20,
  },

  line: {
    height: 3,
    backgroundColor: "#E7D8FF",
    marginTop: 10,
  },

  card: {
    marginTop: 40,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    paddingBottom: 30,
  },

  cardTitle: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 15,
  },

  innerCard: {
    backgroundColor: "#3E2CD2",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    width: 80,
  },

  colon: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    width: 10,
  },

  value: {
    color: "#fff",
    fontSize: 16,
    flexShrink: 1,
  },

  message: {
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  btnPrimary: {
    backgroundColor: "#3E2CD2",
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 20,
  },

  btnSecondary: {
    backgroundColor: "#3E2CD2",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
