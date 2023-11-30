//#region IMPORTS

//#endregion IMPORTS

const template = document.createElement("template");
template.innerHTML = /*html*/ `
    <style>
        .item-content-box {
            display: flex;
            height: 50px;
            margin-top: 10px;
        }
        .game-container-box {
            display: flex;
            justify-content: space-evenly;
            width: 100%;
            height: 50px;
        }
        .left-box, .right-box {
            display: flex;
            align-items: center;
            justify-content: center;
            height: auto;
            width: 100%;
        }
        .left-box img{
            width: 50px;
            height: 50px;
            margin-right: 5px;
            visibility: visible;
        }
        .right-box img {
            width: 50px;
            height: 50px;
            margin-right: 5px;
            visibility: visible;
        }
        .center-box {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
        }
        .score-box {
            user-select: none;
            font-size: 30px;
        }
    </style>

    <div class="item-content-box">
        <div class="game-container-box">
            <div class="left-box">
                <img src="./images/player1.png" alt="playerOne">
                <p>Player 1</p>
            </div>
            <div class="center-box">
                <p class="score-box">0 - 0</p>
            </div>
            <div class="right-box">
                <img src="./images/player2.png" alt="playerTwo">
                <p>Player 2</p>
            </div>
        </div>
    </div>
    
`;

class SingleScoreComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.append(template.content.cloneNode(true));

    }

    connectedCallback() {
        const playerName1 = this.getAttribute('playerName1') || 'Player 1';
        const playerName2 = this.getAttribute('playerName2') || 'Player 2';
        const score1 = '0';
        const score2 = '0';

        this.shadow.querySelector('.left-box p').innerText = playerName1;
        this.shadow.querySelector('.right-box p').innerText = playerName2;
        this.shadow.querySelector('.score-box').innerText = `${score1} - ${score2}`;
    }
}

customElements.define('single-score-comp', SingleScoreComponent);