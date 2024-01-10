//#region IMPORTS

//#endregion IMPORTS

/*
    dit is de navigatie van de pagina, hierin wordt ook weergegeven dat je bent ingelogd of niet
*/

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
    nav {
    background-color: #E0E0E0;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    /*width: 1160px;
    height: 75px;*/
    width: 80vw;
    height: 10vh;
    margin: auto;
    padding: 0;
    border: 5px solid black;
    }

    nav ul {
        list-style: none;
        margin: 0;
        padding: 0 20px;
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
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    ul#account{
        display: flex;
        position:relative;
        flex-direction : column;
        width: 7%;
        margin: auto 1rem;
    }
    ul#account img{
        width: 4rem;
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
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: center;
        top: 4rem;
        background-color: lightgrey;
        padding: 10px;
        z-index: 1;
        border-radius: 10px;
        margin : 0;
    }
    ul#account>ul:hover{
        background-color: grey;
        color: white;
    }
    ul#account>ul img{
        width: 2vw;
        margin-top: 0.5rem;
    }
    ul#account>ul>li>p{
        text-align: center;
        margin: 0;
    }
    ul#account>ul>li{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    ul#account>ul.hidden{
        display: none;
    }
    #navigationContent{
        padding: 010px
    }
    ul, .right-item{
        padding: 0 20px;
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
            <button id="myGames" class="hidden">My games</button>
            <button id="login">Log in</button>
            <ul id="account" class="hidden">
            <li id="profilePic"><img src="./images/player1.png"></li>
            <ul id="profileInfo" class="hidden">
                <li id="logout"><p>Logout</p><img src = "./images/logout.png"></li>
            </ul>
            </ul>
        </div>
    </nav>
`

class comp extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));

        this.button = this.shadowRoot.querySelectorAll("button");
    }

    connectedCallback() {
        this.button.forEach(btn => {
            btn.addEventListener('mousedown', (e) => {
                this.button.forEach(btn => {
                    btn.classList.remove("active");
                })
                btn.classList.toggle("active");
                this.ChangePageEvent(btn.getAttribute("id"));
            });

            //Hier komt alles voor het profiel
            this.account = this.shadowRoot.querySelector("#account");
            this.profileInfo = this.shadowRoot.querySelector("#profileInfo");
            this.logout = this.shadowRoot.querySelector("#logout");

            this.account.removeEventListener("click", this.clickHandler);
            this.clickHandler = () => {
                //console.log("test");
                this.profileInfo.classList.toggle("hidden");
            };
            this.account.addEventListener("click", this.clickHandler);
            this.logout.removeEventListener("click", this.Logout);
            this.logout.addEventListener("click", this.Logout);

        });
    }
    Logout() {
        this.dispatchEvent(new CustomEvent("signOut", {
            bubbles: true,
            composed: true,
        }))
    }

    ChangePageEvent(id) {
        this.dispatchEvent(new CustomEvent("ChangePageEvent", {
            bubbles: true,
            composed: true,
            detail: id
        }))
    }

    //update de navigatie wanneer er iemand in of uitlogd
    Update(user) {

        if (user != null) {
            this.button.forEach(btn => {
                btn.classList.remove("hidden");
            })
            this.button.forEach(btn => {
                btn.classList.remove("active");
            })
            this.button.forEach(btn => {
                if (btn.getAttribute("id") == "login") {
                    btn.classList.add("hidden");
                }
            })
            this.account.classList.remove("hidden");
        }
        else {
            this.button.forEach(btn => {
                btn.classList.remove("hidden");
            })
            this.button.forEach(btn => {
                btn.classList.remove("active");
            })
            this.button.forEach(btn => {
                if (btn.getAttribute("id") == "myGames") {
                    btn.classList.add("hidden");
                }
            })
            this.account.classList.add("hidden");
        }
    }

}

customElements.define('navigatie-comp', comp)