import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/context/StoreContext";
import { stores } from "@/data/stores";

export default function StoreEntryScreen() {
  const router = useRouter();
  const { enterStore } = useStore();
  const [storeCode, setStoreCode] = useState("");

  const handleEnterStore = (code: string) => {
    const store = stores.find((s) => s.entrance_qr === code || s.store_id === code);
    
    if (store && store.status === "approved") {
      enterStore(store);
      Alert.alert("Success", `Welcome to ${store.name}!`, [
        { text: "OK", onPress: () => router.push("/product-scan") }
      ]);
    } else {
      Alert.alert("Error", "Invalid store code or store not available");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="storefront" size={64} color={Colors.primary[500]} />
          <Text style={styles.title}>Enter Store</Text>
          <Text style={styles.subtitle}>Scan store QR or enter code</Text>
        </View>

        <Card style={styles.card}>
          <Button
            title="Scan Store QR"
            onPress={() => router.push("/mock-camera?mode=store")}
            fullWidth
            icon={<Ionicons name="qr-code" size={20} color={Colors.text.inverse} />}
            style={{ marginBottom: Spacing.lg }}
          />

          <Text style={styles.orText}>OR</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter store code"
            value={storeCode}
            onChangeText={setStoreCode}
            placeholderTextColor={Colors.text.tertiary}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />
          
          <Button
            title="Enter Store"
            onPress={() => handleEnterStore(storeCode)}
            fullWidth
            variant="secondary"
          />
        </Card>

        <View style={styles.quickAccess}>
          <Text style={styles.quickTitle}>Quick Access:</Text>
          {stores.filter(s => s.status === "approved").slice(0, 3).map((store) => (
            <TouchableOpacity
              key={store.store_id}
              style={styles.quickButton}
              onPress={() => handleEnterStore(store.entrance_qr)}
            >
              <Text style={styles.quickButtonText}>{store.name}</Text>
              <Text style={styles.quickButtonCode}>{store.entrance_qr}</Text>
            </TouchableOpacity>
          ))}
        </View>
        </View>
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
    flex: 1,
    padding: Spacing.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.styles.h3,
    color: Colors.text.primary,
    marginTop: Spacing.md,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  card: {
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  orText: {
    ...Typography.styles.caption,
    color: Colors.text.tertiary,
    textAlign: "center",
    marginVertical: Spacing.md,
  },
  input: {
    ...Typography.styles.body,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderRadius: Spacing.borderRadius.md,
    backgroundColor: Colors.background.primary,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  quickAccess: {
    marginTop: Spacing.md,
  },
  quickTitle: {
    ...Typography.styles.captionMedium,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  quickButton: {
    padding: Spacing.md,
    backgroundColor: Colors.background.primary,
    borderRadius: Spacing.borderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  quickButtonText: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
  },
  quickButtonCode: {
    ...Typography.styles.caption,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
});
