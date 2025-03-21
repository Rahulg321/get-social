import Stack from "@/components/ui/Stack";
import { useRouter } from "expo-router";
import React from "react";
import { Button } from "react-native";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="post"
        options={{
          presentation: "modal",
          headerTitle: "Create Post",
          headerLeft: () => (
            <Button
              title="Cancel"
              onPress={() => {
                router.back();
              }}
            ></Button>
          ),
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          presentation: "modal",
          headerTitle: "Notifications",
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          presentation: "card",
        }}
      />
    </Stack>
  );
};

export default Layout;
