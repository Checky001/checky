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

type Step = 1 | 2 | 3;

export default function StoreRegistrationScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);

  const [storeName, setStoreName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleNext = () => {
    if (step === 1 && (!storeName.trim() || !category.trim() || !address.trim())) {
      Alert.alert("Missing Info", "Please fill in all store details.");
      return;
    }
    if (step === 2 && (!adminEmail.trim() || !adminPassword.trim())) {
      Alert.alert("Missing Info", "Please fill in email and password.");
      return;
    }
    setStep((prev) => (prev === 1 ? 2 : 3));
  };

  const handleBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep((prev) => (prev === 3 ? 2 : 1));
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      "Application Submitted",
      "Your store registration has been received. A Checky team member will review and approve it shortly.",
      [
        {
          text: "OK",
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
          <Text style={styles.title}>Register Your Store</Text>
          <Text style={styles.subtitle}>
            Create a Checky-powered self-checkout experience in your store.
          </Text>

        <Card style={styles.card}>
          <Text style={styles.stepLabel}>Step {step} of 3</Text>

          {step === 1 && (
            <View>
              <Text style={styles.sectionTitle}>Store Details</Text>
              <Input
                label="Store Name"
                placeholder="e.g. MegaMart Lekki"
                value={storeName}
                onChangeText={setStoreName}
              />
              <Input
                label="Category"
                placeholder="e.g. Supermarket, Electronics"
                value={category}
                onChangeText={setCategory}
              />
              <Input
                label="Store Address"
                placeholder="Street, City"
                value={address}
                onChangeText={setAddress}
              />
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={styles.sectionTitle}>Owner / Admin Account</Text>
              <Input
                label="Email"
                placeholder="owner@store.com"
                value={adminEmail}
                onChangeText={setAdminEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                label="Password"
                placeholder="Create a secure password"
                value={adminPassword}
                onChangeText={setAdminPassword}
                secureTextEntry
              />
              <Input
                label="Phone Number"
                placeholder="+234 800 000 0000"
                value={adminPhone}
                onChangeText={setAdminPhone}
                keyboardType="phone-pad"
              />
            </View>
          )}

          {step === 3 && (
            <View>
              <Text style={styles.sectionTitle}>Review & Submit</Text>
              <Text style={styles.reviewLabel}>Store</Text>
              <Text style={styles.reviewValue}>{storeName}</Text>
              <Text style={styles.reviewValue}>{category}</Text>
              <Text style={styles.reviewValue}>{address}</Text>

              <Text style={[styles.reviewLabel, { marginTop: Spacing.md }]}>
                Admin
              </Text>
              <Text style={styles.reviewValue}>{adminEmail}</Text>
              {adminPhone ? (
                <Text style={styles.reviewValue}>{adminPhone}</Text>
              ) : null}

              <Text style={[styles.helperText, { marginTop: Spacing.lg }]}>
                Once approved, a Checky super admin will generate your Store ID,
                entrance QR code, and connect your store to the DVA wallet for
                settlements. You’ll receive these details by email.
              </Text>
            </View>
          )}

          <View style={styles.actionsRow}>
            <Button
              title={step === 1 ? "Cancel" : "Back"}
              onPress={handleBack}
              variant="outline"
              style={{ flex: 1, marginRight: Spacing.sm }}
            />
            {step < 3 ? (
              <Button
                title="Next"
                onPress={handleNext}
                style={{ flex: 1 }}
              />
            ) : (
              <Button
                title="Submit Application"
                onPress={handleSubmit}
                style={{ flex: 1 }}
              />
            )}
          </View>
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
    marginBottom: Spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
    textAlign: "center",
  },
  card: {
    padding: Spacing.xl,
  },
  stepLabel: {
    ...Typography.styles.captionMedium,
    color: Colors.text.tertiary,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.styles.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  reviewLabel: {
    ...Typography.styles.captionMedium,
    color: Colors.text.tertiary,
  },
  reviewValue: {
    ...Typography.styles.body,
    color: Colors.text.primary,
  },
  helperText: {
    ...Typography.styles.caption,
    color: Colors.text.secondary,
  },
  actionsRow: {
    flexDirection: "row",
    marginTop: Spacing.xl,
  },
});
