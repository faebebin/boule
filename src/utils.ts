
import {v4 as uuidv4} from 'uuid';
import type {Team, Game, Court} from './store'
import {get} from 'svelte/store'
import {teams, courts, games} from './store'

export const numberOfRounds = (numberOfTeams: number): number => {
	return Math.floor(Math.log2(numberOfTeams)) + 1
}

export const rankTeams = (): void => {
	teams.update((tl) => {
		// tl.sort((a, b) => a.points - b.points);
		// TODO nach points (hierarchical sort)
		return tl;
	})
}

export const evaluateRound = (round: number): void => {
	const gamesList = get(games);
	teams.update((tl) => {
		for (const game of gamesList) {
			// TODO: add points to teams
		}
		return tl
	})
}


export const prepareNextRound = (round: number): void => {
	// if rounds.length === 0 then Math.random() ... 
	// 1. Round: Random Games
	// Following rounds: Match same points. !If played before, match teams with 1 point diff
	// Nr rounds

	const courtsList = get(courts);

	const newGames: Game[] = courtsList.map((court, i) => {
		return {
			id: uuidv4(),
			home: teams[i].id,
			visitor: teams[i + 1].id,
			homeScore: 0,
			visitorScore: 0,
			court: court.id,
			status: "planned",
			round,
		}
	})

	games.update((gl) => {
		gl.push(...newGames);
		return gl;
	})
}