import { AuthProvider } from "@/context/AuthContext";
import { BasketProvider } from "@/context/BasketContext";
import { StoreProvider } from "@/context/StoreContext";
import { WalletProvider } from "@/context/WalletContext";
import { ReceiptProvider } from "@/context/ReceiptContext";
import { StaffAuthProvider } from "@/context/StaffAuthContext";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "PlusJakartaSans-Regular": PlusJakartaSans_400Regular,
    "PlusJakartaSans-Medium": PlusJakartaSans_500Medium,
    "PlusJakartaSans-SemiBold": PlusJakartaSans_600SemiBold,
    "PlusJakartaSans-Bold": PlusJakartaSans_700Bold,
    "PlusJakartaSans-ExtraBold": PlusJakartaSans_800ExtraBold,
  });

  // On native we block rendering until fonts load.
  // On web (Vercel) we render immediately to avoid a blank screen
  // if font files are not served correctly.
  if (Platform.OS !== "web" && !fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <WalletProvider>
        <StoreProvider>
          <BasketProvider>
            <ReceiptProvider>
              <StaffAuthProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="splash" />
                  <Stack.Screen name="sign-in" />
                  <Stack.Screen name="sign-up" />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="store-entry" />
                  <Stack.Screen name="product-scan" />
                  <Stack.Screen name="basket" />
                  <Stack.Screen name="checkout" />
                  <Stack.Screen name="exit-qr" />
                  <Stack.Screen name="receipts" />
                  <Stack.Screen name="staff-verify" />
                  <Stack.Screen name="store-registration" />
                  <Stack.Screen name="store-signup" />
                  <Stack.Screen name="demo-menu" />
                  <Stack.Screen name="mock-camera" />
                  <Stack.Screen name="role-selection" />
                  <Stack.Screen name="staff-login" />
                  <Stack.Screen name="staff-manager-home" />
                  <Stack.Screen name="staff-security-scan" />
                  <Stack.Screen name="staff-security-result" />
                  <Stack.Screen name="staff-inventory-dashboard" />
                </Stack>
              </StaffAuthProvider>
            </ReceiptProvider>
          </BasketProvider>
        </StoreProvider>
      </WalletProvider>
    </AuthProvider>
  );
}
