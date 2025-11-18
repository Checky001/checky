import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import { useStaffAuth } from "@/context/StaffAuthContext";

export default function StaffInventoryDashboardScreen() {
  const router = useRouter();
  const { user } = useStaffAuth();
  const [query, setQuery] = useState("");

  if (!user) {
    router.replace("/staff-login");
    return null;
  }

  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inventory</Text>
        <Text style={styles.subtitle}>
          {user.branchName} • {user.role === "stock_clerk" ? "Stock Clerk" : "Manager"}
        </Text>
      </View>

      <View style={styles.searchRow}>
        <Ionicons
          name="search-outline"
          size={20}
          color={Colors.text.tertiary}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products by name"
          placeholderTextColor={Colors.text.tertiary}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={{ paddingBottom: Spacing["2xl"] }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((p) => (
          <Card key={p.product_id} style={styles.itemCard}>
            <View style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{p.name}</Text>
                <Text style={styles.itemCategory}>
                  {p.category ?? "Uncategorized"}
                </Text>
              </View>
              <Text style={styles.itemPrice}>{formatCurrency(p.price)}</Text>
            </View>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Price Checker (Scan)"
          onPress={() => {
            // For prototype, just show an informational alert via console / UI later.
          }}
          variant="outline"
          fullWidth
          style={{ marginBottom: Spacing.sm }}
        />
        <Button
          title="Back to Staff Menu"
          onPress={() => router.replace("/staff-manager-home")}
          fullWidth
        />
      </View>

      <View style={styles.scanFab}>
        <Button
          title="Scan Item"
          onPress={() => {
            // Placeholder: in a real app this opens camera scanner.
          }}
          fullWidth
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
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.borderRadius.md,
    backgroundColor: Colors.background.primary,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    ...Typography.styles.body,
    color: Colors.text.primary,
  },
  list: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  itemCard: {
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
  },
  itemCategory: {
    ...Typography.styles.caption,
    color: Colors.text.secondary,
  },
  itemPrice: {
    ...Typography.styles.bodyMedium,
    color: Colors.primary[600],
  },
  footer: {
    padding: Spacing.md,
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  scanFab: {
    position: "absolute",
    right: Spacing.md,
    bottom: Spacing["2xl"],
    width: 160,
  },
});


