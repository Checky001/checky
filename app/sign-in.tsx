import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { FadeInView } from "@/components/animations/FadeInView";
import { useAuth } from "@/context/AuthContext";

export default function SignInScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const success = await login(email, password);

    setIsLoading(false);

    if (success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace("/(tabs)/home");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Error", "Invalid email or password");
    }
  };

  const fillDemoCredentials = () => {
    setEmail("demo@checky.app");
    setPassword("demo123");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
          <FadeInView delay={0}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Ionicons name="checkmark-circle" size={48} color={Colors.text.inverse} />
              </View>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue shopping</Text>
            </View>
          </FadeInView>

          <FadeInView delay={100}>
            <Card style={styles.formCard}>
              <Input
                label="Email"
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <Button
                title={isLoading ? "Signing in..." : "Sign In"}
                onPress={handleSignIn}
                fullWidth
                size="lg"
                loading={isLoading}
                disabled={isLoading}
              />

              <TouchableOpacity
                style={styles.demoButton}
                onPress={fillDemoCredentials}
              >
                <Ionicons name="flash" size={16} color={Colors.accent[700]} style={{ marginRight: 8 }} />
                <Text style={styles.demoButtonText}>
                  Use Demo Account
                </Text>
              </TouchableOpacity>
            </Card>
          </FadeInView>

          <FadeInView delay={200}>
            <View style={styles.signUpPrompt}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/sign-up")}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </FadeInView>

          <FadeInView delay={300}>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Register Your Store"
              onPress={() => router.push("/store-signup")}
              variant="outline"
              fullWidth
            />
          </FadeInView>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing['2xl'],
    marginTop: Spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[500],
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
  formCard: {
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: Spacing.lg,
    marginTop: -Spacing.sm,
  },
  forgotPasswordText: {
    ...Typography.styles.caption,
    color: Colors.primary[500],
  },
  demoButton: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.accent[50],
    borderRadius: Spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.accent[200],
    borderStyle: "dashed",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  demoButtonText: {
    ...Typography.styles.captionMedium,
    color: Colors.accent[700],
    textAlign: "center",
  },
  signUpPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  signUpText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
  },
  signUpLink: {
    ...Typography.styles.bodyMedium,
    color: Colors.primary[500],
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border.light,
  },
  dividerText: {
    ...Typography.styles.caption,
    color: Colors.text.tertiary,
    marginHorizontal: Spacing.md,
  },
});
