//#region IMPORTS
import "./scoreButtons.js"
import "./endgameButton.js"
//#endregion IMPORTS

/*
    dit is het scorenbord dat gebruikt word om de scoren te laten zien op de homepagina
    als ook om de scoren te updaten via de mygames pagina

    de scoren wordt hier ook berekenden doorgestuurt naar de app wanneer er iets veranderd
*/

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
        .team1 { grid-area: team1; position: relative;}
        .team2 { grid-area: team2; position: relative;}

        .pointsT1 { grid-area: pointsT1; }
        .pointsT2 { grid-area: pointsT2; }

        .gameT1 { grid-area: gameT1; }
        .gameT2 { grid-area: gameT2; }

        .setsT1 { grid-area: setsT1; }
        .setsT2 { grid-area: setsT2; }

        .serveT1 { grid-area: serveT1; }
        .serveT2 { grid-area: serveT2; }


        .grid-container {
            display: grid;
            grid-template-areas:
                'team1 team1 team1 team1 team2 team2 team2 team2'
                'pointsT1 pointsT1 gameT1 gameT1 gameT2 gameT2 pointsT2 pointsT2'
                'pointsT1 pointsT1 setsT1 setsT1 setsT2 setsT2 pointsT2 pointsT2'
                'serveT1 serveT1 serveT1 serveT1 serveT2 serveT2 serveT2 serveT2';
            gap: 4px;
            background-color: rgb(255, 255, 255);
            padding: 4px;
            border: 5px solid black;
            border-radius: 5px;
            width: 100%;
            margin: auto;
            margin-top: 5px;
            margin-bottom: 5px;
        }

        .grid-container > div {
            background-color: rgb(1, 184, 90);
            text-align: center;
            padding: 20px 0;
            font-size: 30px;
            
        }
        .scoreBoard{
            min-width: 70%;
            max-width: 80%;
            margin: auto;
        }
        .content{
            border-radius: 20px;
            margin: 10px;
        }
        scorebtn-comp{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 15%;
            position: relative;
        }
        .centerDiv{
            margin: center;
            width: 100%;
            display: flex;
        }
        .serveBall{
            width: 25px;
            position: absolute;
            transform: translate(120%, -45%);
            right: 0;
            top: 50%;
            display: none;
        }
        .serveT1 p, .serveT2 p{
            position: relative;
            width: fit-content;
            margin: auto;
        }
        p, h4{
            margin: 0;

        }
        .bottomDiv{
            margin: 10px;
        }
        .score{
            height: 100%;
            position: relative;

        }
        .score p{
            margin: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .value{
            font-size: 1.5em;
            color: yellow;

        }
        .players{
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            width: 100%;
        }
        .bottomDiv{
            width: max-content;
            margin: auto;
        }
    </style>
    <div class="scoreBoard">
        <div class="content">
            <div class="centerDiv">

                <div class="grid-container">
                    <div class="team1">
                        <div class="players"></div>
                        <br>
                    </div>
                    <div class="team2">
                        <div class="players"></div>
                    </div>

                    <div class="pointsT1"><div class="score"><p>points<br><span class="value">0</span></p></div></div>
                    <div class="pointsT2"><div class="score"><p>points<br><span class="value">0</span></p></div></div>

                    <div class="gameT1"><p>game<br><span class="value">0</span></p></div>  
                    <div class="gameT2"><p>game<br><span class="value">0</span></p></div>  

                    <div class="setsT1"><p>sets<br><span class="value">0</span></p></div>
                    <div class="setsT2"><p>sets<br><span class="value">0</span></p></div>

                    <div class="serveT1"><p>serve:<img id="ballT1" class="serveBall" src="./images/logo.svg" alt="tennisBall"></p></div>
                    <div class="serveT2"><p>serve:<img id="ballT2" class="serveBall" src="./images/logo.svg" alt="tennisBall"></p></div>

                </div>

            </div>
            <div class="bottomDiv"></div>
        </div>
    </div>
    `

class comp extends HTMLElement
{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.shadow.append(template.content.cloneNode(true));
        
        //#region elements
        this.board = this.shadowRoot.querySelector(".centerDiv");
        this.endgame = this.shadowRoot.querySelector(".bottomDiv");

        this.pointsT1 = this.shadowRoot.querySelector(".pointsT1 span");
        this.pointsT2 = this.shadowRoot.querySelector(".pointsT2 span");

        this.gameT1 = this.shadowRoot.querySelector(".gameT1 span");
        this.gameT2 = this.shadowRoot.querySelector(".gameT2 span");

        this.setsT1 = this.shadowRoot.querySelector(".setsT1 span");
        this.setsT2 = this.shadowRoot.querySelector(".setsT2 span");

        this.team1 = this.shadowRoot.querySelector(".team1 .players");
        this.team2 = this.shadowRoot.querySelector(".team2 .players");
        //#endregion elements
        
        //#region global value's
        this.hasWinner = false;
        this.pointsArray = ["0","15","30","40","ADV"];
        this.serving = "";

        this.scoreObject = {
            game: 0,
            gameStatus: 1, //1 = ongoing, 0 is einde
            team1: {
                players: [],
                points: 0,
                game: 0,
                sets: 0,
            },
            team2: {
                players: [],
                points: 0,
                game: 0,
                sets: 0,
            },
            serving: 0,
        }
        //#endregion global value's

    }

    connectedCallback(){
        this.setNr = 1;
        this.type = this.getAttribute("type");

        if(this.type == "admin"){
            this.UpdateToAdmin();
        }
        this.scoreObject.game = this.getAttribute("gameId");

        //put players into object
        
        this.addEventListener("UpdateScoreEvent", this.UpdateScoreEvent);  

    }

    UpdateGame(info){ //wordt getriggerd wanneer de scoren geupdate wordt
        this.dispatchEvent(new CustomEvent("updateGame", {
            bubbles: true,
            composed: true,
            detail: info
        }))
    }

    //wordt getriggerd wanneer er een set is gewonnen
    AddGameSet(info){
        this.dispatchEvent(new CustomEvent("addGameSet", {
            bubbles: true,
            composed: true,
            detail: info
        }))
    }

//#region PuntenTelling
    UpdateScoreEvent(e){
        //console.log("btnPress Received " + e.detail);
        this.UpdateScore(e.detail);
    }
    UpdateScore(info){
        let action = info[0];
        let player = info[1];

        /*begin spel*/
        this.point(action, player);
        /*einde spel*/

        this.UpdateGame(this.scoreObject);
    }
    //de punten van het spel
    point(action, team){
        let T1 = this.pointsT1.innerHTML;
        let T2 = this.pointsT2.innerHTML;

        if(action == "min"){
            switch(team){
                case "T_1":
                    if(T1 != 0)
                    this.pointsT1.innerHTML = this.pointsArray[this.pointsArray.indexOf(T1) - 1];
                    break;
                case "T_2":
                    if(T2 != 0)
                    this.pointsT2.innerHTML = this.pointsArray[this.pointsArray.indexOf(T2) - 1];
                    break;

            }
        }
        else{
            let updateTo = "-1";
            if(T1 == "40" || T2 == "40"){
                if(T1 == "40" && team == "T_1" && T2 != 40 && T2 != "ADV"){
                    //als team 1: 40 heeft EN scoort EN team 2 heeft geen 40 EN geen ADV: team 1 wint de game 
                    //console.log("case 1");
                    this.game(team);
                    return;
                }
                if(T2 == "40" && team == "T_2" && T1 != 40 && T1 != "ADV"){
                    //als team 2: 40 heeft EN scoort EN team 1 heeft geen 40 EN geen ADV: team 2 wint de game 
                    //console.log("case 2");
                    this.game(team);
                    return;
                }
                if(T1 == "40" && T2 == "40"){
                    //als team 1 40 heeft EN team 2 40 heeft: team met punt krijgt ADV
                    //console.log("case 3");
                }
                
            }

            if(T1 == "ADV" || T2 == "ADV"){
                if(team == "T_1" && T1 == "ADV"){
                    //team 1 scoort heeft voordeel: team 1 wint de game
                    //console.log("case 4");
                    this.game(team);
                    return;
                }
                if(team == "T_2" && T2 == "ADV"){
                    //team 2 scoort heeft voordeel: team 2 wint de game
                    //console.log("case 5");
                    this.game(team);
                    return;
                }
                if(team == "T_2" && T1 == "ADV" || team == "T_1" && T2 == "ADV"){
                    // een team heeft voordeel, het ander team scoort: terug naar 40-gelijk
                    //console.log("case 6");
                    updateTo = "40-gelijk"

                    //zet bijde teams terug op 40
                    this.pointsT1.innerHTML = this.pointsArray[this.pointsArray.indexOf("40")];
                    this.pointsT2.innerHTML = this.pointsArray[this.pointsArray.indexOf("40")];
                }
            }

            if(updateTo == "-1"){
                //console.log(updateTo)
                switch(team){
                    case "T_1":
                        this.scoreObject.team1.points = +this.pointsArray[this.pointsArray.indexOf(T1) + 1];
                        this.pointsT1.innerHTML = this.pointsArray[this.pointsArray.indexOf(T1) + 1];
                        break;
                    case "T_2":
                        this.scoreObject.team2.points = +this.pointsArray[this.pointsArray.indexOf(T2) + 1];
                        this.pointsT2.innerHTML = this.pointsArray[this.pointsArray.indexOf(T2) + 1];
                        break;
                }
            }
        }
    }
    //punten van de games
    game(team){
        /*reset points*/
        this.scoreObject.team1.points = +this.pointsArray[this.pointsArray.indexOf("0")];
        this.pointsT1.innerHTML = this.pointsArray[this.pointsArray.indexOf("0")];
        this.scoreObject.team2.points = +this.pointsArray[this.pointsArray.indexOf("0")];
        this.pointsT2.innerHTML = this.pointsArray[this.pointsArray.indexOf("0")];

        /*change serve side*/
        this.updateServe(1);
        
        let T1 = +this.gameT1.innerHTML;
        let T2 = +this.gameT2.innerHTML;
        
        switch(team){
            case "T_1":
                //als team 1 de game gewonnen heeft
                this.gameT1.innerHTML = T1 + 1;
                T1 += 1;
                this.scoreObject.team1.game = T1
                break;
            case "T_2":
                //als team 2 de game gewonnen heeft
                this.gameT2.innerHTML = T2 + 1;
                T2 += 1;
                this.scoreObject.team2.game = T2
                break;
        }

        if(team == "T_1" && T1 > 5 && T1 >= T2 + 2){
            //als team 1 minimaal 6 sets gewonnen heeft met een verschil van 2 sets T.O.V team 2
            this.sets(team);
            return;
        }
        if(team == "T_2" && T2 > 5 && T2 >= T1 + 2){
            //als team 2 minimaal 6 sets gewonnen heeft met een verschil van 2 sets T.O.V team 1
            this.sets(team);
            return;
        }


    }
    //punten van de sets
    sets(team){
        /*reset de match punten*/
        let info = [this.setNr, this.scoreObject.game, this.scoreObject.team1.game, this.scoreObject.team2.game];
        this.setNr++;  //setNr moet altijd verhoogd worden ook bij fout in fecht
        this.AddGameSet(info);

        this.gameT1.innerHTML = "0";
        this.scoreObject.team1.game = 0;
        this.gameT2.innerHTML = "0";
        this.scoreObject.team2.game = 0;

        let T1 = +this.setsT1.innerHTML;
        let T2 = +this.setsT2.innerHTML;
        
        switch(team){
            case "T_1":
                this.setsT1.innerHTML = T1 + 1;
                T1 += 1;
                this.scoreObject.team1.sets = T1;
                break;
            case "T_2":
                this.setsT2.innerHTML = T2 + 1;
                T2 += 1;
                this.scoreObject.team2.sets = T2;
                break;
        }
        if((T1 == 2 || T2 == 2) && (!this.hasWinner)){
            this.hasWinner = true; //als er nog geen winnaar is
            this.winner(team);
        }
        
    }
    winner(team){
        this.scoreObject.gameStatus = 0;
        //end game knop toevoegen
        let endgamebtn = document.createElement(`endgamebtn-comp`);
        endgamebtn.setAttribute("gameid", this.getAttribute("gameid"))
        this.endgame.append(endgamebtn);
    }
//#endregion PuntenTelling

    //deze functie controllerd de tennis bal die aangeeft wie er opslag heeft
    updateServe(status, team){
        let serveT1 = this.shadowRoot.querySelector("#ballT1");
        let serveT2 = this.shadowRoot.querySelector("#ballT2");
        if(this.type == "admin"){ //wanneer het scorenbord op de mygames pagina stat
            if(status == 0){//status 0 betekent start van het spel
            //voeg de serve ball toe aan een random player
                if(Math.floor(Math.random() * 2) == 0){
                    serveT1.style.display = "block";
                    this.serving = "T_1";
                    this.scoreObject.serving = 0; // 0 is team 1
                }
                else{
                    serveT2.style.display = "block";
                    this.serving = "T_2";
                    this.scoreObject.serving = 1; // 1 is team 2
                }
            }
            else{
                if(this.serving == "T_1"){
                    serveT2.style.display = "block";
                    serveT1.style.display = "none";

                    this.scoreObject.serving = 1;
                    this.serving = "T_2"
                }
                else{
                    serveT1.style.display = "block";
                    serveT2.style.display = "none";
    
                    this.scoreObject.serving = 0;
                    this.serving = "T_1"
                }
            }
        }
        else{ //wanneer het scorenbord op de home pagina staat
            if(team == 0){
                serveT1.style.display = "block";
                serveT2.style.display = "none";
            }
            else if(team == 1){
                serveT2.style.display = "block";
                serveT1.style.display = "none";
            }
        }
    }

    //als het scorenbord het atribuut admin heeft worden de knoppen toegevoegd om de scoren te verhogen
    UpdateToAdmin(){ 
        console.log("admin rights have been added");
        //plus en min knoppen toevoegen
        for(let i = 1; i<=2;i++){
            let scoreBtn = document.createElement(`scorebtn-comp`);
            scoreBtn.setAttribute("id", `T_${i}`)
            if(i == 1){
                this.board.prepend(scoreBtn);
            }
            if(i == 2){
                this.board.append(scoreBtn);
            }
        }

        //random team opslag geven
        this.updateServe(0);
    }
}

customElements.define('scorenbord-comp', comp)