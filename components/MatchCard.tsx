import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Match } from "../types/cricket";

interface MatchCardProps {
	match: Match;
	onPress: (match: Match) => void;
}

export default function MatchCard({ match, onPress }: MatchCardProps) {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	};

	return (
		<Pressable
			style={({ pressed }) => [styles.card, pressed && styles.pressed]}
			onPress={() => onPress(match)}
		>
			<Text style={styles.title} numberOfLines={2}>
				{match.name}
			</Text>

			<View style={styles.infoContainer}>
				<View style={styles.dateVenue}>
					<View style={styles.iconText}>
						<MaterialCommunityIcons
							name="calendar"
							size={16}
							color="#666"
						/>
						<Text style={styles.date}>
							{formatDate(match.dateTimeGMT)}
						</Text>
					</View>
					<View style={styles.iconText}>
						<MaterialCommunityIcons
							name="map-marker"
							size={16}
							color="#666"
						/>
						<Text style={styles.venue} numberOfLines={1}>
							{match.venue}
						</Text>
					</View>
				</View>

				<View style={styles.statusContainer}>
					<Text
						style={[
							styles.status,
							match.matchEnded
								? styles.completed
								: match.matchStarted
								? styles.ongoing
								: styles.upcoming,
						]}
					>
						{match.status}
					</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		borderRadius: 12,
		padding: 16,
		marginHorizontal: 16,
		marginVertical: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	pressed: {
		opacity: 0.9,
		transform: [{ scale: 0.98 }],
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1a1a1a",
		marginBottom: 12,
	},
	infoContainer: {
		gap: 12,
	},
	dateVenue: {
		gap: 8,
	},
	iconText: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	date: {
		color: "#666",
		fontSize: 14,
	},
	venue: {
		color: "#666",
		fontSize: 14,
		flex: 1,
	},
	statusContainer: {
		borderTopWidth: 1,
		borderTopColor: "#eee",
		paddingTop: 12,
	},
	status: {
		fontSize: 14,
		fontWeight: "500",
	},
	completed: {
		color: "#2196F3",
	},
	upcoming: {
		color: "#4CAF50",
	},
	ongoing: {
		color: "#F44336",
	},
});
