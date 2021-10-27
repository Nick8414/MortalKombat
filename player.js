class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
  }
	
  attack() {
    console.log(this.name + " " + "Fight...");
  }

  changeHP(hpAmount) {
    this.hp -= hpAmount;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  }

  elHP() {
    return document.querySelector(".player" + this.player + " .life");
  }

  renderHP() {
    const $lifeEl = this.elHP();
    $lifeEl.style.width = this.hp + "%";
  }
}

export const player1 = new Player({
  player: 1,
  name: "Sub-Zero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
});

export const player2 = new Player({
  player: 2,
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
});

player1.attack();
console.log(player1);
