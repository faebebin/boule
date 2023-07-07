import type {Game} from './store';
import {shuffle} from 'lodash'
import {v4 as uuidv4} from 'uuid';

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

		const home = teamIds.splice(i, 1)[0]
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

