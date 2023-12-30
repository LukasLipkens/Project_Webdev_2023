//#region IMPORTS

//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
        #playerBubble {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #E0E0E0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            font-weight: 800;
            color: black;
            border: 5px solid black;
            text-align: center;
            
        }
    </style>
    <div id="playerBubble">
    </div>
    </div>

`

class PlayerBubble extends HTMLElement
{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.shadow.append(template.content.cloneNode(true));
        
        }
    connectedCallback(){
        this.playerBubble = this.shadowRoot.querySelector("#playerBubble");
    }
    SetPlayer(player){
        console.log(player.substring(0,2));
        this.playerBubble.innerHTML = `${player.substring(0,2)}`;
    }
}

customElements.define('player-comp', PlayerBubble)