import { getPosts } from "@/api/posts";
import { Text } from "@/components/ui/Form";
import useAuth from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/db/schema";

const page = () => {
  const { userToken } = useAuth();

  const {
    data: posts,
    isLoading,
    isError,
    isLoadingError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(userToken),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading your feed.......</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error occured trying to load your feed</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Dashboard Page</Text>

      {posts?.map((post) => {
        return <PostComponent post={post} key={post.id} />;
      })}
    </View>
  );
};

export default page;

function PostComponent({ post }: { post: Post }) {
  return (
    <View>
      <Text
        style={{
          color: "white",
          fontFamily: Platform.select({
            android: "Poppins_900Black",
            ios: "Poppins-Black",
          }),
        }}
      >
        {post.text}
      </Text>
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
  postTitle: {
    fontSize: 24,
    fontWeight: "semibold",
    color: "red",
    marginBottom: 25,
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
