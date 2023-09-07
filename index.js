const gameInfo = document.querySelector('.Game_info');
const boxses = document.querySelectorAll('.box');
const newBtn = document.querySelector('.btn');

let currentPlayer;
let newGrid;
const winnigPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function initGame() {
    currentPlayer = 'x';
    newGrid = ["", "", "", "", "", "", "", "", ""];
    boxses.forEach((box, index) => {
        box.innerText = '';
        boxses[index].style.pointerEvents = 'all';
        boxses[index].classList.remove('win')

    })
    newBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();


function swapTurn() {
    if (currentPlayer === 'x') {
        currentPlayer = 'o';
    }
    else {
        currentPlayer = 'x';
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkOver() {
    let answer = "";
    winnigPosition.forEach((position) => {
        if ((newGrid[position[0]] !== "" || newGrid[position[1]] !== "" || newGrid[position[2]] !== "")
            && (newGrid[position[0]] === newGrid[position[1]]) && (newGrid[position[1]] === newGrid[position[2]])) {
            if (newGrid[position[0]] === "x") {
                answer = "x";


            }
            else {
                answer = "o";

            }

            boxses.forEach((box) => {
                box.style.pointerEvents = 'none';
            })

            boxses[position[0]].classList.add('win')
            boxses[position[1]].classList.add('win')
            boxses[position[2]].classList.add('win')



        }




    })

    if (answer !== "") {
        gameInfo.innerText = `Winnwer Player  - ${answer}`;
        newBtn.classList.add('active')
    }

    //check wether the game is tied 
    let fillCount = 0;

    newGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    })

    if (fillCount === 9) {
        gameInfo.innerText = `Game Tied!`
        newBtn.classList.add("active");
    }

}

function handleClick(index) {
    if (newGrid[index] === '') {
        boxses[index].innerText = currentPlayer;
        newGrid[index] = currentPlayer;
        boxses[index].style.pointerEvents = 'none'
        swapTurn();
        checkOver();
    }

}

boxses.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newBtn.addEventListener("click", initGame)