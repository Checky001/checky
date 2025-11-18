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
import { useBasket } from "@/context/BasketContext";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";

export default function ProductScanScreen() {
  const router = useRouter();
  const { currentStore } = useStore();
  const { addProduct, itemCount } = useBasket();
  const [productCode, setProductCode] = useState("");

  const handleScan = () => {
    if (!productCode.trim()) {
      Alert.alert("Error", "Please enter a product code");
      return;
    }

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
          <Ionicons name="barcode" size={40} color={Colors.primary[500]} />
            <View style={{ marginLeft: Spacing.sm }}>
              <Text style={styles.title}>Scan Product</Text>
              <Text style={styles.subtitle}>
                {currentStore
                  ? `Shopping at ${currentStore.name}`
                  : "No store selected - enter a store first"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.cartBadge}
            onPress={() => router.push("/basket")}
          >
            <Ionicons name="cart-outline" size={20} color={Colors.text.inverse} />
            <Text style={styles.cartBadgeText}>{itemCount}</Text>
          </TouchableOpacity>
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
            placeholder="Enter product code (e.g. 1001, 1002)"
            value={productCode}
            onChangeText={setProductCode}
            placeholderTextColor={Colors.text.tertiary}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />
          
          <Button
            title="Add to Cart"
            onPress={handleScan}
            fullWidth
            variant="secondary"
            disabled={!productCode.trim()}
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.xl,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
  cartBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.borderRadius.full,
    backgroundColor: Colors.primary[500],
  },
  cartBadgeText: {
    ...Typography.styles.small,
    color: Colors.text.inverse,
    marginLeft: Spacing.xs,
  },
});
