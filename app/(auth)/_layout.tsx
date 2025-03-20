import Stack from "@/components/ui/Stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign in",
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign up",
          presentation: "card",
        }}
      />
    </Stack>
  );
}
