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
    .hidden{
        display: none; /*laat de button niet zien als deze verstopt moet worden*/
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
    nav .right-item {
        margin-left: auto;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
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
            <button id="login">Log in</button>
            
        </div>
    </nav>
`

class comp extends HTMLElement
{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.shadow.append(template.content.cloneNode(true));
        
        this.button = this.shadowRoot.querySelectorAll("button");
    }

    connectedCallback()
    {
        this.socket = new WebSocket("ws://localhost:8080");
        this.socket.addEventListener('open', function (event) {
            console.log('Connection opened');
        });
        this.button.forEach(btn => {
            btn.addEventListener('mousedown', (e) =>{
                //console.log(this.getAttribute("loggedIn"));
                // this.socket.send("test");
                this.button.forEach(btn =>{
                    btn.classList.remove("active");
                })
                btn.classList.toggle("active");
                this.ChangePageEvent(btn.getAttribute("id"));
            });

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

customElements.define('navigatie-comp', comp)