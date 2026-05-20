# Heezi - Complete Technical Architecture

## Overview
Heezi V1.2 is a cross-platform educational practice platform built with Expo/React Native that supports mobile (iOS/Android) and web. It features interactive practice tools (Spreadsheet, Text Editor, Quiz) with a mascot-guided learning experience.

### Layer 1: Root Application Layer
**File**: `app/_layout.tsx`

```
RootLayout
├── SessionProvider (Auth Context)
│   ├── onAuthStateChanged (Firebase listener)
│   ├── user (User | null)
│   └── isLoading (boolean)
├── ThemeProvider (React Navigation)
│   └── CustomTheme (white background)
└── Stack Router
    ├── (tabs) → TabLayout
    ├── mission/[practiceTool]/[id] → MissionLayout
    ├── sign-in → SignInScreen
    ├── register → RegisterScreen
    └── modal → ModalScreen
```

**Key Pattern**: Wraps entire app with authentication and theme providers. All navigation routes stem from this root.

---