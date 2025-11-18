import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Card } from "@/components/ui/Card";

export default function DemoMenuScreen() {
  const router = useRouter();

  const menuItems = [
    { title: "Store Entry", icon: "storefront", route: "/store-entry" },
    { title: "Product Scan", icon: "barcode", route: "/product-scan" },
    { title: "Shopping Cart", icon: "cart", route: "/basket" },
    { title: "Mock Camera", icon: "camera", route: "/mock-camera" },
    { title: "Staff Verify", icon: "checkmark-circle", route: "/staff-verify" },
    { title: "Staff App (RBAC Demo)", icon: "shield-checkmark", route: "/staff-login" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Checky Demo</Text>
        <Text style={styles.subtitle}>Explore all features</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {menuItems.map((item) => (
          <Card
            key={item.route}
            style={styles.menuCard}
            onPress={() => router.push(item.route as any)}
          >
            <Ionicons name={item.icon as any} size={24} color={Colors.primary[500]} />
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
          </Card>
        ))}
      </ScrollView>
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
    backgroundColor: Colors.primary[500],
  },
  title: {
    ...Typography.styles.h2,
    color: Colors.text.inverse,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.primary[100],
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  menuCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  menuTitle: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
    flex: 1,
  },
});
