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
    width: 100%;
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
        justify-content: flex-end;
    }

    ul#account{
        display: flex;
        position:relative;
        flex-direction : column;
        width: 10%;
        margin: auto 2rem;
    }
    ul#account img{
        width: 6rem;
        position: relative;
    }
    ul#account.hidden{
        display: none;
    }
    ul#account.hidden img{
        display: none;
    }

    ul#account>ul{
        position: absolute;
        top: 6.5rem;
        background-color: lightgrey;
        padding: 10px;
        z-index: 1;
    }
    ul#account>ul.hidden{
        display: none;
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
        <ul id="account">
        <li id="profilePic"><img src="./images/player1.png"></li>
        <ul id="profileInfo" class="hidden">
            <li id="logout">Logout</li>
        </ul>
        </ul>
    </div>
</nav>

`

class app extends HTMLElement
{
    constructor(){
        super();

        this.shadow = this.attachShadow({mode: "open"}); // zorgt ervoor dart het component een afgeschermde stijl kan hebben
        this.shadow.appendChild(template.content.cloneNode(true));
        
        this.button = this.shadowRoot.querySelectorAll("button");

        }

        connectedCallback()
        {
            this.button.forEach(btn => {
                btn.addEventListener('mousedown', (e) =>{
                    //console.log("btn Clicked");
                    //console.log(this.getAttribute("loggedIn"));
                    this.button.forEach(btn =>{
                        btn.classList.remove("active");
                    })
                    btn.classList.toggle("active");
                    this.ChangePageEvent(btn.getAttribute("id"));
                })
            });
            this.myGames = this.shadow.querySelector("#myGames");
            this.loginBtn = this.shadow.querySelector("#logIn");
            this.account = this.shadow.querySelector("#account");
            this.logout = this.shadow.querySelector("#logout");
            if(this.getAttribute("loggedin") != "true"){
                this.myGames.classList.add("hidden");
                this.loginBtn.classList.remove("hidden");
                this.account.classList.add("hidden");
            }
            else{
                this.loginBtn.classList.add("hidden");
                this.myGames.classList.remove("hidden");
                this.account.classList.remove("hidden");
            }

            this.account.addEventListener("click", ()=>{
                this.shadow.querySelector("#profileInfo").classList.toggle("hidden");
            });

            this.logout.addEventListener("click", ()=>{
                const xhttp = new XMLHttpRequest();
                xhttp.addEventListener("load", ()=>{
                    this.setAttribute("loggedIn", "false");
                });
                xhttp.open("GET", "logout.php?");
                xhttp.send();
            });
        }
        static observedAttributes = ["loggedin"]; //altijd kleine letters gebruiken voor attributen

        attributeChangedCallback(name, oldValue, newValue){
            console.log("gerarriveerd");
            console.log(newValue);
            if(newValue != "true"){
                //console.log("not logged in");
                this.myGames.classList.add("hidden");
                this.loginBtn.classList.remove("hidden");
                this.account.classList.add("hidden");
            }
            else{
                //console.log("logged in");
                this.loginBtn.classList.add("hidden");
                this.myGames.classList.remove("hidden");
                this.account.classList.remove("hidden");
            }
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