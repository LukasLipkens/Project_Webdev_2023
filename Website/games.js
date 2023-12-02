//#region IMPORTS
import "./scorenbord/scoreBord.js";
//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
        #myGamesContainer{
            border: 2px solid black;
            border-radius: 10px;
            width: 1200px;
            margin: auto;
            margin-top: 20px;
            min-height: 300px;
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

class app extends HTMLElement
{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"}); // zorgt ervoor dart het component een afgeschermde stijl kan hebben
        shadow.append(template.content.cloneNode(true));
        this.container = this.shadowRoot.querySelector("#myGamesContainer");

        this.playerData = 
        {
            firstName: "",
            lastName: "",
            playerID: 0
        }

        this.created = false;
    }

    connectedCallback(){
        //get login data of player (currently hardcoded)
        this.playerData.firstName = "player";
        this.playerData.lastName = "lastnamePlayer";
        this.playerData.playerID = 0;

        //set player name
        this.shadowRoot.querySelector("#playerName").innerHTML = this.playerData["firstName"];

        //create new game on click of create game btn
        this.shadowRoot.querySelector("#createGameBtn").addEventListener("click", ()=>{
            this.createGame();
        })
    }

    createGame(){
        // console.log("creating new game");

        

        let matchID = 123;
        let team1 = `${this.playerData["firstName"]},hamza`;
        let team2 = "niels,thomas";
        /*hier moet nog een formulier komen dat de teams invuld*/
        /*ook moet er nog een match id aangemaakt worden*/
        /*dit moet allemaal ook naar de server verstuurd worden, idk of dat hier al moet of pas bij het createn van de game */

        if(!this.created){
            this.created = true;
            this.addGame(matchID, team1, team2);
        }
    }

    addGame(matchID, team1, team2){

            let scoreBord = document.createElement(`score-comp`);
            scoreBord.setAttribute("id", `scoreboard_${matchID}`);
            scoreBord.setAttribute("type", "admin");
            scoreBord.setAttribute("team1", team1);
            scoreBord.setAttribute("team2", team2);
            this.container.append(scoreBord);
    }

}

customElements.define('mygames-comp', app);