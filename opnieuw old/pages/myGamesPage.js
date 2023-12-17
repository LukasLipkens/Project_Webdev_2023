//#region IMPORTS
import "../gameSetup/createGame.js"
import { playingInfo } from "../playerData.js";
import "../playedMatches/matchScore.js"
import "../gameSetup/endGameView.js"
//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <!--<scorenbord-comp type="admin" gameId="2023120301"></scorenbord-comp>-->
    <style>
        #myGamesContainer{
            /*border: 2px solid black;*/
            border-radius: 10px;
            width: 1200px;
            margin: auto;
            margin-top: 20px;
            min-height: 300px;
            position: relative;
        }
        #welcomeDiv{
            margin: auto;
            width: max-content;
            border-bottom: 2px solid black;
            margin-bottom: 25px;
        }
        #myHistoryDiv{
            min-height: 200px;
            max-height: 500px;
            width: 95%;
            margin: auto;
            border: 2px solid black;
            border-radius: 10px
        }
        #myHistoryDiv legend{
            font-size: 2em;
            margin: auto;
            padding: 10px 0;
        }

        #createGameDiv{
            margin: 25px 0px 25px 0px; 
        }

        /*begin createGameButton*/
        button {
            cursor: pointer;
            font-weight: 700;
            font-family: Helvetica,"sans-serif";
            transition: all .2s;
            padding: 10px 20px;
            border-radius: 100px;
            background: #cfef00;
            border: 1px solid transparent;
            display: flex;
            align-items: center;
            font-size: 15px;
            margin: auto;
        }

        button:hover {
            background: #c4e201;
        }

        button > svg {
            width: 34px;
            margin-left: 10px;
            transition: transform .3s ease-in-out;
        }

        button:hover svg {
            transform: translateX(5px);
        }
        /*einde ceateGameButton*/
        #gameForm{
            position: absolute;
            transform: translate(-50%, -0%);
            top: 20%;
            left: 50%;
        }
        #gameView {
            text-align: center;
            border: 2px solid blue;
        }
    </style>
    <div id="myGamesContainer">
        <div id="startView">
            <div id="welcomeDiv">
                <h1>Welcome <span id="playerName">player</span></h1>
            </div>
            <fieldset id="myHistoryDiv">
        	    <legend>History<legend>
            </fieldset>
            <div id="createGameDiv">
                <button id="createGameBtn">
                    <span>Create game</span>
                        <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                            <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                    </svg>
                </button>
            </div>
        </div>
        <div id="gameView">

        </div>
    </div>
`

class comp extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));

        this.allGames = playingInfo[0].fieldData;
        this.currentId = "";
        this.EndGameView = null;

        this.myHistory = this.shadowRoot.querySelector("#myHistoryDiv");
        this.creatGame = this.shadowRoot.querySelector("#createGameBtn");
        this.mainContainer = this.shadowRoot.querySelector("#startView");
        this.gameContainer = this.shadowRoot.querySelector("#gameView");

        this.formIsShown = false;
    }

    connectedCallback() {
        this.creatGame.addEventListener("click", () => {
            if (!this.formIsShown) {
                this.showCreateGameForm();
                this.formIsShown = true
            }

        });
        this.addEventListener("EndGameEvent", this.EndGameEvent);
        this.addEventListener("createGameEvent", this.createGameEvent);
    }

    showCreateGameForm() {
        let gameForm = document.createElement("create-comp");
        gameForm.setAttribute("id", "gameForm");
        this.mainContainer.append(gameForm);
    }

    createGameEvent(e) {
        if (e.detail.length == 1) {
            this.shadowRoot.querySelector("#gameForm").remove();
            this.formIsShown = false;
        }
        else {
            this.gameContainer.style.display = "block";
            let scoreBoard = document.createElement("scorenbord-comp");
            scoreBoard.setAttribute("type", "admin");
            scoreBoard.setAttribute("gameId", "5"); //hier moet een game id worden aangemaakt
            this.currentId = scoreBoard.getAttribute("gameId");

            this.shadowRoot.querySelector("#gameForm").remove();
            this.formIsShown = false;

            this.mainContainer.style.display = "none";


            this.gameContainer.appendChild(scoreBoard);

            //namen in het component zetten
            let bord = this.shadowRoot.querySelector("scorenbord-comp");
            if (e.detail.length == 2) {
                bord.scoreObject.team1.players = [e.detail[0]];
                bord.team1.innerHTML = `<h4>${e.detail[0]}</h4>`;
                bord.scoreObject.team2.players = [e.detail[1]];
                bord.team2.innerHTML = `<h4>${e.detail[1]}</h4>`;
            }
            else {
                bord.scoreObject.team1.players = [e.detail[0], e.detail[1]];
                bord.team1.innerHTML = `<h4>${e.detail[0]}</h4><h4>${e.detail[1]}</h4>`;
                bord.scoreObject.team2.players = [e.detail[2], e.detail[3]];
                bord.team2.innerHTML = `<h4>${e.detail[2]}</h4><h4>${e.detail[3]}</h4>`;

            }

        }
    }

    EndGameEvent(e) {
        this.endGameView = document.createElement('endview-comp');
        this.gameInfo = this.allGames.find(game => game.gameId == this.currentId);
        if (this.gameInfo) {
            this.endGameView.setMatchInfo({
                date: this.gameInfo.date,
                startTime: this.gameInfo.startTime,
                endTime: this.gameInfo.endTime,
                playerName1: this.gameInfo.player1,
                playerName2: this.gameInfo.player2,
                score1: this.gameInfo.player1Score,
                score2: this.gameInfo.player2Score
            })
        }
        this.gameContainer.appendChild(this.endGameView);

        this.endGameView.addEventListener("backToMyGamesPage", () => {
            if (this.gameInfo) {
                this.matchComponent = document.createElement('match-comp');

                this.matchComponent.setAttribute('id', this.gameInfo.gameId);
                this.matchComponent.setAttribute('date', this.gameInfo.date);
                this.matchComponent.setAttribute('startTime', this.gameInfo.startTime);
                this.matchComponent.setAttribute('endTime', this.gameInfo.endTime);
                this.matchComponent.setAttribute('playerName1', this.gameInfo.player1);
                this.matchComponent.setAttribute('playerName2', this.gameInfo.player2);
                this.matchComponent.setAttribute('score1', this.gameInfo.player1Score);
                this.matchComponent.setAttribute('score2', this.gameInfo.player2Score);
                this.myHistory.appendChild(this.matchComponent);

                this.matchComponent.addEventListener('toggleContent', (event) => {
                    this.toggleMatchComp(event.detail);
                });
            }

            this.gameContainer.style.display = "none";
            this.mainContainer.style.display = "block";
            this.shadowRoot.querySelector("scorenbord-comp").remove();
            this.endGameView.remove();
        });
    }

    toggleMatchComp(gameId) {
        this.matchComponents = this.shadowRoot.querySelectorAll('match-comp');
        this.matchComponents.forEach((component) => {
            let componentId = component.getAttribute('id');
            if (componentId === gameId) {
                component.toggle(true);
            } else {
                component.toggle(false);
            }
        });
    }
}

customElements.define('mygames-comp', comp)