import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/animations/FadeInView";
import { getStaggerDelay } from "@/constants/animations";

interface MenuItem {
  icon: string; // Ionicons name
  title: string;
  subtitle: string;
  onPress: () => void;
  color: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          logout();
          router.replace("/sign-in");
        },
      },
    ]);
  };

  const menuItems: MenuItem[] = [
    {
      icon: "person-circle-outline",
      title: "Edit Profile",
      subtitle: "Update your personal information",
      onPress: () => Alert.alert("Coming Soon", "Profile editing coming soon!"),
      color: Colors.primary[500],
    },
    {
      icon: "notifications-outline",
      title: "Notifications",
      subtitle: "Manage your notification preferences",
      onPress: () => Alert.alert("Coming Soon", "Notifications coming soon!"),
      color: Colors.secondary[500],
    },
    {
      icon: "storefront-outline",
      title: "My Stores",
      subtitle: "View and manage your registered stores",
      onPress: () => router.push("/store-signup"),
      color: Colors.accent[500],
    },
    {
      icon: "receipt-outline",
      title: "Purchase History",
      subtitle: "View your shopping history",
      onPress: () => Alert.alert("Coming Soon", "History coming soon!"),
      color: Colors.warning[500],
    },
    {
      icon: "shield-checkmark-outline",
      title: "Privacy & Security",
      subtitle: "Manage your account security",
      onPress: () => Alert.alert("Coming Soon", "Security settings coming soon!"),
      color: Colors.success[500],
    },
    {
      icon: "help-circle-outline",
      title: "Help & Support",
      subtitle: "Get help or contact support",
      onPress: () => Alert.alert("Support", "Email: support@checky.app"),
      color: Colors.error[500],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <FadeInView delay={0}>
          <Card style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </Text>
            </View>
            <Text style={styles.name}>{user?.name || "User"}</Text>
            <Text style={styles.email}>{user?.email || "user@checky.app"}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>
                {user?.role === "customer"
                  ? "Customer"
                  : user?.role === "store_admin"
                  ? "Store Admin"
                  : "Super Admin"}
              </Text>
            </View>
          </Card>
        </FadeInView>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <FadeInView key={item.title} delay={getStaggerDelay(index, 50)}>
              <Card style={styles.menuCard} onPress={item.onPress}>
                <View style={styles.menuContent}>
                  <View
                    style={[
                      styles.menuIcon,
                      { backgroundColor: item.color + "15" },
                    ]}
                  >
                    <Ionicons name={item.icon as any} size={22} color={item.color} />
                  </View>
                  <View style={styles.menuText}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  <Text style={styles.menuArrow}>→</Text>
                </View>
              </Card>
            </FadeInView>
          ))}
        </View>

        {/* Logout Button */}
        <FadeInView delay={400}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="danger"
            fullWidth
            size="lg"
          />
        </FadeInView>

        {/* App Version */}
        <Text style={styles.version}>Checky v1.0.0 (Demo)</Text>
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
  profileCard: {
    padding: Spacing.xl,
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[500],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
    ...Colors.shadow.lg,
  },
  avatarText: {
    ...Typography.styles.h2,
    color: Colors.text.inverse,
  },
  name: {
    ...Typography.styles.h4,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  email: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  roleBadge: {
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.borderRadius.full,
  },
  roleText: {
    ...Typography.styles.captionMedium,
    color: Colors.primary[700],
  },
  menuSection: {
    marginBottom: Spacing.xl,
  },
  menuCard: {
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: Spacing.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  menuSubtitle: {
    ...Typography.styles.small,
    color: Colors.text.secondary,
  },
  menuArrow: {
    fontSize: 20,
    color: Colors.text.tertiary,
  },
  version: {
    ...Typography.styles.small,
    color: Colors.text.tertiary,
    textAlign: "center",
    marginTop: Spacing.xl,
  },
});

