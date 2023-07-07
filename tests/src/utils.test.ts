import {describe, expect, it} from 'vitest'
import {numberOfRounds, isEven} from '../../src/utils'
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

describe("isEven", () => {
	it('returns true for 2', () => {
		expect(isEven(2)).toBeTruthy();
	});

	it('returns true for 0', () => {
		expect(isEven(0)).toBeTruthy();
	});
});
