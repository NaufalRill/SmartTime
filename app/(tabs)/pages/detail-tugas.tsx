
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { Link, useLocalSearchParams, useFocusEffect, useRouter } from "expo-router";
import { BottomNav } from "@/components/bottomnav";
import api from '../../service/api';



export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
  useCallback(() => {
    if (id) {
      fetchDetail();
    }
  }, [id])
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const fetchDetail = async () => {
    try {
      // 3. Panggil API berdasarkan ID (Pastikan backend mendukung route ini)
      // Contoh endpoint: GET /api/tugas/5
      const response = await api.get(`/tugas/${id}`);
      
      if (response.data.success) {
        setDetail(response.data.data);
      }
    } catch (error) {
      console.error("Error fetch detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
  Alert.alert("Hapus Tugas", "Apakah kamu yakin?", [
    { text: "Batal", style: "cancel" },
    {
      text: "Hapus",
      style: "destructive",
      onPress: async () => {
        try {
          const taskId = Number(detail.id);
          const res = await api.delete(`/tugas/${taskId}`);

          if (res.data.success) {
            Alert.alert("Berhasil", "Tugas berhasil dihapus");
            router.replace("/(tabs)/pages/home");
          }
        } catch (err) {
          console.log("DELETE ERROR:", err);
          Alert.alert("Error", "Tidak bisa terhubung ke server");
        }
      },
    },
  ]);
};


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;
  }

  if (!detail) {
    return <Text style={{ textAlign: "center", marginTop: 50 }}>Data tidak ditemukan</Text>;
  }

  return (
    <View style={styles.mainContainer}>
      
      {/* --- CONTENT AREA --- */}
      <ScrollView style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Link href="/(tabs)/pages/home">
            <Ionicons name="arrow-back" size={28} color="#000" />
          </Link>
          <Text style={styles.headerTitle}>Smart Time</Text>
        </View>

        {/* Card Detail */}
        <View style={styles.card}>
          
          {/* Baris Judul & Icon */}
          <View style={styles.cardHeaderRow}>
            <Text style={styles.taskTitle}>{detail.judul}</Text>
            <View style={styles.headerIcons}>
              {/* Titik Kuning */}
              <View style={styles.yellowDot} />
                <Ionicons
                  name="chevron-down"
                  size={24}
                  color="white"
                  style={{ marginLeft: 10 }}
                />
              </View>
          </View>

          <Text style={styles.deadlineText}>
            Deadline : {formatDate(detail.deadline)}
          </Text>

          {/* Bagian Status */}
          <View style={styles.statusContainer}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Prioritas :</Text>
              <Text style={styles.statusValue}>{detail.prioritas}</Text>
            </View>
            {/* Garis putih di bawah status */}
            <View style={styles.underline} />
          </View>

          {/* Bagian Kesulitan */}
          <View style={styles.statusContainer}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Kesulitan :</Text>
              <Text style={styles.statusValue}>{detail.kesulitan}</Text>
            </View>
            {/* Garis putih di bawah status */}
            <View style={styles.underline} />
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${detail.progress}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Link href={{
                pathname: "/(tabs)/ubah_progres",
                params: { id: detail.id },
              }}
              style={styles.actionButtonText}> Ubah Progres</Link>
          </TouchableOpacity>


          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#D32F2F" }]}
            onPress={handleDelete}
          >
            <Text style={styles.actionButtonText}>Hapus Tugas</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginLeft: 10,
    color: "#3E2CD2",
  },
  
  // Styles Kartu
  card: {
    backgroundColor: "#3423CA",
    borderRadius: 20,
    padding: 20,
    paddingBottom: 30,
    marginBottom: 30,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  taskTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yellowDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFE600',
  },
  deadlineText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 30,
    opacity: 0.9,
  },
  
  // Styles Bagian Status
  statusContainer: {
    marginBottom: 30,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingRight: 20,
  },
  statusLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  statusValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  underline: {
    height: 1.5,
    backgroundColor: 'white',
    width: '100%',
    opacity: 0.8,
  },

  // Styles Progress Bar
  progressContainer: {
    marginTop: 10,
  },
  progressTrack: {
    width: "100%",
    height: 12,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
  progressFill: {
    height: 12,
    backgroundColor: "#D32F2F",
    borderRadius: 10,
  },

  // Styles Tombol Aksi
  actionContainer: {
    alignItems: 'center',
    gap: 15,
  },
  actionButton: {
    backgroundColor: "#3B28D6",
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
	width: 0,
	height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },


});