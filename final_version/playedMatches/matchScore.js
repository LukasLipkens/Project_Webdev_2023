//#region IMPORTS
import "../playedMatches/individualScore.js"
//#endregion IMPORTS

const template = document.createElement("template");
template.innerHTML = /*html*/ `
    <style>

        #container {
            display: flex;
            margin-bottom: 10px;
            user-select: none;
        }
        #date-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 13%;
            background-image: linear-gradient(to right, #E0E0E0 25%, white);
            padding-right: 10px;
            font-size: 25px;
            height: 63px;
            border-radius: 10px 0 0 10px;
            margin-left: 15px;
        }
        #item-container {
            border: 1px solid green;
            border-left: none;
            border-radius: 0 10px 0 0;
            width: 87%;
            background-color: white;
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
            border-radius: 50%;
            background-color: #E0E0E0;
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
            width: 30px;
            height: 30px;
            visibility: visible;
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
            border-left: 1px solid green;
            padding: auto;
            overflow-y: auto;
            scrollbar-width: thin;
        }
        #item-content::-webkit-scrollbar {
            width: 8px;
        }
        #item-content::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 5px;
        }
        #item-content::-webkit-scrollbar-track {
            background-color: #ddd;
            border-radius: 5px;
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
            border: 1px solid #d1d1d1;
            border-radius: 10px;
        }
        #item-content-box p:last-child {
            padding: 10px 20px;
            border: 1px solid #d1d1d1;
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

    // Methode verkregen bij aanmaak match-component in historyPage.js
    setMatchData(matchData) {
        this.scoresData = matchData;
        this.indiviData = this.scoresData.scoringData;
        this.gameId = this.scoresData.gameId;
        this.date = this.scoresData.date;
        this.startTime = this.scoresData.startTime;
        this.endTime = this.scoresData.endTime;
        this.player1 = this.scoresData.player1;
        this.player2 = this.scoresData.player2;
        this.score1 = this.scoresData.score1;
        this.score2 = this.scoresData.score2;

        this.editScoreAndPlayers();
        this.setupEventListeners();
        this.createScoreComponents();
    }

    connectedCallback() { }

    // Afhankelijk van ontvangen matchData wordt winner bepaald en gegevens ingevuld op desbetreffende locaties
    editScoreAndPlayers() {
        this.winnerLeft.style.visibility = 'hidden';
        this.winnerRight.style.visibility = 'hidden';
        this.drawLeft.style.display = 'none';
        this.drawRight.style.display = 'none';

        if (this.score1 > this.score2) {
            this.winnerLeft.style.visibility = 'visible';
        }
        else if (this.score2 > this.score1) {
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
        this.scores.innerHTML = `${this.score1} - ${this.score2}`;
    }

    // Eenmaal op arrow geklikt wordt er een event gestuurd naar boven (historyPage.js) samen met de gameId (om te vergelijken)
    setupEventListeners() {
        this.arrowImage.forEach((arrow) => {
            arrow.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('toggleContent', { detail: this.gameId, bubbles: true }));
            });
        });
    }

    // als expanded = true: wordt er een class 'expanded' toegevoegd en anders wordt deze verwijderd (op individuele match-component)
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

    // indiviData van matchData bevat de info voor single-score-componenten (individualScore.js) aan te maken bij elke match-componenten
    createScoreComponents() {
        this.indiviData.forEach((line) => {
            this.singleScoreComp = document.createElement('single-score-comp');

            this.singleScoreComp.setScoreData({
                gameId: this.gameId,
                player1: this.player1,
                player2: this.player2,
                setNr: line.setNr,
                team1Points: line["gamesT1"],
                team2Points: line["gamesT2"],
            });

            this.matchContent.append(this.singleScoreComp);
        });
    }
}

customElements.define('match-comp', MatchComponent);
