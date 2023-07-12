import {writable, derived, get, readable} from 'svelte/store';
import {isEven, numberOfRounds, nextRoundGames, firstRoundGames} from './utils';
import {example_teams} from "./fixtures/teams";

import {v4 as uuidv4} from 'uuid';
// '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


export const count = writable(0);

type ID = string // uuidv4

export interface Player {
	id: ID,
	name: string
}

export interface Team {
	id: ID,
	members: Player[],
	wins: number
	pointsWon: number
	pointsLost: number
	pointsDiff: number
	name?: string
	rank?: number
}

export interface Court {
	id: ID,
	name: string
	description?: string
	importance?: "main | side | training"
}

export interface Game {
	id: ID,
	home: Team["id"],
	visitor: Team["id"],
	homeScore: number,
	visitorScore: number,
	court: Court["id"],
	status: "planned" | "running" | "stopped" | "finished",
	round: number,
}

export type Page = "preparation" | "play" | "result";

export const page = writable<Page>("preparation");

function createTeams() {
	const {subscribe, update} = writable<Team[]>([]);

	function loadExampleTeams() {
		update((tl) => {
			tl.push(...example_teams);
			return tl;
		})
	}

	function updateRanking() {
		update((tl) => {
			tl.sort(
				(a, b) => b.wins - a.wins
			);
			tl.forEach((team, index) => {
				team.rank = index + 1;
			})
			return tl;
		})
	}


	function evaluateRound() {
		// TODO check if `derived` makes sense?
		const currentRound = get(rounds)[0]
		const gamesOfRound = get(games).filter(({round}) => round === currentRound);
		teams.update((tl) => {
			console.log(tl)
			for (const game of gamesOfRound) {

				const home = tl.find(({id}) => id === game.home)
				const visitor = tl.find(({id}) => id === game.visitor)
				console.log(home.pointsWon)
				console.log(home)
				console.log(game.homeScore)
				home.pointsWon += game.homeScore
				console.log(home.pointsWon)

				home.pointsLost += game.visitorScore
				home.pointsDiff += game.homeScore
				home.pointsDiff -= game.visitorScore
				visitor.pointsWon += game.visitorScore
				visitor.pointsLost += game.homeScore
				visitor.pointsDiff += game.visitorScore
				visitor.pointsDiff -= game.homeScore

				if (game.homeScore === game.visitorScore) {
					continue
				}
				if (game.homeScore > game.visitorScore) {
					home.wins++;
				} else {
					visitor.wins++;
				}
			}
			console.log(tl)
			return tl
		})
	}


	return {
		subscribe,
		update,
		loadExampleTeams,
		evaluateRound,
		updateRanking,
	};
}

export const teams = createTeams();

export const teamsValid = derived(teams, ($teams) => {
	const teamsCount = $teams.length
	const even = isEven(teamsCount) // TODO replace with Freilos
	const minCount = teamsCount >= 2
	return even && minCount
});



export interface Tournament {
	id: ID,
	name: string,
	maxRounds: number,
	games: Game["id"][],
	teams: Team["id"][]
}


function createCourts() {
	const {subscribe, set, update} = writable<Court[]>([]);

	function generateCourts(teamsCount: number) {

		const numberCourtsToCreate = Math.floor(teamsCount / 2);
		const courtList = [];
		for (let i = 0; i < numberCourtsToCreate; i++) {
			courtList.push({id: uuidv4(), name: `Platz ${i + 1}`});
		}

		set(courtList);
	}

	return {
		subscribe,
		update,
		generateCourts,
	};
}


export const courts = createCourts()

export const tournament = writable<Tournament>()

function createRounds() {
	const {subscribe, set, update} = writable<[number, number]>([1, 0]); // [current, max]

	function initRounds(teamsCount: number) {
		set([1, numberOfRounds(teamsCount)]);
	}

	function next() {
		update(([current, max]) => {
			const next = current < max ? current + 1 : max
			return [next, max]
		})
	}

	function prev() {
		update(([current, max]) => {
			const prev = current > 1 ? current - 1 : 1
			return [prev, max]
		})
	}

	function current(round: number) {
		update(([_, max]) => {
			return [round, max]
		})
	}

	return {
		set,
		subscribe,
		update,
		initRounds,
		next,
		prev,
		current
	};
}

export const rounds = createRounds()

function createGames() {
	const {subscribe, set, update} = writable<Game[]>([]);

	function createFirstRound() {

		const courtIds = get(courts).map(({id}) => id); // TODO derived stores
		const teamIds = get(teams).map(({id}) => id);

		set(firstRoundGames(courtIds, teamIds))
	}


	function createNextRound(round: number) {
		// 1. Round: Random Games
		// Following rounds: Match same #wins. !If played before, match teams with 1 point diff
		// Nr rounds

		const courtIds = get(courts).map(({id}) => id);
		const teamIds = get(teams).map(({id}) => id);

		update((gl) => {
			return nextRoundGames(gl, round, courtIds, teamIds)
		})
	}

	return {
		subscribe,
		update,
		createFirstRound,
		createNextRound
	};
}

export const games = createGames();


export const time = readable(0, function start(set) {
	const beginning = new Date();
	const beginningTime = beginning.getTime();

	const interval = setInterval(() => {
		const current = new Date();
		const currentTime = current.getTime();
		set(currentTime - beginningTime);
	}, 1000);

	return function stop() {
		// ! forcedly set the readable value to 0 before clearing the interval
		// it seems the store would otherwise retain the last value and the application would stagger from this value straight to 0
		set(0);
		clearInterval(interval);
	};
});
