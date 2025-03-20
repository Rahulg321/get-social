import { Text } from "@/components/ui/Form";
import { useRouter } from "expo-router";
import { Button, Image, Pressable, StyleSheet, View } from "react-native";

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/slash.jpeg")}
        style={styles.logo}
      />

      <Text style={styles.title}>Time to get Social</Text>
      <Pressable
        style={styles.signInButton}
        onPress={() => {
          router.push("/(auth)/sign-in");
        }}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      <Pressable
        style={styles.signUpButton}
        onPress={() => {
          router.push("/(auth)/sign-up");
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E2F",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  logo: {
    width: 240,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    marginTop: 12,
    fontWeight: "bold",
    color: "white",
  },
  signInButton: {
    padding: 12,
    marginTop: 4,
    borderRadius: 8,
    backgroundColor: "blue",
  },
  signUpButton: {
    padding: 12,
    marginTop: 4,
    borderRadius: 8,
    backgroundColor: "gray",
  },
});
