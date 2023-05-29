import {writable, derived, get} from 'svelte/store';
import type {numberOfRounds} from './utils';
import {shuffle} from 'lodash'
import {example_teams} from "./fixtures/teams";

import {v4 as uuidv4} from 'uuid';
import type {v4 as UUIDV4} from 'uuid';
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
	points: number
	name?: string
	rank?: number
}

export interface Court {
	id: ID,
	name?: string
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
				(a, b) => a.points - b.points
			);
			// TODO nach game points (hierarchical sort)
			tl.forEach((team, index) => {
				team.rank = index + 1;
			})
			return tl;
		})
	}


	function evaluateRound(currentRound: number) {
		// TODO check if `derived` makes sense?
		const gamesOfRound = get(games).filter(({round}) => round === currentRound);
		teams.update((tl) => {
			for (const game of gamesOfRound) {
				if (game.homeScore > game.visitorScore) {
					tl.find(({id}) => id === game.home).points++;
				} else {
					tl.find(({id}) => id === game.visitor).points++;
				}
			}
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

export const round = writable<number>(1)

function createGames() {
	const {subscribe, set, update} = writable<Game[]>([]);

	function createFirstRound() {

		const courtIds = get(courts).map(({id}) => id);
		const teamIds = get(teams).map(({id}) => id);

		const shuffledTeamIds = shuffle(teamIds)
		const newGames: Game[] = []

		for (var i = 0; i < courtIds.length; i++) {
			if (teamIds.length < i + 1) break
			newGames.push({
				id: uuidv4(),
				home: shuffledTeamIds[i],
				visitor: shuffledTeamIds[i + 1],
				homeScore: 0,
				visitorScore: 0,
				court: courtIds[i],
				status: "planned",
				round: 1,
			})
		}

		set(newGames)
	}


	function createNextRound(round: number) {
		// 1. Round: Random Games
		// Following rounds: Match same points. !If played before, match teams with 1 point diff
		// Nr rounds

		const courtIds = get(courts).map(({id}) => id);
		const teamIds = get(teams).map(({id}) => id);
		const seperator = "<-vs->"

		update((gl) => {

			const pairingHistory: string[] = gl.map(({home, visitor}) => `${home}${seperator}${visitor}`
			)

			for (var i = 0; i < courtIds.length; i++) {
				if (teamIds.length < i + 1) break
				const home = teamIds.splice(i, 1)[0]
				const visitorIndex = teamIds.findIndex((visitor, index) => {
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


// TRANS (https://www.obut.com/en/glossary-of-petanque-terms)