// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FIREBASE_API,
	authDomain: "cricscorer-619.firebaseapp.com",
	projectId: "cricscorer-619",
	storageBucket: "cricscorer-619.appspot.com",
	messagingSenderId: "654160710009",
	appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// const auth = initializeAuth(app, {
// 	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

const auth = getAuth(app);

export { auth };
