import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

// Sign Up
export const signUp = async (email: string, password: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
};

// Login
export const login = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
};

// Logout
export const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		throw error;
	}
};

// Listen to auth state changes
export const subscribeToAuthChanges = (onUserChanged: (user: any) => void) => {
	return onAuthStateChanged(auth, onUserChanged);
};
