import AppButton from "@/components/AppButton";
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
      <AppButton
        style={styles.button}
        onPress={() => {
          router.push("/(auth)/sign-in");
        }}
      >
        Sign In
      </AppButton>
      <AppButton
        style={styles.signUpButton}
        onPress={() => {
          router.push("/(auth)/sign-up");
        }}
      >
        Sign Up
      </AppButton>
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
  button: {
    marginTop: 12,
  },

  signUpButton: {
    marginTop: 12,
    backgroundColor: "gray",
  },
});
