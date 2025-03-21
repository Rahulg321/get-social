import AppButton from "@/components/AppButton";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { secureSave } from "@/utils/secure-store";

export default function SignUpScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      if (!email || !password) {
        alert("Email and password are required");
      }
      // Add your authentication logic here
      console.log("Email:", email);
      console.log("Password:", password);

      const response = await fetch("/api/sign-in", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("response from api in sign in", data.token);
        await secureSave("token", data.token);
        console.log("successfully secured token in storage");
        router.push("/dashboard/(dashboard)");
        setEmail("");
        setPassword("");
      } else {
        console.log(response.body);
        throw new Error("did not get a valid request");
      }

      console.log("made a post request to sign in");
    } catch (error) {
      console.log(error);
      alert("an error occured while trying to make a post request ");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign IN</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <AppButton onPress={handleSignUp}>Sign IN</AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2F",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
