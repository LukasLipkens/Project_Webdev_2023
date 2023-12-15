//#region IMPORTS
import "./MatchLine.js"
import playersAndScores from "./playersData.js";
//#endregion IMPORTS

const template = document.createElement("template");
template.innerHTML = /*html*/ `

    <style>
        .big-container {
            border: 2px solid black;
            border-radius: 10px;
            width: 1200px;
            margin: auto;
            margin-top: 20px;
            padding-top: 10px;
        }
        .anotherone {
            border: 1px solid black;
            position: absolute;
            top: 0;
            left: 48%;
            cursor: pointer;
            background-color: white;
            border-radius: 10px;
            width: 50px;
            user-select: none;
            font-size: 25px;
        }
        .title {
            font-size: 60px;
            margin: 0 auto;
            padding-bottom: 15px;
            text-align: center;
        }

        .pagination {
            display: flex;
            list-style: none;
            margin: 10px 50px 15px 0;
            justify-content: flex-end;
        }
        .pagination li {
            margin: 0 5px;
            cursor: pointer;
        }
        .componentsContainer {
            border: 5px solid yellow;
        }
    </style>

    <div class="big-container">
        <p class="title">All Played Games</p>
        <p class="anotherone">Add</p>
            <ul id="pagination" class="pagination"></ul>
        <div id="page-1">
            <div class="componentsContainer"></div> 
        </div>
    </div>
`;

class HistoryComponent extends HTMLElement {
    latestMatchId = 0;
    itemsPerPage = 8;
    currentPage = 1;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));

        this.bigContainer = this.shadowRoot.querySelector('.big-container');
        this.paginationContainer = this.shadowRoot.querySelector('#pagination');
        this.componentsContainer = this.shadowRoot.querySelector('.componentsContainer'); // disappears after first match-comp's being updated on page ??????

        this.append = true;
        this.previousComponent = null;

        this.shadowRoot.querySelector('.anotherone').addEventListener('click', () => this.createNewMatchComponent());
    }

    createNewMatchComponent() {
        this.newMatch = document.createElement('match-comp');
        this.newMatch.setAttribute('id', this.getNewMatchId());

        this.newMatch.addEventListener('toggleContent', (e) => {
            this.onMatchCompToggle(e)
        });

        this.editScoreAndPlayers();

        this.addComponent(this.newMatch);

        this.updatePage();
    }

    getNewMatchId() {
        return `match-${++this.latestMatchId}`;
    }

    onMatchCompToggle(e) {
        const matchId = e.detail.matchId;
        const matchComponents = this.shadowRoot.querySelectorAll('match-comp');

        matchComponents.forEach((comp) => {
            let isMatchIdEqual = comp.getAttribute('id') === matchId;
            comp.toggle(isMatchIdEqual);
        });
    }

    editScoreAndPlayers() {
        const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

        const player1 = getRandomItem(playersAndScores);
        let player2;
        do {
            player2 = getRandomItem(playersAndScores);
        } while (player1 == player2)

        const score1 = player1.score;
        const score2 = player2.score;

        let winningSide;
        if (score1 > score2) {
            winningSide = 'left';
        }
        else if (score2 > score1) {
            winningSide = 'right';
        }
        else {
            winningSide = 'both';
        }

        this.newMatch.setAttribute('playerName1', player1.name);
        this.newMatch.setAttribute('playerName2', player2.name);
        this.newMatch.setAttribute('score1', score1);
        this.newMatch.setAttribute('score2', score2);
        this.newMatch.setAttribute('whoWon', winningSide);
    }

    addComponent(nextComponent) {
        if (this.append) {
            this.componentsContainer.append(nextComponent);
            this.append = false;
            this.previousComponent = nextComponent;
        }
        else {
            this.componentsContainer.insertBefore(nextComponent, this.previousComponent);
            this.previousComponent = nextComponent;
        }
    }

    updatePage() {
        const matchComponents = Array.from(this.componentsContainer.querySelectorAll('match-comp'));
        const totalItems = matchComponents.length;
        this.totalPages = Math.ceil(totalItems / this.itemsPerPage);

        if (this.currentPage < 1) {
            this.currentPage = 1;
        } 
        else if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
        }
        console.log('current page right now: ', this.currentPage);

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;

        console.log('total match comp: ', totalItems);
        console.log('starting index: ', startIndex);
        console.log('ending index: ', endIndex);

        for (let i = 1; i <= this.totalPages; i++) {
            const container = this.shadowRoot.getElementById(`page-${i}`);
            if (container) {
                container.style.display = 'none';
            }
        }

        let currentPageContainer = this.shadowRoot.getElementById(`page-${this.currentPage}`);
        // let pageContent;
        if (!currentPageContainer) {
            currentPageContainer = document.createElement('div');
            currentPageContainer.setAttribute('id', `page-${this.currentPage}`);

            // pageContent = document.createElement('div');
            // pageContent.classList.add('.componentsContainer');

            // currentPageContainer.appendChild(pageContent);
            this.bigContainer.appendChild(currentPageContainer);
        }

        currentPageContainer.innerHTML = '';

        for (let i = startIndex; i < endIndex && i < totalItems; i++) {
            const matchComponent = matchComponents[i].cloneNode(true);
            currentPageContainer.appendChild(matchComponent);
        }

        currentPageContainer.style.display = 'block';

        this.updatePagination();
    }

    updatePagination() {
        this.paginationContainer.innerHTML = '';

        for (let i = 1; i <= this.totalPages; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = i;

            listItem.addEventListener('click', () => {
                this.currentPage = i;
                this.updatePage();
                this.updatePagination();
            });

            if (i === this.currentPage) {
                listItem.style.fontWeight = 'bold';
            }

            this.paginationContainer.append(listItem);
        }
    }
}

customElements.define('history-comp', HistoryComponent);
