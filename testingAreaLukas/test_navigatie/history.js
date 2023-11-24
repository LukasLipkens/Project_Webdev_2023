//#region IMPORTS

//#endregion IMPORTS

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <style>
        .history-container {
            width: 100%;
            border: 3px solid black;
        }

        .history-item {
            border: 1px solid #ccc;
            margin: 5px;
            padding: 10px;
            cursor: pointer;
        }

        .history-item.expanded {
            height: 300px; 
        }

        .history-item-content {
            display: none;
        }

        .history-item.expanded .history-item-content {
            display: block;
        }
    </style>

    <div class="history-container">
        <div class="history-item" id="item1">
            <h3>Event 1</h3>
            <div class="history-item-content">
                <p>Additional information about Event 1...</p>
            </div>
        </div>

        <div class="history-item" id="item2">
            <h3>Event 2</h3>
            <div class="history-item-content">
                <p>Additional information about Event 2...</p>
            </div>
        </div>

        <div class="history-item" id="item3">
            <h3>Event 2</h3>
            <div class="history-item-content">
                <p>Additional information about Event 3...</p>
            </div>
        </div>

        <div class="history-item" id="item4">
            <h3>Event 2</h3>
            <div class="history-item-content">
                <p>Additional information about Event 4...</p>
            </div>
        </div>
    </div>
`

class HistoryComponent extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "open" })
        this.shadow.append(template.content.cloneNode(true))

        // click event for expanding items
        const historyItems = this.shadow.querySelectorAll('.history-item');
        historyItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('expanded');
            });
        });
    }
}

customElements.define('history-comp', HistoryComponent)