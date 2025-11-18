# 🎯 CHECKY - COMPLETE IMPLEMENTATION PLAN

## 🎨 DESIGN SYSTEM

### Color Palette (Cool Colors)
```typescript
// Primary - Cool Blues & Purples
primary: {
  50: '#F0F4FF',   // Lightest blue
  100: '#E0EAFF',
  200: '#C7D7FE',
  300: '#A5B9FC',
  400: '#818CF8',  // Main primary
  500: '#6366F1',  // Primary action
  600: '#4F46E5',
  700: '#4338CA',
  800: '#3730A3',
  900: '#312E81',
}

// Secondary - Teal/Cyan
secondary: {
  50: '#ECFEFF',
  100: '#CFFAFE',
  200: '#A5F3FC',
  300: '#67E8F9',
  400: '#22D3EE',  // Main secondary
  500: '#06B6D4',
  600: '#0891B2',
  700: '#0E7490',
  800: '#155E75',
  900: '#164E63',
}

// Success - Cool Green
success: {
  light: '#6EE7B7',
  main: '#10B981',
  dark: '#059669',
}

// Error - Cool Red
error: {
  light: '#FCA5A5',
  main: '#EF4444',
  dark: '#DC2626',
}

// Neutrals - Cool Grays
neutral: {
  50: '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
}

// Background
background: {
  primary: '#FFFFFF',
  secondary: '#F9FAFB',
  tertiary: '#F0F4FF',
}

// Text
text: {
  primary: '#111827',
  secondary: '#6B7280',
  tertiary: '#9CA3AF',
  inverse: '#FFFFFF',
}
```

### Typography - Jakarta Sans Plus
```typescript
fonts: {
  heading: 'PlusJakartaSans-Bold',
  body: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semibold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
}

sizes: {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
}
```

### Animation System - Smooth Ease-In-Ease-Out
```typescript
// Timing
timing: {
  fast: 200,
  normal: 300,
  slow: 500,
}

// Easing curves
easing: {
  easeInOut: Easing.bezier(0.4, 0.0, 0.2, 1),
  easeOut: Easing.bezier(0.0, 0.0, 0.2, 1),
  easeIn: Easing.bezier(0.4, 0.0, 1, 1),
  bounce: Easing.bezier(0.68, -0.55, 0.265, 1.55),
}

// Common animations
- Fade In/Out
- Slide Up/Down (for modals, sheets)
- Scale (for button presses)
- Shimmer (for loading states)
- Slide Left/Right (for screen transitions)
```

### Spacing System
```typescript
spacing: {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
}

borderRadius: {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
}
```

---

## 📱 PHASE 1: FOUNDATION & SETUP

### 1.1 Design System Setup
- [ ] Install Jakarta Sans Plus font
- [ ] Create `constants/colors.ts` with cool color palette
- [ ] Create `constants/typography.ts` with font definitions
- [ ] Create `constants/animations.ts` with reusable animation configs
- [ ] Create `constants/spacing.ts` with spacing scale

### 1.2 Utility Components
- [ ] `<Button>` - Primary, Secondary, Outline variants with press animations
- [ ] `<Card>` - Elevated cards with shadows and borders
- [ ] `<Input>` - Text input with focus animations
- [ ] `<Badge>` - Status badges (pending, approved, verified)
- [ ] `<Avatar>` - User/store avatars
- [ ] `<LoadingSpinner>` - Cool animated loader
- [ ] `<BottomSheet>` - Slide-up modal component
- [ ] `<FadeInView>` - Wrapper for fade-in animations
- [ ] `<ScaleButton>` - Button with scale-down press effect

### 1.3 Data Models & Mock Data
- [ ] `types/index.ts` - TypeScript interfaces for all entities
- [ ] `data/stores.ts` - Mock store data (5 stores: 2 approved, 2 pending, 1 suspended)
- [ ] `data/products.ts` - Mock products (20+ items across different categories)
- [ ] `data/transactions.ts` - Mock transaction history
- [ ] `utils/qrGenerator.ts` - QR code generation helper
- [ ] `utils/productNumberGenerator.ts` - Sequential product number generator

### 1.4 Context Providers
- [ ] `context/AuthContext.tsx` - User role (customer, store_admin, super_admin)
- [ ] `context/StoreContext.tsx` - Current store session management
- [ ] `context/BasketContext.tsx` - Enhanced cart with store_id, quantities
- [ ] `context/ThemeContext.tsx` - Theme and animation preferences (optional)

