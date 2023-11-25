//#region IMPORTS
import "./MatchLine.js"
//#endregion IMPORTS

const template = document.createElement("template");
template.innerHTML = /*html*/ `

    <style>
        .big-container {
            width: 1200px;
            margin: 20px auto;
            border: 2px solid black;
            border-radius: 10px;
            padding: 10px 10px 0 10px;
            font-size: 25px;
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
            bigContainer.append(newMatch);
        })
    }
}

customElements.define("history-comp", HistoryComponent);
