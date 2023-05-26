export const numberOfRounds = (numberOfTeams: number): number => {
	return Math.floor(Math.log2(numberOfTeams)) + 1
}