---

## 📱 PHASE 2: ONBOARDING & ROLE SELECTION

### 2.1 Streamlined Onboarding
**Goal**: Get users to their destination in 1-2 taps

#### Option A: Single Entry Point (Recommended)
```
SplashScreen
    ↓
RoleSelectionScreen (animated cards)
    ↓
[Customer] → StoreEntryScreen
[Store Admin] → StoreLoginScreen
[Super Admin] → SuperAdminLoginScreen
```

#### Screens to Build:
- [ ] **SplashScreen** 
  - Cool animated logo
  - 2s duration, auto-navigate
  - Shimmer effect on brand name
  
- [ ] **RoleSelectionScreen**
  - 3 large animated cards with icons
  - "I'm Shopping" (Customer)
  - "I'm a Store" (Store Admin)
  - "Admin Access" (Super Admin - small link)
  - Stagger animation on cards (ease-in-out)
  - Each card scales on press

---

## 📱 PHASE 3: CUSTOMER APP (7 Screens)

### 3.1 Store Entry Flow
- [ ] **StoreEntryScreen** (refactor existing)
  - Full-screen camera view
  - Animated scan frame overlay
  - Instruction text: "Scan store entrance QR"
  - Haptic feedback on successful scan
  - Smooth slide-up to ProductScanScreen
  - Edge case: "Store not found" error animation

### 3.2 Product Scanning
- [ ] **ProductScanScreen**
  - **Top Section**: Store name + logo (sticky header)
  - **Middle Section**: 
    - Camera view OR
    - Manual entry mode (toggle button)
  - **Toggle Animation**: Flip between camera/manual mode
  - **Product Number Input**: Large numeric keypad
  - **Bottom Section**: Mini basket preview (slide up on tap)
  - **Product Found Animation**: 
    - Card slides up from bottom
    - Shows product image, name, price
    - "Add to Cart" button with scale animation
  - **Product Not Found**: Shake animation + error message

### 3.3 Cart Management
- [ ] **BasketScreen**
  - Pull-up bottom sheet OR full screen
  - Animated list of items
  - Swipe-to-delete gesture
  - Quantity +/- buttons with haptic feedback
  - Running total with animated number changes
  - "Continue Shopping" / "Checkout" buttons
  - Empty state with cool illustration

### 3.4 Checkout Flow
- [ ] **CheckoutScreen**
  - Order summary card
  - Payment method selector (animated radio buttons)
  - Mock payment options:
    - Card (show card input with animations)
    - Mobile Money
    - Cash (staff verification)
  - "Pay Now" button with loading state
  - Success animation → navigate to ExitQRScreen

### 3.5 Exit QR
- [ ] **ExitQRScreen**
  - Large QR code (animated zoom-in entrance)
  - "Show this to staff at exit"
  - Transaction details below
  - Pulsing border animation
  - Share QR button (optional)
  - Auto-expire timer (optional for hackathon)

### 3.6 Staff Verification
- [ ] **StaffVerifyScreen**
  - Camera for scanning exit QR
  - Large verification result:
    - ✓ Green checkmark animation + success message
    - ✗ Red X animation + error message
  - Show transaction details on success
  - Confetti animation on verification (optional but cool!)

### 3.7 Store Context UI
- [ ] **StoreBanner Component**
  - Persistent top banner showing current store
  - "Leave Store" button
  - Slide-down animation when entering store
  - Slide-up animation when leaving

---

## 📱 PHASE 4: STORE ADMIN (5 Screens)

### 4.1 Registration Flow
- [ ] **StoreRegistrationScreen**
  - Multi-step form (3 steps with progress bar)
  - Step 1: Store Details (name, address, category)
  - Step 2: Contact Info (admin email, phone)
  - Step 3: Logo Upload (image picker with preview)
  - Progress indicator with smooth transitions
  - Form validation with inline errors
  - Submit with loading animation
  - Success screen: "Pending Approval" with illustration

### 4.2 Store Dashboard
- [ ] **StoreDashboardScreen**
  - Status badge (pending/approved/suspended) with color coding
  - Store info card
  - Quick stats cards (animated counters):
    - Total Products
    - Scans Today
    - Revenue This Week (mocked)
  - Download Entrance QR button (if approved)
  - Action buttons:
    - Manage Inventory
    - View Transactions
    - Edit Store Info
  - Each card slides in with stagger effect

