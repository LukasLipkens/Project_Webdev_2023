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



    button {
        font-size: 18px;
        color: black;
        font-weight: 800;
        cursor: pointer;
        position: relative;
        border: none;
        background: none;
        text-transform: uppercase;
        transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
        transition-duration: 400ms;
        transition-property: color;
        margin-right: 15px;
    }

    button:focus,
    button:hover{
        color: green;
    }

    button:focus:after,
    button:hover:after {
        width: 100%;
        left: 0%;
    }

    button:after {
        content: "";
        pointer-events: none;
        bottom: -2px;
        left: 50%;
        position: absolute;
        width: 0%;
        height: 2px;
        background-color: green;
        transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
        transition-duration: 400ms;
        transition-property: width, left;
    }

    .active{
        color: green;
    }

    /*nav li button, button {
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
    }*/
    nav .right-item {
        margin-left: auto;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
    }
    </style>
<nav>
    <ul>
    <li><h2>Tennis</h2></li>
    <li><img src="./images/logo.svg" alt="tennisBall" style="width: 60px;"></li>
    <li><h2>Scores<h2></li>
    </ul>
    <div class="right-item">
        <button id="home" class="active">home</button>
        <button id="history">history</button>
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
                    
                    this.button.forEach(state =>{
                        state.setAttribute("class", "");
                    })
                    btn.setAttribute("class", "active");
                    this.ChangePageEvent(btn.getAttribute("id"));
                })
            });
        }
        static observedAttributes = ["loggedIn"];

        AttributeChangedCallback(){
            console.log("gerarriveerd");
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