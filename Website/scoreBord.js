//#region IMPORTS
import "./scoreButtons.js"
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
            padding: 10px;
            border: 10px solid black;
            width: 70%;
            margin: auto;
            margin-top: 25px;
            margin-bottom: 25px;
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
    </style>
    <div class="scoreBoard">
        <div class="centerDiv">

            <div class="grid-container">
                <div class="player1">Player1</div>
                <div class="player2">Player2</div>

                <div class="scorePlayer1">score<br><span>0</span></div>
                <div class="scorePlayer2">score<br><span>0</span></div>

                <div class="setsPlayer1">sets<br><span>0</span></div>  
                <div class="setsPlayer2">sets<br><span>0</span></div>  

                <div class="matchesPlayer1">match<br><span>0</span></div>
                <div class="matchesPlayer2">match<br><span>0</span></div>

                <div class="servePlayer1">serve:X</div>
                <div class="servePlayer2">serve:Thomas</div>

            </div>
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

        this.scoreP1 = this.shadowRoot.querySelector(".scorePlayer1 span");
        this.scoreP2 = this.shadowRoot.querySelector(".scorePlayer2 span");

        this.setsP1 = this.shadowRoot.querySelector(".setsPlayer1 span");
        this.setsP1 = this.shadowRoot.querySelector(".setsPlayer1 span");

        this.scores = {
            player1: {
                score: 0,
                sets: 0,
                match: 0
            },
            player2:{
                score: 0,
                sets: 0,
                match: 0
            }
        }
    }

    connectedCallback(){
        this.type = this.getAttribute("type");
        if(this.type == "admin"){
            this.UpdateToAdmin();
        }
        this.addEventListener("UpdateScoreEvent", this.UpdateScoreEvent);

    }

    UpdateScoreEvent(e){
        console.log("btnPress Received " + e.detail);
        this.UpdateScore(e.detail);
    }
    UpdateScore(info){
        let action = info[0];
        let player = info[1];

        console.log(`updating: ${player} \n action: ${action}`);
    }

    UpdateToAdmin(){
        console.log("admin rights have been added");
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
        

    }


}

customElements.define('score-comp', app)