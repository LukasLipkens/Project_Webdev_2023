//#region IMPORTS
import "./scoreLine.js"
//#endregion IMPORTS

const template = document.createElement("template");
template.innerHTML = /*html*/ `
    <style>
        .container {
            display: flex;
            margin-bottom: 10px;
        }
        .date-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 10%;
            background-image: linear-gradient(to right, #d1d1d1 75%, white);
            padding-right: 20px;
            font-size: 30px;
            height: 63px;
            border-radius: 10px 0 0 10px;
            margin-left: 15px;
        }
        .item-container {
            border: 2px solid #d1d1d1;
            border-left: none;
            border-radius: 0 10px 0 0;
            width: 90%;
        }
        .text {
            color: black;
        }
        .game-container {
            display: flex;
            justify-content: space-evenly;
            width: 100%;
            height: 60px;
        }
        .button-container {
            width: 5%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 53px;
        }
        .arrow-image {
            width: 35px;
            height: 35px;
            cursor: pointer;
            transition: transform 0.3s ease;
            transform: rotate(0);
            transform-origin: center;
        }
        .arrow-image.rotate {
            transform: rotate(180deg);
        }
/*****************************************************************************/
        .left, .right {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60px;
            width: 100%;
        }
        .left img, .right img {
            width: 50px;
            height: 50px;
            margin-right: 5px;
        }
        .center {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            width: 100%;
        }
        .center img {
            width: 40px;
            height: 40px;
            visibility: visible;
            background: radial-gradient(circle, gold , white 80%);
            border-radius: 30px;
        }
        .drawLeft, .drawRight {
            width: 40px;
            height: 40px;
            display: none;
            font-weight: bold;
            padding-top: 20px;
        }
        .score {
            user-select: none;
            font-size: 30px;
        }
/******************************************************************************/
        .item-content {
            display: none;
            height: 290px;
            overflow-y: scroll;
            padding: 0 10px 0 30px;
            border-left: 1px solid #d1d1d1;
        }
        .more {
            border: 1px solid black;
            position: absolute;
            top: 0;
            left: 53%;
            cursor: pointer;
            background-color: white;
            border-radius: 10px;
            width: 50px;
            user-select: none;
            font-size: 25px;
        }
        .item-content-box {
            display: flex;
            width: auto;
        }
        .startTime, .endTime {
            width: 30%;
            height: auto;
            text-align: center;
            margin: 0;
            padding: 10px 0 0 0;
            font-size: 20px;
        }
        .fill {
            width: 40%;
        }

    </style>

    <div class="container">
        <div class="date-container">
                <p class="text">24/11</p>
        </div>
        <div class="item-container">
            <div class="game-container">
                <div class="left">
                    <img src="./images/player1.png" alt="playerOne">
                    <p>Player 1</p>
                </div>
                <div class="center">
                    <p class="drawLeft">DRAW</p>
                    <img class="winnerLeft" src="./images/winner.png" alt="winner-tag">
                    <p class="score">0 - 0</p>
                    <img class="winnerRight" src="./images/winner.png" alt="winner-tag">
                    <p class="drawRight">DRAW</p>
                </div>
                <div class="right">
                    <img src="./images/player2.png" alt="playerTwo">
                    <p>Player 2</p>
                </div>
            </div>
            <div class="item-content">
                <div class="item-content-box">
                    <p class="startTime">starting time</p>
                    <p class="fill"></p>
                    <p class="endTime">ending time</p>
                </div>
            </div>
        </div>
        <div class="button-container">
            <svg class="arrow-image"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
            <path
                d="M14.8285 12.0259L16.2427 13.4402L12 17.6828L7.7574 13.4402L9.17161 12.0259L11 13.8544V6.31724H13V13.8544L14.8285 12.0259Z"
                fill="currentColor"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.7782 19.7782C15.4824 24.0739 8.51759 24.0739 4.22183 19.7782C-0.0739417 15.4824 -0.0739417 8.51759 4.22183 4.22183C8.51759 -0.0739419 15.4824 -0.0739419 19.7782 4.22183C24.0739 8.51759 24.0739 15.4824 19.7782 19.7782ZM18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15076 5.63604 5.63604C9.15076 2.12132 14.8492 2.12132 18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.364Z"
                fill="currentColor"
            />
            </svg>
        </div>
    </div>
    <p class="more">more</p>
    
`;

class MatchComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));

    }

    connectedCallback() {
        const playerName1 = this.getAttribute("playerName1") || "Player 1";
        const playerName2 = this.getAttribute("playerName2") || "Player 2";
        const score1 = this.getAttribute("score1") || "0";
        const score2 = this.getAttribute("score2") || "0";

        const winnerLeft = this.shadow.querySelector(".winnerLeft");
        const winnerRight = this.shadow.querySelector(".winnerRight");
        const drawLeft = this.shadow.querySelector(".drawLeft");
        const drawRight = this.shadow.querySelector(".drawRight");
        const winningSide = this.getAttribute("whoWon");

        if (winningSide == "left") {
            winnerLeft.style.visibility = "visible";
            winnerRight.style.visibility = "hidden";
        }
        else if (winningSide == "right") {
            winnerLeft.style.visibility = "hidden";
            winnerRight.style.visibility = "visible";
        }
        else if (winningSide == "both") {
            winnerLeft.style.visibility = "hidden";
            winnerRight.style.visibility = "hidden";
            drawLeft.style.display = "block";
            drawRight.style.display = "block";
        }

        this.shadow.querySelector('.left p').innerText = playerName1;
        this.shadow.querySelector('.right p').innerText = playerName2;
        this.shadow.querySelector('.score').innerText = `${score1} - ${score2}`;

        this.setupEventListeners();
    }

    setupEventListeners() {
        const itemContent = this.shadow.querySelector(".item-content");
        const itemContainer = this.shadow.querySelector(".item-container");

        const arrowImage = this.shadow.querySelectorAll(".arrow-image");
        arrowImage.forEach((arrow) => {
            arrow.addEventListener("click", () => {

                if (itemContent.style.display == "block") {
                    itemContent.style.display = "none";
                    itemContainer.style.height = "60px";
                }
                else {
                    itemContent.style.display = "block";
                    itemContainer.style.height = "350px";
                    itemContent.style.borderTop = "1px dashed #d1d1d1";
                }

                arrow.classList.toggle("rotate");
            });
        });

        const more = this.shadow.querySelector(".more");
        more.addEventListener("click", () => {
            const scoreElement = document.createElement("single-score-comp");
            const itemContent = this.shadow.querySelector(".item-content");
            const itemContentBox = this.shadow.querySelector(".item-content-box");

            scoreElement.setAttribute("playerName1", this.getAttribute("playerName1") || "Player 1");
            scoreElement.setAttribute("playerName2", this.getAttribute("playerName2") || "Player 2");
            scoreElement.setAttribute("score1", this.getAttribute("score1") || "0");
            scoreElement.setAttribute("score2", this.getAttribute("score2") || "0");

            itemContent.insertBefore(scoreElement, itemContentBox.nextSibling);
        })
    }
}

customElements.define("match-comp", MatchComponent);