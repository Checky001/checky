# 🚀 Checky - Quick Start Guide

## Installation

```bash
# Install dependencies (if needed)
npm install

# Start the app
npx expo start
```

Scan the QR code with Expo Go on your phone.

## 🎯 First Time Setup

### 1. Sign In
- **Option A**: Tap "🎯 Use Demo Account" button
  - Email: `demo@checky.app`
  - Password: (any password works in demo mode)

- **Option B**: Create new account
  - Tap "Sign Up"
  - Fill in your details
  - You'll get a ₦50,000 welcome bonus!

### 2. Explore the Tabs
After signing in, you'll see 4 tabs at the bottom:
- **🏠 Home**: Quick actions and nearby stores
- **📷 Scan**: Camera scanning hub
- **💳 Wallet**: Your DVA wallet (₦50,000 starting balance)
- **👤 Profile**: Account settings

## 🛍️ Complete Shopping Demo (2 minutes)

### Step 1: Enter a Store
**From Home Tab:**
- Scroll down to "Nearby Stores"
- Tap any store card (e.g., "MegaMart Lekki")

**OR use Mock Camera:**
- Go to **Scan** tab
- Tap "🏪 Scan Store QR"
- Enter code: `STORE_001` or tap "MegaMart"

### Step 2: Add Products
You're now in the store! Add items:
- Toggle to **"Manual Entry Mode"** (top right)
- Enter product numbers:
  - `1001` - Fresh Tomatoes (₦2,500)
  - `1002` - iPhone 14 Pro (₦125,000) - oops, too expensive!
  - `1003` - Pringles (₦1,200)
  - `1004` - Coca-Cola (₦350)
  - `1005` - White T-Shirt (₦8,500)
- Tap ➕ after each number

### Step 3: View Cart
- Tap the **floating cart badge** (top right)
- Review your items
- Adjust quantities with **+ / -** buttons
- Or remove items with the **Remove** button

### Step 4: Checkout
- Tap **"Proceed to Checkout"**
- Select **"DVA Wallet"** (already selected)
- See your balance: ₦50,000
- Tap **"Pay ₦XXX"**

### Step 5: Exit Verification
- After payment, you'll see your **Exit QR Code**
- This is shown to staff when leaving
- Your wallet balance is now updated!

### Step 6: Check Wallet
- Go to **💳 Wallet** tab
- See your new balance
- View the transaction in history

## 💰 Wallet Features

### Top Up Wallet
1. Go to **Wallet** tab
2. Enter amount or tap quick buttons:
   - ₦1,000
   - ₦5,000
   - ₦10,000
   - ₦20,000
3. Tap "Add Funds"
4. Wait 1-2 seconds for processing

### Transaction History
- All purchases appear in wallet
- Green (+) = Credits (top-ups, refunds)
- Red (-) = Debits (purchases)
- Each shows date, time, and reference number

## 📷 Mock Camera Scanning

### Scan Store QR
1. Go to **Scan** tab (or tap camera icon on Home)
2. Tap "🏪 Scan Store QR"
3. See animated scanner with corner frames
4. Enter code manually or use quick access
5. Codes that work:
   - `STORE_001` - MegaMart Lekki
   - `STORE_002` - FreshGrocer Victoria
   - `STORE_003` - TechHub Ikeja

### Scan Product Barcode
1. First enter a store
2. Go to **Scan** tab
3. Tap "📦 Scan Product Barcode"
4. Toggle to "Product" mode (top)
5. Enter product numbers:
   - `1001` through `1018` work
6. Product is added to cart!

## 🏪 Store Registration (Store Owners)

### Register Your Store
1. From **Profile** tab, tap "My Stores"
2. Or from Sign In screen, tap "Register Your Store"
3. Complete 4 steps:

**Step 1: Store Information**
- Store name (e.g., "John's Supermarket")
- Category (select from 8 options)
- Business registration number (optional)

**Step 2: Location**
- Street address
- City
- State

**Step 3: Admin Contact**
- Admin name
- Admin email (for approval notification)
- Admin phone number

