import { logs, HIT, ATTACK } from "./appData.js";
import Player  from "./player.js";
import Utils from "./utils.js";
import Request from "./api.js";

const { randomNumber, getTime } = new Utils();
const request = new Request();

let player1;
let player2;

class Game {
  constructor() {
    this.$arenas = document.querySelector(".arenas");
    this.$randomButton = document.querySelector(".button");
    this.$formFight = document.querySelector(".control");
  }

  getPlayers = async () => {
    const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players')
      .then(res => res.json());
      return body;
  }

  createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
      $tag.classList.add(className);
    }
    return $tag;
  }

  createPlayer({ player, hp, name, img }) {
    const $player = this.createElement("div", `player${player}`);
    const $progressbar = this.createElement("div", "progressbar");
    const $life = this.createElement("div", "life");
    const $name = this.createElement("div", "name");
    const $character = this.createElement("div", "character");
    const $img = this.createElement("img");

    $life.style.width = hp + "%";
    $name.innerText = name;
    $img.src = img;

    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    return $player;
  }

  generateLogs(type, { name } = {}, { name: playerName2, hp }, damgeAmount) {
    const $chat = document.querySelector(".chat");
    const time = getTime();
    let text = "";
    switch (type) {
      case "start":
        text = logs[type]
          .replace("[time]", time)
          .replace("[player1]", name)
          .replace("[player2]", playerName2);
        break;
      case "hit":
        text = `${time} - ${logs[type][randomNumber(18) - 1]
          .replace("[playerKick]", name)
          .replace(
            "[playerDefence]",
            playerName2
          )} -${damgeAmount} [${hp}/100]`;
        break;
      case "defence":
        text = `${time} - ${logs[type][randomNumber(8) - 1]
          .replace("[playerKick]", name)
          .replace("[playerDefence]", playerName2)}`;
        break;
      case "end":
        text = `${time} - ${logs[type][randomNumber(3) - 1]
          .replace("[playerWins]", name)
          .replace("[playerLose]", playerName2)}`;
        break;
      case "draw":
        text = `${time} - ${logs[type]}`;
        break;
    }

    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML("afterbegin", el);
  }

  enemyAttack() {
    const hitDirection = () => ATTACK[randomNumber(3) - 1];
    const hit = hitDirection();
    const defence = hitDirection();

    return {
      value: randomNumber(HIT[hit]),
      hit,
      defence,
    };
  }

  playerAttack() {
    const attack = {};

    for (let item of this.$formFight) {
      if (item.checked && item.name === "hit") {
        attack.value = randomNumber(HIT[item.value]);
        attack.hit = item.value;
      }

      if (item.checked && item.name === "defence") {
        attack.defence = item.value;
      }

      item.checked = false;
    }

    return attack;
  }

  playerWins(name) {
    const $winTitle = this.createElement("div", "loseTitle");
    $winTitle.innerText = name ? name + " wins" : "draw";
    return $winTitle;
  }

  showResult(player1, player2) {
    if (player1.hp === 0 && player1.hp < player2.hp) {
      this.$arenas.appendChild(this.playerWins(player2.name));
      this.generateLogs("end", player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
      this.$arenas.appendChild(this.playerWins(player1.name));
      this.generateLogs("end", player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
      this.$arenas.appendChild(this.playerWins());
      this.generateLogs("draw");
    }
  }

  createReloadButton() {
    const $buttonWrap = this.createElement("div", "reloadWrap");
    const $button = this.createElement("button", "button");
    $button.innerText = "Restart";
    $buttonWrap.appendChild($button);
    $button.addEventListener("click", function () {
      window.location.reload();
    });
    return $buttonWrap;
  }

  createSubmitListener() {
    this.$formFight.addEventListener("submit", async (e) => {
      e.preventDefault();
      const {
        hit,
        defence,
      } = this.playerAttack();

      const fightAction = await request.getFight({
        hit,
        defence,
      });

      const {
        player1: { hit: playerHit, defence: playerDefence, value: playerValue },
        player2: { hit: enemyHit, defence: enemyDefense, value: enemyValue },
      } = fightAction;

      if (playerHit !== enemyDefense) {
        player2.changeHP(playerValue);
        player2.renderHP();
        this.generateLogs("hit", player1, player2, playerValue);
      } else {
        this.generateLogs("defence", player1, player2);
      }

      if (enemyHit !== playerDefence) {
        player1.changeHP(enemyValue);
        player1.renderHP();
        this.generateLogs("hit", player2, player1, enemyValue);
      } else {
        this.generateLogs("defence", player2, player1);
      }

      if (player1.hp === 0 || player2.hp === 0) {
        this.$randomButton.disabled = true;
        this.$arenas.appendChild(this.createReloadButton());
      }

      this.showResult(player1, player2);
    });
  }

  start = async (selectedPlayer) => {
    const players = await request.getPlayers();
    // const p1 = players[randomNumber(players.length) - 1];
    const p2 = players[randomNumber(players.length) - 1];

    player1 = new Player({
      ...selectedPlayer,
      player: 1,
      rootSelector: 'arenas'
    });
    player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: 'arenas'
    });

    this.$arenas.appendChild(this.createPlayer(player1));
    this.$arenas.appendChild(this.createPlayer(player2));

    this.createSubmitListener();

    this.generateLogs("start", player1, player2);
  }
}

export default Game;
