# HeartLink Frontend

Voice-enabled family social networking platform built with React Native and Expo.

## 🚀 Tech Stack

### Core
- React Native
- Expo
- Zustand (State Management)
- Axios (API Communication)

### UI/UX
- React Navigation (Stack, Bottom Tabs)
- Expo Vector Icons
- React Native Animatable
- React Native Linear Gradient
- Lottie React Native
- React Native Toast Message
- React Native SVG

### Media & Device
- Expo AV
- Expo Image Picker
- Expo Notifications
- Expo Device
- Expo Status Bar

### Storage
- AsyncStorage

## 📁 Project Structure

```
src/
├── api/          # API integration and axios instance
├── components/   # Reusable UI components and navigation
├── constants/    # Color schemes and other constants
├── screens/      # Application screens/pages
├── store/        # Zustand state management
└── utils/        # Helper functions (token, date calculations)
```

## 🛠️ Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/CSE24-HeartLink/Front-End.git
cd Front-End
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on device/simulator:
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## 📱 Key Features

### Voice Interface
- Voice-to-text conversion
- Real-time AI image generation
- Group feed updates

### Social Networking
- Group feeds
- Shared photo albums 
- Family/friend connections
- Virtual pet (CLOi) interaction

### Media Handling
- Image picker integration
- Audio processing
- Push notifications

## 🔄 State Management

The application uses Zustand for state management. Key stores include:
- User authentication state
- Group/feed data
- Media content
- Virtual pet status

## 📡 API Integration

API calls are handled using Axios with a structured approach:
- Centralized API configuration
- Request/response interceptors
- Error handling

## 🎯 Navigation

The app uses React Navigation with the following structure:
- Stack Navigator for main navigation flow
- Bottom Tab Navigator for main app sections
- Nested navigators for complex flows

## 💻 Development

### Prerequisites
- Node.js
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Studio

### Running Locally
1. Start the Expo development server
2. Use Expo Go app on your device or an emulator
3. Scan QR code or run through simulator

## 🧪 Testing

For testing the application:
1. Ensure all dependencies are installed
2. Run development server
3. Test on both iOS and Android platforms

## 📱 Building for Production

To create a production build:

1. For Android:
```bash
expo build:android
```

2. For iOS:
```bash
expo build:ios
```

## 👥 Team

- Jeong Yeonkyung - edaily0129@gmail.com
- Kim Dayeon - jewelry0706@hanyang.ac.kr
- Park Jeongho - popramel@hanyang.ac.kr
- Yu Jihye - jihyeyu33@hanyang.ac.kr

## 🔗 Links

- [Main Project Repository](https://github.com/CSE24-HeartLink)
- [Figma Design](https://www.figma.com/design/pWLXJosrBwKVW7n35S9YfL/2024-2-SE_HeartLink?node-id=1-5&t=JhY1tghOwMr3WjJo-1)
