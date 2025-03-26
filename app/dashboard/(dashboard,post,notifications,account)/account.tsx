import AppButton from "@/components/AppButton";
import { Text } from "@/components/ui/Form";
import { secureDelete } from "@/utils/secure-store";
import { useRouter } from "expo-router";
import React, { useEffect, useState, useTransition } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import * as AC from "@bacons/apple-colors";
import * as Form from "@/components/ui/Form";
import { IconSymbol } from "@/components/ui/IconSymbol";
import useAuth from "@/hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfiles, updateProfileDisplayName } from "@/api/profiles";

const AccountPage = () => {
  const router = useRouter();
  const { userToken } = useAuth();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => getProfiles(userToken),
  });

  const [profileDisplayName, setProfileDisplayName] = useState(
    profile?.displayName || "display name"
  );

  useEffect(() => {
    setProfileDisplayName(profile?.displayName || "");
  }, [profile]);

  const handleDisplayNameClick = async () => {
    try {
      if (!profileDisplayName) {
        return;
      }

      console.log("inside disply name click");
      startTransition(() => {
        updateProfileDisplayName(profileDisplayName, userToken)
          .then((e) => {
            alert("Successfully updated profile Name");
            queryClient.invalidateQueries({
              queryKey: ["profiles"],
            });
          })
          .catch((error) => alert(error));
      });
    } catch (error) {
      alert("An error occured trying to change display name");
    }
  };

  return (
    <View>
      <Form.List navigationTitle="Settings">
        <Form.Section title="Profile">
          <Form.HStack>
            <IconSymbol
              color={AC.systemBlue}
              name="info.circle.fill"
              size={24}
            />
            {isProfileLoading ? (
              <ActivityIndicator />
            ) : (
              <TextInput
                style={styles.input}
                value={profileDisplayName}
                onChangeText={setProfileDisplayName}
              />
            )}
            {!isProfileLoading && (
              <Pressable
                onPress={() => {
                  handleDisplayNameClick();
                }}
              >
                {isPending ? (
                  <ActivityIndicator />
                ) : (
                  <IconSymbol
                    color={AC.systemGreen}
                    name="checkmark"
                    size={24}
                  />
                )}
              </Pressable>
            )}
          </Form.HStack>
        </Form.Section>
        <Form.Section title="Security">
          <Form.HStack>
            <IconSymbol
              color={AC.systemYellow}
              name="person.fill.badge.plus"
              size={24}
            />
            <Form.Text
              onPress={() => {
                secureDelete("token");
                router.replace("/");
              }}
            >
              Sign Out
            </Form.Text>
          </Form.HStack>
        </Form.Section>
      </Form.List>
    </View>
  );
};

export default AccountPage;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: AC.lightText,
    borderRadius: 8,

    padding: 8,
  },
});
