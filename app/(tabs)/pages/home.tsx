import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

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
          <Text style={styles.fastText}>Pengingat Cepat</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginTop: 10 }}>
        {tasks.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSub}>{item.due}</Text>

            {/* Progress Bar */}
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${item.progress * 100}%` }]} />
            </View>
          </View>
        ))}
      </ScrollView>
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
});