### 4.3 Inventory Management
- [ ] **InventoryListScreen**
  - Search bar with debounced search
  - Filter by category (animated dropdown)
  - Product cards with image, name, price, product number
  - Floating "+ Add Product" button
  - Pull-to-refresh animation
  - Long-press to edit/delete

- [ ] **AddProductScreen**
  - Form with fields:
    - Product image (upload)
    - Name
    - Price (numeric keyboard)
    - Barcode (optional - scan or enter)
    - Product Number (auto-generated, editable)
    - Category (dropdown)
    - Stock quantity
  - "Save Product" button
  - Success animation → back to list

- [ ] **EditProductScreen**
  - Same as AddProductScreen but pre-filled
  - Delete button with confirmation modal

### 4.4 Transaction History
- [ ] **TransactionHistoryScreen**
  - List of recent transactions (mocked data)
  - Each card shows:
    - Date & time
    - Customer ID (blurred for privacy)
    - Items count
    - Total amount
    - Status badge (verified/pending)
  - Filter by date range
  - Animated list with fade-in

---

## 📱 PHASE 5: SUPER ADMIN (3 Screens)

### 5.1 Admin Login
- [ ] **SuperAdminLoginScreen**
  - Simple PIN or password
  - Mock credentials for demo
  - Cool login animation

### 5.2 Store Approval
- [ ] **PendingStoresScreen**
  - List of pending store applications
  - Each card shows:
    - Store logo & name
    - Address
    - Admin email
    - Submitted date
  - "View Details" → expands card
  - Approve/Reject buttons
  - Approval animation:
    - Card slides out
    - Success toast
    - Auto-generate QR in background

### 5.3 All Stores Management
- [ ] **AllStoresScreen**
  - Tabs: All / Approved / Pending / Suspended
  - Search and filter
  - Store cards with status badges
  - Actions menu (3-dot):
    - View Details
    - Suspend/Activate
    - Resend QR
    - Edit Info
  - Confirmation modals for destructive actions

---

## 📱 PHASE 6: NAVIGATION & FLOW

### 6.1 Navigation Structure
```
Root Navigator (Stack)
├── SplashScreen
├── RoleSelectionScreen
├── Customer Stack
│   ├── StoreEntryScreen
│   ├── ProductScanScreen
│   ├── BasketScreen (Modal)
│   ├── CheckoutScreen
│   ├── ExitQRScreen
│   └── StoreBanner (Persistent)
├── Store Admin Stack
│   ├── StoreRegistrationScreen
│   ├── StoreLoginScreen (if approved)
│   ├── StoreDashboardScreen
│   ├── InventoryListScreen
│   ├── AddProductScreen
│   ├── EditProductScreen
│   └── TransactionHistoryScreen
└── Super Admin Stack
    ├── SuperAdminLoginScreen
    ├── PendingStoresScreen
    └── AllStoresScreen
```

### 6.2 Screen Transitions
- [ ] Slide from right (default stack)
- [ ] Modal slide from bottom (basket, sheets)
- [ ] Fade for role changes
- [ ] Custom transitions for scan success

---

## 📱 PHASE 7: POLISH & ANIMATIONS

### 7.1 Micro-interactions
- [ ] Button press: Scale down 0.95 with haptic feedback
- [ ] Card tap: Scale down 0.98
- [ ] Input focus: Border glow animation
- [ ] Success states: Checkmark animation
- [ ] Error states: Shake animation
- [ ] Loading states: Skeleton screens
- [ ] Empty states: Animated illustrations

### 7.2 Page Transitions
- [ ] Fade in on mount for all screens
- [ ] Stagger animation for lists
- [ ] Parallax scroll effects (optional)
- [ ] Smooth keyboard avoiding view

### 7.3 Haptic Feedback
- [ ] Scan success: Medium impact
- [ ] Button press: Light impact
- [ ] Error: Notification
- [ ] Success: Success haptic

---

## 🛠️ TECHNICAL TASKS

### Dependencies to Add
```bash
npm install --save-dev @expo-google-fonts/plus-jakarta-sans expo-font
npm install react-native-svg  # for custom icons
npm install @react-native-community/blur  # for glassmorphism effects (optional)
npm install lottie-react-native  # for Lottie animations (optional)
```

