import {writable} from 'svelte/store';
import type {nextRound, numberOfRounds} from './utils';

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
	member: Player[],
	points: number
}

export interface Court {
	id: ID,
	name?: string
	description?: string
	importance?: "main | side | training"
}

export interface Game {
	id: ID,
	home: Team,
	visitor: Team,
	court: Court,
	status: "planned" | "running" | "paused" | "finished",
	duration: number
}

export interface Round {
	id: ID,
	number: number,
	games: Game[]
}

export interface Tournament {
	id: ID,
	name: string,
	maxRounds: number,
	rounds: Round[],
	ranking: Team[]
}

export const players = writable<Player[]>()

export const teams = writable<Team[]>()

export const courts = writable<Court[]>()

export const games = writable<Game[]>()


//   export const onClick = () => {
//     $x.count = $x.count + 1
//   }


// TRANS (https://www.obut.com/en/glossary-of-petanque-terms)

export const tournament = writable<Tournament>([])