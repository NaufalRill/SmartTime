import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";

export default function HomeScreen() {
  const tasks = [
    { title: "Rekayasa Interaksi", due: "1 hari lagi", progress: 0.6 },
    { title: "Pra Skripsi", due: "5 hari lagi", progress: 0.4 },
    { title: "Praktikum PKPL", due: "14 hari lagi", progress: 0.2 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Time</Text>

      {/* Filter Row */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fastBtn}>
          <Link href="/(tabs)/pages/tambahpengingat" style={styles.fastText}>Pengingat Cepat</Link>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginTop: 10 }}>
        {tasks.map((item, index) => (
          <View key={index} style={styles.card}>
            <Link href="/(tabs)/pages/detail-tugas" style={styles.cardTitle}>{item.title}</Link>
            <Text style={styles.cardSub}>{item.due}</Text>

            {/* Progress Bar */}
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${item.progress * 100}%` }]} />
            </View>
          </View>


        ))}

        

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="/(tabs)/pages/home"><Ionicons name="home" size={28} /></Link>
        <Link href="/(tabs)/pages/home"><Ionicons name="briefcase" size={28} /></Link>
        <Link href="/(tabs)/tambah_tugas"><Ionicons name="add-circle-outline" size={36} /></Link>
        <Link href="/(tabs)/pages/notifikasi"><Ionicons name="notifications" size={28} /></Link>
        <Link href="/(tabs)/pages/PengaturanReminder"><Ionicons name="settings" size={28} /></Link>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#4424E9",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  filterBtn: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  filterText: {
    fontWeight: "600",
  },
  fastBtn: {
    backgroundColor: "#4424E9",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  fastText: {
    fontWeight: "600",
    color: "white",
  },

  card: {
    backgroundColor: "#4424E9",
    padding: 16,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  cardSub: {
    color: "white",
    marginTop: 3,
    marginBottom: 8,
  },
  progressBg: {
    width: "100%",
    height: 8,
    backgroundColor: "#D8D8D8",
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
