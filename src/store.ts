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
	const {subscribe, set, update} = writable<Team[]>([]);

	function loadExampleTeams() {
		update((tl) => {
			tl.push(...example_teams);
			return tl;
		})
	}
	function rankTeams() {
		update((tl) => {
			tl.sort(
				(a, b) => a.points - b.points
			);
			// TODO nach points (hierarchical sort)
			return tl;
		})
	}


	function evaluateRound(currentRound: number) {
		const gamesList = get(games).filter(({round}) => round === currentRound);
		teams.update((tl) => {
			for (const game of gamesList) {
				// TODO: add points to teams
			}
			return tl
		})
	}


	return {
		subscribe,
		update,
		loadExampleTeams,
		evaluateRound,
		rankTeams,
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

		const courtsList = get(courts);
		const teamsList = get(teams);

		const shuffledTeams = shuffle(teamsList)
		const newGames: Game[] = []

		for (var i = 0; i < courtsList.length; i++) {
			if (teamsList.length < i + 1) break
			newGames.push({
				id: uuidv4(),
				home: shuffledTeams[i].id,
				visitor: shuffledTeams[i + 1].id,
				homeScore: 0,
				visitorScore: 0,
				court: courtsList[i].id,
				status: "planned",
				round: 1,
			})
		}

		set(newGames)
	}


	function createNextRound(round: number) {
		// TODO
		// if rounds.length === 0 then Math.random() ... 
		// 1. Round: Random Games
		// Following rounds: Match same points. !If played before, match teams with 1 point diff
		// Nr rounds
	}

	return {
		subscribe,
		update,
		createFirstRound,
		createNextRound
	};
}

export const games = createGames();


//   export const onClick = () => {
//     $x.count = $x.count + 1
//   }


// TRANS (https://www.obut.com/en/glossary-of-petanque-terms)