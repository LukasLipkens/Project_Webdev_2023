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
            user-select: none;
        }
        #title {
            font-family: 'Anton', sans-serif;
            font-weight: 500;
            text-decoration: underline;
            font-size: 3rem;
            padding-bottom: 10px;
            margin: 15px auto;
            text-align: center;
        }
        #pageContainer {
            display: block;
            flex-direction: column;
            justify-content: space-evenly;
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
        match-comp {
            user-select: none;
        }

    </style>

    <div id="historyContainer">
        <p id="title">All Played Games</p>
        <div id="pageContainer">
            <!-- De container voor het tonen van match-components -->
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

    // Wordt uitgevoerd wanneer het element aan de DOM is toegevoegd
    connectedCallback() {
        this.itemsPerPage = parseInt(document.documentElement.scrollHeight * 0.6 / 75);
        window.addEventListener('resize', (e) => { this.UpdateItemsPerPage(e) });
        this.GetAllGames();
    }

    // Werkt het aantal items per pagina bij op basis van vensterhoogte
    UpdateItemsPerPage(e) {
        this.itemsPerPage = parseInt(e.target.innerHeight * 0.6 / 70);
        this.renderPage();
    }

    // Stuurt een custom event om wedstrijdgegevens op te halen bij de app.js
    GetAllGames() {
        this.dispatchEvent(new CustomEvent("getHistory", {
            bubbles: true,
            composed: true,
        }))
    }

    // Haalt alle wedstrijdgegevens op en steek ze in matchData en voert renderPage uit
    Update(gameData) {
        this.matchData = gameData;
        this.renderPage();
    }

    // Berekent het totale aantal pagina's, toont de pagina en tabbladen
    renderPage() {
        this.totalPages = Math.ceil(this.matchData.length / this.itemsPerPage);

        this.showPage();
        this.renderPagination(this.totalPages);
    }

    // Toont de pagina met de bijhorende match-componenten
    showPage() {
        // Bepalen welke match-componenten (op volgorde) worden getoond op die pagina
        this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
        this.endIndex = this.startIndex + this.itemsPerPage;

        // Gesorteerd op oudste match als eerste toegevoegd en nieuwste als laatste toegevoegd
        this.matchData.sort((a, b) => b.gameId - a.gameId);
        this.pageItems = this.matchData.slice(this.startIndex, this.endIndex); // pageItems bevat de nodige matchData voor die bepaalde pagina

        this.pageContainer.innerHTML = "";

        // Componenten worden één voor één aangemaakt en worden gekoppeld aan een eventListener voor te 'toggelen' (arrow svg)
        for (let i = 0; i < this.pageItems.length; i++) {
            const item = this.pageItems[i];
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

    // Eenmaal verstuurde event opgevangen gaat er gezocht worden naar de corresponderende match-component uit de reeks getoonde componenten
    // Gaat match-componenten in/uit toggelen op basis van gameId
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

    // Afhankelijk van de hoeveelheid pagina's worden de knoppen bepaald
    renderPagination(totalPages) {
        this.pagination.innerHTML = "";

        this.startPage = Math.max(1, this.currentPage - 1);
        this.endPage = Math.min(totalPages, this.startPage + 2);

        if (this.currentPage > 1) {
            this.createPaginationButton("Previous", this.currentPage - 1);
        }

        for (let i = this.startPage; i <= this.endPage; i++) {
            this.createPaginationButton(i, i);
        }

        if (this.currentPage < totalPages) {
            this.createPaginationButton("Next", this.currentPage + 1);
        }
    }

    // De knoppen worden aangemaakt en toegevoegd, evenals een event
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

    // Gaat alles resetten en herberekenen voor de volgende geklikte pagina
    changePage(pageNumber) {
        this.currentPage = pageNumber;
        this.renderPage();
    }
}

customElements.define('history-comp', HistoryComp)