import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FadeInView } from "@/components/animations/FadeInView";

export default function ScanScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FadeInView delay={0}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="scan" size={40} color={Colors.text.inverse} />
            </View>
            <Text style={styles.title}>Scan to Shop</Text>
            <Text style={styles.subtitle}>
              Scan store QR codes or product barcodes
            </Text>
          </View>
        </FadeInView>

        <FadeInView delay={100}>
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>What would you like to scan?</Text>

            <View style={{ flexDirection: "row", gap: Spacing.sm, marginBottom: Spacing.md }}>
              <Ionicons name="qr-code" size={20} color={Colors.primary[500]} />
              <Text style={styles.cardSubtitle}>Store QR Code</Text>
            </View>
            <Button
              title="Scan Store QR"
              onPress={() => router.push("/mock-camera")}
              fullWidth
              size="lg"
              style={{ marginBottom: Spacing.md }}
            />

            <View style={{ flexDirection: "row", gap: Spacing.sm, marginBottom: Spacing.md }}>
              <Ionicons name="barcode" size={20} color={Colors.secondary[500]} />
              <Text style={styles.cardSubtitle}>Product Barcode</Text>
            </View>
            <Button
              title="Scan Product"
              onPress={() => router.push("/product-scan")}
              variant="outline"
              fullWidth
              size="lg"
            />
          </Card>
        </FadeInView>

        <FadeInView delay={200}>
          <View style={styles.infoBox}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: Spacing.sm }}>
              <Ionicons name="information-circle" size={20} color={Colors.accent[700]} style={{ marginRight: 8 }} />
              <Text style={styles.infoTitle}>Demo Mode</Text>
            </View>
            <Text style={styles.infoText}>
              Camera scanning is simulated for this demo. In production, you'll
              use your phone's camera to scan real QR codes and barcodes.
            </Text>
          </View>
        </FadeInView>
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
    padding: Spacing.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing['2xl'],
    marginTop: Spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.secondary[500],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    ...Colors.shadow.lg,
  },
  title: {
    ...Typography.styles.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  card: {
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  cardTitle: {
    ...Typography.styles.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  cardSubtitle: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.secondary,
  },
  infoBox: {
    backgroundColor: Colors.accent[50],
    borderRadius: Spacing.borderRadius.md,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent[500],
  },
  infoTitle: {
    ...Typography.styles.h6,
    color: Colors.accent[700],
    marginBottom: Spacing.sm,
  },
  infoText: {
    ...Typography.styles.caption,
    color: Colors.accent[700],
    lineHeight: 20,
  },
});

