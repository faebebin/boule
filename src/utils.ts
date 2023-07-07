export const numberOfRounds = (numberOfTeams: number): number => {
	return Math.floor(Math.log2(numberOfTeams)) + 1
}

// TODO use library
function zeroPadded(number) {
	return number >= 10 ? number.toString() : `0${number}`;
}

function lastDigit(number) {
	return number.toString()[number.toString().length - 1];
}

export function formatTime(milliseconds) {
	const mm = zeroPadded(Math.floor(milliseconds / 1000 / 60));
	const ss = zeroPadded(Math.floor(milliseconds / 1000) % 60);
	return `${mm}:${ss}`;
}

export function isEven(n) {
	return n % 2 == 0;
}
