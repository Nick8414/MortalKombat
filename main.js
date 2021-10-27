'use strict'

import { enemyAttack, playerAttack } from './actionAttack.js';
import { createElement, generateLogs, showResult, createReloadButton } from './domManipulate.js';
import { subZero as player1, kitana as player2 } from './players.js';

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

function createPlayer({ player, hp, name, img }) {
	const $player = createElement('div', `player${player}`);
	const $progressbar = createElement('div', 'progressbar');
	const $life = createElement('div', 'life');
	const $name = createElement('div', 'name');
	const $character = createElement('div', 'character');
	const $img = createElement('img');

	$life.style.width = hp + '%';
	$name.innerText = name;
	$img.src = img;

	$player.appendChild($progressbar);
	$player.appendChild($character);

	$progressbar.appendChild($life);
	$progressbar.appendChild($name);

	$character.appendChild($img);

	return $player;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);


$formFight.addEventListener('submit', function (e) {
	e.preventDefault();
	const {hit: enemyHit, defence: enemyDefense, value: enemyValue} = enemyAttack();
	const {hit: playerHit, defence: playerDefence, value: playerValue} = playerAttack();

	if (playerHit !== enemyDefense) {
		player2.changeHP(playerValue);
		player2.renderHP();
		generateLogs('hit', player1, player2, playerValue);
	} else {
		generateLogs('defence', player1, player2);
	}

	if (enemyHit !== playerDefence) {
		player1.changeHP(enemyValue);
		player1.renderHP();
		generateLogs('hit', player2, player1, enemyValue);
	} else {
		generateLogs('defence', player2, player1);
	}

	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
		$arenas.appendChild(createReloadButton());
	}

	showResult(player1, player2);

})

