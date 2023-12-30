//#region IMPORTS
import "./playerBubble.js";
//#endregion IMPORTS



const templateCustom = document.createElement("template");
templateCustom.innerHTML = /*html*/ `
    <style>
        #endContainer {
            text-align: center;
            margin-top: 20px;
            width: 400px;
            height: 500px;
            border: 5px solid rgba(0, 0, 139, 0.3);
            background: radial-gradient(circle at center, white 70%,  darkblue 105%);
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
        h1{
            font-family: "Arial", "sans-serif"; 
            font-weight: 600;
        }
        #matchInfo {
            margin-top: 20px;
            text-align: center;
        }
        #matchtime {
            display: flex;
            justify-content: space-around;
        }
        /* styling van de teams en bubbles */

        #teams {
            display: flex;
            position: relative;
            justify-content: space-around;
            align-items: center;
            width: 80%;
            margin: auto;
        }
        #division{
            width: 1px;
            background-color: black;
            height: 100px;
            position: relative;
            transform: translateY(10%);

        }

        #teamA, #teamB {
            display: flex;
            position: relative;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        #teamA.doubles, #teamB.doubles {
            flex-direction: row;

        }
        #teamA.doubles .playerB, #teamB.doubles .playerB{
            position: absolute;
            top: 40%; 
            left: 60%;
        }
        #teamA p, #teamB p {
            position: absolute;
            top: 80%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
            font-size: 6.5rem;
            margin: 0;
            opacity: 0.25;
        }

        /* het aanmaken van de table met de scores */
        #score{
            display: block;
            margin-top: 15%;
        }
        #score table{
            width: 70%;
            margin: auto;
            border: 1px solid black;
            border-collapse: separate;
            border-spacing: 0;
            border-radius: 10px;   
            overflow: hidden;
        }
        #score td{
            border-right: 1px solid black;
            margin: 0;
            padding: 0;
        }
        #score td:last-child{
            border-right: none;
        }
        #score tr td{
            border-bottom: 1px solid black;
        }
        #score tr:last-child td{
            border-bottom: none;
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
            <div id="matchtime"><h4>${matchData.date}</h4><h4>${matchData.startTime} - ${matchData.endTime}</h4></div>
            <h1>Match result</h1>
            <div id="teams">
                <div id="teamA">
                    <p>A</p>
                </div>
                <div id="division"></div>
                <div id="teamB">
                    <p>B</p>
                </div>
            </div>
            <div id="score">
                <table>
                    <tr id="trA">
                        <td><b>A</b></td>
                    </tr>
                    <tr id="trB">
                        <td><b>B</b></td>
                    </tr>
                </table>
            </div>
        `;
        let teamA = this.matchInfo.querySelector("#teamA");
        let teamB = this.matchInfo.querySelector("#teamB");
        console.log("teama");
        
        matchData.team1.split(",").forEach((player, index) => {
            let playerBubble = document.createElement("player-comp");
            teamA.appendChild(playerBubble);
            console.log(index);
            playerBubble.classList.add("player"+ (index == 0 ? "A" : "B"));
            playerBubble.SetPlayer(player);
            if(index == 1){
                teamA.classList.add("doubles");
                teamB.classList.add("doubles");
            }

        });
        console.log("teamb");
        matchData.team2.split(",").forEach((player,index) => {
            let playerBubble = document.createElement("player-comp");
            teamB.appendChild(playerBubble);
            playerBubble.classList.add("player"+ (index == 0 ? "A" : "B"));
            playerBubble.SetPlayer(player);
        });

        let trA = this.matchInfo.querySelector("#trA");
        let trB = this.matchInfo.querySelector("#trB");

        matchData.scoringData.forEach(set => {
            let tdA = document.createElement("td");
            let tdB = document.createElement("td");

            tdA.innerHTML = set["gamesT1"];
            tdB.innerHTML = set["gamesT2"];

            trA.appendChild(tdA);
            trB.appendChild(tdB);
        });

        let scoreTable = this.matchInfo.querySelector("#score table");
    }
}

customElements.define("endview-comp", EndGameView);