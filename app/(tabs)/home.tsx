import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/WalletContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FadeInView } from "@/components/animations/FadeInView";
import { getStaggerDelay } from "@/constants/animations";
import { stores } from "@/data/stores";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { balance } = useWallet();

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const approvedStores = stores.filter((s) => s.status === "approved");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <FadeInView delay={0}>
          <View style={styles.header}>
            <View style={styles.greetingRow}>
              <Ionicons
                name="hand-right-outline"
                size={24}
                color={Colors.primary[500]}
                style={{ marginRight: Spacing.sm }}
              />
              <Text style={styles.greeting}>Hello, {user?.name || "User"}!</Text>
              <Text style={styles.subtitle}>Ready to shop?</Text>
            </View>
            <TouchableOpacity
              style={styles.walletBadge}
              onPress={() => router.push("/(tabs)/wallet")}
            >
              <Text style={styles.walletLabel}>Wallet</Text>
              <Text style={styles.walletAmount}>{formatCurrency(balance)}</Text>
            </TouchableOpacity>
          </View>
        </FadeInView>

        {/* Quick Actions */}
        <FadeInView delay={100}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <Card
                style={styles.actionCard}
                onPress={() => router.push("/mock-camera")}
              >
                <Ionicons
                  name="qr-code-outline"
                  size={28}
                  color={Colors.primary[500]}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionTitle}>Scan QR</Text>
                <Text style={styles.actionSubtitle}>Enter store</Text>
              </Card>
              <Card
                style={styles.actionCard}
                onPress={() => router.push("/(tabs)/wallet")}
              >
                <Ionicons
                  name="wallet-outline"
                  size={28}
                  color={Colors.secondary[600]}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionTitle}>Top Up</Text>
                <Text style={styles.actionSubtitle}>Add funds</Text>
              </Card>
              <Card
                style={styles.actionCard}
                onPress={() => router.push("/staff-verify")}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={28}
                  color={Colors.success[600]}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionTitle}>Staff</Text>
                <Text style={styles.actionSubtitle}>Verify exit</Text>
              </Card>
              <Card
                style={styles.actionCard}
                onPress={() => router.push("/demo-menu")}
              >
                <Ionicons
                  name="flash-outline"
                  size={28}
                  color={Colors.accent[600]}
                  style={styles.actionIcon}
                />
                <Text style={styles.actionTitle}>Demo</Text>
                <Text style={styles.actionSubtitle}>All features</Text>
              </Card>
            </View>
          </View>
        </FadeInView>

        {/* Nearby Stores */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Stores</Text>
            <Badge text={`${approvedStores.length}`} variant="primary" />
          </View>

          {approvedStores.slice(0, 3).map((store, index) => (
            <FadeInView key={store.store_id} delay={getStaggerDelay(index, 100)}>
              <Card
                style={styles.storeCard}
                onPress={() => {
                  router.push({
                    pathname: "/store-entry",
                    params: { storeCode: store.store_id },
                  });
                }}
              >
                <View style={styles.storeCardContent}>
                  <View style={styles.storeIcon}>
                    <Ionicons
                      name="storefront-outline"
                      size={24}
                      color={Colors.primary[700]}
                    />
                  </View>
                  <View style={styles.storeInfo}>
                    <Text style={styles.storeName}>{store.name}</Text>
                    <Text style={styles.storeAddress}>{store.address}</Text>
                    <Text style={styles.storeCategory}>{store.category}</Text>
                  </View>
                  <View style={styles.storeArrow}>
                    <Text style={styles.arrowIcon}>→</Text>
                  </View>
                </View>
              </Card>
            </FadeInView>
          ))}
        </View>

        {/* Info Banner */}
        <FadeInView delay={300}>
          <View style={styles.infoBanner}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: Spacing.sm }}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={Colors.primary[600]}
                style={{ marginRight: Spacing.xs }}
              />
              <Text style={styles.infoBannerTitle}>How it works</Text>
            </View>
            <Text style={styles.infoBannerText}>
              1. Scan store QR to enter{"\n"}
              2. Scan products as you shop{"\n"}
              3. Pay with your wallet{"\n"}
              4. Show exit QR to leave
            </Text>
          </View>
        </FadeInView>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.xl,
  },
  greeting: {
    ...Typography.styles.h3,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
  },
  walletBadge: {
    backgroundColor: Colors.primary[500],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.borderRadius.lg,
    alignItems: "flex-end",
  },
  walletLabel: {
    ...Typography.styles.small,
    color: Colors.primary[100],
    marginBottom: 2,
  },
  walletAmount: {
    ...Typography.styles.h6,
    color: Colors.text.inverse,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.styles.h5,
    color: Colors.text.primary,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  actionCard: {
    width: "48%",
    padding: Spacing.lg,
    alignItems: "center",
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  actionTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  actionSubtitle: {
    ...Typography.styles.small,
    color: Colors.text.secondary,
  },
  storeCard: {
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  storeCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  storeIcon: {
    width: 50,
    height: 50,
    borderRadius: Spacing.borderRadius.md,
    backgroundColor: Colors.primary[50],
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  storeEmoji: {
    fontSize: 24,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  storeAddress: {
    ...Typography.styles.small,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  storeCategory: {
    ...Typography.styles.small,
    color: Colors.primary[600],
  },
  storeArrow: {
    marginLeft: Spacing.sm,
  },
  arrowIcon: {
    fontSize: 20,
    color: Colors.text.tertiary,
  },
  infoBanner: {
    backgroundColor: Colors.primary[50],
    borderRadius: Spacing.borderRadius.md,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary[500],
  },
  infoBannerTitle: {
    ...Typography.styles.h6,
    color: Colors.primary[700],
    marginBottom: Spacing.sm,
  },
  infoBannerText: {
    ...Typography.styles.caption,
    color: Colors.primary[600],
    lineHeight: 20,
  },
});

