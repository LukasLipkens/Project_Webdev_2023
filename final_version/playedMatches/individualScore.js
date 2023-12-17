//#region IMPORTS

//#endregion IMPORTS

const template = document.createElement("template");
template.innerHTML = /*html*/ `
    <style>

        #item-content-box {
            display: flex;
            height: 50px;
            margin-top: 10px;
        }
        #game-container-box {
            display: flex;
            justify-content: space-evenly;
            width: 100%;
            height: 50px;
        }
        #left-box, #right-box {
            display: flex;
            align-items: center;
            justify-content: center;
            height: auto;
            width: 100%;
        }
        #left-box img{
            width: 50px;
            height: 50px;
            margin-right: 5px;
            visibility: visible;
        }
        #right-box img {
            width: 50px;
            height: 50px;
            margin-right: 5px;
            visibility: visible;
        }
        #center-box {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
        }
        #score-box {
            user-select: none;
            font-size: 30px;
        }

    </style>

    <div id="item-content-box">
        <div id="game-container-box">
            <div id="left-box">
                <img src="./images/player1.png" alt="playerOne">
                <p></p>
            </div>
            <div id="center-box">
                <p id="score-box"></p>
            </div>
            <div id="right-box">
                <img src="./images/player2.png" alt="playerTwo">
                <p></p>
            </div>
        </div>
    </div>
`;

class SingleScoreComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));

        this.leftPlayer = this.shadowRoot.querySelector('#left-box p');
        this.rightPlayer = this.shadowRoot.querySelector('#right-box p');
        this.scores = this.shadowRoot.querySelector('#score-box');
    }

    connectedCallback() { }

    setScoreData(scoreData) {
        this.player1 = scoreData.player1;
        this.player2 = scoreData.player2;
        this.setNr = scoreData.setNr;
        this.team1Points = scoreData.team1Points;
        this.team2Points = scoreData.team2Points;

        this.leftPlayer.innerText = this.player1;
        this.rightPlayer.innerText = this.player2;
        this.scores.innerText = `${this.team1Points} - ${this.team2Points}`;
    }
}

customElements.define('single-score-comp', SingleScoreComponent);