import { Tabs } from "expo-router";
import { Text } from "react-native";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary[500],
        tabBarInactiveTintColor: Colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: Colors.background.primary,
          borderTopWidth: 1,
          borderTopColor: Colors.border.light,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          ...Typography.styles.small,
          fontFamily: Typography.fonts.medium,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📷</Text>,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>💳</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}

