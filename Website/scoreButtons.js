//#region IMPORTS

//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
    .btnArea{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        position: relative;
    }
    ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    li{
        padding: 5px;
        display: flex
    }
    button{
        padding: 0 12px;
        width: 4em;
        height: 4em;
        border-radius: 2em;
        position: relative;
    }
    #min{
        padding: 0 5px;
        width: 2em;
        height: 2em;
        border-radius: 1em;
        margin: auto;
    }
    button h1, button h3{
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .min{
        top: -20%;
    }
    .innerArea{
        height: fit-content;
        transform: translate(-50%,-50%);
        top: 50%;
        left: 50%;
        position: absolute;
    }
    </style>
    <div class="btnArea">
        <div class="innerArea">
            <ul>
                <li>
                    <button id="plus"><h1>+</h1></button>
                </li>
                <li>
                    <button id="min"><h3 class="min">-</h3></button>
                </li>
            </ul>
        </div>
    </div>
`

class app extends HTMLElement
{
    constructor(){
        super()
        const shadow = this.attachShadow({mode: "open"}) // zorgt ervoor dart het component een afgeschermde stijl kan hebben
        shadow.append(template.content.cloneNode(true))
        
        this.button = this.shadowRoot.querySelectorAll("button");
        }

        connectedCallback()
        {
            this.button.forEach(btn => {
                btn.addEventListener('mousedown', (e) =>{
                    //console.log("btn Clicked");
                    let info = [btn.getAttribute("id"), this.getAttribute("id")];
                    this.UpdateScoreEvent(info);
                })
            });
        }

        UpdateScoreEvent(info){
            this.dispatchEvent(new CustomEvent("UpdateScoreEvent", {
                bubbles: true,
                composed: true,
                detail: info
            }))
        }
}

customElements.define('scorebtn-comp', app);