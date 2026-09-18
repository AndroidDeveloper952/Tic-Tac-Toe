let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true = O, false = X

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { // player O
            box.innerText = "O";
            turnO = false;
        } else { // player X
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");

    disableBoxes();

    // Create winning line
    let line = document.createElement("div");
    line.classList.add("winning-line");

    document.querySelector(".game").appendChild(line);

    // Get winning boxes
    let firstBox = boxes[pattern[0]];
    let lastBox = boxes[pattern[2]];

    let game = document.querySelector(".game");

    let gameRect = game.getBoundingClientRect();
    let firstRect = firstBox.getBoundingClientRect();
    let lastRect = lastBox.getBoundingClientRect();

    // Starting point
    let x1 = firstRect.left + firstRect.width / 2 - gameRect.left;
    let y1 = firstRect.top + firstRect.height / 2 - gameRect.top;

    // Ending point
    let x2 = lastRect.left + lastRect.width / 2 - gameRect.left;
    let y2 = lastRect.top + lastRect.height / 2 - gameRect.top;

    // Calculate line length
    let length = Math.sqrt(
        Math.pow(x2 - x1, 2) +
        Math.pow(y2 - y1, 2)
    );

    // Calculate line angle
    let angle = Math.atan2(
        y2 - y1,
        x2 - x1
    ) * 180 / Math.PI;

    // Set line position
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
};

const showDraw = () => {
    msg.innerText = "Damn Game Match is Draw!";
    msgcontainer.classList.remove("hide");

    disableBoxes();
};

const checkWinner = () => {
    // Check Winner
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, pattern);
                return;
            }
        }
    }

    // Check Draw
    let allFilled = true;

    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }

    if (allFilled) {
        showDraw();
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");

    // Remove winning line
    let line = document.querySelector(".winning-line");
    if (line) {
        line.remove();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);