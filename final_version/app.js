//#region IMPORTS
import "./navigatie.js"
import "./pages/homePage.js"
import "./pages/historyPage.js"
import "./pages/myGamesPage.js"
import "./pages/login.js"
import "./scorenbord/scorenbord.js"
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



        this.socket = new WebSocket("ws://localhost:8080");
        this.socket.addEventListener("open", () => {
            console.log("connected to server");
        });
        this.socket.addEventListener("message", (e) => {
            let reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState == 2) {
                    let text = reader.result;
                    if (text == "refresh") {
                        this.GetLiveGames();
                        this.GetHistory();
                        if (this.user != null) this.GetUserGames();
                    }
                }
            }
            reader.readAsText(e.data);
        });

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

        //alle pagina's al laden bij het opstarten van de website
        this.showPages("history");
        this.showPages("myGames");
        this.showPages("login");
        this.showPages("home"); //beginPagina laten zien bij laden site
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
                //console.log(data);
                let history = this.shadowRoot.querySelector("history-comp");
                history.Update(data);
            });

    }
    //In getLiveGames roepen we alle live games op en sturen deze door naar de home page
    GetLiveGames() {
        console.log("getLiveGames");
        fetch("./test_php/getLiveGames.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                let home = this.shadowRoot.querySelector("home-comp");
                home.Update(data);
            });
    }
    //In GetUserGames halen we de games van de user op
    GetUserGames() {
        fetch("./test_php/getOwnGames.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let mygames = this.shadowRoot.querySelector("mygames-comp");
                mygames.Update(data);
            });
    }
    //In AddGame voegen we een game toe aan de database , we gebruiken dan getLivegames om de home page te updaten
    AddGame(e) {
        let mygames = this.shadowRoot.querySelector("mygames-comp");
        let playerList = e.detail;
        let gameId = null;
        let teams = [[], []];
        playerList.forEach((player, index) => {
            if (length == 3) {
                if (index == 0) {
                    teams[0].push(player.id);
                }
                else {
                    teams[1].push(player.id);
                }
                return;
            }
            else {
                if (index >= 2) {
                    teams[1].push(player.id);
                }
                else {
                    teams[0].push(player.id);
                }
            }

        });
        // console.log(playerList);
        // console.log(teams);

        fetch("./test_php/addGame.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                gameId = data;
                mygames.createGame(e.detail, gameId);
                teams.forEach((team, index) => {
                    for (let player of team) {
                        console.log(player, team, index + 1);
                        fetch("./test_php/addPlayerToTeam.php?gameId=" + gameId + "&spelerId=" + player + "&teamId=" + (index + 1), {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json; charset=utf-8",
                            },
                        })
                            .then(response => response.json())
                            .then(data => {
                                //console.log(data);
                                this.socket.send("refresh");
                            });
                    }
                });
            });

    }
    //In UpdateGame updaten we een game in de database , we gebruiken dan getLivegames om de home page te updaten
    UpdateGame(e) {
        //console.log(e.detail)
        //hier moet een fetch komen die de game data update van de geme die in e zit
        let scoreObject = e.detail;

        fetch("./test_php/updateGame.php?gameId=" + scoreObject.game + "&puntenT1=" + scoreObject.team1.points + "&puntenT2=" + scoreObject.team2.points + "&gamesT1=" + scoreObject.team1.game + "&gamesT2=" + scoreObject.team2.game + "&setsT1=" + scoreObject.team1.sets + "&setsT2=" + scoreObject.team2.sets + "&serving=" + scoreObject.serving, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(response => response.json())
            .then(data => {
                this.socket.send("refresh");
            });

        //this.GetLiveGames()
    }
    //In EndGame updaten we een game in de database , we gebruiken dan getLivegames om de home page te verwijderen en toe voegen aan de history met getHistory
    EndGame(e) {
        console.log(e);//moet gameId bevatten
        let mygames = this.shadowRoot.querySelector("mygames-comp");

        //hier moet de game beindigd worden in de database (endGame.php)
        fetch("./test_php/endGame.php?gameId=" + e.detail, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                this.socket.send("refresh");

                fetch("./test_php/getHistory.php", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        this.socket.send("refresh");
                        mygames.EndGame(data, e.detail);
                        console.log("ophalen history");
                    }
                    );
            });

    }
    //In AddGameSet voegen we een game set toe aan de database
    AddGameSet(e) {
        console.log("./test_php/addSet.php?gameId=" + e.detail[1] + "&setNr=" + e.detail[0] + "&gamesT1=" + e.detail[2] + "&gamesT2=" + e.detail[3])

        //hier moet de fetch komen (addSet.php)
        fetch("./test_php/addSet.php?gameId=" + e.detail[1] + "&setNr=" + e.detail[0] + "&gamesT1=" + e.detail[2] + "&gamesT2=" + e.detail[3], {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                this.socket.send("refresh");
            });
    }
    //In SignIn loggen we een gebruiker in, als dit niet lukt geven we een error als dit wel lukt updaten we navigatie en slagen user op
    SignIn(e) {
        let userinfo = e.detail;
        fetch("./test_php/login.php?email=" + userinfo.email + "&password=" + userinfo.password, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                if (data == "error") {
                    //console.log("error");
                    let login = this.shadowRoot.querySelector("login-comp");
                    login.Error();
                }
                else {
                    this.user = data;
                    console.log(data);
                    this.showPages("myGames");
                    let navigatie = this.shadowRoot.querySelector("navigatie-comp");
                    navigatie.Update(this.user);
                    this.GetUserGames();

                    /*parsen voor userName xD */
                    let userData = data.split(",");
                    let userName = "";
                    userData.forEach(element => {
                        element = element.replace(/"/g, '');
                        element = element.replace(/{/g, '');
                        element = element.replace(/}/g, '');
                        let temp = element.split(":");
                        console.log(temp);
                        if (temp[0] == "gebruikersnaam") {
                            userName = temp[1];
                            console.log(userName);
                        }
                    });
                    //naam van de player op de mygames pagina zetten
                    let mygames = this.shadowRoot.querySelector("mygames-comp");
                    mygames.shadowRoot.querySelector("#playerName").innerHTML = userName;
                }
            })
    }
    //In SignOut loggen we een gebruiker uit, we updaten navigatie en verwijderen user
    SignOut(e) {
        this.user = null;
        let navigatie = this.shadowRoot.querySelector("navigatie-comp");
        navigatie.Update(this.user);
        this.showPages("home");
        fetch("./test_php/logout.php");
    }
    //In SignUp maken we een nieuwe gebruiker aan, als dit niet lukt geven we een error als dit wel lukt, dan gebruiken we login met deze gegevens en updaten we navigatie en slagen user op
    SignUp(e) {
        fetch("./test_php/addUser.php?email=" + e.detail.email + "&password=" + e.detail.password + "&name=" + e.detail.name, {
            method: "GET",
        })
            .then(response => response.text())
            .then((data) => {
                //console.log(data);
                if (data != "") {
                    console.log(data);
                    let login = this.shadowRoot.querySelector("login-comp");
                    login.Error();
                }
                else {
                    this.SignIn(e);
                }
            }).catch((error) => {
                console.log(error);
            });
    }
    //#region update page
    ChangePageEvent(e) {
        this.showPages(e.detail);
    }
    showPages(page) {

        for (let oldPage of this.cachedPages) {
            this.shadowRoot.querySelector(`#${oldPage}`).style.display = "none";

        }

        if (this.cachedPages.indexOf(page) !== -1) {

            this.shadowRoot.querySelector(`#${page}`).style.display = "block";
            this.shadowRoot.querySelector(`#${page}`).setAttribute("hasupdate", "true"); //checken of er een nieuwe match gestart is of niet het updaten van de punten wordt in het scorebord component gedaan volgens mij

        }
        else {
            this.cachedPages.push(page)

            let newPage = document.createElement(`${page}-comp`);
            newPage.setAttribute("id", page);
            newPage.setAttribute("hasupdate", "false");

            this.mainPage.append(newPage);

        }

    }
    //#endregion updatePage


}

customElements.define('app-comp', comp)