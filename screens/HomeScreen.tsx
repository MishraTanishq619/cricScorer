import {
	View,
	FlatList,
	StyleSheet,
	ActivityIndicator,
	RefreshControl,
	TextInput,
	TouchableOpacity,
	Text,
} from "react-native";
import { useState, useEffect } from "react";
import { toast } from "sonner-native";
import { Series, SeriesResponse } from "../types/cricket";
import SeriesCard from "../components/SeriesCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
	const [series, setSeries] = useState<Series[]>([]);
	const [filteredSeries, setFilteredSeries] = useState<Series[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [searchText, setSearchText] = useState("");

	const fetchSeries = async () => {
		try {
			const response = await fetch(
				"https://api.cricapi.com/v1/series?apikey=1e1cef80-640b-4464-aa78-79301c5f82a0&offset=0"
			);
			const data: SeriesResponse = await response.json();

			if (data.status !== "success") {
				throw new Error("Failed to fetch series");
			}

			setSeries(data.data);
			setFilteredSeries(data.data); // Initialize filtered series
		} catch (error) {
			toast.error("Failed to load series");
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	useEffect(() => {
		fetchSeries();
	}, []);

	useEffect(() => {
		applySearchFilter();
	}, [searchText, series]);

	const applySearchFilter = () => {
		if (searchText.trim() === "") {
			setFilteredSeries(series);
		} else {
			setFilteredSeries(
				series.filter((item) =>
					item.name.toLowerCase().includes(searchText.toLowerCase())
				)
			);
		}
	};

	const handleRefresh = () => {
		setRefreshing(true);
		fetchSeries();
	};

	const handleSeriesPress = (selectedSeries: Series) => {
		toast.error(`Selected: ${selectedSeries.name}`);
		navigation.navigate("SeriesInfo", { seriesId: selectedSeries.id });
	};

	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color="#2196F3" />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			{/* Search Input */}
			<View style={styles.searchContainer}>
				<TextInput
					style={styles.searchInput}
					placeholder="Search series..."
					value={searchText}
					onChangeText={(text) => setSearchText(text)}
				/>
			</View>

			{/* Series List */}
			<FlatList
				data={filteredSeries}
				renderItem={({ item }) => (
					<SeriesCard series={item} onPress={handleSeriesPress} />
				)}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
						colors={["#2196F3"]}
					/>
				}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	list: {
		paddingVertical: 12,
	},
	searchContainer: {
		padding: 16,
		backgroundColor: "#ffffff",
	},
	searchInput: {
		height: 40,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		paddingHorizontal: 12,
		backgroundColor: "#f9f9f9",
	},
});
