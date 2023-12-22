//#region IMPORTS

//#endregion IMPORTS

const templateCustom = document.createElement("template");
templateCustom.innerHTML = /*html*/ `
    <style>
        #endContainer {
            text-align: center;
            margin-top: 20px;
            width: 400px;
            height: 500px;
            border: 5px solid green;
            background-color: white;
            padding-top: 30px;
            border-radius: 10px;
        }
        #backButton {
            cursor: pointer;
            font-weight: 700;
            font-family: Helvetica, "sans-serif";
            transition: all 0.2s;
            padding: 10px 20px;
            border-radius: 100px;
            background: rgb(1, 184, 90);
            border: 1px solid transparent;
            font-size: 15px;
            margin: 30px 0 0 0;
        }
        #backButton:hover {
            background: #c4e201;
        }
        #matchInfo {
            margin-top: 20px;
            text-align: center;
        }
    </style>
    <div id="endContainer">
        <div id="matchInfo"></div>
        <button id="backButton">
            <span>Back to Main</span>
        </button>
    </div>
`;

class EndGameView extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(templateCustom.content.cloneNode(true));

        this.backButton = this.shadowRoot.querySelector("#backButton");
        this.matchInfo = this.shadowRoot.querySelector("#matchInfo");
    }

    connectedCallback() {
        this.backButton.addEventListener("click", () => {
            const event = new CustomEvent("backToMyGamesPage", {
                bubbles: true,
                composed: true,
            });
            this.dispatchEvent(event);
        });
    }

    setMatchInfo(matchData) {
        this.matchInfo.innerHTML = `
            <h1>Match Information</h1>
            <h3>DATE: ${matchData.date}</h3>
            <h3>START TIME: ${matchData.startTime}</h3>
            <h3>END TIME: ${matchData.endTime}</h3>
            <h3>PLAYER 1: ${matchData.player1}</h3>
            <h3>PLAYER 2: ${matchData.player2}</h3>
            <h3>SCORE 1: ${matchData.score1}</h3>
            <h3>SCORE 2: ${matchData.score2}</h3>
        `;
    }
}

customElements.define("endview-comp", EndGameView);