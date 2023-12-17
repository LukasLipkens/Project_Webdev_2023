//#region IMPORTS
import "../scorenbord/scorenbord.js"
//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <div id="gamesDiv"></div>
`

class comp extends HTMLElement
{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.shadow.append(template.content.cloneNode(true));
        
        this.gameUpdate;
        this.displayedGames = [];
    }
    connectedCallback(){
        this.socket = new WebSocket("ws://localhost:8080");
        this.socket.addEventListener("message", (e) => {
            const reader = new FileReader();
            reader.onload = ()=> {
                console.log(reader.result);
                let message = reader.result;
                if(message == "refresh"){
                    console.log("refreshing");
                    this.fetchLiveGames();
                }
            }
            reader.readAsText(e.data);

        });
        this.fetchLiveGames();
        
        console.log('Server started at ws://localhost:8080');
    }

    fetchLiveGames(){
        fetch('./test_php/getLiveGames.php',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            this.shadowRoot.querySelector("#gamesDiv").innerHTML = "";
            this.gameUpdate = data;
            this.gameUpdate.forEach(game => {
                this.addGame(game);
            });
        })
    }

    addGame(gameToAdd){//voegt de game toe als het id van de game nog niet bestaat
        let nieuwScorenbord = document.createElement("scorenbord-comp");
        nieuwScorenbord.setAttribute("id", `game-${gameToAdd["gameId"]}`);
        //console.log(this.gameUpdate);
        this.shadowRoot.querySelector("#gamesDiv").append(nieuwScorenbord);

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
    // updateGame(gameToUpdate){//update de game wanneer het id van de game al weergegeven wordt
    //     let game = this.shadowRoot.querySelector(`#game-${gameToUpdate["game"]}`);
    //     game.pointsT1.innerHTML = gameToUpdate.team1["points"];
    //     game.pointsT2.innerHTML = gameToUpdate.team2["points"];

    //     game.gameT1.innerHTML = gameToUpdate.team1["game"];
    //     game.gameT2.innerHTML = gameToUpdate.team2["game"];

    //     game.setsT1.innerHTML = gameToUpdate.team1["sets"];
    //     game.setsT2.innerHTML = gameToUpdate.team2["sets"];

    //     game.updateServe(1, gameToUpdate["serving"]);

    //     if(gameToUpdate.gameStatus == 0){
    //         game.remove();
    //     }

    // }
    putnames(game, gameToAdd){//zet de namen van de spelers in het scorenbord
        let namesTeam1 = gameToAdd["game"]["team1 names"].split(",");
        let namesTeam2 = gameToAdd["game"]["team2 names"].split(",");
        
        switch (namesTeam1.length){
            case 1:
                game.team1.innerHTML = `<h4>${namesTeam1[0]}</h4>`;
                break;
            case 2:
                game.team1.innerHTML = `<h4>${namesTeam1[0]}</h4><h4>${namesTeam1[1]}</h4>`;
                break;
        }
        switch (namesTeam2.length){
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