//#region IMPORTS
import "./scoreButtons.js"
import "./endgameButton.js"
//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
        .player1 { grid-area: player1; }
        .player2 { grid-area: player2; }

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
                'player1 player1 player1 player1 player2 player2 player2 player2'
                'pointsT1 pointsT1 gameT1 gameT1 gameT2 gameT2 pointsT2 pointsT2'
                'pointsT1 pointsT1 setsT1 setsT1 setsT2 setsT2 pointsT2 pointsT2'
                'serveT1 serveT1 serveT1 serveT1 serveT2 serveT2 serveT2 serveT2';
            gap: 4px;
            background-color: rgb(255, 255, 255);
            padding: 4px;
            border: 5px solid black;
            border-radius: 5px;
            width: 70%;
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
            width: 100%;

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
        p, h3{
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
    </style>
    <div class="scoreBoard">
        <div class="content">
            <div class="centerDiv">

                <div class="grid-container">
                    <div class="player1"><h3>Player1</h3></div>
                    <div class="player2"><h3>Player2</h3></div>

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

class app extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" }) // zorgt ervoor dart het component een afgeschermde stijl kan hebben
        shadow.append(template.content.cloneNode(true))
        this.type;
        this.board = this.shadowRoot.querySelector(".centerDiv");
        this.endgame = this.shadowRoot.querySelector(".bottomDiv");

        this.pointsT1 = this.shadowRoot.querySelector(".pointsT1 span");
        this.pointsT2 = this.shadowRoot.querySelector(".pointsT2 span");

        this.gameT1 = this.shadowRoot.querySelector(".gameT1 span");
        this.gameT2 = this.shadowRoot.querySelector(".gameT2 span");

        this.setsT1 = this.shadowRoot.querySelector(".setsT1 span");
        this.setsT2 = this.shadowRoot.querySelector(".setsT2 span");

        this.pointsArray = ["0","15","30","40","ADV"];
        this.serving = "";
    }

    connectedCallback(){
        this.type = this.getAttribute("type");
        if(this.type == "admin"){
            this.UpdateToAdmin();
        }
        this.addEventListener("UpdateScoreEvent", this.UpdateScoreEvent);
    }   

    UpdateScoreEvent(e){
        //console.log("btnPress Received " + e.detail);
        this.UpdateScore(e.detail);
    }

    UpdateScore(info){
        let action = info[0];
        let player = info[1];

        /*begin spel*/
        this.game(action, player);
        /*einde spel*/

        /*begin match*/
        /*einde match*/

        /*begin sets*/
        /*einde sets*/

    }

    game(action, team){
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
                    this.match(team);
                    return;
                }
                if(T2 == "40" && team == "T_2" && T1 != 40 && T1 != "ADV"){
                    //als team 2: 40 heeft EN scoort EN team 1 heeft geen 40 EN geen ADV: team 2 wint de game 
                    //console.log("case 2");
                    this.match(team);
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
                    this.match(team);
                    return;
                }
                if(team == "T_2" && T2 == "ADV"){
                    //team 2 scoort heeft voordeel: team 2 wint de game
                    //console.log("case 5");
                    this.match(team);
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
                        this.pointsT1.innerHTML = this.pointsArray[this.pointsArray.indexOf(T1) + 1];
                        break;
                    case "T_2":
                        this.pointsT2.innerHTML = this.pointsArray[this.pointsArray.indexOf(T2) + 1];
                        break;
                }
            }
        }
    }
    match(team){
        /*reset points*/
        this.pointsT1.innerHTML = this.pointsArray[this.pointsArray.indexOf("0")];
        this.pointsT2.innerHTML = this.pointsArray[this.pointsArray.indexOf("0")];

        /*change serve side*/
        this.updateServe(1);
        
        let T1 = +this.gameT1.innerHTML;
        let T2 = +this.gameT2.innerHTML;
        
        switch(team){
            case "T_1":
                this.gameT1.innerHTML = T1 + 1;
                T1 += 1;
                break;
            case "T_2":
                this.gameT2.innerHTML = T2 + 1;
                T2 += 1;
                break;
        }

        if(team == "T_1" && T1 > 5 && T1 >= T2 + 2){
            this.sets(team);
            return;
        }
        if(team == "T_2" && T2 > 5 && T2 >= T1 + 2){
            this.sets(team);
            return;
        }


    }
    sets(team){
        this.gameT1.innerHTML = "0";
        this.gameT2.innerHTML = "0";

        
    }




    updateServe(status){

        let serveT1 = this.shadowRoot.querySelector("#ballT1");
        let serveT2 = this.shadowRoot.querySelector("#ballT2");

        if(status == 0){
        //voeg de serve ball toe aan een random player
            if(Math.floor(Math.random() * 2) == 0){
                serveT1.style.display = "block";
                this.serving = "T_1";
            }
            else{
                serveT2.style.display = "block";
                this.serving = "T_2";
            }
        }
        else{
            if(this.serving == "Player_1"){
                serveT2.style.display = "block";
                serveT1.style.display = "none";

                this.serving = "T_2"
            }
            else{
                serveT1.style.display = "block";
                serveT2.style.display = "none";

                this.serving = "T_1"
            }
        }
    }

    UpdateToAdmin(){
        console.log("admin rights have been added");
        let endgamebtn = document.createElement(`endgamebtn-comp`);
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
        this.endgame.append(endgamebtn);
        

        this.updateServe(0);
        
        
    }


}

customElements.define('score-comp', app)