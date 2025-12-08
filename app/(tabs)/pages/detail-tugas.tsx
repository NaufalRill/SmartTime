import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { Link, useLocalSearchParams } from "expo-router";
import { BottomNav } from "@/components/bottomnav";
import api from '../../service/api';

export default function DetailScreen() {
  // 2. Tangkap ID yang dikirim dari Home
  const { id } = useLocalSearchParams(); 
  
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const fetchDetail = async () => {
    try {
      // 3. Panggil API berdasarkan ID (Pastikan backend mendukung route ini)
      // Contoh endpoint: GET /api/tugas/5
      const response = await api.get(`/tugas/${id}`);
      
      if (response.data.success) {
        // Asumsi backend mengembalikan { success: true, data: { ... } }
        // Jika backend mengembalikan array, mungkin perlu response.data.data[0]
        setDetail(response.data.data); 
      }
    } catch (error) {
      console.error("Error fetch detail:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!detail) return <Text>Data tidak ditemukan</Text>;

  return (
    <View style={styles.mainContainer}>
      
      {/* --- CONTENT AREA --- */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.headerRow}>
            <Link href="/(tabs)/pages/home"><Ionicons name="arrow-back" size={28} color="#000" /> </Link>
            <Text style={styles.headerTitle}>Smart Time</Text>
        </View>

        {/* Kartu Detail Tugas */}
        <View style={styles.card}>
          
          {/* Baris Judul & Icon */}
          <View style={styles.cardHeaderRow}>
            <Text style={styles.taskTitle}>{detail.judul}</Text>
            <View style={styles.headerIcons}>
              {/* Titik Kuning */}
              <View style={styles.yellowDot} />
              {/* Chevron Down */}
              <Ionicons name="chevron-down" size={24} color="white" style={{ marginLeft: 10 }} />
            </View>
          </View>

          {/* Deadline */}
          <Text style={styles.deadlineText}>Deadline : {formatDate(detail.deadline)}</Text>

          {/* Bagian Status */}
          <View style={styles.statusContainer}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Prioritas :</Text>
              <Text style={styles.statusValue}>{detail.prioritas}</Text>
            </View>
            {/* Garis putih di bawah status */}
            <View style={styles.underline} />
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, {  width: `${detail.progress }%` }]} />
            </View>
          </View>
        </View>

        {/* Tombol Aksi */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Link href="/(tabs)/ubah_progres" style={styles.actionButtonText}>Ubah Progres</Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Tanda Selesai</Text>
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
    backgroundColor: "#3423CA", // Warna biru/ungu gelap sesuai gambar
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
    backgroundColor: '#FFE600', // Warna kuning
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
    paddingRight: 20, // Agar teks tidak terlalu mepet kanan
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
    backgroundColor: "#D9D9D9", // Abu-abu terang
    borderRadius: 10,
  },
  progressFill: {
    height: 12,
    backgroundColor: "#D32F2F", // Merah gelap
    borderRadius: 10,
  },

  // Styles Tombol Aksi
  actionContainer: {
    alignItems: 'center',
    gap: 15, // Jarak antar tombol
  },
  actionButton: {
    backgroundColor: "#3B28D6", // Ungu sedikit lebih terang dari kartu atau sama
    width: '100%', // Tombol lebar penuh
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