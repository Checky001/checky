import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated as RNAnimated,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { Typography } from "@/constants/typography";
import { Spacing } from "@/constants/spacing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { stores } from "@/data/stores";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { useBasket } from "@/context/BasketContext";

type ScanMode = "store" | "product";

export default function MockCameraScreen() {
  const router = useRouter();
  const { enterStore, currentStore } = useStore();
  const { initializeCart, addProduct } = useBasket();
  const [mode, setMode] = useState<ScanMode>("store");
  const [manualInput, setManualInput] = useState("");
  const [isScanning, setIsScanning] = useState(true);
  
  // Animated scanner line
  const scanLineAnim = React.useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    // Animate scanner line
    const animation = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        RNAnimated.timing(scanLineAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    if (isScanning) {
      animation.start();
    } else {
      animation.stop();
    }

    return () => animation.stop();
  }, [isScanning]);

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  const handleScan = () => {
    if (!manualInput.trim()) {
      Alert.alert("Error", "Please enter a code to scan");
      return;
    }

    setIsScanning(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    setTimeout(() => {
      if (mode === "store") {
        handleStoreCode(manualInput.trim().toUpperCase());
      } else {
        handleProductCode(manualInput.trim());
      }
    }, 500);
  };

  const handleStoreCode = (code: string) => {
    const store = stores.find(
      (s) =>
        s.store_id === code ||
        s.entrance_qr === code ||
        s.name.toLowerCase().includes(code.toLowerCase())
    );

    if (store) {
      if (store.status !== "approved") {
        Alert.alert("Store Not Available", `This store is currently ${store.status}`);
        setIsScanning(true);
        setManualInput("");
        return;
      }

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Store Found!", `Entering ${store.name}...`, [
        {
          text: "OK",
          onPress: () => {
            enterStore(store);
            initializeCart(store.store_id);
            router.replace("/product-scan");
          },
        },
      ]);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Not Found", "Store code not recognized. Try again.", [
        {
          text: "OK",
          onPress: () => {
            setIsScanning(true);
            setManualInput("");
          },
        },
      ]);
    }
  };

  const handleProductCode = (code: string) => {
    if (!currentStore) {
      Alert.alert("Error", "Please enter a store first");
      router.push("/store-entry");
      return;
    }

    const product = products.find(
      (p) =>
        p.store_id === currentStore.store_id &&
        (p.barcode === code || p.product_number === code || p.product_id === code)
    );

    if (product) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      addProduct(product);
      Alert.alert("Product Added!", `${product.name} added to cart`, [
        {
          text: "Scan More",
          onPress: () => {
            setIsScanning(true);
            setManualInput("");
          },
        },
        {
          text: "View Cart",
          onPress: () => router.push("/basket"),
        },
      ]);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Not Found", "Product not found in this store. Try again.", [
        {
          text: "OK",
          onPress: () => {
            setIsScanning(true);
            setManualInput("");
          },
        },
      ]);
    }
  };

  const quickCodes = mode === "store"
    ? [
        { label: "MegaMart", code: "STORE_001" },
        { label: "FreshGrocer", code: "STORE_002" },
      ]
    : [
        { label: "Tomatoes", code: "1001" },
        { label: "iPhone", code: "1002" },
      ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={28} color={Colors.text.secondary} />
            </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Scan {mode === "store" ? "Store QR" : "Product Barcode"}
        </Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Mode Toggle */}
      <View style={styles.modeToggle}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            mode === "store" && styles.modeButtonActive,
          ]}
          onPress={() => {
            setMode("store");
            setManualInput("");
            setIsScanning(true);
          }}
        >
          <Ionicons 
            name="storefront" 
            size={20} 
            color={mode === "store" ? Colors.primary[700] : Colors.text.secondary} 
          />
          <Text
            style={[
              styles.modeButtonText,
              mode === "store" && styles.modeButtonTextActive,
            ]}
          >
            Store
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeButton,
            mode === "product" && styles.modeButtonActive,
          ]}
          onPress={() => {
            setMode("product");
            setManualInput("");
            setIsScanning(true);
          }}
        >
          <Ionicons 
            name="cube" 
            size={20} 
            color={mode === "product" ? Colors.primary[700] : Colors.text.secondary} 
          />
          <Text
            style={[
              styles.modeButtonText,
              mode === "product" && styles.modeButtonTextActive,
            ]}
          >
            Product
          </Text>
        </TouchableOpacity>
      </View>

      {/* Camera Viewport */}
      <Card style={styles.viewport}>
        <View style={styles.scannerFrame}>
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
          
          {isScanning && (
            <RNAnimated.View
              style={[
                styles.scanLine,
                { transform: [{ translateY: scanLineTranslateY }] },
              ]}
            />
          )}

          <View style={styles.cameraMock}>
            <Ionicons 
              name={mode === "store" ? "qr-code" : "barcode"} 
              size={48} 
              color={Colors.text.inverse} 
            />
            <Text style={styles.cameraText}>
              {isScanning
                ? `Position ${mode === "store" ? "QR code" : "barcode"} here`
                : "Processing..."}
            </Text>
          </View>
        </View>
      </Card>

      {/* Manual Input */}
      <Card style={styles.inputCard}>
        <Text style={styles.inputLabel}>
          Or enter {mode === "store" ? "store" : "product"} code manually:
        </Text>
        <TextInput
          style={styles.input}
          placeholder={
            mode === "store" ? "e.g., STORE_001" : "e.g., 1001"
          }
          placeholderTextColor={Colors.text.tertiary}
          value={manualInput}
          onChangeText={setManualInput}
          autoCapitalize="characters"
        />
        <Button
          title="Scan Code"
          onPress={handleScan}
          fullWidth
          size="lg"
        />
      </Card>

      {/* Quick Access */}
      <View style={styles.quickAccess}>
        <Text style={styles.quickTitle}>Quick Access:</Text>
        <View style={styles.quickButtons}>
          {quickCodes.map((item) => (
            <TouchableOpacity
              key={item.code}
              style={styles.quickButton}
              onPress={() => setManualInput(item.code)}
            >
              <Text style={styles.quickButtonText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  modeToggle: {
    flexDirection: "row",
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  modeButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.borderRadius.md,
    borderWidth: 2,
    borderColor: Colors.border.light,
    backgroundColor: Colors.background.primary,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  modeButtonActive: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  modeButtonText: {
    ...Typography.styles.bodyMedium,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  modeButtonTextActive: {
    color: Colors.primary[700],
    marginLeft: 4,
  },
  viewport: {
    marginHorizontal: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.neutral[900],
  },
  scannerFrame: {
    height: 300,
    backgroundColor: Colors.neutral[800],
    borderRadius: Spacing.borderRadius.md,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: Colors.primary[500],
  },
  cornerTL: {
    top: 10,
    left: 10,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTR: {
    top: 10,
    right: 10,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBL: {
    bottom: 10,
    left: 10,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBR: {
    bottom: 10,
    right: 10,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  scanLine: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,
    height: 2,
    backgroundColor: Colors.primary[500],
    shadowColor: Colors.primary[500],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  cameraMock: {
    alignItems: "center",
    gap: Spacing.md,
  },
  cameraText: {
    ...Typography.styles.body,
    color: Colors.text.inverse,
    textAlign: "center",
  },
  inputCard: {
    margin: Spacing.md,
    padding: Spacing.lg,
  },
  inputLabel: {
    ...Typography.styles.captionMedium,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  input: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderRadius: Spacing.borderRadius.md,
    marginBottom: Spacing.md,
    backgroundColor: Colors.background.primary,
  },
  quickAccess: {
    paddingHorizontal: Spacing.md,
  },
  quickTitle: {
    ...Typography.styles.captionMedium,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  quickButtons: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  quickButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.borderRadius.sm,
    backgroundColor: Colors.accent[50],
    borderWidth: 1,
    borderColor: Colors.accent[200],
  },
  quickButtonText: {
    ...Typography.styles.caption,
    color: Colors.accent[700],
  },
});