**Step 4: Review & Submit**
- Review all information
- Tap "Submit Application"
- Wait for approval email (24-48 hours)

## 🛡️ Staff Verification

### Verify Customer Exit QR
1. Go to **Home** tab
2. Scroll down to Quick Actions
3. Tap "🛡️ Staff - Verify exit"

**OR from Demo Menu:**
1. Tap "View All Features" from role selection
2. Tap "Verify Exit QR"

**Enter Exit QR Code:**
- Demo codes that work:
  - `EXIT_TXN_001_CHECKY`
  - `EXIT_TXN_002_CHECKY`
- Tap "Verify Customer"
- See ✓ Verified! or ✗ Not Verified

## 🎨 UI Tips

### Animations
- All screens have smooth fade-in effects
- Buttons scale when pressed
- Success/error states are animated
- Scanner line moves up and down

### Haptic Feedback
- Light tap on button press
- Medium tap on important actions
- Success/error vibrations on outcomes

## 🐛 Troubleshooting

### "Insufficient Funds" Error
- **Problem**: Wallet balance too low
- **Solution**: Go to Wallet tab → Top Up

### Store Entry Not Working
- **Problem**: Wrong store code
- **Solution**: Use quick access buttons or valid codes:
  - STORE_001, STORE_002, STORE_003, STORE_004, STORE_005

### Product Not Found
- **Problem**: Product doesn't exist in current store
- **Solution**: Use product numbers 1001-1018
- Make sure you're inside a store first

### Camera Mode (Production)
- **Current**: Manual entry only (Expo Go limitation)
- **Production**: Need development build for real camera
  - Run: `npx expo run:android` or `npx expo run:ios`
  - Camera will work with real barcode scanning

## 📱 All Product Numbers

**MegaMart Lekki (STORE_001):**
- 1001 - Fresh Tomatoes (₦2,500)
- 1002 - iPhone 14 Pro (₦125,000)
- 1003 - Pringles Original (₦1,200)
- 1004 - Coca-Cola 1.5L (₦350)

**FreshGrocer Victoria (STORE_002):**
- 1005 - White T-Shirt (₦8,500)
- 1006 - Organic Bananas (₦1,800)
- 1007 - Fresh Milk (₦2,500)

**TechHub Ikeja (STORE_003):**
- 1008 - MacBook Pro (₦1,850,000)
- 1009 - Wireless Mouse (₦15,000)

## 🎯 Demo Flow Recommendations

### 5-Minute Demo
1. Sign in with demo account (30 sec)
2. Show home dashboard (30 sec)
3. Enter store and add 3 products (90 sec)
4. View cart and checkout (60 sec)
5. Show exit QR (30 sec)
6. Check wallet transaction (30 sec)
7. Demo camera scanning (60 sec)

### Full Feature Demo (10 minutes)
1. Sign up new account (60 sec)
2. Home dashboard tour (60 sec)
3. Complete shopping flow (3 min)
4. Wallet management demo (2 min)
5. Mock camera scanning (2 min)
6. Store registration (2 min)
7. Staff verification (60 sec)

## 💡 Pro Tips

1. **Wallet First**: Top up wallet before shopping if balance is low
2. **Quick Access**: Use store cards on Home tab instead of typing codes
3. **Product Numbers**: Write down 1001-1005 for quick demo
4. **Mock Camera**: Show the animated scanner - it's impressive!
5. **Transactions**: After each purchase, check Wallet to show transaction
6. **Multi-Store**: Exit one store, enter another - cart clears automatically

## 🔗 Navigation Shortcuts

- **Home** → **Store Card** → Product Scan
- **Home** → **Camera Icon** → Mock Camera → Store Entry
- **Scan Tab** → Quick access to camera
- **Profile** → **My Stores** → Store Signup
- **Any Screen** → **Floating Cart** → Basket

## 📞 Support

For issues or questions:
- Check `UPGRADE_SUMMARY.md` for detailed features
- Check `README.md` for full documentation
- Check `DEMO_GUIDE.md` for presentation tips

---

**Happy Shopping with Checky! 🛍️**

