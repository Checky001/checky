import { AuthProvider } from "@/context/AuthContext";
import { BasketProvider } from "@/context/BasketContext";
import { StoreProvider } from "@/context/StoreContext";
import { WalletProvider } from "@/context/WalletContext";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import { Stack } from "expo-router";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "PlusJakartaSans-Regular": PlusJakartaSans_400Regular,
    "PlusJakartaSans-Medium": PlusJakartaSans_500Medium,
    "PlusJakartaSans-SemiBold": PlusJakartaSans_600SemiBold,
    "PlusJakartaSans-Bold": PlusJakartaSans_700Bold,
    "PlusJakartaSans-ExtraBold": PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <WalletProvider>
        <StoreProvider>
          <BasketProvider>
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
            <Stack.Screen name="staff-verify" />
            <Stack.Screen name="store-registration" />
            <Stack.Screen name="store-signup" />
            <Stack.Screen name="demo-menu" />
            <Stack.Screen name="mock-camera" />
            <Stack.Screen name="role-selection" />
            </Stack>
          </BasketProvider>
        </StoreProvider>
      </WalletProvider>
    </AuthProvider>
  );
}
