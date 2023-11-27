//#region IMPORTS
import "./scoreButtons.js"
import "./endgameButton.js"
//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
        .player1 { grid-area: player1; }
        .player2 { grid-area: player2; }

        .scorePlayer1 { grid-area: scorePlayer1; }
        .scorePlayer2 { grid-area: scorePlayer2; }

        .setsPlayer1 { grid-area: setsPlayer1; }
        .setsPlayer2 { grid-area: setsPlayer2; }

        .matchesPlayer1 { grid-area: matchesPlayer1; }
        .matchesPlayer2 { grid-area: matchesPlayer2; }

        .servePlayer1 { grid-area: servePlayer1; }
        .servePlayer2 { grid-area: servePlayer2; }


        .grid-container {
            display: grid;
            grid-template-areas:
                'player1 player1 player1 player2 player2 player2'
                'scorePlayer1 setsPlayer1 setsPlayer1 setsPlayer2 setsPlayer2 scorePlayer2'
                'scorePlayer1 matchesPlayer1 matchesPlayer1 matchesPlayer2 matchesPlayer2 scorePlayer2'
                'servePlayer1 servePlayer1 servePlayer1 servePlayer2 servePlayer2 servePlayer2';
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
        .servePlayer1 p, .servePlayer2 p{
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

                    <div class="scorePlayer1"><div class="score"><p>score<br><span class="value">0</span></p></div></div>
                    <div class="scorePlayer2"><div class="score"><p>score<br><span class="value">0</span></p></div></div>

                    <div class="setsPlayer1"><p>sets<br><span class="value">0</span></p></div>  
                    <div class="setsPlayer2"><p>sets<br><span class="value">0</span></p></div>  

                    <div class="matchesPlayer1"><p>match<br><span class="value">0</span></p></div>
                    <div class="matchesPlayer2"><p>match<br><span class="value">0</span></p></div>

                    <div class="servePlayer1"><p>serve:<img id="ballP1" class="serveBall" src="./images/logo.svg" alt="tennisBall"></p></div>
                    <div class="servePlayer2"><p>serve:<img id="ballP2" class="serveBall" src="./images/logo.svg" alt="tennisBall"></p></div>

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

        this.scoreP1 = this.shadowRoot.querySelector(".scorePlayer1 span");
        this.scoreP2 = this.shadowRoot.querySelector(".scorePlayer2 span");

        this.setsP1 = this.shadowRoot.querySelector(".setsPlayer1 span");
        this.setsP2 = this.shadowRoot.querySelector(".setsPlayer1 span");

        this.serveP1 = this.shadowRoot.querySelector("#ballP1");
        this.serveP2 = this.shadowRoot.querySelector("#ballP2");

        this.scoreArray = [0,15,30,40,"TB"];
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

        //console.log(`updating: ${player} \n action: ${action}`);
        if(player == "Player_1"){
            if(action == "plus"){
                let current = +this.scoreP1.innerHTML
                this.scoreP1.innerHTML = this.scoreArray[this.scoreArray.indexOf(current)+1];
            }
            else if(action == "min"){
                let current = +this.scoreP1.innerHTML
                this.scoreP1.innerHTML = this.scoreArray[this.scoreArray.indexOf(current)-1];
            }
        }
        if(player == "Player_2"){
            if(action == "plus"){
                let current = +this.scoreP2.innerHTML
                this.scoreP2.innerHTML = this.scoreArray[this.scoreArray.indexOf(current)+1];

            }
            else if(action == "min"){
                let current = +this.scoreP2.innerHTML
                this.scoreP2.innerHTML = this.scoreArray[this.scoreArray.indexOf(current)-1];

            }

        }
    }

    UpdateToAdmin(){
        console.log("admin rights have been added");
        let endgamebtn = document.createElement(`endgamebtn-comp`);
        for(let i = 1; i<=2;i++){
            let scoreBtn = document.createElement(`scorebtn-comp`);
            scoreBtn.setAttribute("id", `Player_${i}`)
            if(i == 1){
                this.board.prepend(scoreBtn);
            }
            if(i == 2){
                this.board.append(scoreBtn);
            }
        }
        this.endgame.append(endgamebtn);
        

        //voeg de serve ball toe aan een random player
        if(Math.floor(Math.random() * 2) == 0){
            this.shadowRoot.querySelector("#ballP1").style.display = "block";
            this.serving = "Player_1";
        }
        else{
            this.shadowRoot.querySelector("#ballP2").style.display = "block";
            this.serving = "Player_2";
        }
        
        
    }


}

customElements.define('score-comp', app)