import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router"; 

export default function LoginScreen() {
  const router = useRouter(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const API_URL = 'http://172.16.60.91:3000/api/login'; 


  const handleLogin = async () => {

    if (!username || !password) {
      Alert.alert("Error", "Username dan Password tidak boleh kosong");
      return;
    }

    setIsLoading(true);

    try {
 
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const json = await response.json();

      if (json.success) {
  
        Alert.alert("Sukses", json.message);
        

        router.replace('/(tabs)/pages/home'); 
      } else {

        Alert.alert("Gagal", json.message);
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal terhubung ke server. Cek IP Address!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Time</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none" 
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Tombol Login */}
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
            <ActivityIndicator color="#fff" />
        ) : (
            // Hapus <Link> disini, kita handle navigasi di fungsi handleLogin
            <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don’t have an account?
        <Text
          style={styles.register}
          onPress={() => router.push("/auth/register")}
        >
          {" "}Register
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: '#fff'
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
    backgroundColor: "#8D8D8D", // Bisa diganti #3E2CD2 agar senada
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center'
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
  register: {
    color: "#3E2CD2",
    fontWeight: "600",
  },
});