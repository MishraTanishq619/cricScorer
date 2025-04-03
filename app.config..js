export default {
	expo: {
		name: "CricScorer",
		slug: "snack-060789c2-0684-4b5d-88f5-be8279ef86e4",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/cricscorer-logo.jpeg",
		userInterfaceStyle: "light",
		newArchEnabled: true,
		splash: {
			image: "./assets/cricscorer-splash.jpeg",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/cricscorer-splash.jpeg",
				backgroundColor: "#ffffff",
			},
		},
		web: {
			favicon: "./assets/cricscorer-logo.jpeg",
		},
		description: "React Native Cricket Scorer App with AI",
		extra: {
			eas: {
				projectId: "1d39225e-a14b-476e-8552-0d5a5a41c17f",
			},
			EXPO_PUBLIC_API_KEY: process.env.EXPO_PUBLIC_API_KEY,
			EXPO_PUBLIC_API_DOMAIN: process.env.EXPO_PUBLIC_API_DOMAIN,
		},
		owner: "tannu619",
	},
};
