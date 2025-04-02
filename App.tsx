import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import HomeScreen from "./screens/HomeScreen";
import SeriesInfoScreen from "./screens/SeriesInfoScreen";
import MatchInfoScreen from "./screens/MatchInfoScreen";

const Stack = createNativeStackNavigator();

function RootStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: "Cricket Series",
					headerStyle: {
						backgroundColor: "#2196F3",
					},
					headerTintColor: "#fff",
				}}
			/>
			<Stack.Screen
				name="SeriesInfo"
				component={SeriesInfoScreen}
				options={{
					title: "Series Matches",
					headerStyle: {
						backgroundColor: "#2196F3",
					},
					headerTintColor: "#fff",
				}}
			/>
			<Stack.Screen
				name="MatchInfo"
				component={MatchInfoScreen}
				options={{
					title: "Match Details",
					headerStyle: {
						backgroundColor: "#2196F3",
					},
					headerTintColor: "#fff",
				}}
			/>
		</Stack.Navigator>
	);
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
