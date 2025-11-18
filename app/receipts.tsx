import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Card } from "@/components/ui/Card";
import { useReceipts } from "@/context/ReceiptContext";

export default function ReceiptsScreen() {
  const router = useRouter();
  const { receipts } = useReceipts();

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receipts</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: Spacing["2xl"] }}
        showsVerticalScrollIndicator={false}
      >
        {receipts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="receipt-outline"
              size={64}
              color={Colors.text.tertiary}
            />
            <Text style={styles.emptyTitle}>No receipts yet</Text>
            <Text style={styles.emptySubtitle}>
              Complete a checkout to generate your first receipt.
            </Text>
          </View>
        ) : (
          receipts.map((receipt) => (
            <TouchableOpacity
              key={receipt.id}
              onPress={() =>
                router.push({
                  pathname: "/exit-qr",
                  params: { receiptId: receipt.id },
                } as any)
              }
            >
              <Card style={styles.receiptCard}>
                <View style={styles.receiptRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.storeName}>
                      {receipt.storeName ?? "Store"}
                    </Text>
                    <Text style={styles.dateText}>
                      {new Date(receipt.createdAt).toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>
                      {formatCurrency(receipt.total)}
                    </Text>
                    <View style={styles.qrTag}>
                      <Ionicons
                        name="qr-code-outline"
                        size={14}
                        color={Colors.primary[600]}
                      />
                      <Text style={styles.qrTagText}>Exit QR</Text>
                    </View>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  headerTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing["2xl"],
  },
  emptyTitle: {
    ...Typography.styles.h4,
    color: Colors.text.primary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: "center",
    paddingHorizontal: Spacing.lg,
  },
  receiptCard: {
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  receiptRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  storeName: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
  },
  dateText: {
    ...Typography.styles.caption,
    color: Colors.text.tertiary,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amountText: {
    ...Typography.styles.bodyMedium,
    color: Colors.primary[600],
  },
  qrTag: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Spacing.borderRadius.full,
    backgroundColor: Colors.primary[50],
  },
  qrTagText: {
    ...Typography.styles.small,
    color: Colors.primary[700],
    marginLeft: 4,
  },
});


