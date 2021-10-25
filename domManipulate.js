'use strict'
import { getTime, randomNumber } from "./utils.js";
import { logs } from "./appData.js";

export function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
};

export function playerWins(name) {
	const $winTitle = createElement('div', 'loseTitle');
	$winTitle.innerText = name ? name + ' wins' : 'draw';
	return $winTitle;
};

export function generateLogs(type, player1, player2, damgeAmount) {

	const $chat = document.querySelector('.chat');
	const time = getTime();
	let text = '';
	switch (type) {
		case 'start':
			text = logs[type]
				.replace('[time]', time)
				.replace('[player1]', player1.name)
				.replace('[player2]', player2.name);
			break;
		case 'hit':
			text = `${time} - ${logs[type][randomNumber(18) - 1]
				.replace('[playerKick]', player1.name)
				.replace('[playerDefence]', player2.name)} -${damgeAmount} [${player2.hp}/100]`;
			break;
		case 'defence':
			text = `${time} - ${logs[type][randomNumber(8) - 1]
				.replace('[playerKick]', player1.name)
				.replace('[playerDefence]', player2.name)}`;
			break;	
		case 'end': 
			text = `${time} - ${logs[type][randomNumber(3) - 1]
				.replace('[playerWins]', player1.name)
				.replace('[playerLose]', player2.name)}`;
			break;	
		case 'draw':
			text = `${time} - ${logs[type]}`;
			break;
	}

	const el = `<p>${text}</p>`;
	$chat.insertAdjacentHTML('afterbegin', el);
}

export function showResult(player1, player2) {

	const $arenas = document.querySelector('.arenas');

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name));
		generateLogs('end', player2, player1);
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name));
		generateLogs('end', player1, player2);
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(playerWins());
		generateLogs('draw');
	}
}

export function createReloadButton() {
	const $buttonWrap = createElement('div', 'reloadWrap');
	const $button = createElement('button', 'button');
	$button.innerText = 'Restart';
	$buttonWrap.appendChild($button);
	$button.addEventListener('click', function() {
		window.location.reload();
	})
	return $buttonWrap;
};