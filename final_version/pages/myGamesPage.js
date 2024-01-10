//#region IMPORTS
import "../gameSetup/createGame.js"
import "../playedMatches/matchScore.js"
import "../playedMatches/matchScore.js";
import "../gameSetup/endGameView.js"
//#endregion IMPORTS

/*
    dit is de pagina waar je persoonlijke games op komen te staan
    ook kan je hier een nieuwe game aanmaken
*/

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
        #myGamesContainer{
            position: relative;
            border-radius: 10px;
            width: 80vw;
            height: 80vh;
            margin: auto;
            margin-top: 20px;
            border: 5px solid black;
            background-color: #E0E0E0;
        }
        #startView {
            position: relative;
            height: 90%;
        }
        #welcomeDiv {
            font-family: 'Anton', sans-serif;
            font-weight: 500;
            text-decoration: underline;
            font-size: 3rem;
            margin: auto;
            margin-top: 10px;
            width: max-content;
            margin-bottom: 0;
            padding: 0;
        }
        #welcomeDiv p{
            margin: 10px 0;
        }
        #welcomeDiv span{
            color: green;
        }
        #myHistoryDiv {
            overflow-y: scroll;
            max-height: 70%;
        }
        #myHistoryDiv::-webkit-scrollbar {
            width: 8px;
        }
        #myHistoryDiv::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 5px;
        }
        #myHistoryDiv::-webkit-scrollbar-track {
            background-color: #ddd;
            border-radius: 5px;
        }
        #createGameDiv{
            text-align: center;
        }

        /*begin createGameButton*/
        button {
            cursor: pointer;
            font-weight: 700;
            font-family: Helvetica,"sans-serif";
            transition: all .2s;
            padding: 10px 20px;
            border-radius: 100px;
            background: rgb(1, 184, 90);
            border: 1px solid transparent;
            display: flex;
            align-items: center;
            font-size: 15px;
            margin: auto;
            transition: all .2s;
        }

        button:hover {
            color: #ddd;
            background: #006400;
            transition: all .2s;
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
            transform: translate(-50%, -20%);
            top: 10%;
            left: 50%;
            z-index: 2;
            max-height: 80vh;
            overflow-y: scroll;
        }
        #gameForm::-webkit-scrollbar {
            width: 8px;
        }
        #gameForm::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 5px;
        }
        #gameForm::-webkit-scrollbar-track {
            background-color: #ddd;
            border-radius: 5px;
        }
        #pagination {
            list-style: none;
            display: flex;
            gap: 10px;
            margin-top: 10px;
            justify-content: flex-end;
            padding-right: 80px;
        }
        #pagination li {
            font-size: 18px;
            font-weight: bold;
            padding: 5px 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            cursor: pointer;
            z-index: 2;
            background-color: white;
        }
        #pagination li.active {
            box-shadow: inset 0 0 2px green;
            color: green;
        }
        endview-comp {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        #gameView {
            max-height: 100%;
        }

    </style>
    <div id="myGamesContainer">
        <div id="startView">
            <div id="welcomeDiv">
                <p>Welcome <span id="playerName">player</span></p>
            </div>
            <div id="myHistoryDiv">
        	    <!--<legend>History<legend>-->
            </div>
            <ul id="pagination"></ul>
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

