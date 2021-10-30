'use strict'

import Game from './game.js';
import Request from "./api.js";

const game = new Game();
const request = new Request();

document.addEventListener("DOMContentLoaded", async function () {
  const player = localStorage.getItem('player1');
  let player1;
  if (player) {
    player1 = JSON.parse(player);
  } else {
    player1 = await request.getRandomPlayer();
  }
  game.start(player1);
});