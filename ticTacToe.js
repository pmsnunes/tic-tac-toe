const prompt = require("prompt-sync")();

const EMPTY_POSITION = " ";
const PLAYER_X = "x";
const PLAYER_O = "o";
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function whoStarts() {
  const validPlayers = [PLAYER_X, PLAYER_O];
  const firstPlayer = prompt("Who plays first? x or o?\n>");
  if (validPlayers.includes(firstPlayer)) {
    return firstPlayer;
  }
  console.error("Invalid player, please try again.");
  return whoStarts();
}

function askForNextMove(map) {
  const nextMove = parseInt(prompt("What is your next move? (0-8)\n>"));
  if (map[nextMove] === EMPTY_POSITION && nextMove >= 0 && nextMove < 9) {
    return nextMove;
  }
  console.error("Invalid position");
}

function printMap(map) {
  console.log(`_________`);
  console.log(`| ${map[0]} | ${map[1]} | ${map[2]} `);
  console.log(`_________`);
  console.log(`| ${map[3]} | ${map[4]} | ${map[5]} `);
  console.log(`_________`);
  console.log(`| ${map[6]} | ${map[7]} | ${map[8]} `);
  console.log(`_________`);
}

function isGameOver(map) {
  WINNING_COMBOS.forEach((combo) => {
    if (
      ((map[combo[0]] === map[combo[1]]) === map[combo[2]]) !==
      EMPTY_POSITION
    ){
      return {isOver: true, winner: map[combo[0]]}
    }
  });

  if (!map.includes(EMPTY_POSITION)) {
    return { isOver: true, winner: null };
  }

  return {isOver: false, winner: null};
}

function ticTacToe() {
  let currentPlayer = whoStarts();
  const map = Array.from({ length: 9 }, () => EMPTY_POSITION);

  console.log(`It is player ${currentPlayer}'s turn:`);
  printMap(map);

  while (true) {
    const nextMove = askForNextMove(map);
    map[nextMove] = currentPlayer;
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    const { isOver, winner } = isGameOver(map, currentPlayer);
    if(isOver){
      if(winner){
        console.log(`The winner is ${winner}`)
      } else {
        console.log("Its a tie!")
      }
      break;
    }
  }
}

ticTacToe();
