import { getPosts } from "@/api/posts";
import { Text } from "@/components/ui/Form";
import React, { useEffect } from "react";
import { View, StyleSheet, Platform, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Post from "@/components/post";
import Skeleton from "@/components/ui/Skeleton";
import { useAuth } from "@/hooks/useAuth";

const page = () => {
  const { userToken } = useAuth();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(userToken),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Dashboard Page</Text>
      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <Skeleton style={styles.postSkeleton} />
          <Skeleton style={styles.postSkeleton} />
          <Skeleton style={styles.postSkeleton} />
          <Skeleton style={styles.postSkeleton} />
          <Skeleton style={styles.postSkeleton} />
          <Skeleton style={styles.postSkeleton} />
        </View>
      ) : (
        posts?.map((post) => {
          return (
            <Post
              post={post}
              key={post.id}
              displayName={post.profile.displayName}
            />
          );
        })
      )}
    </View>
  );
};

export default page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2F",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  skeletonContainer: {
    gap: 8,
  },
  postSkeleton: {
    height: 70,
    minWidth: "100%",
  },
  postContainer: {
    backgroundColor: "#2D3748",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#4A5568",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
    width: "100%",
    maxWidth: 600,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4A5568",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#718096",
  },
  nameDateContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 2,
  },
  nameText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Platform.select({
      android: "Poppins_600SemiBold",
      ios: "Poppins-SemiBold",
    }),
    letterSpacing: 0.3,
  },
  dateText: {
    color: "#A0AEC0",
    fontSize: 13,
    fontFamily: Platform.select({
      android: "Poppins_400Regular",
      ios: "Poppins-Regular",
    }),
  },
  postText: {
    color: "#F7FAFC",
    fontFamily: Platform.select({
      android: "Poppins_400Regular",
      ios: "Poppins-Regular",
    }),
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 0.3,
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
