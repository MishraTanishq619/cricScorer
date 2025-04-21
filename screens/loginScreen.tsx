// screens/LoginScreen.js
import React, { useState } from "react";
import {
	View,
	TextInput,
	Button,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { login } from "../actions/authActions";

export default function LoginScreen({ navigation }: { navigation: any }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			await login(email, password);
			alert("Logged in!");
			// You can navigate to home screen here
		} catch (error: any) {
			alert(error.message);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>

			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				style={styles.input}
				autoCapitalize="none"
			/>

			<TextInput
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				style={styles.input}
			/>

			<Button title="Login" onPress={handleLogin} />

			<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
				<Text style={styles.redirectText}>
					Don’t have an account?{" "}
					<Text style={styles.link}>Sign Up</Text>
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
