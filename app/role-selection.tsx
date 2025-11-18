import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function RoleSelectionScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>Select how you'd like to use Checky</Text>
        
        <Card style={styles.card}>
          <Button
            title="Customer"
            onPress={() => router.push("/store-entry")}
            fullWidth
            style={{ marginBottom: Spacing.md }}
          />
          <Button
            title="Store Admin"
            onPress={() => router.push("/store-registration")}
            variant="secondary"
            fullWidth
            style={{ marginBottom: Spacing.md }}
          />
          <Button
            title="Demo Menu"
            onPress={() => router.push("/demo-menu")}
            variant="outline"
            fullWidth
          />
        </Card>
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
    padding: Spacing.xl,
  },
  title: {
    ...Typography.styles.h2,
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
  card: {
    padding: Spacing.xl,
  },
});
