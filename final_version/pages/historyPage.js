//#region IMPORTS
import "../playedMatches/matchScore.js";
//#endregion IMPORTS

const template = document.createElement("template");
template.innerHTML = /*html*/ `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

        #historyContainer {
            border: 5px solid black;
            border-radius: 10px;
            width: 80vw;
            height: 80vh;
            margin: auto;
            margin-top: 20px;
            padding-top: 10px;
            background-color: #E0E0E0;
        }
        #title {
            font-family: 'Anton', sans-serif;
            font-weight: 500;
            text-decoration: underline;
            font-size: 3rem;
            padding-bottom: 10px;
            margin: 0 auto;
            text-align: center;
        }
        #pageContainer {
            display: block;
            flex-direction: column;
            justify-content: space-evenly;
            /*margin-top: 20px;*/
            /*max-height: 600px;*/
            height: 60vh;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        #pageContainer::-webkit-scrollbar {
            width: 8px;
        }
        #pageContainer::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 5px;
        }
        #pageContainer::-webkit-scrollbar-track {
            background-color: #ddd;
            border-radius: 5px;
        }
        #page {
            display: none;
        }
        #page.active {
            display: block;
        }
        #pagination {
            list-style: none;
            display: flex;
            gap: 10px;
            margin-top: 10px;
            justify-content: flex-end;
            padding-right: 80px;
        }
        #pagination li {
            font-size: 18px;
            font-weight: bold;
            padding: 5px 10px;
            border: 1px solid green;
            border-radius: 5px;
            cursor: pointer;
            background-color: white;
        }
        #pagination li.active {
            box-shadow: inset 0 0 5px green;
            color: green;
        }

    </style>

    <div id="historyContainer">
        <p id="title">All Played Games</p>
        <div id="pageContainer">
            <!-- The container for displaying match-line components -->
        </div>
        <ul id="pagination"></ul>
    </div>
`;

class HistoryComp extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.append(template.content.cloneNode(true));

        this.matchData = [];

        this.currentPage = 1;
        this.itemsPerPage = 8;

        this.pageContainer = this.shadowRoot.querySelector('#pageContainer');
        this.pagination = this.shadowRoot.querySelector('#pagination');
    }

    connectedCallback() {
        this.itemsPerPage = parseInt(document.documentElement.scrollHeight * 0.6 /75);
        window.addEventListener('resize', (e) => { this.UpdateItemsPerPage(e)});
        this.GetAllGames();
    }
    UpdateItemsPerPage(e) {
        console.log(e);
        this.itemsPerPage = parseInt(e.target.innerHeight * 0.6 /70);
        console.log(this.itemsPerPage);
        this.renderPage();
    }
    GetAllGames() {
        this.dispatchEvent(new CustomEvent("getHistory", {
            bubbles: true,
            composed: true,
        }))
    }

    Update(gameData) {
        this.matchData = gameData;
        //console.log('history: ', gameData);
        this.renderPage();
    }

    renderPage() {
        this.totalPages = Math.ceil(this.matchData.length / this.itemsPerPage);

        this.showPage();
        this.renderPagination(this.totalPages);
    }

    showPage() {
        this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
        this.endIndex = this.startIndex + this.itemsPerPage;

        this.matchData.sort((a, b) => b.gameId - a.gameId);
        this.pageItems = this.matchData.slice(this.startIndex, this.endIndex);

        this.pageContainer.innerHTML = "";

        for (let i = 0; i < this.pageItems.length; i++) {
            const item = this.pageItems[i];
            console.log('history: ', item);
            let matchComponent = document.createElement('match-comp');
            matchComponent.setAttribute('id', item.gameId);

            matchComponent.setMatchData({
                gameId: item.gameId,
                date: item.date,
                startTime: item.starttijd,
                endTime: item.eindtijd,
                player1: item["team1 names"],
                player2: item["team2 names"],
                score1: item["team1 sets"],
                score2: item["team2 sets"],
                scoringData: item["points"],
            });
            this.pageContainer.append(matchComponent);

            matchComponent.addEventListener('toggleContent', (event) => {
                this.toggleMatchComp(event.detail);
            });
        }
    }

    toggleMatchComp(gameId) {
        this.matchComponents = this.shadowRoot.querySelectorAll('match-comp');
        this.matchComponents.forEach((component) => {
            let componentId = component.getAttribute('id');
            if (componentId == gameId) {
                component.toggle(true);
            } else {
                component.toggle(false);
            }
        });
    }

    renderPagination(totalPages) {
        this.pagination.innerHTML = "";

        // calculates the range of visible page buttons (in this case 3 at a time)
        this.startPage = Math.max(1, this.currentPage - 1);
        this.endPage = Math.min(totalPages, this.startPage + 2);

        // Previous Button
        if (this.currentPage > 1) {
            this.createPaginationButton("Previous", this.currentPage - 1);
        }

        // Page Numbers
        for (let i = this.startPage; i <= this.endPage; i++) {
            this.createPaginationButton(i, i);
        }

        // Next Button
        if (this.currentPage < totalPages) {
            this.createPaginationButton("Next", this.currentPage + 1);
        }
    }

    createPaginationButton(label, pageNumber) {
        this.pageItem = document.createElement('li');
        this.pageItem.textContent = label;
        this.pagination.append(this.pageItem);

        if (label === this.currentPage || (label === "Previous" && this.currentPage === pageNumber - 1) || (label === "Next" && this.currentPage === pageNumber + 1)) {
            this.pageItem.classList.add('active');
        }

        this.pageItem.addEventListener('click', () => {
            this.changePage(pageNumber);
        });
    }

    changePage(pageNumber) {
        this.currentPage = pageNumber;
        this.renderPage();
    }
}

customElements.define('history-comp', HistoryComp)