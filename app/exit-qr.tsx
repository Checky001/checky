import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ExitQRScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={80} color={Colors.success[500]} />
        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.subtitle}>Show this QR code to staff at exit</Text>

        <Card style={styles.qrCard}>
          <View style={styles.qrPlaceholder}>
            <Ionicons name="qr-code" size={120} color={Colors.primary[500]} />
            <Text style={styles.qrCode}>EXIT-{Date.now().toString().slice(-6)}</Text>
          </View>
        </Card>

        <Button
          title="Done Shopping"
          onPress={() => router.push("/(tabs)/home")}
          fullWidth
          size="lg"
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
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
    textAlign: "center",
  },
  qrCard: {
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    alignItems: "center",
  },
  qrPlaceholder: {
    alignItems: "center",
    padding: Spacing.xl,
    backgroundColor: Colors.background.primary,
    borderRadius: Spacing.borderRadius.lg,
  },
  qrCode: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginTop: Spacing.md,
    fontFamily: "monospace",
  },
});
