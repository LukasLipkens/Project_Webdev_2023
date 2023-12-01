//#region IMPORTS

//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
        #myGamesContainer{
            border: 2px solid black;
            border-radius: 10px;
            width: 1200px;
            margin: auto;
            margin-top: 20px;
            min-height: 500px;

        }
    </style>
    <center><div id="myGamesContainer">
        
    </div></center>
    
`

class app extends HTMLElement
{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: "open"}); // zorgt ervoor dart het component een afgeschermde stijl kan hebben
        shadow.append(template.content.cloneNode(true));
        this.container = this.shadowRoot.querySelector("#myGamesContainer");
        this.playing = true;
        this.matchID = "GameID";
    }

    connectedCallback(){
        if(this.playing){
            //console.log("added board #" + match)
            let scoreBord = document.createElement(`score-comp`);
            scoreBord.setAttribute("id", `scoreboard_${this.matchID}`);
            scoreBord.setAttribute("type", "admin");
            this.container.append(scoreBord);
            console.log("Added: " + scoreBord.getAttribute("id"));
        }
    }


}

customElements.define('mygames-comp', app);