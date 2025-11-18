import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useStaffAuth } from "@/context/StaffAuthContext";

export default function StaffLoginScreen() {
  const router = useRouter();
  const { login } = useStaffAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setIsLoading(true);
    const ok = await login(email.trim(), password);
    setIsLoading(false);

    if (!ok) {
      Alert.alert(
        "Invalid Credentials",
        "Use one of the demo accounts: security@checky.app, stock@checky.app, manager@checky.app."
      );
      return;
    }

    // We will route based on role in the manager/home screen
    router.replace("/staff-manager-home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Ionicons
              name="shield-checkmark"
              size={56}
              color={Colors.text.inverse}
            />
            <Text style={styles.title}>Staff Login</Text>
            <Text style={styles.subtitle}>
              Security, inventory, and management tools for store staff.
            </Text>
          </View>

          <Card style={styles.card}>
            <Input
              label="Email"
              placeholder="security@checky.app"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Password"
              placeholder="Enter password (any for demo)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              title={isLoading ? "Logging in..." : "Login"}
              onPress={handleLogin}
              fullWidth
              size="lg"
              loading={isLoading}
              disabled={isLoading}
              style={{ marginTop: Spacing.md }}
            />

            <Text style={styles.helperText}>
              Demo accounts:
              {"\n"}• security@checky.app
              {"\n"}• stock@checky.app
              {"\n"}• manager@checky.app
            </Text>
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
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
    marginTop: Spacing.xl,
  },
  title: {
    ...Typography.styles.h2,
    color: Colors.text.primary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: "center",
  },
  card: {
    padding: Spacing.xl,
  },
  helperText: {
    ...Typography.styles.caption,
    color: Colors.text.tertiary,
    marginTop: Spacing.lg,
  },
});


