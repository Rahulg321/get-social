import { getUserPosts } from "@/api/posts";
import { getUserProfile } from "@/api/profiles";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

import Post from "@/components/post";
import AppButton from "@/components/AppButton";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Skeleton from "@/components/ui/Skeleton";
import { followUser, getFollowing } from "@/api/followers";
import { useAuth } from "@/hooks/useAuth";
import * as AC from "@bacons/apple-colors";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function ProfileScreen() {
  const { userToken } = useAuth();
  const router = useRouter();
  const glob = useGlobalSearchParams();
  const userId = glob.userId as string;
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: userProfileError,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfile(userId, userToken),
  });

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

  console.log("user posts inside user route", userPosts);

  const { data: following, isLoading: isFollowingLoading } = useQuery({
    queryKey: ["following", userId],
    queryFn: () => getFollowing(userToken, userId),
  });

  const { mutate: followUserMutation, isPending: isFollowLoading } =
    useMutation({
      mutationFn: ({ unFollow }: { unFollow: boolean }) =>
        followUser(userToken, userId, unFollow),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["following", userId],
        });
      },
    });

  console.log("check whether user follows", following);

  return (
    <BodyScrollView>
      <View style={styles.container}>
        {isProfileLoading ? (
          <View style={styles.skeletonContainer}>
            <Text style={styles.text}>Loading User Profile</Text>
            <Skeleton style={styles.postSkeleton} />
          </View>
        ) : (
          <View style={styles.profileSection}>
            <View style={styles.avatar} />
            <Text style={styles.displayName}>{profile?.displayName}</Text>
            {isFollowingLoading ? (
              <Skeleton style={styles.postSkeleton} />
            ) : (
              <AppButton
                isLoading={isFollowLoading}
                style={following ? styles.unFollowButton : styles.followButton}
                disabled={isFollowLoading}
                icon={
                  <IconSymbol
                    color={AC.lightText}
                    name={following ? "checkmark.circle" : "checkmark"}
                    size={24}
                  />
                }
                onPress={() => {
                  followUserMutation({ unFollow: following ? true : false });
                }}
              >
                {following ? "UnFollow" : "Follow"}
              </AppButton>
            )}
            <View style={styles.followerContainer}>
              <View style={styles.followerItem}>
                <Text style={styles.followerCount}>{userPosts?.length}</Text>
                <Text style={styles.followerLabel}>Posts</Text>
              </View>
              <View style={styles.followerItem}>
                <Text style={styles.followerCount}>0</Text>
                <Text style={styles.followerLabel}>Followers</Text>
              </View>
              <View style={styles.followerItem}>
                <Text style={styles.followerCount}>0</Text>
                <Text style={styles.followerLabel}>Following</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.postsSection}>
          {isUserPostsLoading ? (
            <View style={styles.skeletonContainer}>
              <Skeleton style={styles.postSkeleton} />
              <Skeleton style={styles.postSkeleton} />
              <Skeleton style={styles.postSkeleton} />
              <Skeleton style={styles.postSkeleton} />
              <Skeleton style={styles.postSkeleton} />
              <Skeleton style={styles.postSkeleton} />
            </View>
          ) : (
            userPosts?.map((post) => (
              <Post
                post={post}
                key={post.id}
                displayName={profile?.displayName || ""}
              />
            ))
          )}
        </View>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2F",
    padding: 16,
    minHeight: "100%",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2D3748",
  },
  followButton: {
    // backgroundColor: "green",
  },
  unFollowButton: {
    backgroundColor: "#aaa",
  },
  followerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  followerItem: {
    alignItems: "center",
  },
  followerCount: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  followerLabel: {
    color: "#A0AEC0",
    fontSize: 14,
    marginTop: 4,
  },
  skeletonContainer: {
    gap: 12,
    width: "100%",
  },
  postSkeleton: {
    height: 80,
    width: "100%",
    borderRadius: 8,
  },
  postsSection: {
    marginTop: 16,
    gap: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4A5568",
    borderWidth: 3,
    borderColor: "#718096",
    marginBottom: 16,
  },
  displayName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
