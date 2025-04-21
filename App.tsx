import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import HomeScreen from "./screens/HomeScreen";
import SeriesInfoScreen from "./screens/SeriesInfoScreen";
import MatchInfoScreen from "./screens/MatchInfoScreen";
import LoginScreen from "./screens/loginScreen";
import SignupScreen from "./screens/signupScreen";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { logout, subscribeToAuthChanges } from "./actions/authActions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function AuthTabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: { display: "none" }, // Hide the tab bar
			}}
		>
			<Tab.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: "Login",
					headerStyle: {
						backgroundColor: "#2196F3",
					},
					headerTintColor: "#fff",
				}}
			/>
			<Tab.Screen
				name="SignUp"
				component={SignupScreen}
				options={{
					title: "Sign-Up",
					headerStyle: {
						backgroundColor: "#2196F3",
					},
					headerTintColor: "#fff",
				}}
			/>
		</Tab.Navigator>
	);
}

function MainStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: "#2196F3",
				},
				headerTintColor: "#fff",
				headerRight: () => (
					<View style={{ marginRight: 10 }}>
						<TouchableOpacity
							onPressOut={() => {
								logout();
								alert("Logged out successfully");
							}}
						>
							<Text style={{ color: "#fff", fontWeight: "bold" }}>
								Logout
							</Text>
						</TouchableOpacity>
					</View>
				),
			}}
		>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: "Cricket Series",
				}}
			/>
			<Stack.Screen
				name="SeriesInfo"
				component={SeriesInfoScreen}
				options={{
					title: "Series Matches",
				}}
			/>
			<Stack.Screen
				name="MatchInfo"
				component={MatchInfoScreen}
				options={{
					title: "Match Details",
				}}
			/>
		</Stack.Navigator>
	);
}

function RootStack() {
	// return <MainStack />;

	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = subscribeToAuthChanges((currentUser) => {
			setUser(currentUser ?? false);
		});

		return unsubscribe; // Cleanup listener on unmount
	}, []);

	if (user === null) {
		// Show a loading indicator while verifying token
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size="large" color="#2196F3" />
			</View>
		);
	}

	return user ? <MainStack /> : <AuthTabs />;
}

export default function App() {
	return (
		<SafeAreaProvider style={styles.container}>
			<GestureHandlerRootView>
				<Toaster />
				<NavigationContainer>
					<RootStack />
				</NavigationContainer>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
