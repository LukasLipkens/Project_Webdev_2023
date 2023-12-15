//#region IMPORTS
import "../gameSetup/createGame.js" 
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

class comp extends HTMLElement
{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.shadow.append(template.content.cloneNode(true));
        
        this.creatGame = this.shadowRoot.querySelector("#createGameBtn");
        this.mainContainer = this.shadowRoot.querySelector("#startView");
        this.gameContainer = this.shadowRoot.querySelector("#gameView");

        this.formIsShown = false;
        }
        connectedCallback(){

            //create a websocket
            this.socket = new WebSocket("ws://localhost:8080");
            this.socket.addEventListener('open', function (event) {
                console.log('Connection opened');
            });

            this.gameId;
            this.players = [];
            this.creatGame.addEventListener("click", ()=>{
                if(!this.formIsShown){
                    this.showCreateGameForm(); 
                    this.formIsShown = true
                }

            });
            this.addEventListener("EndGameEvent", this.EndGameEvent);  
            this.addEventListener("createGameEvent", this.createGameEvent);
        }  

        showCreateGameForm(){
            let gameForm = document.createElement("create-comp");
            gameForm.setAttribute("id", "gameForm");
            this.mainContainer.append(gameForm);
        }

        createGameEvent(e){
            if(e.detail.length == 1){
                this.shadowRoot.querySelector("#gameForm").remove();
                this.formIsShown = false;
            }
            else{

                
                console.log(e.detail);

                //game aanmaken in de database
                fetch('./test_php/addGame.php', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                        this.gameId = +data;
                        console.log(this.gameId);

                        //hier maken we het veld voor een game aan
                        this.gameContainer.style.display = "block";
                        let scoreBoard = document.createElement("scorenbord-comp");
                        scoreBoard.setAttribute("type", "admin");
                        scoreBoard.setAttribute("gameId", `${this.gameId}`); //hier moet een game id worden aangemaakt
        
                        this.shadowRoot.querySelector("#gameForm").remove();
                        this.formIsShown = false;
        
                        this.mainContainer.style.display = "none";
        
                        
                        this.gameContainer.appendChild(scoreBoard);

                        //we steken de volgende functies hierin omdat we de gameId nodig hebben en deze niet direct ingeladen wordt
                        //namen in het component zetten
                        let bord = this.shadowRoot.querySelector("scorenbord-comp");
        
                        this.players = e.detail;
                        if(e.detail.length == 3){
                            bord.scoreObject.team1.players = [this.players[0]];
                            bord.team1.innerHTML = `<h4>${this.players[0].gebruikersnaam}</h4>`;
                            bord.scoreObject.team2.players = [this.players[2]];
                            bord.team2.innerHTML = `<h4>${this.players[2].gebruikersnaam}</h4>`;
        
                            //spelers toevoegen aan de game

                            fetch('./test_php/addPlayerToTeam.php?gameId='+this.gameId+'&teamId=1&spelerId='+this.players[0].id, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })
                            fetch('./test_php/addPlayerToTeam.php?gameId='+this.gameId+'&teamId=2&spelerId='+this.players[2].id, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })
                            .then(response => response.json())
                            .then(data => {
                                this.socket.send("refresh");
                            });
                        }
                        else{
                            bord.scoreObject.team1.players = [this.players[0], this.players[1]];
                            bord.team1.innerHTML = `<h4>${this.players[0]}</h4><h4>${this.players[1]}</h4>`;
                            bord.scoreObject.team2.players = [this.players[2], this.players[3]];
                            bord.team2.innerHTML = `<h4>${this.players[2].gebruikersnaam}</h4><h4>${this.players[3].gebruikersnaam}</h4>`;
        
                            let teamId;
                            for(let i = 0; i< this.players.length; i++){
                                if(i<2){
                                    teamId = 1;
                                }
                                else{
                                    teamId = 2;
                                }
                                fetch('./test_php/addPlayerToTeam.php?gameId='+this.gameId+'&teamId='+teamId+'&spelerId='+this.players[i].id, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                })
                                .then(response => response.json())
                                .then(data => {
                                    //console.log(data);
                                    this.socket.send("refresh");
                                })
                            }
        
                        }
                    },

                );





                
            }
        }
        EndGameEvent(){
            this.gameContainer.style.display = "none";
            this.mainContainer.style.display = "block";
            this.shadowRoot.querySelector("scorenbord-comp").remove();
            fetch('./test_php/endGame.php?gameId='+this.gameId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                this.socket.send("refresh");
            })
        }
}

customElements.define('mygames-comp', comp)