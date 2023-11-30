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
            padding-top: 10px;
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
    latestMatchId = 0;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));

        this.bigContainer = this.shadow.querySelector(".big-container");

        this.append = true;
        this.previousComponent = null;
    }

    connectedCallback() {
        console.log('latestMatch:', this.latestMatchId);
        const another = this.shadow.querySelector(".anotherone");

        another.addEventListener("click", () => {
            this.createNewMatchComponent();
        })
    }

    createNewMatchComponent() {
        this.newMatch = document.createElement("match-comp");

        this.newMatch.setAttribute("id", this.getNewMatchId());
        console.log('newMatchId', this.latestMatchId);

        this.newMatch.addEventListener('toggleContent', (e) => {
            this.onMatchCompToggle(e);
        })

        this.editScoreAndPlayers();
    }

    editScoreAndPlayers() {
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

        this.newMatch.setAttribute("playerName1", randomName1);
        this.newMatch.setAttribute("playerName2", randomName2);
        this.newMatch.setAttribute("score1", randomScore1);
        this.newMatch.setAttribute("score2", randomScore2);
        this.newMatch.setAttribute("whoWon", winningSide);

        this.addComponent(this.newMatch);
    }

    getNewMatchId() {
        //verhogen voordat deze wordt opgeroepen.
        return `match-${++this.latestMatchId}`;
    }

    onMatchCompToggle(e) {
        const matchId = e.detail.matchId;
        console.log('event: ', matchId);
        const matchComponents = this.shadow.querySelectorAll("match-comp");
        matchComponents.forEach(comp => {
            if (comp.getAttribute('id') === matchId) {
                comp.toggle(true);
            }
            else {
                // comp.setExpanded(false);
                comp.toggle(false);
            }
        });
    }

    addComponent(nextComponent) {
        if (this.append) {
            this.bigContainer.append(nextComponent);
            this.append = false;
            this.previousComponent = nextComponent;
        }
        else {
            this.bigContainer.insertBefore(nextComponent, this.previousComponent);
            this.previousComponent = nextComponent;
        }
    }
}

customElements.define("history-comp", HistoryComponent);
