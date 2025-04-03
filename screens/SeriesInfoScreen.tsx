import {
	View,
	FlatList,
	StyleSheet,
	ActivityIndicator,
	TextInput,
	TouchableOpacity,
	Text,
} from "react-native";
import { useState, useEffect } from "react";
import { toast } from "sonner-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Match, SeriesInfoResponse } from "../types/cricket";
import MatchCard from "../components/MatchCard";

export default function SeriesInfoScreen({
	route,
	navigation,
}: {
	route: any;
	navigation: any;
}) {
	const { seriesId } = route.params;
	const [matches, setMatches] = useState<Match[]>([]);
	const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchText, setSearchText] = useState("");
	const [filterType, setFilterType] = useState<
		"all" | "upcoming" | "completed" | "ongoing"
	>("all");

	useEffect(() => {
		fetchSeriesInfo();
	}, []);

	const fetchSeriesInfo = async () => {
		try {
			const response = await fetch(
				`https://${process.env.EXPO_PUBLIC_API_DOMAIN}/series_info?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${seriesId}`
			);
			const data: SeriesInfoResponse = await response.json();

			if (data.status !== "success") {
				throw new Error("Failed to fetch series info");
			}

			// Sort matches by date
			const sortedMatches = [...data.data.matchList].sort(
				(a, b) =>
					new Date(b.dateTimeGMT).getTime() -
					new Date(a.dateTimeGMT).getTime()
			);
			setMatches(sortedMatches);
			setFilteredMatches(sortedMatches);
		} catch (error) {
			toast.error("Failed to load series information");
		} finally {
			setLoading(false);
		}
	};
	const handleMatchPress = (match: Match) => {
		navigation.navigate("MatchInfo", { matchId: match.id });
	};

	const filterMatches = (
		text: string,
		type: "all" | "upcoming" | "completed" | "ongoing"
	) => {
		setSearchText(text);
		setFilterType(type);

		let filtered = [...matches];

		// Apply search filter
		if (text) {
			filtered = filtered.filter(
				(match) =>
					match.name.toLowerCase().includes(text.toLowerCase()) ||
					match.teams.some((team) =>
						team.toLowerCase().includes(text.toLowerCase())
					)
			);
		}

		// Apply status filter
		switch (type) {
			case "upcoming":
				filtered = filtered.filter((match) => !match.matchStarted);
				break;
			case "completed":
				filtered = filtered.filter((match) => match.matchEnded);
				break;
			case "ongoing":
				filtered = filtered.filter(
					(match) => match.matchStarted && !match.matchEnded
				);
				break;
		}

		setFilteredMatches(filtered);
	};

	const FilterButton = ({
		title,
		type,
	}: {
		title: string;
		type: "all" | "upcoming" | "completed" | "ongoing";
	}) => (
		<TouchableOpacity
			style={[
				styles.filterButton,
				filterType === type && styles.filterButtonActive,
			]}
			onPress={() => filterMatches(searchText, type)}
		>
			<Text
				style={[
					styles.filterButtonText,
					filterType === type && styles.filterButtonTextActive,
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);

	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color="#2196F3" />
			</View>
		);
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.filterContainer}>
				<TextInput
					style={styles.searchInput}
					placeholder="Search matches..."
					value={searchText}
					onChangeText={(text) => filterMatches(text, filterType)}
				/>
				<View style={styles.filterButtons}>
					<FilterButton title="All" type="all" />
					<FilterButton title="Upcoming" type="upcoming" />
					<FilterButton title="Completed" type="completed" />
					<FilterButton title="Ongoing" type="ongoing" />
				</View>
			</View>
			<FlatList
				data={filteredMatches}
				renderItem={({ item }) => (
					<MatchCard match={item} onPress={handleMatchPress} />
				)}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	filterContainer: {
		padding: 16,
		backgroundColor: "white",
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	searchInput: {
		backgroundColor: "#f5f5f5",
		padding: 12,
		borderRadius: 8,
		marginBottom: 12,
	},
	filterButtons: {
		flexDirection: "row",
		gap: 8,
	},
	filterButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 16,
		backgroundColor: "#f5f5f5",
	},
	filterButtonActive: {
		backgroundColor: "#2196F3",
	},
	filterButtonText: {
		color: "#666",
		fontSize: 14,
		fontWeight: "500",
	},
	filterButtonTextActive: {
		color: "white",
	},
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
});
