import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { toast } from "sonner-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MatchInfo, MatchInfoResponse } from "../types/cricket";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MatchInfoScreen({ route }: { route: any }) {
	const { matchId } = route.params;
	const [matchInfo, setMatchInfo] = useState<MatchInfo | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchMatchInfo();
	}, []);

	const fetchMatchInfo = async () => {
		try {
			const response = await fetch(
				`https://${process.env.EXPO_PUBLIC_API_DOMAIN}/match_info?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${matchId}`
			);
			const data: MatchInfoResponse = await response.json();

			if (data.status !== "success") {
				throw new Error("Failed to fetch match info");
			}

			setMatchInfo(data.data);
		} catch (error) {
			toast.error("Failed to load match information");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color="#2196F3" />
			</View>
		);
	}

	if (!matchInfo) {
		return (
			<View style={styles.centered}>
				<Text>Match information not available</Text>
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.header}>
					<Text style={styles.title}>{matchInfo.name}</Text>
					<Text style={styles.venue}>{matchInfo.venue}</Text>
					<Text style={styles.date}>
						{new Date(matchInfo.dateTimeGMT).toLocaleDateString(
							"en-US",
							{
								day: "numeric",
								month: "long",
								year: "numeric",
							}
						)}
					</Text>
				</View>

				<View style={styles.statusCard}>
					<Text style={styles.status}>{matchInfo.status}</Text>
				</View>

				{matchInfo.tossWinner && (
					<View style={styles.tossInfo}>
						<MaterialCommunityIcons
							name="stadium"
							size={20}
							color="#666"
						/>
						<Text style={styles.tossText}>
							{matchInfo.tossWinner} won the toss and chose to{" "}
							{matchInfo.tossChoice}
						</Text>
					</View>
				)}

				{matchInfo.score && (
					<View style={styles.scoreContainer}>
						{matchInfo.score.map((score, index) => (
							<View key={index} style={styles.scoreCard}>
								<Text style={styles.inning}>
									{score.inning}
								</Text>
								<View style={styles.scoreDetails}>
									<Text style={styles.runs}>
										{score.r}/{score.w}
									</Text>
									<Text style={styles.overs}>
										({score.o} overs)
									</Text>
								</View>
							</View>
						))}
					</View>
				)}

				{matchInfo.matchWinner && (
					<View style={styles.winnerCard}>
						<MaterialCommunityIcons
							name="trophy"
							size={24}
							color="#FFD700"
						/>
						<Text style={styles.winnerText}>
							{matchInfo.matchWinner} won the match
						</Text>
					</View>
				)}
			</ScrollView>
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
	content: {
		padding: 16,
	},
	header: {
		backgroundColor: "white",
		padding: 16,
		borderRadius: 12,
		marginBottom: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1a1a1a",
		marginBottom: 8,
	},
	venue: {
		fontSize: 14,
		color: "#666",
		marginBottom: 4,
	},
	date: {
		fontSize: 14,
		color: "#666",
	},
	statusCard: {
		backgroundColor: "#2196F3",
		padding: 12,
		borderRadius: 8,
		marginBottom: 16,
	},
	status: {
		color: "white",
		fontSize: 16,
		fontWeight: "500",
		textAlign: "center",
	},
	tossInfo: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		padding: 12,
		borderRadius: 8,
		marginBottom: 16,
		gap: 8,
	},
	tossText: {
		color: "#666",
		fontSize: 14,
		flex: 1,
	},
	scoreContainer: {
		gap: 12,
	},
	scoreCard: {
		backgroundColor: "white",
		padding: 16,
		borderRadius: 12,
	},
	inning: {
		fontSize: 16,
		fontWeight: "500",
		color: "#2196F3",
		marginBottom: 8,
	},
	scoreDetails: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: 8,
	},
	runs: {
		fontSize: 24,
		fontWeight: "600",
		color: "#1a1a1a",
	},
	overs: {
		fontSize: 16,
		color: "#666",
	},
	winnerCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#4CAF50",
		padding: 16,
		borderRadius: 12,
		marginTop: 16,
		gap: 8,
	},
	winnerText: {
		color: "white",
		fontSize: 16,
		fontWeight: "500",
		flex: 1,
	},
});
