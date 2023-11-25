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
    }
    button{
        padding: 0 12px;
        width: 4em;
        height: 4em;
        border-radius: 2em;
        position: relative;
    }
    button h1{
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .min{
        top: 10%;
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
                    <button><h1>+</h1></button>
                </li>
                <li>
                    <button><h1 class="min">-</h1></button>
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
        
        }
}

customElements.define('scorebtn-comp', app);