class MyGamesComp extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));

        this.creatGame = this.shadowRoot.querySelector("#createGameBtn");
        this.mainContainer = this.shadowRoot.querySelector("#startView");
        this.gameContainer = this.shadowRoot.querySelector("#gameView");
        this.myHistory = this.shadowRoot.querySelector("#myHistoryDiv");
        this.pagination = this.shadowRoot.querySelector('#pagination');

        this.formIsShown = false;
    }

    connectedCallback() {
        this.currentPage = 1;
        this.itemsPerPage = 4;

        this.allGames = [];
        this.currentId = "";
        this.EndGameView = null;

        this.creatGame.addEventListener("click", () => { this.showCreateGameForm(); });
    }
    //laat het create game formulier zien
    showCreateGameForm() {
        let gameForm = document.createElement("create-comp");
        gameForm.setAttribute("id", "gameForm");
        this.mainContainer.append(gameForm);
    }

    //als er op create game gedrukt wordt moet alleen nog die game weergegeven worden op de pagina
    //als er op cancel geklikt wordt moet het formuliertje van het scherm gehaald worden
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
            this.pagination.style.display = "none";
        }
    }
    Update(games) {
        //console.log("update");
        this.allGames = games;

        this.ShowPage();
        this.RenderPagination();
    }

    // Toont de pagina met de bijhorende match-componenten
    ShowPage() {
        this.totalPages = Math.ceil(this.allGames.length / this.itemsPerPage);

        let displayGames = this.allGames.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        this.myHistory.innerHTML = "";

        for (let game of displayGames) {
            let matchComponent = document.createElement('match-comp');
            matchComponent.setAttribute('id', game.gameId);
            console.log(game);
            matchComponent.setMatchData({
                gameId: game.gameId,
                date: game.date,
                startTime: game.starttijd,
                endTime: game.eindtijd,
                team1: game["team1 names"],
                team2: game["team2 names"],
                score1: game["team1 sets"],
                score2: game["team2 sets"],
                scoringData: game["points"],
            });
            this.myHistory.append(matchComponent);

            matchComponent.addEventListener('toggleContent', (event) => {
                this.toggleMatchComp(event.detail);
            });
        }
    }

    // Eenmaal verstuurde event opgevangen gaat er gezocht worden naar de corresponderende match-component uit de reeks getoonde componenten
    // De toggle methode gaat in de matchScore.js van elke componenten uitgevoerd worden
    toggleMatchComp(gameId) {
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

    // De knoppen voor de pagina's worden aangemaakt
    // Voor elke knop wordt er een event voorzien die dan de match-componenten voor de volgende geselecteerde gaat tonen
    RenderPagination() {
        this.pagination.innerHTML = "";

        this.startPage = Math.max(1, this.currentPage - 1);
        this.endPage = Math.min(this.totalPages, this.startPage + 2);

        if (this.currentPage > 1) {
            this.createPaginationButton("Previous", this.currentPage - 1);
        }

        for (let i = this.startPage; i <= this.endPage; i++) {
            this.createPaginationButton(i, i);
        }

        if (this.currentPage < this.totalPages) {
            this.createPaginationButton("Next", this.currentPage + 1);
        }
    }

    // De knoppen worden aangemaakt en toegevoegd, evenals een event
    createPaginationButton(label, pageNumber) {
        const pageItem = document.createElement('li');
        pageItem.textContent = label;
        this.pagination.appendChild(pageItem);

        if (label === this.currentPage || (label === "Previous" && this.currentPage === pageNumber - 1) || (label === "Next" && this.currentPage === pageNumber + 1)) {
            pageItem.classList.add('active');
        }

        pageItem.addEventListener('click', () => {
            this.changePage(pageNumber);
        });
    }

    // Gaat alles resetten en herberekenen voor de volgende geklikte pagina
    changePage(pageNumber) {
        this.currentPage = pageNumber;
        this.ShowPage();
        this.RenderPagination();
    }

    // Methode afkomstig van app.js met de data van (recent) beëindigde game
    // endview-comp wordt aangemaakt en gegevens worden verstuurd naar endGameView.js via setMatchInfo
    EndGame(data, gameId) {
        this.endGameView = document.createElement('endview-comp');
        this.allGames = data;
        this.currentId = gameId;
        this.gameContainer.appendChild(this.endGameView);
        this.endGameView = this.shadowRoot.querySelector('endview-comp');
        this.gameInfo = this.allGames.find(game => game.gameId == this.currentId);
        if (this.gameInfo) {
            this.endGameView.setMatchInfo({
                gameId: this.gameInfo.gameId,
                date: this.gameInfo.date,
                startTime: this.gameInfo.starttijd,
                endTime: this.gameInfo.eindtijd,
                team1: this.gameInfo["team1 names"],
                team2: this.gameInfo["team2 names"],
                score1: this.gameInfo["team1 sets"],
                score2: this.gameInfo["team2 sets"],
                scoringData: this.gameInfo["points"],
            })
        }

        // De terug knop op endGameView.js gaat een event uitsturen waarop deze eventListener gaat reageren
        this.endGameView.addEventListener("backToMyGamesPage", () => {
            if (this.gameInfo) {
                this.gameContainer.style.display = "none";
                this.mainContainer.style.display = "block";
                this.shadowRoot.querySelector("scorenbord-comp").remove();
                this.endGameView.remove();
                this.pagination.style.display = "flex";
            }
        });
    }
}

customElements.define('mygames-comp', MyGamesComp)