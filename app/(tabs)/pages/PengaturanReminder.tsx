import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BottomNav } from "@/components/bottomnav";
import { useAuth } from "../../service/AuthContext";

export default function PengaturanReminder() {
  const [notifSound, setNotifSound] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);


  const { signOut } = useAuth();


  const handleLogout = async () => {
    try {
      setPopupVisible(false);
      await signOut();
      router.replace("/auth/login");
    } catch (error) {
      console.error("Gagal Logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan nih</Text>

      <View style={styles.divider} />

      {/* Konten Lainnya tetap sama */}
      <View style={styles.settingBox}>
        <Text style={styles.settingText}>Suara notifikasi On/Off</Text>
        <Switch
          value={notifSound}
          onValueChange={setNotifSound}
          trackColor={{ false: "#ccc", true: "#4cd964" }}
        />
      </View>

      <TouchableOpacity style={styles.settingBox}>
        <Text style={styles.settingText}>Default Waktu Pengingat : 20:00</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingBox}>
        <Text style={styles.settingText}>Pesan Motivasi : Aktif / Nonaktif</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#444" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingBox}>
        <Text style={styles.settingText}>Tema Notifikasi : Terang / Gelap</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#444" />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => setPopupVisible(true)}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* POPUP CONFIRM LOGOUT */}
      <Modal transparent visible={popupVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.popupBox}>
            <Text style={styles.popupText}>Apakah Anda Yakin Untuk Logout ?</Text>
            <View style={styles.popupBtnRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setPopupVisible(false)}
              >
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.okBtn} onPress={handleLogout}>
                <Text style={styles.okText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNav />
    </View>
  );
}

// Styles tetap sama seperti sebelumnya...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3E2CD2",
    textAlign: "center",
  },
  divider: {
    height: 2,
    backgroundColor: "#E6DBF5",
    marginHorizontal: -20,
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupBox: {
    width: 260,
    backgroundColor: "#3F34D1",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  popupText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  popupBtnRow: {
    flexDirection: "row",
    gap: 15,
  },
  cancelBtn: {
    backgroundColor: "#4CD964",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  cancelText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  okBtn: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  okText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});