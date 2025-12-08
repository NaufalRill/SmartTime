import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { BottomNav } from "@/components/bottomnav";
import React, { useState, useCallback } from 'react';
import api from '../../service/api';

interface Task {
  id: number;
  judul: string;
  deadline: string;
  progress: number;
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);


  const fetchTasks = async () => {
    try {
      const response = await api.get('/tugas');
      const json = response.data;

      if (json.success) {
        setTasks(json.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

    useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

    const calculateDaysLeft = (deadlineDate : string) => {
      if (!deadlineDate) return "Tanpa Tanggal";

      const today = new Date();
      const due = new Date(deadlineDate);
      const timeDiff = due.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff < 0) return ( <Text style={{ color: 'red' }}>Tanggal Terlewat</Text> );
      if (daysDiff === 0) return ( <Text style={{ color: 'red' }}>Deadline Hari Ini</Text> );
      return `${daysDiff} Hari Lagi`;
    };
  

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
            <Link 
              href={{
                pathname: "/(tabs)/pages/detail-tugas",
                params: { id: item.id } // <-- Mengirim ID tugas ke halaman tujuan
              }} 
              style={styles.cardTitle}
            >
              {item.judul}
            </Link>
            <Text style={styles.cardSub}>
              {calculateDaysLeft(item.deadline)}
            </Text>

            {/* Progress Bar */}
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${item.progress }%` }]} />
            </View>
          </View>


        ))}

      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: "#fff",
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
