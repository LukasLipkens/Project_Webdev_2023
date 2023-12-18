//#region IMPORTS
import "./navigatie.js"
import "./pages/homePage.js"
import "./pages/historyPage.js"
import "./pages/myGamesPage.js"
import "./pages/loginPage.js"
//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <navigatie-comp></navigatie-comp>
    <div class="mainPage"></div>
`

class comp extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));

        this.user = null; //gebruiker die is ingelogd

        //navigatie
        this.cachedPages = []; //pagina's die al eerder werden weergegeven
        this.currentPage = ""; //pagina die momenteel wordt weergegeven
        this.mainPage = this.shadowRoot.querySelector(".mainPage");
    }

    connectedCallback() {

        this.addEventListener("ChangePageEvent", this.ChangePageEvent);


        this.addEventListener("addGame", this.AddGame);
        this.addEventListener("updateGame", this.UpdateGame);
        this.addEventListener("endGame", this.EndGame);
        this.addEventListener("addGameSet", this.AddGameSet);
        this.addEventListener("signIn", this.SignIn);
        this.addEventListener("signOut", this.SignOut);
        this.addEventListener("signUp", this.SignUp);
        this.addEventListener("getHistory", this.GetHistory);
        this.addEventListener("getLiveGames", this.GetLiveGames);


        this.showPages("home") //beginPagina laten zien bij laden site
    }
    //In getHistory roepen we alle history games op en sturen deze door naar de history page
    GetHistory() {
        fetch("./test_php/getHistory.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let history = this.shadowRoot.querySelector("history-comp");
                history.Update(data);
            });

    }
    //In getLiveGames roepen we alle live games op en sturen deze door naar de home page
    GetLiveGames() {
        fetch("./test_php/getLiveGames.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let home = this.shadowRoot.querySelector("home-comp");
                home.Update(data);
            });


    }
    //In AddGame voegen we een game toe aan de database , we gebruiken dan getLivegames om de home page te updaten
    AddGame(e) {
        let mygames = this.shadowRoot.querySelector("mygames-comp");

        let gameId = null
        if(e.detail.length != 1){
            //hier moet het gameId aangevraagd worden
            //dit moet gedaan worden met een fetch
            gameId = 99;
        }
        mygames.createGame(e.detail, gameId);
    }
    //In UpdateGame updaten we een game in de database , we gebruiken dan getLivegames om de home page te updaten
    UpdateGame(e) {
        console.log(e.detail)
        //hier moet een fetch komen die de game data update van de geme die in e zit
        /*
            fetch("./test_php/updateGame.php?gameId="+this.scoreObject.game+"&puntenT1="+this.scoreObject.team1.points+"&puntenT2="+this.scoreObject.team2.points+"&gamesT1="+this.scoreObject.team1.game+"&gamesT2="+this.scoreObject.team2.game+"&setsT1="+this.scoreObject.team1.sets+"&setsT2="+this.scoreObject.team2.sets+"&serving="+this.scoreObject.serving,{
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            })
            .then(response => response.json())
            .then(data => {
                this.socket.send("refresh");
            });
        */
        this.GetLiveGames()
    }
    //In EndGame updaten we een game in de database , we gebruiken dan getLivegames om de home page te verwijderen en toe voegen aan de history met getHistory
    EndGame(e) {
    }
    //In AddGameSet voegen we een game set toe aan de database
    AddGameSet(e) {
    }
    //In SignIn loggen we een gebruiker in, als dit niet lukt geven we een error als dit wel lukt updaten we navigatie en slagen user op
    SignIn(e) {
    }
    //In SignOut loggen we een gebruiker uit, we updaten navigatie en verwijderen user
    SignOut(e) {
    }
    //In SignUp maken we een nieuwe gebruiker aan, als dit niet lukt geven we een error als dit wel lukt, dan gebruiken we login met deze gegevens en updaten we navigatie en slagen user op
    SignUp(e) {
    }
    //#region update page
    ChangePageEvent(e) {
        console.log("btnPress Received " + e.detail);
        this.showPages(e.detail);
    }
    showPages(page) {

        for (let oldPage of this.cachedPages) {
            this.shadowRoot.querySelector(`#${oldPage}`).style.display = "none";

        }

        if (this.cachedPages.indexOf(page) !== -1) {
            console.log("i already cached! " + page)

            this.shadowRoot.querySelector(`#${page}`).style.display = "block";
            this.shadowRoot.querySelector(`#${page}`).setAttribute("hasupdate", "true"); //checken of er een nieuwe match gestart is of niet het updaten van de punten wordt in het scorebord component gedaan volgens mij

        }
        else {
            this.cachedPages.push(page)
            console.log(`the ${page} has been chached`)

            let newPage = document.createElement(`${page}-comp`);
            newPage.setAttribute("id", page);
            newPage.setAttribute("hasupdate", "false");

            this.mainPage.append(newPage);

        }
        console.log(this.cachedPages);

    }
    //#endregion updatePage


}

customElements.define('app-comp', comp)