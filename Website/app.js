//#region IMPORTS
import "./scoreBord.js"
import "./navigation.js"
import "./home.js"
import "./history.js"
import "./logIn.js"
import "./games.js"
//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <navi-comp></navi-comp>
    <div id="mainPage"></div>
`

class app extends HTMLElement
{
    constructor(){
        super()
        const shadow = this.attachShadow({mode: "open"}) // zorgt ervoor dart het component een afgeschermde stijl kan hebben
        shadow.append(template.content.cloneNode(true))

        this.cachedPages = [];
        this.currentPage = "";
        this.mainPage = this.shadowRoot.querySelector("#mainPage");
    }

    ChangePageEvent(e){
        console.log("btnPress Received " + e.detail);

        this.showPages(e.detail);
    }

    connectedCallback(){
        this.addEventListener("ChangePageEvent", this.ChangePageEvent);
        this.showPages("home")
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
    
}

customElements.define('app-comp', app)