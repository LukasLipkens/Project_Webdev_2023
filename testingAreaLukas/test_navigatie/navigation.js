//#region IMPORTS

//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
    }

    li {
        float: left;
    }

    li button {
        display: block;
        color: none;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    li button:hover:not(.active) {
        background-color: green;
        color: white;
    }

    .active {
        background-color: #04AA6D;
    }
    </style>

<ul>
  <li><button id="home">home</button></li>
  <li><button id="history">history</button></li>
  <li style="float:right"><button id="logIn">Log in</button></li>
</ul>
`

class app extends HTMLElement
{
    constructor(){
        super();

        this.shadow = this.attachShadow({mode: "open"}) // zorgt ervoor dart het component een afgeschermde stijl kan hebben
        this.shadow.append(template.content.cloneNode(true))
        
        this.button = this.shadowRoot.querySelectorAll("button")

        }

        connectedCallback()
        {
            this.button.forEach(btn => {
                btn.addEventListener('mousedown', (e) =>{
                    console.log("btn Clicked")
                    this.ChangePageEvent(btn.getAttribute("id"))
                })
            });
        }

        ChangePageEvent(id){
            this.dispatchEvent(new CustomEvent("ChangePageEvent", {
                bubbles: true,
                composed: true,
                detail: id
            }))
        }
}

customElements.define('navi-comp', app);