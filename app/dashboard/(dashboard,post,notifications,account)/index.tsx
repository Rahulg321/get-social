import { getPosts } from "@/api/posts";
import { Text } from "@/components/ui/Form";
import useAuth from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/db/schema";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { formatDistanceToNow } from "date-fns";

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
    <BodyScrollView style={styles.postContainer}>
      <View style={styles.headerContainer}>
        {/* <Avatar // Use the Avatar component
          rounded
          source={{
            uri: "https://randomuser.me/api/portraits/men/1.jpg", // Example URL
          }}
          size={40} // Adjust size as needed
          containerStyle={styles.avatarContainer}
        /> */}
        <View style={styles.nameDateContainer}>
          <Text style={styles.nameText}>John Doe</Text>{" "}
          {/* Replace with actual name */}
          <Text style={styles.dateText}>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </Text>{" "}
          {/* Replace with actual date */}
        </View>
      </View>
      <Text style={styles.postText}>{post.text}</Text>
      {/* You can add more elements here, like a timestamp, author, or image */}
    </BodyScrollView>
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
  postContainer: {
    backgroundColor: "#2D3748",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#4A5568",
  },
  postText: {
    color: "#F7FAFC",
    fontFamily: Platform.select({
      android: "Poppins_400Regular",
      ios: "Poppins-Regular",
    }),
    fontSize: 16,
    lineHeight: 24,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center", // Vertically align avatar and text
    marginBottom: 8, // Add space between header and post text
  },
  avatarContainer: {
    marginRight: 8, // Add space to the right of the avatar
  },
  nameDateContainer: {
    flexDirection: "column", // Stack name and date vertically
  },
  nameText: {
    color: "#fff", // White for the name
    fontWeight: "600", // Make the name bold
    fontSize: 16,
    fontFamily: Platform.select({
      android: "Poppins_600SemiBold",
      ios: "Poppins-SemiBold",
    }),
  },
  dateText: {
    color: "#A0AEC0", // Gray for the date
    fontSize: 12,
    fontFamily: Platform.select({
      android: "Poppins_400Regular",
      ios: "Poppins-Regular",
    }),
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
