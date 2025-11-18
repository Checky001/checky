# Checky - Self-Checkout System for Stores

A modern mobile app for self-checkout in retail stores, built with React Native and Expo.

## 🎯 Overview

Checky revolutionizes the shopping experience by allowing customers to scan items, pay, and exit stores without traditional checkout lines. The system includes features for customers, store staff, and store administrators.

## ✨ Features

### 👤 Customer Flow
- **Store Entry**: Enter stores by scanning QR codes or entering store codes
- **Product Scanning**: Scan barcodes or manually enter product numbers
- **Shopping Cart**: Real-time cart with quantity adjustments
- **Checkout**: Streamlined payment process
- **Exit Verification**: Generate one-time QR codes for exit verification

### 🛡️ Staff Features
- **Exit Verification**: Verify customer exit QR codes before they leave

### 🏢 Store Admin
- **Store Registration**: Multi-step registration form with approval workflow
- **Store Management**: Dashboard and inventory management (planned)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your phone (iOS/Android)

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start the development server**:
```bash
npx expo start
```

3. **Run on your device**:
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - The app will load on your device

## 🎨 Design System

### Colors
- **Primary**: Cool blues (#3B82F6, #2563EB)
- **Secondary**: Purples (#8B5CF6, #7C3AED)
- **Accent**: Teals (#14B8A6, #0D9488)

### Typography
- **Font Family**: Plus Jakarta Sans
- **Weights**: Regular, Medium, SemiBold, Bold, ExtraBold

### Animations
- **Duration**: Fast (200ms), Medium (300ms), Slow (500ms)
- **Easing**: Smooth ease-in-out transitions throughout

## 📱 Demo Instructions

### Quick Demo Flow

1. **Launch the app** - You'll see the splash screen
2. **Role Selection** - Choose from:
   - 🛍️ **Customer** - Full shopping experience
   - 🏢 **Store Admin** - Register a store
   - 🎯 **View All Features** - Explore everything

### Customer Demo Path

1. **Select "Customer"**
2. **Store Entry Screen**:
   - Use quick access: "MegaMart Lekki" or "FreshGrocer Victoria"
   - Or enter store code: `STORE_001`
3. **Product Scan Screen**:
   - Toggle to "Manual Entry Mode"
   - Try product numbers: `1001`, `1002`, `1003`, `1004`, `1005`
   - Add multiple items to cart
4. **View Basket**: Tap the floating cart badge (top right)
5. **Adjust Quantities**: Use +/- buttons or remove items
6. **Checkout**: Review total and proceed
7. **Complete Payment**: Choose a payment method (mock)
8. **Exit QR**: Your exit code is generated
9. **Staff Verify**: Go back and test staff verification

### Staff Demo Path

1. **Select "View All Features"** from role selection
2. **Tap "Verify Exit QR"**
3. **Use demo QR codes**:
   - `EXIT_TXN_001_CHECKY`
   - `EXIT_TXN_002_CHECKY`
4. **See verification results** with smooth animations

### Store Admin Demo Path

1. **Select "Store Admin"**
2. **Fill out registration form**:
   - Step 1: Store name, category, address
   - Step 2: Contact information
   - Step 3: Review and submit
3. **Submit for approval**

## 🗂️ Project Structure

```
checky/
├── app/
│   ├── _layout.tsx              # Root layout with providers
│   ├── index.tsx                # Entry point (redirects to splash)
│   ├── splash.tsx               # Splash screen route
│   ├── role-selection.tsx       # Role selection route
│   ├── store-entry.tsx          # Store entry route
│   ├── product-scan.tsx         # Product scanning route
│   ├── basket.tsx               # Shopping cart route
│   ├── checkout.tsx             # Checkout route
│   ├── exit-qr.tsx              # Exit QR generation route
│   ├── staff-verify.tsx         # Staff verification route
│   ├── store-registration.tsx   # Store registration route
│   ├── demo-menu.tsx            # Demo menu route
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   └── animations/          # Animation components
│   │       ├── FadeInView.tsx
│   │       └── ScaleButton.tsx
│   ├── screens/                 # Screen components
│   │   ├── onboarding/
│   │   │   ├── SplashScreen.tsx
│   │   │   └── RoleSelectionScreen.tsx
│   │   ├── customer/
│   │   │   ├── ProductScanScreen.tsx
│   │   │   ├── BasketScreen.tsx
│   │   │   ├── CheckoutScreen.tsx
│   │   │   ├── ExitQRScreen.tsx
│   │   │   └── StaffVerifyScreen.tsx
│   │   ├── admin/
│   │   │   └── StoreRegistrationScreen.tsx
│   │   ├── StoreEntryScreen.tsx
│   │   └── DemoMenuScreen.tsx
│   ├── context/                 # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── StoreContext.tsx
│   │   └── BasketContext.tsx
│   ├── data/                    # Mock data
│   │   ├── stores.ts
│   │   ├── products.ts
│   │   └── transactions.ts
│   └── utils/                   # Utility functions
│       ├── qrGenerator.ts
│       └── productNumberGenerator.ts
├── constants/                   # Design system constants
│   ├── colors.ts
│   ├── typography.ts
│   ├── animations.ts
│   └── spacing.ts
├── types/                       # TypeScript type definitions
│   └── index.ts
└── package.json
```

## 🧪 Demo Data

### Stores
- **MegaMart Lekki** (STORE_001)
- **FreshGrocer Victoria** (STORE_002)
- **TechHub Ikeja** (STORE_003)
- **StyleSphere Lekki** (STORE_004)
- **QuickStop 24/7** (STORE_005)

### Products
- Product numbers: 1001-1018
- Range: ₦50 - ₦125,000
- Categories: Fresh Produce, Electronics, Snacks, Fashion

### Exit QR Codes (for testing)
- `EXIT_TXN_001_CHECKY`
- `EXIT_TXN_002_CHECKY`

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **Language**: TypeScript
- **State Management**: React Context API
- **Animations**: React Native Reanimated 2
- **UI**: Custom component library
- **Fonts**: Plus Jakarta Sans

## 📝 Key Implementation Notes

### Expo Go Limitations
Due to Expo Go's native module limitations, barcode scanning is implemented with manual entry for the demo. In production:
- Use a development build (`npx expo run:android` or `npx expo run:ios`)
- Camera-based QR/barcode scanning will work natively
- All scanning features are designed and ready for production

### Navigation System
The app uses Expo Router's file-based routing:
- Each screen has a route file in the `app/` directory
- Navigation uses `router.push()`, `router.back()`, etc.
- Clean, modern navigation pattern

### State Management
Three context providers manage global state:
- **AuthContext**: User roles and authentication
- **StoreContext**: Current store and entry/exit
- **BasketContext**: Shopping cart management

## 🎯 Future Enhancements

- [ ] Real-time database integration (Supabase/Firebase)
- [ ] Native barcode scanning with camera
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Receipt generation (PDF)
- [ ] Store analytics dashboard
- [ ] Inventory management system
- [ ] Multi-language support
- [ ] Offline mode with sync

## 🏆 Hackathon Demo Tips

1. **Start with the Demo Menu** to showcase all features
2. **Show the smooth animations** - they're a key differentiator
3. **Demonstrate the complete customer flow** from entry to exit
4. **Highlight the offline-first design** with local mock data
5. **Explain the production QR scanning** approach
6. **Show the multi-step registration** form for admins

## 📄 License

MIT License - feel free to use this for your projects!

## 👨‍💻 Developer

Built with ❤️ for the hackathon

---

**Note**: This is a prototype/demo application. For production use, implement proper authentication, database integration, payment processing, and security measures.
