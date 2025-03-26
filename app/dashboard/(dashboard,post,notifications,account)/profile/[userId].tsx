import { getUserPosts } from "@/api/posts";
import { getUserProfile } from "@/api/profiles";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

import Post from "@/components/post";
import AppButton from "@/components/AppButton";
import { BodyScrollView } from "@/components/ui/BodyScrollView";

export default function ProfileScreen() {
  const { userToken } = useAuth();
  const router = useRouter();
  const glob = useGlobalSearchParams();
  const userId = glob.userId as string;

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: userProfileError,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfile(userId, userToken),
  });

  if (isProfileLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (userProfileError) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Error Loading User Profile</Text>
        <AppButton
          onPress={() => {
            router.back();
          }}
        >
          Go Back To Feed
        </AppButton>
      </View>
    );
  }

  const { data: userPosts, isLoading: isUserPostsLoading } = useQuery({
    queryKey: ["user-posts"],
    queryFn: () => getUserPosts(userId, userToken),
  });

  return (
    <BodyScrollView>
      <View style={styles.container}>
        <View style={styles.avatar}></View>
        <Text style={styles.text}>{profile?.displayName}</Text>

        <View style={styles.followerContainer}>
          <Text style={styles.followerText}>{userPosts?.length} Posts</Text>
          <Text style={styles.followerText}>0 Follower</Text>
          <Text style={styles.followerText}>0 Following</Text>
        </View>

        {isUserPostsLoading ? (
          <View style={styles.container}>
            <Text style={styles.text}>Loading User Posts</Text>
          </View>
        ) : (
          userPosts?.map((post) => {
            return (
              <Post
                post={post}
                key={post.id}
                displayName={profile?.displayName || ""}
              />
            );
          })
        )}
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2F",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    minHeight: "100%",
  },
  followerContainer: {
    flexDirection: "row",
    flex: 1,
    marginTop: 12,
    marginBottom: 12,
  },
  followerText: {
    flex: 1,
    fontWeight: "medium",
    color: "white",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4A5568",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#718096",
    marginVertical: 20,
  },
  text: {
    color: "white",
  },
});
