import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useStaffAuth } from "@/context/StaffAuthContext";

export default function StaffSecurityScanScreen() {
  const router = useRouter();
  const { user } = useStaffAuth();
  const [manualOrderId, setManualOrderId] = useState("");

  if (!user) {
    router.replace("/staff-login");
    return null;
  }

  const goToResult = (orderId: string) => {
    if (!orderId.trim()) {
      Alert.alert("Error", "Please enter an Order ID");
      return;
    }
    router.push({
      pathname: "/staff-security-result",
      params: { orderId },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/staff-manager-home")}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exit Scanner</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Card style={styles.cameraCard}>
          <View style={styles.cameraMock}>
            <Ionicons
              name="qr-code-outline"
              size={72}
              color={Colors.text.inverse}
            />
            <Text style={styles.cameraText}>
              In a production build this would be the live camera scanning the
              exit QR.
            </Text>
          </View>
        </Card>

        <Card style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>Demo Scans</Text>
          <View style={styles.demoButtons}>
            <Button
              title="Simulate VALID Scan"
              onPress={() => goToResult("ORDER_VALID_001")}
              fullWidth
              size="md"
              style={{ marginBottom: Spacing.sm }}
            />
            <Button
              title="Simulate ALREADY SCANNED"
              onPress={() => goToResult("ORDER_ALREADY_EXITED_001")}
              fullWidth
              size="md"
              variant="outline"
              style={{ marginBottom: Spacing.sm }}
            />
            <Button
              title="Simulate UNPAID / INVALID"
              onPress={() => goToResult("ORDER_UNPAID_001")}
              fullWidth
              size="md"
              variant="outline"
            />
          </View>

          <View style={{ marginTop: Spacing.lg }}>
            <Text style={styles.sectionTitle}>Manual Entry</Text>
            <Input
              label="Order ID"
              placeholder="Type or paste order ID"
              value={manualOrderId}
              onChangeText={setManualOrderId}
            />
            <Button
              title="Verify Order"
              onPress={() => goToResult(manualOrderId)}
              fullWidth
            />
          </View>
        </Card>
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
    gap: Spacing.md,
  },
  cameraCard: {
    padding: Spacing.lg,
    backgroundColor: Colors.neutral[900],
  },
  cameraMock: {
    height: 220,
    borderRadius: Spacing.borderRadius.md,
    backgroundColor: Colors.neutral[800],
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
  },
  cameraText: {
    ...Typography.styles.caption,
    color: Colors.text.inverse,
    textAlign: "center",
    marginTop: Spacing.md,
  },
  actionsCard: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  demoButtons: {
    marginTop: Spacing.xs,
  },
});


