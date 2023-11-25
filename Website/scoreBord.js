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

                <div class="scorePlayer1">score<br>15</div>
                <div class="scorePlayer2">score<br>30</div>

                <div class="setsPlayer1">sets<br>1</div>  
                <div class="setsPlayer2">sets<br>0</div>  

                <div class="matchesPlayer1">match<br>0</div>
                <div class="matchesPlayer2">match<br>0</div>

                <div class="servePlayer1">serve:</div>
                <div class="servePlayer2">serve:</div>

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
    }

    connectedCallback(){
        this.type = this.getAttribute("type");
        if(this.type == "admin"){
            this.UpdateToAdmin();
        }
    }

    UpdateToAdmin(){
        console.log("admin rights have been added");
        for(let i = 1; i<=2;i++){
            let scoreBtn = document.createElement(`scorebtn-comp`);
            scoreBtn.setAttribute("id", `scoreBtnPlayer_${i}`)
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