
import {v4 as uuidv4} from 'uuid';
import type {Team, Game, Court} from './store'
import {get} from 'svelte/store'
import {teams, courts, games} from './store'

export const numberOfRounds = (numberOfTeams: number): number => {
	// TODO test
	// Die Potenz „2 hoch Rundenzahl“ muss größer
	// sein als die Zahl der teilnehmenden Teams. Starten also mehr als 32 aber weniger als 64
	// Teams, dann reichen 6 Runden, da 2 hoch 6 64 ergibt. Beteiligen sich 10 Teams reichen
	// 4 Runden aus.

	// return Math.ceil(Math.log2(numberOfTeams))
	return 5;
}

const rankTeams = (): void => {
	teams.update((tl) => {
		// tl.sort((a, b) => a.points - b.points);
		// TODO 
		return tl;
	})
}


export const nextRound = (): void => {
	// TODO teams.reduce

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
			round: 1,
		}
	})

	games.update((gl) => {
		gl.push(...newGames);
		return gl;
	})
}