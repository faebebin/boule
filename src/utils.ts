
import {v4 as uuidv4} from 'uuid';
import type {Team, Round, Game, Court} from './store'

export const numberOfRounds = (numberOfTeams: number): number => {
	// TODO test
	// Die Potenz „2 hoch Rundenzahl“ muss größer
	// sein als die Zahl der teilnehmenden Teams. Starten also mehr als 32 aber weniger als 64
	// Teams, dann reichen 6 Runden, da 2 hoch 6 64 ergibt. Beteiligen sich 10 Teams reichen
	// 4 Runden aus.
	return Math.ceil(Math.log2(numberOfTeams))
}



export const nextRound = (teams: Team[]): Round => {
	// TODO teams.reduce

	// if rounds.length === 0 then Math.random() ... 
	// 1. Round: Random Games
	// Following rounds: Match same points. !If played before, match teams with 1 point diff
	// Nr rounds


	const court: Court = {
		id: uuidv4(),
	}

	const game: Game = {
		id: uuidv4(),
		home: teams[0],
		visitor: teams[1],
		court,
		status: "planned",
		duration: 0,
	}

	return {
		id: uuidv4(),
		number: 1,
		games: [game],
	}
}
