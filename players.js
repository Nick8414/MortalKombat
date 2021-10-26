'use strict'

function attack() {
	console.log(this.name + ' ' + 'Fight...');
};

function changeHP(hpAmount) {
	this.hp -= hpAmount;
	if (this.hp <= 0) {
		this.hp = 0;
	} 
};

function elHP() {
	return	document.querySelector('.player' + this.player + ' .life');
} 

function renderHP() {
	const $lifeEl = this.elHP();
	$lifeEl.style.width = this.hp+'%';
};

const character = {
	hp: 100,
	attack,
	changeHP,
	elHP,
	renderHP,
}



export const subZero = Object.create(character, {
	player: {
		value: 1
	},
	name: {
		value: 'Sub-Zero'
	},
	img: {
		value: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	},
	weapon: {
		value: ['sword', 'bow'],
	},
});

export const kitana = Object.create(character, {
	player: {
		value: 2
	},
	name: {
		value: 'Kitana'
	},
	img: {
		value: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	},
	weapon: {
		value: ['tessen', 'shuriken'],
	},
});

// const player1 = {
// 	player: 1,
// 	name: 'Sub-Zero',
// 	hp: 100,
// 	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
// 	weapon: ['sword', 'bow'],
// 	attack,
// 	changeHP,
// 	elHP,
// 	renderHP,
// }
// const player2 = {
// 	player: 2,
// 	name: 'Kitana',
// 	hp: 100,
// 	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
// 	weapon: ['tessen', 'shuriken'],
// 	attack,
// 	changeHP,
// 	elHP,
// 	renderHP,
// }