//#region IMPORTS

//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
    nav {
    background-color: #d1d1d1;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 1200px;
    margin: auto;
    }
    nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        
    }

    nav ul li {
        position: relative;
    }

    nav li button, button {
        display: block;
        color: none;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s;
        margin: 5px;
        width: 110px;
        font-size: 1em;
    }

    nav li button:hover,nav .right-item button:hover{
        background-color: green;
        color: white;
    }
    nav .right-item {
        margin-left: auto;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
    }
    .active {
        background-color: #04AA6D;
    }
    </style>
<nav>
    <ul>
    <li><button id="home">home</button></li>
    <li><button id="history">history</button></li>
    </ul>
    <div class="right-item">
        <button id="myGames">My games</button>
        <button id="logIn">Log in</button>
    </div>
</nav>

`

class app extends HTMLElement
{
    constructor(){
        super();

        this.shadow = this.attachShadow({mode: "open"}); // zorgt ervoor dart het component een afgeschermde stijl kan hebben
        this.shadow.append(template.content.cloneNode(true));
        
        this.button = this.shadowRoot.querySelectorAll("button");

        }

        connectedCallback()
        {
            this.button.forEach(btn => {
                btn.addEventListener('mousedown', (e) =>{
                    console.log("btn Clicked");
                    this.ChangePageEvent(btn.getAttribute("id"));
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