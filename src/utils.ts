import type {Game} from './store';
import {teams, courts, games, rounds, page} from "./store";
import {shuffle} from 'lodash'
import {v4 as uuidv4} from 'uuid';

import {get} from "svelte/store";

export const numberOfRounds = (numberOfTeams: number): number => {
	return Math.floor(Math.log2(numberOfTeams)) + 1
}

// TODO use library
function zeroPadded(number) {
	return number >= 10 ? number.toString() : `0${number}`;
}

function lastDigit(number) {
	return number.toString()[number.toString().length - 1];
}

export function formatTime(milliseconds) {
	const mm = zeroPadded(Math.floor(milliseconds / 1000 / 60));
	const ss = zeroPadded(Math.floor(milliseconds / 1000) % 60);
	return `${mm}:${ss}`;
}

export function isEven(n) {
	return n % 2 == 0;
}

export function firstRoundGames(courtIds: string[], teamIds: string[]): Game[] {
	const shuffledTeamIds = shuffle(teamIds)
	const firstGames: Game[] = []

	// Loop over courts and allocate 2 teams to per game 
	for (var i = 0; i < courtIds.length; i++) {
		const homeIndex = i * 2
		const visitorIndex = homeIndex + 1

		if (homeIndex >= teamIds.length) break

		firstGames.push({
			id: uuidv4(),
			home: shuffledTeamIds[homeIndex],
			visitor: shuffledTeamIds[visitorIndex],
			homeScore: 0,
			visitorScore: 0,
			court: courtIds[i],
			status: "planned",
			round: 1,
		})
	}

	return firstGames
}

export function nextRoundGames(gl: Game[], round: number, courtIds: string[], teamIds: string[]): Game[] {
	// TODO how test svelte store?
	const seperator = "<-vs->"

	const pairingHistory: string[] = gl.map(({home, visitor}) => `${home}${seperator}${visitor}`)

	for (var i = 0; i < courtIds.length; i++) {
		if (teamIds.length < 2) break

		const home = teamIds.shift()
		const visitorIndex = teamIds.findIndex((visitor, _) => {
			return !pairingHistory.includes(`${home}${seperator}${visitor}`)
		})
		const visitor = teamIds.splice(visitorIndex, 1)[0]
		gl.push({
			id: uuidv4(),
			home,
			visitor,
			homeScore: 0,
			visitorScore: 0,
			court: courtIds[i],
			status: "planned",
			round,
		})
	}
	return gl
}

function downloadFile(filename: string, content: string, type = "application/json") {
	const blob = new Blob([content], {type});
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.setAttribute("download", filename);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

export function exportTournament() {
	const snapshot = {
		teams: get(teams),
		courts: get(courts),
		games: get(games),
		rounds: get(rounds),
		page: get(page),
	};
	downloadFile("boule-tournament.json", JSON.stringify(snapshot, null, 2));
}

export function importTournament(file: File) {
	const reader = new FileReader();
	reader.onload = (e) => {
		const json = JSON.parse(e.target?.result as string);

		teams.update(() => json.teams ?? []);
		courts.update(() => json.courts ?? []);
		games.update(() => json.games ?? []);
		rounds.update(() => json.rounds ?? [1, 0]);
		page.set(json.page ?? "preparation");
	};
	reader.readAsText(file);
}
