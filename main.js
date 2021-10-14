'use strict'

const player1 = {
	name: 'Sub-Zero',
	hp: 90,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['sword', 'bow'],
	attack: function() {
		console.log(player1.name + ' ' + 'Fight...');
	}
}

const player2 = {
	name: 'Kitana',
	hp: 80,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: ['tessen', 'shuriken'],
	attack: function() {
		console.log(player2.name + ' ' + 'Fight...');
	}
}

const $arenas = document.querySelector('.arenas');

function createPlayer(playerClass, player) {
	const $player = document.createElement('div');
	$player.classList.add(playerClass);

	const $progressbar = document.createElement('div');
	$progressbar.classList.add('progressbar');

	const $life = document.createElement('div');
	$life.classList.add('life');
	$life.style.width = '100%';

	const $name = document.createElement('div');
	$name.classList.add('name');
	$name.innerText = player.name;

	const $character = document.createElement('div');
	$character.classList.add('character');

	const $img = document.createElement('img');
	$img.src = player.img;


	$player.appendChild($progressbar);
	$player.appendChild($character);

	$progressbar.appendChild($life);
	$progressbar.appendChild($name);

	$character.appendChild($img);

	$arenas.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
