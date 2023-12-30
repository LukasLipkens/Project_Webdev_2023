//#region IMPORTS

//#endregion IMPORTS

/*
    dit component is een formuliertje wat moet worden ingevuld wanneer je een game wil aanmaken.
*/

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
    #createGameForm{
        width: 300px;
        border: 2px solid black;
        background-color: #f0f0f0;
        border-radius: 10px;
        text-align: center;
    }
    .topText{
        background-color: #006400;
        margin: 0;
        padding: 5px;
        color: #0c0c0c;
        border-radius: 8px 8px 0px 0px;
        font-size: 2.5em;
    }
    #gameTypeSelector{
        width: 50%;
    }

    /*#region select*/
    .radio-input input {
        display: none;
    }

    .radio-input {
        --container_width: 300px;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        border-radius: 0 0 15px 15px;
        background-color: rgb(1, 184, 90);;
        color: #000000;
        width: var(--container_width);
        overflow: hidden;
        margin-bottom: 10px;
    }

    .radio-input label {
        width: 100%;
        padding: 10px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        font-weight: 600;
        letter-spacing: -1px;
        font-size: 14px;
    }

    .selection {
        display: none;
        position: absolute;
        height: 100%;
        width: calc(var(--container_width) / 2);
        z-index: 0;
        left: 0;
        top: 0;
        transition: .15s ease;
    }

    .radio-input label:has(input:checked) {
        color: #c2c2c2;
    }

    .radio-input label:has(input:checked) ~ .selection {
        background-color: #006400;
        display: inline-block;
    }

    .radio-input label:nth-child(1):has(input:checked) ~ .selection {
        transform: translateX(calc(var(--container_width) * 0/2));
    }

    .radio-input label:nth-child(2):has(input:checked) ~ .selection {
        transform: translateX(calc(var(--container_width) * 1/2));
    }
    /*#endregion select*/

    /*#region input*/
    .inputBox {
        position: relative;
        padding: 10px;
    }

    .inputBox input {
        padding: 15px 20px;
        outline: none;
        background: transparent;
        border-radius: 10px;
        border: 1px solid#000000;
        font-size: 1em;
    }

    .inputBox span {
        position: absolute;
        left: 0;
        font-size: 0.7em;
        transform: translateX(14px) translateY(-7.5px);
        padding: 0 6px 1px 5px;
        border-radius: 2px;
        background: #212121;
        letter-spacing: 1px;
        border: 1px solid #e8e8e8;
        color: #e8e8e8;
    }

    h3{
        margin: 0;
    }
    /*#endregion input*/

    /*#region btn*/
    #btnDiv{
        width: fit-content;
        margin: auto;
        padding-bottom: 10px;
        display:flex
    }
    button {
        cursor: pointer;
        font-weight: 700;
        font-family: Helvetica,"sans-serif";
        transition: all .2s;
        padding: 10px 20px;
        border-radius: 100px;
        background: rgb(1, 184, 90);
        border: 1px solid transparent;
        display: flex;
        align-items: center;
        font-size: 15px;
        margin: 5px;
    }

    button:hover {
        background: #006400;
        color: #c2c2c2;
    }   

    button > svg {
        width: 34px;
        margin-left: 10px;
        transition: transform .3s ease-in-out;
    }

    button:hover svg {
        transform: translateX(5px);
    }

    button:active {
        transform: scale(0.95);
    }
    /*#endregion btn*/

    .double{
        display: none;
    }
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <div id="createGameForm">
        <p class="topText">Create Game</p>
        <div class="radio-input">
            <label>
            <input class="gameMode" type="radio" id="value-1" name="value-radio" value="solo" checked="checked">
            <span>solo</span>
            </label>
            <label>
              <input class="gameMode" type="radio" id="value-2" name="value-radio" value="double">
            <span>double</span>
            </label>
            <span class="selection"></span>
          </div>

          <div id="team1">
            <h3>Team 1:</h3>
              <div class="inputBox">
                <input id="team1Player1" player="1" type="text" placeholder="Name here...">
                <span>Player 1:</span>
              </div>
    
              <div class="inputBox double">
                <input id="team1Player2" player="2" type="text" placeholder="Name here...">
                <span>Player 2:</span>
              </div>
          </div>

          <div id="team2">
            <h3>Team 2:</h3>
              <div class="inputBox">
                <input id="team2Player1" player="3" type="text" placeholder="Name here...">
                <span>Player 1:</span>
              </div>
    
              <div class="inputBox double">
                <input id="team2Player2" player="4" type="text" placeholder="Name here...">
                <span>Player 2:</span>
              </div>
          </div>
          <div id="btnDiv">
                <button id="cancelBtn">cancel</button>
                <button id="continueBtn">
                    <span>Continue</span>
                    <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                        <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                    </svg>
                </button>
          </div>
    </div>
