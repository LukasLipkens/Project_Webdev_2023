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

class comp extends HTMLElement
{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.shadow.append(template.content.cloneNode(true));

        //navigatie
        this.cachedPages = []; //pagina's die al eerder werden weergegeven
        this.currentPage = ""; //pagina die momenteel wordt weergegeven
        this.mainPage = this.shadowRoot.querySelector(".mainPage");
        this.gamesData = []; //in deze array komen de games die moeten worden weergegeven op de homepagina


        this.scoreObject = { //dit is een testje
            game: 2,
            team1: {
                players: ["testPersoon1"],
                points: 15,
                game: 1,
                sets: 1,
            },
            team2: {
                players: ["testPersoon2"],
                points: 30,
                game: 4,
                sets: 0,
            },
            serving: 1,
        }
    }

    connectedCallback(){
        this.addEventListener("ChangePageEvent", this.ChangePageEvent);
        this.showPages("home") //beginPagina laten zien bij laden site
    }
//#region update page
    ChangePageEvent(e){
        console.log("btnPress Received " + e.detail);        
        this.showPages(e.detail);
    }
    showPages(page)
    {
        
        for(let oldPage of this.cachedPages){
                this.shadowRoot.querySelector(`#${oldPage}`).style.display = "none";
                
        }

        if(this.cachedPages.indexOf(page) !== -1){
            console.log("i already cached! " + page)
            
            this.shadowRoot.querySelector(`#${page}`).style.display = "block";
            this.shadowRoot.querySelector(`#${page}`).setAttribute("hasupdate", "true"); //checken of er een nieuwe match gestart is of niet het updaten van de punten wordt in het scorebord component gedaan volgens mij

        }
        else{
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