import { createPost } from "@/api/posts";
import AppButton from "@/components/AppButton";
import { Text } from "@/components/ui/Form";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const PostPage = () => {
  const [text, setText] = useState("");
  const router = useRouter();
  const { userToken } = useAuth();

  // if (!userToken) {
  //   console.log("inside post token ", userToken);
  //   router.push("/(auth)/sign-in");
  // }

  async function handlePost() {
    console.log(text);
    createPost(text, userToken)
      .then((post) => {
        router.back();
      })
      .catch((error) => {
        alert(error.message || "An Error Occured");
      });
  }

  return (
    <View style={styles.container} className="bg-red-300">
      <Text style={styles.title}>What do you want to say?</Text>
      <TextInput
        style={styles.input}
        placeholder="Post Text"
        placeholderTextColor="#999"
        multiline
        autoCapitalize="none"
        onChangeText={setText}
        value={text}
      />
      <AppButton onPress={handlePost}>Add Post</AppButton>
    </View>
  );
};

export default PostPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2F",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    height: 100,
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
