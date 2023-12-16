//#region IMPORTS
import "../playedMatches/individualScore.js"
import { playingInfo } from '../playerData.js'
//#endregion IMPORTS

const template = document.createElement("template");
template.innerHTML = /*html*/ `
    <style>

        #container {
            display: flex;
            margin-bottom: 10px;
        }
        #date-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 10%;
            background-image: linear-gradient(to right, #d1d1d1 75%, white);
            padding-right: 10px;
            font-size: 25px;
            height: 63px;
            border-radius: 10px 0 0 10px;
            margin-left: 15px;
        }
        #item-container {
            border: 2px solid #d1d1d1;
            border-left: none;
            border-radius: 0 10px 0 0;
            width: 90%;
        }
        #text {
            color: black;
        }
        #game-container {
            display: flex;
            justify-content: space-evenly;
            width: 100%;
            height: 60px;
        }
        #button-container {
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
        #left, #right {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 60px;
            width: 100%;
        }
        #left img, #right img {
            width: 50px;
            height: 50px;
            margin-right: 5px;
        }
        #center {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            width: 100%;
        }
        #center img {
            width: 40px;
            height: 40px;
            visibility: visible;
            background: radial-gradient(circle, gold , white 80%);
            border-radius: 30px;
        }
        #drawLeft, #drawRight {
            width: 40px;
            height: 40px;
            display: none;
            font-weight: bold;
            padding-top: 20px;
        }
        #score {
            user-select: none;
            font-size: 30px;
        }
        #item-content {
            display: none;
            height: 250px;
            overflow-y: scroll;
            border-left: 1px solid #d1d1d1;
            padding: auto;
        }
        .expanded #item-content {
            display: block;
            border-top: 1px dashed #d1d1d1;
            padding: 0 auto;
        }
        #item-container.expanded {
            height: 350px;
        }
        .expanded .arrow-image {
            transform: rotate(180deg);
        }
        #item-content-box {
            display: flex;
            justify-content: space-evenly;
            width: auto;
        }
        #item-content-box p {
            margin: 0;
            margin-top: 10px;
        }
        #item-content-box p:first-child {
            padding: 10px 20px;
            border: 1px solid green;
            border-radius: 10px;
        }
        #item-content-box p:last-child {
            padding: 10px 20px;
            border: 1px solid green;
            border-radius: 10px;
        }
        #startTime, #endTime {
            width: 30%;
            height: auto;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
        }
        #fill {
            width: 40%;
        }

    </style>

    <div id="container">
        <div id="date-container">
            <p id="text"></p>
        </div>
        <div id="item-container">
            <div id="game-container">
                <div id="left">
                    <img src="./images/player1.png" alt="playerOne">
                    <p></p>
                </div>
                <div id="center">
                    <p id="drawLeft">DRAW</p>
                    <img id="winnerLeft" src="./images/winner.png" alt="winner-tag">
                    <p id="score"></p>
                    <img id="winnerRight" src="./images/winner.png" alt="winner-tag">
                    <p id="drawRight">DRAW</p>
                </div>
                <div id="right">
                    <img src="./images/player2.png" alt="playerTwo">
                    <p></p>
                </div>
            </div>
            <div id="item-content">
                <div id="item-content-box">
                    <p>STARTTIJD: <span id="startTime"></span></p>
                    <p id="fill"></p>
                    <p>EINDTIJD: <span id="endTime"></span></p>
                </div>
                <!-- container for displaying single-score-components -->
            </div>
        </div>
        <div id="button-container">
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
                fill="green"
            />
            </svg>
        </div>
    </div>
`;

class MatchComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));

        this.scoreData = playingInfo[0].scoringData;

        this.dateText = this.shadowRoot.querySelector('#text');
        this.startingTime = this.shadowRoot.querySelector('#startTime');
        this.endingTime = this.shadowRoot.querySelector('#endTime');

        this.winnerLeft = this.shadowRoot.querySelector('#winnerLeft');
        this.winnerRight = this.shadowRoot.querySelector('#winnerRight');
        this.drawLeft = this.shadowRoot.querySelector('#drawLeft');
        this.drawRight = this.shadowRoot.querySelector('#drawRight');
        this.leftPlayer = this.shadowRoot.querySelector('#left p');
        this.rightPlayer = this.shadowRoot.querySelector('#right p');
        this.scores = this.shadowRoot.querySelector('#score');

        this.arrowImage = this.shadowRoot.querySelectorAll('.arrow-image');
        this.container = this.shadowRoot.querySelector('#container');

        this.matchContent = this.shadowRoot.querySelector('#item-content');
    }

    connectedCallback() {
        this.getPlayerData();
        this.editScoreAndPlayers();
        this.setupEventListeners();
        this.createScoreComponents();
    }

    getPlayerData() {
        this.gameId = this.getAttribute('id');
        this.date = this.getAttribute('date');
        this.startTime = this.getAttribute('startTime');
        this.endTime = this.getAttribute('endTime');
        this.player1 = this.getAttribute('playerName1');
        this.player2 = this.getAttribute('playerName2');
        this.player1Score = this.getAttribute('score1');
        this.player2Score = this.getAttribute('score2');
    }

    editScoreAndPlayers() {
        this.winnerLeft.style.visibility = 'hidden';
        this.winnerRight.style.visibility = 'hidden';
        this.drawLeft.style.display = 'none';
        this.drawRight.style.display = 'none';

        if (this.player1Score > this.player2Score) {
            this.winnerLeft.style.visibility = 'visible';
        }
        else if (this.player2Score > this.player1Score) {
            this.winnerRight.style.visibility = 'visible';
        }
        else {
            this.drawLeft.style.display = 'block';
            this.drawRight.style.display = 'block';
        }

        this.dateText.innerHTML = this.date;
        this.startingTime.innerHTML = this.startTime;
        this.endingTime.innerHTML = this.endTime;
        this.leftPlayer.innerHTML = this.player1;
        this.rightPlayer.innerHTML = this.player2;
        this.scores.innerHTML = `${this.player1Score} - ${this.player2Score}`;
    }

    setupEventListeners() {
        this.arrowImage.forEach((arrow) => {
            arrow.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('toggleContent', { detail: this.gameId, bubbles: true }));
            });
        });
    }

    toggle(expanded) {
        if (expanded) {
            if (this.container.classList.contains('expanded')) {
                this.container.classList.remove('expanded');
            }
            else {
                this.container.classList.add('expanded');
            }
        }
        else {
            this.container.classList.remove('expanded');
        }
    }

    createScoreComponents() {
        this.scoreData.forEach((line) => {
            if (line.gameId == this.gameId) {
                this.singleScoreComp = document.createElement('single-score-comp');

                // this.singleScoreComp.setAttribute('id', this.gameId);
                // this.singleScoreComp.setAttribute('playerName1', this.player1);
                // this.singleScoreComp.setAttribute('playerName2', this.player2);

                // this.singleScoreComp.setAttribute('setNr', line.setNr);
                // this.singleScoreComp.setAttribute('team1Points', line.team1Points);
                // this.singleScoreComp.setAttribute('team2Points', line.team2Points);

                this.singleScoreComp.setScoreData({
                    gameId: this.gameId,
                    player1: this.player1,
                    player2: this.player2,
                    setNr: line.setNr,
                    team1Points: line.team1Points,
                    team2Points: line.team2Points,
                });

                this.matchContent.append(this.singleScoreComp);
            };
        });
    }
}

customElements.define('match-comp', MatchComponent);
