//#region IMPORTS
import "../gameSetup/createGame.js"
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

        this.creatGame = this.shadowRoot.querySelector("#createGameBtn");
        this.mainContainer = this.shadowRoot.querySelector("#startView");
        this.gameContainer = this.shadowRoot.querySelector("#gameView");
        this.myHistory = this.shadowRoot.querySelector("#myHistoryDiv");
        // this.addEventListener("EndGameEvent", this.EndGameEvent);
        this.formIsShown = false;
    }

    connectedCallback() {
        this.allGames = [];
        this.currentId = "";
        this.EndGameView = null;
        this.creatGame.addEventListener("click", () => { this.showCreateGameForm(); });
    }

    showCreateGameForm() {
        let gameForm = document.createElement("create-comp");
        gameForm.setAttribute("id", "gameForm");
        this.mainContainer.append(gameForm);
    }

    createGame(e, gameId) {
        if (e.length == 1) {
            this.shadowRoot.querySelector("#gameForm").remove();
            this.formIsShown = false;
        }
        else {
            //hier maken we het veld voor een game aan
            this.gameContainer.style.display = "block";
            let scoreBoard = document.createElement("scorenbord-comp");
            scoreBoard.setAttribute("type", "admin");
            scoreBoard.setAttribute("gameId", `${gameId}`); //hier moet een game id worden aangemaakt

            this.shadowRoot.querySelector("#gameForm").remove();
            this.formIsShown = false;

            this.mainContainer.style.display = "none";


            this.gameContainer.appendChild(scoreBoard);

            //we steken de volgende functies hierin omdat we de gameId nodig hebben en deze niet direct ingeladen wordt
            //namen in het component zetten
            let bord = this.shadowRoot.querySelector("scorenbord-comp");

            this.players = e;
            if (e.length == 3) {
                bord.scoreObject.team1.players = [this.players[0]];
                bord.team1.innerHTML = `<h4>${this.players[0].gebruikersnaam}</h4>`;
                bord.scoreObject.team2.players = [this.players[2]];
                bord.team2.innerHTML = `<h4>${this.players[2].gebruikersnaam}</h4>`;
            }
            else {
                bord.scoreObject.team1.players = [this.players[0], this.players[1]];
                bord.team1.innerHTML = `<h4>${this.players[0].gebruikersnaam}</h4><h4>${this.players[1].gebruikersnaam}</h4>`;
                bord.scoreObject.team2.players = [this.players[2], this.players[3]];
                bord.team2.innerHTML = `<h4>${this.players[2].gebruikersnaam}</h4><h4>${this.players[3].gebruikersnaam}</h4>`;
            }
        }
    }

    EndGame(data, gameId) {
        this.endGameView = document.createElement('endview-comp');
        this.allGames = data;
        this.currentId = gameId;

        this.gameInfo = this.allGames.find(game => game.gameId == this.currentId);
        if (this.gameInfo) {
            this.endGameView.setMatchInfo({
                gameId: this.gameInfo.gameId,
                date: this.gameInfo.date,
                startTime: this.gameInfo.starttijd,
                endTime: this.gameInfo.eindtijd,
                player1: this.gameInfo["team1 names"],
                player2: this.gameInfo["team2 names"],
                score1: this.gameInfo["team1 sets"],
                score2: this.gameInfo["team2 sets"],
                scoringData: this.gameInfo["points"],
            })
        }
        this.gameContainer.appendChild(this.endGameView);

        this.endGameView.addEventListener("backToMyGamesPage", () => {
            if (this.gameInfo) {
                let matchComponent = document.createElement('match-comp');
                matchComponent.setAttribute('id', this.gameInfo.gameId);

                matchComponent.setMatchData({
                    gameId: this.gameInfo.gameId,
                    date: this.gameInfo.date,
                    startTime: this.gameInfo.starttijd,
                    endTime: this.gameInfo.eindtijd,
                    player1: this.gameInfo["team1 names"],
                    player2: this.gameInfo["team2 names"],
                    score1: this.gameInfo["team1 sets"],
                    score2: this.gameInfo["team2 sets"],
                    scoringData: this.gameInfo["points"],
                });
                this.myHistory.appendChild(matchComponent);

                matchComponent.addEventListener('toggleContent', (event) => {
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
        if (gameId != null) {
            this.matchComponents = this.shadowRoot.querySelectorAll('match-comp');
            this.matchComponents.forEach((component) => {
                let componentId = component.getAttribute('id');
                console.log('componentId: ', componentId);
                if (componentId == gameId) {
                    component.toggle(true);
                } else {
                    component.toggle(false);
                }
            });
        }
        else {
            console.error("gameId is null!");
        }
    }
}

customElements.define('mygames-comp', comp)