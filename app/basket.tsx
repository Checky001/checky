import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { useBasket } from "@/context/BasketContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function BasketScreen() {
  const router = useRouter();
  const { items, total, updateQuantity, removeProduct, itemCount } = useBasket();

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color={Colors.text.tertiary} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Start scanning products to add them to your cart</Text>
          <Button
            title="Start Shopping"
            onPress={() => router.push("/product-scan")}
            style={{ marginTop: Spacing.xl }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart ({itemCount})</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {items.map((item) => (
          <Card key={item.product_id} style={styles.itemCard}>
            <View style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₦{item.price.toLocaleString()}</Text>
              </View>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.product_id, item.quantity - 1)}
                  style={styles.quantityButton}
                >
                  <Ionicons name="remove" size={20} color={Colors.primary[500]} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.product_id, item.quantity + 1)}
                  style={styles.quantityButton}
                >
                  <Ionicons name="add" size={20} color={Colors.primary[500]} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => removeProduct(item.product_id)}
                style={styles.removeButton}
              >
                <Ionicons name="trash-outline" size={20} color={Colors.error[500]} />
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>₦{total.toLocaleString()}</Text>
        </View>
        <Button
          title="Proceed to Checkout"
          onPress={() => router.push("/checkout")}
          fullWidth
          size="lg"
        />
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.md,
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  emptyTitle: {
    ...Typography.styles.h4,
    color: Colors.text.primary,
    marginTop: Spacing.lg,
  },
  emptySubtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: "center",
    marginTop: Spacing.sm,
  },
  itemCard: {
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
  },
  itemPrice: {
    ...Typography.styles.caption,
    color: Colors.text.secondary,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary[50],
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.primary,
    minWidth: 24,
    textAlign: "center",
  },
  removeButton: {
    padding: Spacing.sm,
  },
  footer: {
    padding: Spacing.md,
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  totalLabel: {
    ...Typography.styles.h5,
    color: Colors.text.primary,
  },
  totalAmount: {
    ...Typography.styles.h4,
    color: Colors.primary[500],
  },
});
