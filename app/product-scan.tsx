import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useBasket } from "@/context/BasketContext";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";

export default function ProductScanScreen() {
  const router = useRouter();
  const { currentStore } = useStore();
  const { addProduct } = useBasket();
  const [productCode, setProductCode] = useState("");

  const handleScan = () => {
    if (!currentStore) {
      Alert.alert("Error", "Please enter a store first");
      router.push("/store-entry");
      return;
    }

    const product = products.find(
      (p) => p.store_id === currentStore.store_id && 
      (p.barcode === productCode || p.product_number === productCode)
    );

    if (product) {
      addProduct(product);
      Alert.alert("Success", `${product.name} added to cart`);
      setProductCode("");
    } else {
      Alert.alert("Not Found", "Product not found in this store");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="barcode" size={64} color={Colors.primary[500]} />
          <Text style={styles.title}>Scan Product</Text>
          <Text style={styles.subtitle}>
            {currentStore ? `Shopping at ${currentStore.name}` : "No store selected"}
          </Text>
        </View>

        <Card style={styles.card}>
          <Button
            title="Open Camera"
            onPress={() => router.push("/mock-camera?mode=product")}
            fullWidth
            icon={<Ionicons name="camera" size={20} color={Colors.text.inverse} />}
            style={{ marginBottom: Spacing.lg }}
          />

          <Text style={styles.orText}>OR</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter product code"
            value={productCode}
            onChangeText={setProductCode}
            placeholderTextColor={Colors.text.tertiary}
          />
          
          <Button
            title="Add to Cart"
            onPress={handleScan}
            fullWidth
            variant="secondary"
            style={{ marginBottom: Spacing.md }}
          />

          <Button
            title="View Cart"
            onPress={() => router.push("/basket")}
            fullWidth
            variant="outline"
          />
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
});
