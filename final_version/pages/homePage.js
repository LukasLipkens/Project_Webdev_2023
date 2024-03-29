//#region IMPORTS
import "../scorenbord/scorenbord.js"
//#endregion IMPORTS

/*
    dit is de homepagina waar de live games op komen te staan

    da pagina wordt geupdate vanuit de app, die de functie update aanroept en de nieuwe data hieraan meegeeft
*/

const template = document.createElement("template")
template.innerHTML = /*html*/`

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        #homeContainer {
            border: 5px solid black;
            border-radius: 10px;
            width:80vw;
            height: 80vh;
            margin: auto;
            margin-top: 20px;
            padding-top: 10px;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: thin;
            background-color: #E0E0E0;
            user-select: none;
        }
        #title {
            font-family: 'Anton', sans-serif;
            font-weight: 500;
            font-size: 3rem;
            margin: 15px auto;
            text-align: center;
            text-decoration: underline;
        }
        #gamesDiv {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            max-width: 1200px;
            margin: auto;
        }
        #homeContainer::-webkit-scrollbar {
            width: 8px;
        }
        #homeContainer::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 5px;
        }
        #homeContainer::-webkit-scrollbar-track {
            background-color: #ddd;
            border-radius: 5px;
        }
    </style>

    <div id="homeContainer">
        <p id="title">Live Games</p>
        <div id="gamesDiv">
            <!-- The container for displaying match-line components -->
        </div>
    </div>
`

class comp extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));

        this.gamesDiv = this.shadowRoot.querySelector("#gamesDiv");

        this.displayedGames = [];
        this.newGames = [];
    }
    connectedCallback() {
        //het ophalen van de live games bij het openen van de website
        this.GetLiveGames("getLiveGames")
    }
    //haalt de live games op
    GetLiveGames(info) {
        this.dispatchEvent(new CustomEvent("getLiveGames", {
            bubbles: true,
            composed: true,
            detail: info
        }))
    }

    //deze functie wordt aangeroepen vanuit de app.js wanneer er een update is voor de home pagina
    //als er een update is wordt er gekeken of er games moeten toegevoegd, geupdated of verwijderd worden
    Update(gameupdate) {
        console.log(gameupdate);
        this.newGames = [];
        gameupdate.forEach(game => {

            this.newGames.push(game["gameId"])

            //kijk of game al weergegeven wordt
            //zo ja: update de game met de nieuwe data van de update
            //zo nee: voeg de game toe met addGame en voeg het id toe aan de array displayed games
            if (this.displayedGames.indexOf(game["gameId"]) == -1) {
                this.displayedGames.push(game["gameId"])

                this.addGame(game);
            }
            else {
                this.updateGame(game)
            }
        });

        //als er een game niet meer in de update zit mag hij verwijderd worden
        this.displayedGames.forEach(game => {
            if (this.newGames.indexOf(game) == -1) {
                this.displayedGames.pop(game);
                this.removeGame(game);
            }
        });
    }

    //voegt de game toe als het id van de game nog niet bestaat
    //hier wordt een nieuw score element aangemaakt, de juiste gegevens worden hier direct ingestopt
    addGame(gameToAdd) {
        let nieuwScorenbord = document.createElement("scorenbord-comp");
        nieuwScorenbord.setAttribute("id", `game-${gameToAdd["gameId"]}`);

        this.gamesDiv.append(nieuwScorenbord);

        let game = this.shadowRoot.querySelector(`#game-${gameToAdd["gameId"]}`);
        game.pointsT1.innerHTML = gameToAdd["game"]["team1 punten"];
        game.pointsT2.innerHTML = gameToAdd["game"]["team2 punten"];

        game.gameT1.innerHTML = gameToAdd["game"]["team1 games"];
        game.gameT2.innerHTML = gameToAdd["game"]["team2 games"];

        game.setsT1.innerHTML = gameToAdd["game"]["team1 sets"];
        game.setsT2.innerHTML = gameToAdd["game"]["team2 sets"];

        game.updateServe(1, gameToAdd["serving"]);

        this.putnames(game, gameToAdd);
    }

    //update de game wanneer het id van de game al weergegeven wordt
    updateGame(gameToUpdate) {
        let game = this.shadowRoot.querySelector(`#game-${gameToUpdate["gameId"]}`);
        game.pointsT1.innerHTML = gameToUpdate["game"]["team1 punten"];
        game.pointsT2.innerHTML = gameToUpdate["game"]["team2 punten"];

        game.gameT1.innerHTML = gameToUpdate["game"]["team1 games"];
        game.gameT2.innerHTML = gameToUpdate["game"]["team2 games"];

        game.setsT1.innerHTML = gameToUpdate["game"]["team1 sets"];
        game.setsT2.innerHTML = gameToUpdate["game"]["team2 sets"];

        game.updateServe(1, gameToUpdate["serving"]);
    }

    //verwijderd een game als hij niet meer in de nieuwe array zit
    removeGame(gameToRemove) {
        let game = this.shadowRoot.querySelector(`#game-${gameToRemove}`);
        console.log(game);
        game.remove();
    }

    //steld de namen van de spelers in op het juiste scorenbord bij het toevoegen
    putnames(game, gameToAdd) {
        let namesTeam1;
        let namesTeam2;
        console.log(gameToAdd);

        namesTeam1 = gameToAdd["game"]["team1 names"].split(",");
        namesTeam2 = gameToAdd["game"]["team2 names"].split(",");

        if (gameToAdd["game"]["team1 names"].indexOf(",") != -1) {
            namesTeam1 = gameToAdd["game"]["team1 names"].split(",");
            namesTeam2 = gameToAdd["game"]["team2 names"].split(",");
        } else {
            namesTeam1 = [gameToAdd["game"]["team1 names"]];
            namesTeam2 = [gameToAdd["game"]["team2 names"]];
        }

        switch (namesTeam1.length) {
            case 1:
                game.team1.innerHTML = `<h4>${namesTeam1[0]}</h4>`;
                break;
            case 2:
                game.team1.innerHTML = `<h4>${namesTeam1[0]}</h4><h4>${namesTeam1[1]}</h4>`;
                break;
        }
        switch (namesTeam2.length) {
            case 1:
                game.team2.innerHTML = `<h4>${namesTeam2[0]}</h4>`;
                break;
            case 2:
                game.team2.innerHTML = `<h4>${namesTeam2[0]}</h4><h4>${namesTeam2[1]}</h4>`;
                break;
        }
    }
}

customElements.define('home-comp', comp)