import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { BottomNav } from "@/components/bottomnav";
import React, { useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import api from '../../service/api';

import { useAuth } from "../../service/AuthContext";

interface Task {
  id: number;
  judul: string;
  deadline: string;
  progress: number;
}


export default function HomeScreen() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  const [currentFilter, setCurrentFilter] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const filterOptions = [ "Semua", "Tugas", "Kuliah", "Organisasi"];

  const fetchTasks = async (kategoriDipilih : string) => {
    if (!user?.id) return;

    try {
      const param = kategoriDipilih === "Semua" ? "" : `?kategori=${kategoriDipilih}`; //memilih kategori
      const response = await api.get('/tugas', {
        params: {
            id_user: user.id,
            kategori: kategoriDipilih 
        }
      });
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
      fetchTasks(currentFilter);
    }, [user, currentFilter])
  );



    const calculateDaysLeft = (deadlineDate : string, progress: number) => {
      if (!deadlineDate) return "Tanpa Tanggal";

      if (progress === 100) return ( <Text style={{ color: 'lime' }}>Selesai</Text> );

      const today = new Date();
      const due = new Date(deadlineDate);
      const timeDiff = due.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff < 0) return ( <Text style={{ color: 'red' }}>Tanggal Terlewat</Text> );
      if (daysDiff === 0)
        return ( <Text style={{ color: 'red' }}>Deadline Hari Ini</Text> );
  
      return `${daysDiff} Hari Lagi`;
    };

    const handleSelectFilter = (filterName: string) => {
    setCurrentFilter(filterName);
    setIsFilterOpen(false);
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Time</Text>
      <View style={styles.line} />

      {/* Filter Row */}
      <View style={[styles.row, { zIndex : 1000}]} >
        {/* Tombol Filter dengan Dropdown */}
        <View style={{ position: 'relative' }}> 
            <TouchableOpacity 
                style={styles.filterBtn} 
                onPress={() => setIsFilterOpen(!isFilterOpen)}
            >
                <Text style={styles.filterText}>
                    {currentFilter === "Semua" ? "Filter" : currentFilter}
                </Text>
                <Ionicons name={isFilterOpen ? "chevron-up" : "chevron-down"} size={16} color="black" />
            </TouchableOpacity>

            {/* DROPDOWN MENU */}
            {isFilterOpen && (
                <View style={styles.dropdownContainer}>
                    {filterOptions.map((option) => (
                        <TouchableOpacity 
                            key={option} 
                            style={styles.dropdownItem}
                            onPress={() => handleSelectFilter(option)} //menampikan droopdown menu
                        >
                            <Text style={{ 
                                fontWeight: currentFilter === option ? 'bold' : 'normal',
                                color: currentFilter === option ? '#4433ff' : 'black'
                            }}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>

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
                params: { id: item.id } 
              }} 
              style={styles.cardTitle}
            >
              {item.judul}
            </Link>
            <Text style={styles.cardSub}>

              {calculateDaysLeft(item.deadline, item.progress)}
            </Text>

            {/* Progress Bar */}    
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${item.progress }%` }]} />
            </View> 
          </View> // menampilkan  proges bar


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
    fontSize: 30,
    fontWeight: "700",
    color: "#3E2CD2",
    marginTop: 40,
    marginBottom: 10,
  },
  line: {
    height: 2,
    backgroundColor: "#E6D6F7",
    marginHorizontal:-20,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  filterBtn: {
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    backgroundColor: '#eee', 
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  filterText: {
    fontWeight: 'bold',
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

  // Style Dropdown Baru
    dropdownContainer: {
        position: 'absolute',
        top: 45, // Muncul di bawah tombol
        left: 0,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 5, // Shadow Android
        shadowColor: '#000', // Shadow iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 5
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },


});
