import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { useWallet } from "@/context/WalletContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/animations/FadeInView";
import { getStaggerDelay } from "@/constants/animations";

export default function WalletScreen() {
  const { balance, transactions, addFunds } = useWallet();
  const [topUpAmount, setTopUpAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleTopUp = async () => {
    const amount = parseFloat(topUpAmount);

    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    if (amount < 500) {
      Alert.alert("Error", "Minimum top-up amount is ₦500");
      return;
    }

    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    await addFunds(amount);

    setIsLoading(false);
    setTopUpAmount("");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Success", `₦${amount.toLocaleString()} added to your wallet!`);
  };

  const quickAmounts = [1000, 5000, 10000, 20000];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card */}
        <FadeInView delay={0}>
          <Card style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>DVA Wallet Balance</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
            <View style={styles.balanceFooter}>
              <Text style={styles.balanceFooterText}>💳 DVA Payment System</Text>
            </View>
          </Card>
        </FadeInView>

        {/* Top Up Section */}
        <FadeInView delay={100}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Up Wallet</Text>
            <Card style={styles.topUpCard}>
              <Text style={styles.inputLabel}>Amount (₦)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                placeholderTextColor={Colors.text.tertiary}
                value={topUpAmount}
                onChangeText={setTopUpAmount}
                keyboardType="numeric"
              />

              <View style={styles.quickAmounts}>
                {quickAmounts.map((amount) => (
                  <TouchableOpacity
                    key={amount}
                    style={styles.quickAmountButton}
                    onPress={() => setTopUpAmount(amount.toString())}
                  >
                    <Text style={styles.quickAmountText}>
                      ₦{amount.toLocaleString()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Button
                title={isLoading ? "Processing..." : "Add Funds"}
                onPress={handleTopUp}
                fullWidth
                size="lg"
                loading={isLoading}
                disabled={isLoading}
              />
            </Card>
          </View>
        </FadeInView>

        {/* Transaction History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map((txn, index) => (
            <FadeInView key={txn.id} delay={getStaggerDelay(index, 50)}>
              <Card style={styles.transactionCard}>
                <View style={styles.transactionContent}>
                  <View
                    style={[
                      styles.transactionIcon,
                      {
                        backgroundColor:
                          txn.type === "credit"
                            ? Colors.success[50]
                            : Colors.error[50],
                      },
                    ]}
                  >
                    <Text style={styles.transactionEmoji}>
                      {txn.type === "credit" ? "↓" : "↑"}
                    </Text>
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionDescription}>
                      {txn.description}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {formatDate(txn.timestamp)}
                    </Text>
                    {txn.reference && (
                      <Text style={styles.transactionRef}>
                        Ref: {txn.reference}
                      </Text>
                    )}
                  </View>
                  <View style={styles.transactionAmountContainer}>
                    <Text
                      style={[
                        styles.transactionAmount,
                        {
                          color:
                            txn.type === "credit"
                              ? Colors.success[600]
                              : Colors.error[600],
                        },
                      ]}
                    >
                      {txn.type === "credit" ? "+" : "-"}
                      {formatCurrency(txn.amount)}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            txn.status === "completed"
                              ? Colors.success[50]
                              : txn.status === "pending"
                              ? Colors.warning[50]
                              : Colors.error[50],
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          {
                            color:
                              txn.status === "completed"
                                ? Colors.success[700]
                                : txn.status === "pending"
                                ? Colors.warning[700]
                                : Colors.error[700],
                          },
                        ]}
                      >
                        {txn.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            </FadeInView>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  balanceCard: {
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.primary[500],
  },
  balanceLabel: {
    ...Typography.styles.body,
    color: Colors.primary[100],
    marginBottom: Spacing.xs,
  },
  balanceAmount: {
    ...Typography.styles.h1,
    color: Colors.text.inverse,
    marginBottom: Spacing.md,
  },
  balanceFooter: {
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.primary[400],
  },
  balanceFooterText: {
    ...Typography.styles.caption,
    color: Colors.primary[100],
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.styles.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  topUpCard: {
    padding: Spacing.lg,
  },
  inputLabel: {
    ...Typography.styles.captionMedium,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  input: {
    ...Typography.styles.h4,
    color: Colors.text.primary,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderRadius: Spacing.borderRadius.md,
    marginBottom: Spacing.md,
    backgroundColor: Colors.background.primary,
  },
  quickAmounts: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
    flexWrap: "wrap",
  },
  quickAmountButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.borderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.primary[300],
    backgroundColor: Colors.primary[50],
  },
  quickAmountText: {
    ...Typography.styles.captionMedium,
    color: Colors.primary[700],
  },
  transactionCard: {
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  transactionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  transactionEmoji: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  transactionDate: {
    ...Typography.styles.small,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  transactionRef: {
    ...Typography.styles.small,
    color: Colors.text.tertiary,
    fontFamily: Typography.fonts.regular,
  },
  transactionAmountContainer: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    ...Typography.styles.h6,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Spacing.borderRadius.sm,
  },
  statusText: {
    ...Typography.styles.small,
    textTransform: "capitalize",
  },
});

