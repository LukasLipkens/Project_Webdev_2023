//#region IMPORTS
import "./scoreBord.js"
//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
        #homeContainer{
            border: 2px solid black;
            border-radius: 10px;
            width: 1200px;
            margin: auto;
            margin-top: 20px;
            min-height: 500px;

        }
    </style>
    <center><div id="homeContainer">
test
    </div></center>
    
`

class app extends HTMLElement
{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: "open"}) // zorgt ervoor dart het component een afgeschermde stijl kan hebben
        this.shadow.append(template.content.cloneNode(true))
        this.container = this.shadow.querySelector("#homeContainer");
        this.matchesArray = ["field1", "field2"];
    }

    connectedCallback(){//hier het aantal matches tonen
        for(let match = 0; match < this.matchesArray.length; match++){
            //console.log("added board #" + match)
            let scoreBord = document.createElement(`score-comp`);
            scoreBord.setAttribute("id", `scoreboard_${this.matchesArray[match]}`);
            scoreBord.setAttribute("type", "user");
            this.container.append(scoreBord);
            console.log("Added: " + scoreBord.getAttribute("id"));
        }
    }
}

customElements.define('home-comp', app)