`

class comp extends HTMLElement
{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.shadow.append(template.content.cloneNode(true));
        //#region elementSelection
        this.gameTypeElement = this.shadowRoot.querySelectorAll(".gameMode");
        this.continue = this.shadowRoot.querySelector("#continueBtn");
        this.cancel = this.shadowRoot.querySelector("#cancelBtn");
        //#endregion

        this.gameType = "solo";
        }
        connectedCallback(){
            this.playerList = [];

            this.gameTypeElement.forEach(option => {
                option.addEventListener("click", ()=>{
                    this.gameType = option.value;
                    this.updateForm();
                });
            });
            this.continue.addEventListener("click", ()=>{
                this.createGame();
            });
            this.cancel.addEventListener("click", ()=>{
                this.cancelGame();
            });

            this.inputs = this.shadowRoot.querySelectorAll(".inputBox input");
            this.inputs.forEach(input => {
                let divplayerList = document.createElement('div');
                divplayerList.classList.add('playerList');
                input.parentNode.appendChild(divplayerList);

            input.addEventListener("keyup", (event)=>{
                //we maken hier target aan zodat dit ook nog beschikbaar is in de fetch
                let target = event.target;

                //Hier resetten we even alle playerLists
                let allLists = this.shadowRoot.querySelectorAll(".playerList");
                allLists.forEach(element => { element.innerHTML = ""; });

                fetch('./test_php/searchUser.php?search='+ event.target.value, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    
                }
            })
            .then(response => response.json())
            .then(data => {
                                        //Hiermee zorgen we ervoor dat de playerList van de juiste input wordt aangepast
                                        let divplayerListS = target.parentNode.querySelector(`.playerList`);
                                        divplayerListS.innerHTML = "";
                
                                        if(data.length != 0 && target.value != ""){
                                            data.forEach(element => {
                                                //console.log(element);
                                                divplayerListS.innerHTML += "<p>"+element.gebruikersnaam+"</p>";
                                            });
                                            let playerOptions = divplayerListS.querySelectorAll("p");
                                            playerOptions.forEach((playerOption, index) => {
                                                playerOption.addEventListener("click", ()=>{
                                                    let indexP = target.getAttribute("player");
                                                    this.playerList[indexP-1] = data[index];
                                                    //console.log(this.playerList);
                                                    target.value = playerOption.innerHTML;
                                                    divplayerListS.innerHTML = "";
                                                });
                                            });
                                        
                                        }
                                    })

        });
    });
    }

//deze functie zorgt ervoor dat je kan wisselen tussen een 1v1 en een 2v2 wedstrijd
        updateForm(){
            switch (this.gameType)
            {
                case "solo":
                    this.shadowRoot.querySelectorAll(".double").forEach(element => {
                        element.style.display = "none";
                    });
                    break;
                case "double":
                    this.shadowRoot.querySelectorAll(".double").forEach(element => {
                        element.style.display = "block";
                    });
                    break;
            }
        }
//#region create or cancel gameCreation

    /*
    deze functie gaat kijken of al de velden voor het gametype dat je wil aanmaken zijn ingevuld
    als dit niet het geval is of er zijn namen die meer dan 1 keer voorkomen gebruikt wordt er een error gegeven

    */
    createGame(){
        let players = [];
        let team1Player1 = this.shadowRoot.querySelector("#team1Player1").value;
        let team1Player2 = this.shadowRoot.querySelector("#team1Player2").value;
        let team2Player1 = this.shadowRoot.querySelector("#team2Player1").value;
        let team2Player2 = this.shadowRoot.querySelector("#team2Player2").value;

        let errors = [];
        let errorstring = "";

        switch (this.gameType)
        {
            case "solo":
                if(team1Player1!="" && players.indexOf(team1Player1) == -1){players.push(team1Player1);}
                else{errors.push("error: Player1Team1");}

                if(team2Player1!="" && players.indexOf(team2Player1) == -1){players.push(team2Player1);}
                else{errors.push("error: Player2Team1");}

                break;
            case "double":
                if(team1Player1!="" && players.indexOf(team1Player1) == -1){players.push(team1Player1);}
                else{errors.push("error: Player1Team1");}

                if(team1Player2!="" && players.indexOf(team1Player2) == -1){players.push(team1Player2);}
                else{errors.push("error: Player1Team2");}

                if(team2Player1!="" && players.indexOf(team2Player1) == -1){players.push(team2Player1);}
                else{errors.push("error: Player2Team1");}

                if(team2Player2!="" && players.indexOf(team2Player2) == -1){players.push(team2Player2);}
                else{errors.push("error: Player2Team2");}

                break;
        }

        if(errors.length != 0){
            errors.forEach(element => {
                
                errorstring += element + "\r\n";
            });
            alert(errorstring);
        }
        else{
            this.AddGame(this.playerList);
        }
    }
    //als je op cancel drukt verdwijnd de game weer
    cancelGame(){
        let array = ["cancel"];
        this.AddGame(array);
    }
    //als je op adgame drukt wordt er een event gebruikt dat al de speler info doorgeeft
    AddGame(info){
        this.dispatchEvent(new CustomEvent("addGame", {
            bubbles: true,
            composed: true,
            detail: info
        }))
    }
//#endregion create or cancel gameCreation

}

customElements.define('create-comp', comp)