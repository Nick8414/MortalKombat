'use strict'

const player1 = {
	player: 1,
	name: 'Sub-Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['sword', 'bow'],
	attack: function() {
		console.log(player1.name + ' ' + 'Fight...');
	}
}
const player2 = {
	player: 2,
	name: 'Kitana',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: ['tessen', 'shuriken'],
	attack: function() {
		console.log(player2.name + ' ' + 'Fight...');
	}
}

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
}

function createPlayer(playerObj) {
	const $player = createElement('div', 'player' + playerObj.player);
	const $progressbar = createElement('div', 'progressbar');
	const $life = createElement('div', 'life');
	const $name = createElement('div', 'name');
	const $character = createElement('div', 'character');
	const $img = createElement('img');

	$life.style.width = '100%';
	$name.innerText = playerObj.name;
	$img.src = playerObj.img;

	$player.appendChild($progressbar);
	$player.appendChild($character);

	$progressbar.appendChild($life);
	$progressbar.appendChild($name);

	$character.appendChild($img);

	return $player;
}

function randomHPHit () {
	return Math.ceil(Math.random() * 20);
}

function changeHP(player) {
	const $playerLife = document.querySelector('.player' + player.player + ' .life');
	player.hp -= randomHPHit();
	
	if (player.hp <= 0) {
		player.hp = 0;
		$playerLife.style.width = 0;
	} else {
		$playerLife.style.width = player.hp + '%';
	}
}

function playerLose(name) {
	const $loseTitle = createElement('div', 'loseTitle');
	$loseTitle.innerText = name + ' lose';

	return $loseTitle;
}

function playerWin(name) {
	const $winTitle = createElement('div', 'loseTitle');
	$winTitle.innerText = name === 'draw' ? name : name + ' win';
	return $winTitle;
}

function checkWinner(player1, player2) {
	if (player1.hp === 0 && player2.hp > 0) {
		return player2.name;
	} else if (player1.hp > 0 && player2.hp === 0) {
		return player1.name;
	} else if (player1.hp === 0 && player2.hp === 0) {
		return 'draw';
	} else {
		return null;
	}
}

$randomButton.addEventListener('click', function(e) {
	console.log(e.target);
	console.log('rand botom');
	changeHP(player1);
	changeHP(player2);
	
	const winnerName = checkWinner(player1, player2);
	if (winnerName) {
		$arenas.appendChild(playerWin(winnerName));
		$randomButton.disabled = true;
	}
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));



