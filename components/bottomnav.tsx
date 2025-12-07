import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export function BottomNav() {
    return (
             <View style={styles.bottomNav}>
                <Link href="/(tabs)/pages/home"><Ionicons name="home" size={28} /></Link>
                <Link href="/(tabs)/tambahkegiatan"><Ionicons name="briefcase" size={28} /></Link>
                <Link href="/(tabs)/tambahtugas"><Ionicons name="add-circle-outline" size={36} /></Link>
                <Link href="/(tabs)/pages/notifikasi"><Ionicons name="notifications" size={28} /></Link>
                <Link href="/(tabs)/pages/PengaturanReminder"><Ionicons name="settings" size={28} /></Link>
              </View>
    );

}

const styles = StyleSheet.create({
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