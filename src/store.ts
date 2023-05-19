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
	status: "planned" | "running" | "paused" | "finished",
	round: number,
}

export interface Tournament {
	id: ID,
	name: string,
	maxRounds: number,
	games: Game["id"][],
	teams: Team["id"][]
}

export const teams = writable<Team[]>([])

export const courts = writable<Court[]>([])

export const games = writable<Game[]>([])

export const rounds = writable<Game[]>([])

export const tournament = writable<Tournament>()

//   export const onClick = () => {
//     $x.count = $x.count + 1
//   }


// TRANS (https://www.obut.com/en/glossary-of-petanque-terms)