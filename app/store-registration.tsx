import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";

export default function StoreRegistrationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Store Registration</Text>
        <Text style={styles.subtitle}>Register your store with Checky</Text>
        <Button
          title="Go Back"
          onPress={() => router.back()}
          variant="outline"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  title: {
    ...Typography.styles.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
  },
});
