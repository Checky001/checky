import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useStaffAuth } from "@/context/StaffAuthContext";

export default function StaffManagerHomeScreen() {
  const router = useRouter();
  const { user, logout } = useStaffAuth();

  if (!user) {
    router.replace("/staff-login");
    return null;
  }

  const goToDefaultByRole = () => {
    if (user.role === "security") {
      router.replace("/staff-security-scan");
    } else if (user.role === "stock_clerk") {
      router.replace("/staff-inventory-dashboard");
    }
  };

  // Auto-route non-managers to their default module
  if (user.role !== "manager") {
    goToDefaultByRole();
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Staff Modules</Text>
        <Text style={styles.subtitle}>
          {user.name} • {user.branchName} • Manager
        </Text>
      </View>

      <View style={styles.content}>
        <Card
          style={styles.card}
          onPress={() => router.push("/staff-security-scan")}
        >
          <Ionicons
            name="scan-circle-outline"
            size={32}
            color={Colors.success[600]}
          />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Exit Scanner</Text>
            <Text style={styles.cardSubtitle}>
              Verify exit QR codes and approve customer exits.
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.text.tertiary}
          />
        </Card>

        <Card
          style={styles.card}
          onPress={() => router.push("/staff-inventory-dashboard")}
        >
          <Ionicons
            name="cube-outline"
            size={32}
            color={Colors.primary[600]}
          />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Inventory</Text>
            <Text style={styles.cardSubtitle}>
              Scan items, adjust prices, and manage catalog.
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.text.tertiary}
          />
        </Card>
      </View>

      <View style={styles.footer}>
        <Button
          title="Logout"
          variant="outline"
          fullWidth
          onPress={() => {
            logout();
            router.replace("/staff-login");
          }}
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
  header: {
    padding: Spacing.xl,
    backgroundColor: Colors.background.primary,
  },
  title: {
    ...Typography.styles.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  card: {
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  cardSubtitle: {
    ...Typography.styles.small,
    color: Colors.text.secondary,
  },
  footer: {
    padding: Spacing.md,
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
});


