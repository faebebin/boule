import {describe, expect, it} from 'vitest'
import {numberOfRounds} from '../../src/utils'

describe("numberOfRounds", () => {
	it('returns a correct number of rounds', () => {
		const numberOfTeams = 7
		expect(numberOfRounds(numberOfTeams)).toEqual(3);
	});

	it('returns a correct number of rounds', () => {
		const numberOfTeams = 8
		expect(numberOfRounds(numberOfTeams)).toEqual(4);
	});

	it('returns a correct number of rounds', () => {
		const numberOfTeams = 15
		expect(numberOfRounds(numberOfTeams)).toEqual(4);
	});

	it('returns a correct number of rounds', () => {
		const numberOfTeams = 16
		expect(numberOfRounds(numberOfTeams)).toEqual(5);
	});

	it('returns a correct number of rounds', () => {
		const numberOfTeams = 31
		expect(numberOfRounds(numberOfTeams)).toEqual(5);
	});

	it('returns a correct number of rounds', () => {
		const numberOfTeams = 32
		expect(numberOfRounds(numberOfTeams)).toEqual(6);
	});

	it('returns a correct number of rounds', () => {
		const numberOfTeams = 63
		expect(numberOfRounds(numberOfTeams)).toEqual(6);
	});

	it('returns a correct number of rounds', () => {
		const numberOfTeams = 64
		expect(numberOfRounds(numberOfTeams)).toEqual(7);
	});

});

// describe("choseVehicleByDistance", () => {
//   it('returns the right vehicle for the distance', () => {
//     expect(choseVehicleByDistance(1000001).name).toMatch('airplane')
//   });
// 
//   it('returns the right vehicle for the distance', () => {
//     expect(choseVehicleByDistance(999999).name).toMatch('bus')
//   });
// });
// 
// describe("choseVehicleByName", () => {
//   it('returns the right vehicle for given Name', () => {
//     expect(choseVehicleByName('A string includig boat  and ...').name).toMatch('boat')
//   });
// 
//   it('ignores case', () => {
//     expect(choseVehicleByName(' A string BoAt and more').name).toMatch('boat')
//   });
// 
//   it('needs to be seperate word', () => {
//     expect(choseVehicleByName('A string includigBoat and ...')).toBeUndefined
//   });
// 
//   it('needs to be seperate word', () => {
//     expect(choseVehicleByName('Cartagena is a city in Colombia')).toBeUndefined
//   });
// 
//   it('can be at end of line', () => {
//     expect(choseVehicleByName('A string includig boat.')).toBeUndefined
//   });
// 
//   it('can be at beginning of line', () => {
//     expect(choseVehicleByName('Boat in  string')).toBeUndefined
//   });
// });
// 
// import {v4 as uuidv4} from 'uuid';
// import type {Team, Game, Court} from './store'
// import {get} from 'svelte/store'
// import {teams, courts, games} from './store'
// 
// export const numberOfRounds = (numberOfTeams: number): number => {
// 	// TODO test
// 	// Die Potenz „2 hoch Rundenzahl“ muss größer
// 	// sein als die Zahl der teilnehmenden Teams. Starten also mehr als 32 aber weniger als 64
// 	// Teams, dann reichen 6 Runden, da 2 hoch 6 64 ergibt. Beteiligen sich 10 Teams reichen
// 	// 4 Runden aus.
// 
// 	// return Math.ceil(Math.log2(numberOfTeams))
// 	return 5;
// }
// 
// export const rankTeams = (): void => {
// 	teams.update((tl) => {
// 		// tl.sort((a, b) => a.points - b.points);
// 		// TODO nach points (hierarchical sort)
// 		return tl;
// 	})
// }
// 
// export const evaluateRound = (round: number): void => {
// 	const gamesList = get(games);
// 	teams.update((tl) => {
// 		for (const game of gamesList) {
// 			// TODO: add points to teams
// 		}
// 		return tl
// 	})
// }
// 
// 
// export const prepareNextRound = (round: number): void => {
// 	// if rounds.length === 0 then Math.random() ... 
// 	// 1. Round: Random Games
// 	// Following rounds: Match same points. !If played before, match teams with 1 point diff
// 	// Nr rounds
// 
// 	const courtsList = get(courts);
// 
// 	const newGames: Game[] = courtsList.map((court, i) => {
// 		return {
// 			id: uuidv4(),
// 			home: teams[i].id,
// 			visitor: teams[i + 1].id,
// 			homeScore: 0,
// 			visitorScore: 0,
// 			court: court.id,
// 			status: "planned",
// 			round,
// 		}
// 	})
// 
// 	games.update((gl) => {
// 		gl.push(...newGames);
// 		return gl;
// 	})
// }