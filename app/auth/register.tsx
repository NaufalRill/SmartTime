import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router"; // Import useRouter

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State loading

  // GANTI IP INI SESUAI KOMPUTER ANDA
  const API_URL = 'http://172.20.10.2:3000/api/register'; 

 const handleRegister = async () => {
    if (!email || !username || !password) {
      Alert.alert("Error", "Semua kolom harus diisi!");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Mencoba connect ke:", API_URL); // 1. Cek URL di log

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });

      // --- BAGIAN DEBUGGING (UBAH INI) ---
      // Jangan langsung .json(), tapi ambil text-nya dulu
      const textResponse = await response.text(); 
      console.log("Respon dari server:", textResponse); // <--- LIHAT INI DI TERMINAL

      // Coba parse manual, kalau gagal kita tahu isinya HTML
      let json;
      try {
        json = JSON.parse(textResponse);
      } catch (e) {
        Alert.alert("Error Server", "Server mengirim HTML, bukan JSON. Cek terminal/console log.");
        throw new Error("Server response is not JSON: " + textResponse);
      }
      // ------------------------------------

      if (json.success) {
        Alert.alert("Sukses", "Akun berhasil dibuat!");
        router.replace("/auth/login");
      } else {
        Alert.alert("Gagal", json.message || "Terjadi kesalahan");
      }

    } catch (error) {
      console.error("Error Fetch:", error);
      Alert.alert("Error", "Gagal terhubung. Lihat log console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Time</Text>

      {/* EMAIL */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address" // Tambahan: keyboard khusus email
        />
      </View>

      {/* USERNAME */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      {/* PASSWORD */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* REGISTER BUTTON */}
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
            <ActivityIndicator color="#fff" />
        ) : (
            <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      {/* GO TO LOGIN */}
      <Text style={styles.footerText}>
        Already have an account?
        <Link href="/auth/login" style={styles.loginLink}> Login</Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 35,
    fontWeight: "700",
    color: "#3E2CD2",
    textAlign: "center",
    marginBottom: 50,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#3E2CD2",
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center', // Agar loading spinner di tengah
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
  loginLink: {
    color: "#3E2CD2",
    fontWeight: "600",
  },
});