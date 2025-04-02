import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Series } from "../types/cricket";

interface SeriesCardProps {
	series: Series;
	onPress: (series: Series) => void;
}

export default function SeriesCard({ series, onPress }: SeriesCardProps) {
	return (
		<Pressable
			style={({ pressed }) => [styles.card, pressed && styles.pressed]}
			onPress={() => onPress(series)}
		>
			<View style={styles.header}>
				<Text style={styles.title} numberOfLines={2}>
					{series.name}
				</Text>
			</View>

			<View style={styles.dateContainer}>
				<MaterialCommunityIcons
					name="calendar"
					size={16}
					color="#666"
				/>
				<Text style={styles.date}>
					{series.startDate} - {series.endDate}
				</Text>
			</View>

			<View style={styles.statsContainer}>
				<View style={styles.stat}>
					<MaterialCommunityIcons
						name="cricket"
						size={20}
						color="#2196F3"
					/>
					<Text style={styles.statText}>
						{series.matches} matches
					</Text>
				</View>

				{series.t20 > 0 && (
					<View style={styles.stat}>
						<Text style={styles.format}>T20</Text>
						<Text style={styles.statText}>{series.t20}</Text>
					</View>
				)}

				{series.odi > 0 && (
					<View style={styles.stat}>
						<Text style={styles.format}>ODI</Text>
						<Text style={styles.statText}>{series.odi}</Text>
					</View>
				)}

				{series.test > 0 && (
					<View style={styles.stat}>
						<Text style={styles.format}>TEST</Text>
						<Text style={styles.statText}>{series.test}</Text>
					</View>
				)}
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
	header: {
		marginBottom: 12,
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1a1a1a",
		lineHeight: 22,
	},
	dateContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	date: {
		marginLeft: 6,
		color: "#666",
		fontSize: 14,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
	},
	stat: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 12,
	},
	statText: {
		marginLeft: 4,
		color: "#444",
		fontSize: 14,
	},
	format: {
		fontSize: 12,
		fontWeight: "600",
		color: "#2196F3",
	},
});
