export interface Series {
	id: string;
	name: string;
	startDate: string;
	endDate: string;
	odi: number;
	t20: number;
	test: number;
	squads: number;
	matches: number;
}

export interface SeriesResponse {
	apikey: string;
	data: Series[];
	status: string;
	info: {
		hitsToday: number;
		hitsUsed: number;
		hitsLimit: number;
		credits: number;
	};
}

export interface Match {
	id: string;
	name: string;
	matchType: string;
	status: string;
	venue: string;
	date: string;
	dateTimeGMT: string;
	teams: string[];
	fantasyEnabled: boolean;
	bbbEnabled: boolean;
	hasSquad: boolean;
	matchStarted: boolean;
	matchEnded: boolean;
}

export interface Score {
	r: number;
	w: number;
	o: number;
	inning: string;
}

export interface MatchInfo extends Match {
	score?: Score[];
	tossWinner?: string;
	tossChoice?: string;
	matchWinner?: string;
	series_id?: string;
}

export interface MatchInfoResponse {
	apikey: string;
	data: MatchInfo;
	status: string;
	info: {
		hitsToday: number;
		hitsUsed: number;
		hitsLimit: number;
		credits: number;
	};
}

export interface SeriesInfo {
	info: Series;
	matchList: Match[];
}

export interface SeriesInfoResponse {
	apikey: string;
	data: SeriesInfo;
	status: string;
	info: {
		hitsToday: number;
		hitsUsed: number;
		hitsLimit: number;
		credits: number;
	};
}
