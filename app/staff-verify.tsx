import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";

export default function StaffVerifyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="checkmark-done-circle" size={80} color={Colors.success[500]} />
        <Text style={styles.title}>Staff Verification</Text>
        <Text style={styles.subtitle}>Scan customer exit QR to verify purchase</Text>
        <Button
          title="Scan Exit QR"
          onPress={() => router.push("/mock-camera")}
          fullWidth
        />
        <Button
          title="Go Back"
          onPress={() => router.back()}
          variant="outline"
          fullWidth
          style={{ marginTop: Spacing.md }}
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
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
    textAlign: "center",
  },
});
