import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useBasket } from "@/context/BasketContext";
import { useWallet } from "@/context/WalletContext";
import { useStore } from "@/context/StoreContext";
import { useReceipts } from "@/context/ReceiptContext";
import { generateExitQR } from "@/utils/qrGenerator";

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, total, clearCart, currentStoreId } = useBasket();
  const { balance, deductFunds } = useWallet();
  const { currentStore } = useStore();
  const { createReceipt } = useReceipts();

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const handlePayment = async () => {
    if (balance < total) {
      Alert.alert("Insufficient Funds", "Please add funds to your wallet");
      return;
    }

    // Snapshot items before any state changes
    const snapshotItems = items.map((item) => ({ ...item }));
    const storeName = currentStore?.name ?? "Anonymous Store";
    const storeId = currentStore?.store_id ?? currentStoreId ?? null;

    const success = await deductFunds(total, "Purchase");
    if (success) {
      const transactionId = `TXN_${Date.now().toString(36).toUpperCase()}`;
      const exitQr = generateExitQR(transactionId);

      const receipt = createReceipt({
        storeId,
        storeName,
        total,
        items: snapshotItems,
        exitQr,
      });

      Alert.alert("Payment Successful", "Your order has been processed", [
        {
          text: "View Receipt",
          onPress: () => {
            clearCart();
            router.push({
              pathname: "/exit-qr",
              params: { receiptId: receipt.id },
            } as any);
          },
        },
      ]);
    } else {
      Alert.alert("Payment Failed", "Please try again");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Checkout</Text>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {items.map((item) => (
            <View key={item.product_id} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
              <Text style={styles.itemPrice}>
                {formatCurrency(item.price * item.quantity)}
              </Text>
            </View>
          ))}
          <View style={[styles.itemRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.walletRow}>
            <Ionicons name="wallet" size={24} color={Colors.primary[500]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.walletLabel}>DVA Wallet</Text>
              <Text style={styles.walletBalance}>
                Balance: {formatCurrency(balance)}
              </Text>
            </View>
            <Ionicons name="checkmark-circle" size={24} color={Colors.success[500]} />
          </View>
        </Card>

        <Button
          title={`Pay ${formatCurrency(total)}`}
          onPress={handlePayment}
          fullWidth
          size="lg"
          disabled={balance < total}
        />

        {balance < total && (
          <View style={styles.insufficientContainer}>
            <Text style={styles.warningText}>
              Insufficient funds. Please add {formatCurrency(total - balance)} to your wallet.
            </Text>
            <Button
              title="Top Up Wallet"
              onPress={() => router.push("/(tabs)/wallet")}
              variant="outline"
              fullWidth
              style={{ marginTop: Spacing.sm }}
            />
          </View>
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
  content: {
    flex: 1,
    padding: Spacing.xl,
  },
  title: {
    ...Typography.styles.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.xl,
  },
  card: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  itemName: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
  },
  itemPrice: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
  },
  totalRow: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  totalLabel: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
  },
  totalAmount: {
    ...Typography.styles.h5,
    color: Colors.primary[500],
  },
  walletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  walletLabel: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
  },
  walletBalance: {
    ...Typography.styles.caption,
    color: Colors.text.secondary,
  },
  warningText: {
    ...Typography.styles.caption,
    color: Colors.error[500],
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  insufficientContainer: {
    marginTop: Spacing.md,
  },
});
