let scores = JSON.parse(localStorage.getItem('scores')) || {
	losses: 0,
	wins: 0,
	ties: 0
};

let isAutoPlay = false;
let intervalId;

const autoPlay = () => {

};

function autoPlay() {
	if (!isAutoPlay) {
		intervalId = setInterval(()=> {
			const playerMove = pickComputerMove();
			playGame(playerMove);
		}, 1000);
		isAutoPlay = true;

	} else {
		clearInterval(intervalId);
		isAutoPlay = false;
	}

}

function playGame(playerMove) {
	const computerMove = pickComputerMove();

	let result = '';

	if (playerMove === 'scissors') {
		if (computerMove === 'rock') {
			result = 'You Lose.';
		} else if (computerMove === 'paper') {
			result = 'You Win.';
		} else if (computerMove === 'scissors') {
			result = 'You Tie.';
		}

	} else if (playerMove === 'paper') {
		if (computerMove === 'rock') {
			result = 'You Win.';
		} else if (computerMove === 'paper') {
			result = 'You Tie.';
		} else if (computerMove === 'scissors') {
			result = 'You Lose.';
		}

	} else if(playerMove === 'rock') {
		if (computerMove === 'rock') {
			result = 'You Tie.';
		} else if (computerMove === 'paper') {
			result = 'You Lose.';
		} else if (computerMove === 'scissors') {
			result = 'You Win.';
		}
	}

	if (result === 'You Win.') {
		scores.wins ++;
	} else if (result === 'You Lose.') {
		scores.losses ++;
	} else if (result === 'You Tie.') {
		scores.ties ++;
	}

	localStorage.setItem('scores', JSON.stringify(scores));

	// call function.
	updateScoresElement();

	// we display the result.
	document.querySelector('.js-result').innerHTML = result;

	// we display user move against computer move.
	document.querySelector('.js-moves').innerHTML = `You
			<img src="images/${playerMove}-emoji.png" class="move-icon" alt="rock">
			<img src="images/${computerMove}-emoji.png" class="move-icon" alt="scissors">
			Computer`;

}

// this function helps update scores.
function updateScoresElement() {
	document.querySelector('.js-score')
		.innerHTML = `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
}

function pickComputerMove() {
	const randomNumber = Math.random();
	let computerMove = '';

	if (randomNumber > 0 && randomNumber < 1/3) {
		computerMove = 'rock';
	} else if (randomNumber >= 1/3 && randomNumber < 2/3) {
		computerMove = 'paper';
	} else if (randomNumber >= 2/3 && randomNumber < 1) {
		computerMove = 'scissors';
	}
	return computerMove;
}

