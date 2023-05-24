import {describe, expect, it} from 'vitest'
import {numberOfRounds, sortTeams} from '../../src/utils'
import type {Team} from '../../src/store';

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

describe("sortTeams", () => {
	it('ranks teams according points', () => {
		const team1: Team = {
			id: "1",
			members: [],
			points: 1,
		}
		const team2: Team = {
			id: "2",
			members: [],
			points: 2,
		}
		expect(sortTeams(team1, team2)).toEqual(-1);
	});
});