### File Structure
```
app/
├── screens/
│   ├── onboarding/
│   │   ├── SplashScreen.tsx
│   │   └── RoleSelectionScreen.tsx
│   ├── customer/
│   │   ├── StoreEntryScreen.tsx
│   │   ├── ProductScanScreen.tsx
│   │   ├── BasketScreen.tsx
│   │   ├── CheckoutScreen.tsx
│   │   ├── ExitQRScreen.tsx
│   │   └── StaffVerifyScreen.tsx
│   ├── admin/
│   │   ├── StoreRegistrationScreen.tsx
│   │   ├── StoreLoginScreen.tsx
│   │   ├── StoreDashboardScreen.tsx
│   │   ├── InventoryListScreen.tsx
│   │   ├── AddProductScreen.tsx
│   │   ├── EditProductScreen.tsx
│   │   └── TransactionHistoryScreen.tsx
│   └── superadmin/
│       ├── SuperAdminLoginScreen.tsx
│       ├── PendingStoresScreen.tsx
│       └── AllStoresScreen.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── BottomSheet.tsx
│   ├── animations/
│   │   ├── FadeInView.tsx
│   │   ├── ScaleButton.tsx
│   │   └── ShakeAnimation.tsx
│   └── shared/
│       ├── StoreBanner.tsx
│       ├── ProductCard.tsx
│       └── EmptyState.tsx
├── constants/
│   ├── colors.ts
│   ├── typography.ts
│   ├── animations.ts
│   └── spacing.ts
├── context/
│   ├── AuthContext.tsx
│   ├── StoreContext.tsx
│   ├── BasketContext.tsx
│   └── ThemeContext.tsx
├── data/
│   ├── stores.ts
│   ├── products.ts
│   └── transactions.ts
├── types/
│   └── index.ts
├── utils/
│   ├── qrGenerator.ts
│   └── productNumberGenerator.ts
└── navigation/
    ├── AppNavigator.tsx
    ├── CustomerNavigator.tsx
    ├── AdminNavigator.tsx
    └── SuperAdminNavigator.tsx
```

---

## 🎯 IMPLEMENTATION ORDER (Sprints)

### Sprint 1: Foundation (Day 1)
1. Design system setup (colors, fonts, animations)
2. Utility components (Button, Card, Input)
3. Data models and mock data
4. Context providers

### Sprint 2: Onboarding + Customer Core (Day 2)
1. Splash + Role Selection
2. Store Entry (refactor)
3. Product Scan Screen
4. Basket Screen

### Sprint 3: Customer Complete (Day 3)
1. Checkout Screen
2. Exit QR Screen
3. Staff Verify Screen
4. Polish customer flow

### Sprint 4: Store Admin (Day 4)
1. Registration Screen
2. Dashboard Screen
3. Inventory Management (List, Add, Edit)
4. Transaction History

### Sprint 5: Super Admin + Final Polish (Day 5)
1. Super Admin Login
2. Pending Stores Screen
3. All Stores Screen
4. Final animations and polish
5. Bug fixes and testing

---

## 📊 SUCCESS METRICS

- [ ] All 17 screens built and functional
- [ ] Smooth 60fps animations throughout
- [ ] Jakarta Sans Plus font loaded and applied
- [ ] Cool color palette consistently applied
- [ ] Intuitive onboarding (< 2 taps to main screen)
- [ ] QR scanning works reliably
- [ ] Product number entry is smooth
- [ ] Cart management feels native
- [ ] Store admin can manage inventory easily
- [ ] Super admin approval flow is clear

---

## 🎨 DESIGN INSPIRATIONS

- **Colors**: Figma, Linear, Stripe (cool blues and purples)
- **Animations**: iOS native apps, Stripe Checkout
- **Onboarding**: Duolingo, Notion
- **Cards**: Airbnb, Apple App Store
- **Micro-interactions**: Apple iOS, Google Material Design 3

---

## 🚀 READY TO BUILD!

This plan prioritizes:
✅ Beautiful, modern UI with cool colors
✅ Smooth ease-in-ease-out animations
✅ Jakarta Sans Plus typography
✅ Straightforward onboarding
✅ Complete feature coverage
✅ Hackathon-ready speed

Let's start building! 🎉

