import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function StoreSignupScreen() {
  const router = useRouter();
  const [storeCode, setStoreCode] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!storeCode.trim() || !adminEmail.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    Alert.alert(
      "Store Account Created",
      "Your Checky store dashboard is ready. In a real deployment, this would open your admin console.",
      [
        {
          text: "Go to Demo Menu",
          onPress: () => router.push("/demo-menu"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Store Signup</Text>
          <Text style={styles.subtitle}>
            Connect an approved store to the Checky dashboard and DVA wallet.
          </Text>

          <Card style={styles.card}>
            <Input
              label="Store Code"
              placeholder="e.g. STORE_001"
              value={storeCode}
              onChangeText={setStoreCode}
              autoCapitalize="characters"
            />
            <Input
              label="Admin Email"
              placeholder="owner@store.com"
              value={adminEmail}
              onChangeText={setAdminEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              title="Create Store Account"
              onPress={handleSignup}
              fullWidth
              size="lg"
              style={{ marginTop: Spacing.md }}
            />

            <Button
              title="Back"
              onPress={() => router.back()}
              variant="outline"
              fullWidth
              style={{ marginTop: Spacing.md }}
            />
          </Card>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  content: {
    padding: Spacing.xl,
    paddingBottom: Spacing["2xl"],
  },
  title: {
    ...Typography.styles.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
    textAlign: "center",
  },
});
