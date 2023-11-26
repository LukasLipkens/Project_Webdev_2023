//#region IMPORTS
import "./MatchLine.js"
//#endregion IMPORTS

const template = document.createElement("template");
template.innerHTML = /*html*/ `

    <style>
        .big-container {
            border: 2px solid black;
            border-radius: 10px;
            width: 1200px;
            margin: auto;
            margin-top: 20px;
            min-height: 500px;
        }
        .anotherone {
            border: 1px solid black;
            position: absolute;
            top: 0;
            left: 48%;
            cursor: pointer;
            background-color: white;
            border-radius: 10px;
            width: 50px;
            user-select: none;
            font-size: 25px;
        }
        .title {
            font-size: 60px;
            margin: 0 auto;
            padding-bottom: 15px;
            text-align: center;
        }
    </style>
    <div class="big-container">
        <p class="title">All Played Games</p>
        <p class="anotherone">Add</p>
    </div>
`;

class HistoryComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));
    }

    connectedCallback() {
        const bigContainer = this.shadow.querySelector(".big-container");
        const another = this.shadow.querySelector(".anotherone");

        another.addEventListener("click", () => {
            const newMatch = document.createElement("match-comp");

            const names = ["Ruan", "Lukas", "Simon", "Thomas", "Niels", "Hamza", "Siegmund", "Benny", "Jule", "Mathijs", "Ragnar", "Zoran", "Philip", "Warre"];
            const randomName1 = names[Math.floor(Math.random() * names.length)];
            const randomName2 = names[Math.floor(Math.random() * names.length)];
            const randomScore1 = Math.floor(Math.random() * 7);
            const randomScore2 = Math.floor(Math.random() * 7);

            let winningSide = "";
            if (randomScore1 > randomScore2) {
                winningSide = "left";
            }
            else if (randomScore2 > randomScore1) {
                winningSide = "right";
            }
            else {
                winningSide = "both";
            }

            newMatch.setAttribute("playerName1", randomName1);
            newMatch.setAttribute("playerName2", randomName2);
            newMatch.setAttribute("score1", randomScore1);
            newMatch.setAttribute("score2", randomScore2);
            newMatch.setAttribute("whoWon", winningSide);

            bigContainer.append(newMatch);
        })
    }
}

customElements.define("history-comp", HistoryComponent);
