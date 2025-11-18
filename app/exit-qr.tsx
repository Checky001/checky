import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useReceipts } from "@/context/ReceiptContext";

export default function ExitQRScreen() {
  const router = useRouter();
  const { receiptId } = useLocalSearchParams<{ receiptId?: string }>();
  const { getReceiptById } = useReceipts();

  const receipt = receiptId ? getReceiptById(String(receiptId)) : undefined;

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Ionicons name="checkmark-circle" size={80} color={Colors.success[500]} />
        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.subtitle}>
          Show this QR code and receipt to staff at the exit.
        </Text>

        {receipt ? (
          <>
            <Card style={styles.qrCard}>
              <View style={styles.qrPlaceholder}>
                <Ionicons name="qr-code" size={120} color={Colors.primary[500]} />
                <Text style={styles.qrCode}>{receipt.exitQr}</Text>
              </View>
            </Card>

            <Card style={styles.receiptCard}>
              <Text style={styles.receiptTitle}>
                {receipt.storeName ?? "Store"}
              </Text>
              <Text style={styles.receiptMeta}>
                {new Date(receipt.createdAt).toLocaleString()}
              </Text>

              <View style={styles.receiptItemsHeader}>
                <Text style={styles.receiptItemsHeaderText}>Item</Text>
                <Text style={styles.receiptItemsHeaderText}>Total</Text>
              </View>

              {receipt.items.map((item) => (
                <View key={item.product_id} style={styles.receiptItemRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.receiptItemName}>{item.name}</Text>
                    <Text style={styles.receiptItemMeta}>
                      {item.quantity} × {formatCurrency(item.price)}
                    </Text>
                  </View>
                  <Text style={styles.receiptItemTotal}>
                    {formatCurrency(item.price * item.quantity)}
                  </Text>
                </View>
              ))}

              <View style={styles.receiptTotalRow}>
                <Text style={styles.receiptTotalLabel}>Total Paid</Text>
                <Text style={styles.receiptTotalAmount}>
                  {formatCurrency(receipt.total)}
                </Text>
              </View>
            </Card>
          </>
        ) : (
          <Card style={styles.qrCard}>
            <Text style={styles.missingText}>
              No receipt data found. This screen is best viewed after completing
              a checkout.
            </Text>
          </Card>
        )}

        <Button
          title="Done Shopping"
          onPress={() => router.push("/(tabs)/home")}
          fullWidth
          size="lg"
          style={{ marginBottom: Spacing.md }}
        />
        <Button
          title="View All Receipts"
          onPress={() => router.push("/receipts")}
          fullWidth
          variant="outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
    paddingBottom: Spacing["2xl"],
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
  receiptCard: {
    padding: Spacing.xl,
    width: "100%",
  },
  receiptTitle: {
    ...Typography.styles.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  receiptMeta: {
    ...Typography.styles.caption,
    color: Colors.text.tertiary,
    marginBottom: Spacing.md,
  },
  receiptItemsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  receiptItemsHeaderText: {
    ...Typography.styles.captionMedium,
    color: Colors.text.secondary,
  },
  receiptItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: Spacing.xs,
  },
  receiptItemName: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
  },
  receiptItemMeta: {
    ...Typography.styles.caption,
    color: Colors.text.secondary,
  },
  receiptItemTotal: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
  },
  receiptTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  receiptTotalLabel: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
  },
  receiptTotalAmount: {
    ...Typography.styles.h5,
    color: Colors.primary[600],
  },
  missingText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: "center",
  },
});
