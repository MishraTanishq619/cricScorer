import React, { useState } from "react";
import {
	View,
	TextInput,
	Button,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from "react-native";
import { signUp } from "../actions/authActions";

export default function SignupScreen({ navigation }: { navigation: any }) {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const handleSignup = async () => {
		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords do not match");
			return;
		}

		try {
			await signUp(email, password);
			Alert.alert("Success", "Account created! You can now log in.");
			navigation.navigate("Login");
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "An unknown error occurred";
			Alert.alert("Signup failed", errorMessage);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Create Account</Text>

			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				style={styles.input}
				autoCapitalize="none"
				keyboardType="email-address"
			/>

			<TextInput
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				style={styles.input}
			/>

			<TextInput
				placeholder="Confirm Password"
				secureTextEntry
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				style={styles.input}
			/>

			<Button title="Sign Up" onPress={handleSignup} />

			<TouchableOpacity onPress={() => navigation.navigate("Login")}>
				<Text style={styles.redirectText}>
					Already have an account?{" "}
					<Text style={styles.link}>Log In</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 30,
		textAlign: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 6,
		padding: 10,
		marginBottom: 15,
	},
	redirectText: {
		marginTop: 20,
		textAlign: "center",
		color: "#666",
	},
	link: {
		color: "red",
		fontWeight: "bold",
	},
});
