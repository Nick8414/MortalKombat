'use strict'

const player1 = {
	player: 1,
	name: 'Sub-Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['sword', 'bow'],
	attack,
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP
}
const player2 = {
	player: 2,
	name: 'Kitana',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: ['tessen', 'shuriken'],
	attack,
	changeHP,
	elHP,
	renderHP
}

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
}

function createReloadButton() {
	const $buttonWrap = createElement('div', 'reloadWrap');
	const $button = createElement('button', 'button');
	$button.innerText = 'Restart';
	$buttonWrap.appendChild($button);
	$button.addEventListener('click', function() {
		window.location.reload();
	})
	return $buttonWrap;
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

function randomNumber (num) {
	return Math.ceil(Math.random() * num);
}

function attack() {
	console.log(this.name + ' ' + 'Fight...');
}

function changeHP(hpAmount) {
	this.hp -= hpAmount;
	if (this.hp <= 0) {
		this.hp = 0;
	} 
}

function elHP() {
	return document.querySelector('.player' + this.player + ' .life');
}
function renderHP() {
	const $lifeEl = this.elHP();
	$lifeEl.style.width = this.hp+'%';
}

function playerWins(name) {
	const $winTitle = createElement('div', 'loseTitle');
	$winTitle.innerText = name ? name + ' wins' : 'draw';
	return $winTitle;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);

function enemyAttack() {
	const hitDirection = () => ATTACK[randomNumber(3) - 1];
	const hit = hitDirection();
	const defence = hitDirection();
	
	return {
		value: randomNumber(HIT[hit]),
		hit,
		defence,
	}
}

function playerAttack() {
	const attack = {};

	for (let item of $formFight) {
		
		if (item.checked && item.name === 'hit') {
			attack.value = randomNumber(HIT[item.value]);
			attack.hit = item.value;
		}

		if (item.checked && item.name === 'defence') {
			attack.defence = item.value;
		}

		item.checked = false;
	}

	return attack;
}

function showResult() {
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

function getTime() {
	const now = new Date();
	const normalizedTime = (num) => (num < 10 ? '0':'') + num;
	return `${normalizedTime(now.getHours())} : ${normalizedTime(now.getMinutes())}`;
}

function generateLogs(type, player1, player2, damgeAmount) {

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

$formFight.addEventListener('submit', function (e) {
	e.preventDefault();
	const enemy = enemyAttack();
	const player = playerAttack();

	if (player.hit !== enemy.defence) {
		player2.changeHP(player.value);
		player2.renderHP();
		generateLogs('hit', player1, player2, player.value);
	} else {
		generateLogs('defence', player1, player2);
	}

	if (enemy.hit !== player.defence) {
		player1.changeHP(enemy.value);
		player1.renderHP();
		generateLogs('hit', player2, player1, enemy.value);
	} else {
		generateLogs('defence', player2, player1);
	}

	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
		$arenas.appendChild(createReloadButton());
	}

	showResult();

})

