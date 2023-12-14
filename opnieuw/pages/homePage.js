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
        // Call the function immediately to fetch the live games
this.fetchLiveGames();

// We gebruiken hier bind om de this van de functie te binden aan de this van de class
setInterval(this.fetchLiveGames.bind(this), 5000);
    }
    static get observedAttributes() {
        return ['update'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // Triggered when the observed attribute changes
        // if(name === "update"){
        //     if(newValue == "1"){
        //         console.log(this.gameUpdate);
                
        //         this.gameUpdate.forEach(game => {
        //             if(this.displayedGames.indexOf(game["game"]) == -1){
        //                 this.displayedGames.push(game["game"])
    
        //                 this.addGame(game);
    
        //             }
        //             else{
        //                 this.updateGame(game)
        //             }
        //         });

        //         this.setAttribute("update", "0");
        //     }
        // }
    }

    fetchLiveGames(){
        $.ajax({
            url: './test_php/getLiveGames.php',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                this.shadowRoot.querySelector("#gamesDiv").innerHTML = "";
                this.gameUpdate = data;
                this.gameUpdate.forEach(game => {
                    // if(this.displayedGames.indexOf(game["gameId"]) == -1){
                    //     this.displayedGames.push(game["gameId"])

                    //     this.addGame(game);

                    // }
                    // else{
                    //     this.updateGame(game)
                    // }
                    //console.log(game);
                    this.addGame(game);
                });
            }
        });
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
        // if(gameToAdd .team1.players.length == 1){
        //     game.team1.innerHTML = `<h4>${gameToAdd.team1.players[0]}</h4>`;
        //     game.team2.innerHTML = `<h4>${gameToAdd.team2.players[0]}</h4>`;
        // }
        // else{
        //     game.team1.innerHTML = `<h4>${gameToAdd.team1.players[0]}</h4><h4>${gameToAdd.team1.players[1]}</h4>`;
        //     game.team2.innerHTML = `<h4>${gameToAdd.team2.players[0]}</h4><h4>${gameToAdd.team2.players[1]}</h4>`;
        // }
        game.team1.innerHTML = `<h5>${gameToAdd["game"]["team1 names"]}</h5>`;
        game.team2.innerHTML = `<h5>${gameToAdd["game"]["team2 names"]}</h5>`;
    }
}

customElements.define('home-comp', comp)