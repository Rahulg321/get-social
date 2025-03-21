import AppButton from "@/components/AppButton";
import { Text } from "@/components/ui/Form";
import { secureDelete } from "@/utils/secure-store";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const AccountPage = () => {
  const router = useRouter();

  return (
    <View>
      <Text>AccountPage</Text>
      <AppButton
        onPress={() => {
          secureDelete("token");
          router.push("/");
        }}
      >
        Logout
      </AppButton>
    </View>
  );
};

export default AccountPage;
