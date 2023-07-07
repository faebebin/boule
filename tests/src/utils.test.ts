import {describe, expect, it, beforeEach} from 'vitest'
import {numberOfRounds, isEven, nextRoundGames, firstRoundGames} from '../../src/utils'
import type {Game, Team} from '../../src/store';
import {example_teams} from '../../src/fixtures/teams';

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

describe("games", () => {
	let courtIds: string[]
	let teamIds: string[]

	beforeEach(() => {
		courtIds = ['1', '2', '3', '4']
		teamIds = example_teams.map(({id}) => id);
	})

	describe("firstRoundGames", () => {
		it('returns correct number of games', () => {
			const firstGames = firstRoundGames(courtIds, teamIds)

			expect(teamIds.length).toEqual(8);
			expect(firstGames.length).toEqual(courtIds.length);
			expect(firstGames.length).toEqual(4);
		});

		it('returns random paired games', () => {
			const firstShuffle = firstRoundGames(courtIds, teamIds)
			const secondShuffle = firstRoundGames(courtIds, teamIds)
			expect(firstShuffle).not.toEqual(secondShuffle);
		});
	});


	describe("nextRoundGames", () => {
		it('returns correct number of games', () => {
			// NOTE ignoring points
			const firstGames = firstRoundGames(courtIds, teamIds)
			expect(firstGames.length).toEqual(4);

			teamIds = example_teams.map(({id}) => id);
			const secondGames = nextRoundGames(firstGames, 2, courtIds, teamIds)
			expect(secondGames.length).toEqual(8);

			teamIds = example_teams.map(({id}) => id);
			const thirdGames = nextRoundGames(secondGames, 3, courtIds, teamIds)
			expect(thirdGames.length).toEqual(12);
		});
	});

})
