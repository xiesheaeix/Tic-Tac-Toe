/*----- constants -----*/
const playerMoves = {
    '' : '',
    '1' : 'X',
    '-1' : 'O',
};

const winningCombos = [
    [0, 1, 2], // horizontal wins
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // vertical wins 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonal win
    [2, 4, 6], // anti-diagonal win
  ];

/*----- state variables -----*/
let board; // array of 3 column arrays
let turn; // 1 or -1
let winner; // null = no winner, 1 or -1 = winner, 'T' = tie;
/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const resetBtn = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleClick);
resetBtn.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 1;
    winner = null;
    gameOver = false;
    render();
}

function handleClick(evt) {
const sqrIdx = parseInt(evt.target.id.replace('sqr', ''));
if (
    isNaN(sqrIdx) ||
    board[sqrIdx] ||
    winner 
) return;
board[sqrIdx] = turn;
turn *= -1;
winner = getWinner();
render();
}

function getWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        if (Math.abs(board[winningCombos[i][0]] +
            board[winningCombos[i][1]] + 
            board[winningCombos[i][2]]) === 3)
            return board[winningCombos[i][0]];
    }
    if (board.includes('')) return null;
return 'T';
} 


function render() {
    renderBoard();
    renderMessage();
    resetBtn.disabled = !winner;
}

function renderBoard() {
 board.forEach(function (sqrs, idx){
    //console.log(idx);
    const sqrEl = document.getElementById(`sqr${idx}`);
    sqrEl.innerText = playerMoves[sqrs];
 });
}

function renderMessage() {
 if (winner === 'T') {
    return messageEl.innerText = "It's a Tie!";
 } else if (winner) {
    messageEl.innerText = `${playerMoves[winner]} Wins!!`;
 } else {
    messageEl.innerText = `${playerMoves[turn]}'s Turn`;
 }
}
