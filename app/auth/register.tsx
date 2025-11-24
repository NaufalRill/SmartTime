import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);
    // nanti disambungkan ke backend (Laravel / Node / Firebase)
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
