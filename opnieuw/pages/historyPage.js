//#region IMPORTS

//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
history
`

class comp extends HTMLElement
{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.shadow.append(template.content.cloneNode(true));
        
        }
}

customElements.define('history-comp', comp)