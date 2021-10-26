'use strict'
import { randomNumber } from "./utils.js";
import { HIT, ATTACK } from "./appData.js";

export function enemyAttack() {
	const hitDirection = () => ATTACK[randomNumber(3) - 1];
	const hit = hitDirection();
	const defence = hitDirection();
	
	return {
		value: randomNumber(HIT[hit]),
		hit,
		defence,
	}
}

export function playerAttack() {
	const $formFight = document.querySelector('.control');
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