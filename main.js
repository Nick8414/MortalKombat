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

function randomHPHit (num) {
	return Math.ceil(Math.random() * num);
}

function changeHP(player) {
	const $playerLife = document.querySelector('.player' + player.player + ' .life');
	player.hp -= randomHPHit(20);
	
	if (player.hp <= 0) {
		player.hp = 0;
	} 
	$playerLife.style.width = player.hp + '%';
	
}

function elHP() {}
function renderHP() {

}

function playerWins(name) {
	const $winTitle = createElement('div', 'loseTitle');
	$winTitle.innerText = name ? name + ' wins' : 'draw';
	return $winTitle;
}

$randomButton.addEventListener('click', function(e) {
	changeHP(player1);
	changeHP(player2);
	
	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(playerWins());
	}
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));



