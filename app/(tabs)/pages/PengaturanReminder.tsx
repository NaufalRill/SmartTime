import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { BottomNav } from "@/components/bottomnav";

const PengaturanReminder = () => {
  const [notifSound, setNotifSound] = useState(true);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Pengaturan</Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Notification Sound Toggle */}
      <View style={styles.settingBox}>
        <Text style={styles.settingText}>Suara notifikasi On/Off</Text>
        <Switch
          value={notifSound}
          onValueChange={setNotifSound}
          trackColor={{ false: "#ccc", true: "#4cd964" }}
        />
      </View>

      {/* Default Time */}
      <TouchableOpacity style={styles.settingBox}>
        <Text style={styles.settingText}>Default Waktu Pengingat : 20:00</Text>
      </TouchableOpacity>

      {/* Motivational Message */}
      <TouchableOpacity style={styles.settingBox}>
        <Text style={styles.settingText}>Pesan Motivasi : Aktif / Nonaktif</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#444" />
      </TouchableOpacity>

      {/* Theme Setting */}
      <TouchableOpacity style={styles.settingBox}>
        <Text style={styles.settingText}>Tema Notifikasi : Terang / Gelap</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#444" />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Link href="/auth/login" style={styles.logoutText}>Log Out</Link>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <BottomNav />

    </View>
  );
};

export default PengaturanReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3740AC",
    textAlign: "center",
  },

  divider: {
    height: 2,
    backgroundColor: "#E6DBF5",
    marginVertical: 15,
  },

  settingBox: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  settingText: {
    fontSize: 15,
    color: "#333",
  },

  logoutBtn: {
    marginTop: 25,
    alignSelf: "center",
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },



  centerBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
