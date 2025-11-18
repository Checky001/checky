import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";
import {
  mockStaffOrders,
  MockOrder,
} from "@/data/mockStaffOrders";

type ScreenStatus = "valid" | "invalid" | "already";

function getStatus(order?: MockOrder): ScreenStatus {
  if (!order || order.status === "unpaid") return "invalid";
  if (order.status === "exited") return "already";
  return "valid";
}

export default function StaffSecurityResultScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();

  const order = mockStaffOrders.find((o) => o.id === orderId);
  const status = getStatus(order);

  const bgColor =
    status === "valid"
      ? Colors.success[50]
      : status === "already"
      ? Colors.warning[50]
      : Colors.error[50];
  const iconColor =
    status === "valid"
      ? Colors.success[600]
      : status === "already"
      ? Colors.warning[600]
      : Colors.error[600];
  const label =
    status === "valid"
      ? "VALID"
      : status === "already"
      ? "ALREADY SCANNED"
      : "INVALID";
  const description =
    status === "valid"
      ? "Payment confirmed. Customer can exit after quick bag check."
      : status === "already"
      ? "This exit QR has already been used. Confirm with the customer."
      : "Order not found or unpaid. Do not allow exit.";

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.statusBanner, { backgroundColor: bgColor }]}>
        <Ionicons
          name={
            status === "valid"
              ? "checkmark-circle"
              : status === "already"
              ? "alert-circle"
              : "close-circle"
          }
          size={40}
          color={iconColor}
        />
        <Text style={[styles.statusLabel, { color: iconColor }]}>{label}</Text>
        <Text style={styles.statusDescription}>{description}</Text>
      </View>

      {order && (
        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: Spacing["2xl"] }}
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Order Details</Text>
            <Text style={styles.rowLabel}>Order ID</Text>
            <Text style={styles.rowValue}>{order.id}</Text>

            <Text style={styles.rowLabel}>Customer</Text>
            <Text style={styles.rowValue}>{order.customerName}</Text>

            <Text style={styles.rowLabel}>Total</Text>
            <Text style={styles.rowValue}>
              {formatCurrency(order.total)}
            </Text>

            <Text style={styles.rowLabel}>Created At</Text>
            <Text style={styles.rowValue}>
              {new Date(order.createdAt).toLocaleString()}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Items</Text>
            {order.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMeta}>
                    {item.qty} × {formatCurrency(item.price)}
                  </Text>
                </View>
                <Text style={styles.itemTotal}>
                  {formatCurrency(item.qty * item.price)}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      <View style={styles.footer}>
        <Button
          title="Back to Scanner"
          onPress={() => router.replace("/staff-security-scan")}
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
  statusBanner: {
    padding: Spacing.lg,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  statusLabel: {
    ...Typography.styles.h4,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  statusDescription: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: Spacing.borderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  cardTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  rowLabel: {
    ...Typography.styles.captionMedium,
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
  },
  rowValue: {
    ...Typography.styles.body,
    color: Colors.text.primary,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: Spacing.xs,
  },
  itemName: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
  },
  itemMeta: {
    ...Typography.styles.caption,
    color: Colors.text.secondary,
  },
  itemTotal: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
  },
  footer: {
    padding: Spacing.md,
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
});


