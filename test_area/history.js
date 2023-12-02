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
            margin: 10px 0;
            justify-content: center;
            border: 1px solid red;
        }
        .pagination li {
            margin: 0 5px;
            cursor: pointer;
        }
    </style>

    <div class="big-container">
        <p class="title">All Played Games</p>
        <p class="anotherone">Add</p>
            <div id="content"></div>
            <ul id="pagination" class="pagination"></ul>
        <div id="next-1">
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
        this.contentContainer = this.shadowRoot.querySelector('#content');
        this.paginationContainer = this.shadowRoot.querySelector('#pagination');
        this.componentsContainer = this.shadowRoot.querySelector('.componentsContainer');

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

        this.addComponent(this.newMatch);
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
        console.log('Entering updatePage()');

        this.contentContainer.innerHTML = '';

        const matchComponents = Array.from(this.componentsContainer.querySelectorAll('match-comp'));
        const totalItems = matchComponents.length;
        this.totalPages = Math.ceil(totalItems / this.itemsPerPage);

        this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPages));

        console.log('current page right now: ', this.currentPage);

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;

        console.log('total match comp: ', totalItems);
        console.log('starting index: ', startIndex);
        console.log('ending index: ', endIndex);

        let currentPageContainer = this.shadowRoot.getElementById(`next-${this.currentPage}`);

        for (let i = 1; i <= this.totalPages; i++) {
            const container = this.shadowRoot.getElementById(`next-${i}`);
            if (container) {
                container.style.display = 'none';
            }
        }

        if (!currentPageContainer) {
            currentPageContainer = document.createElement('div');
            currentPageContainer.setAttribute('id', `next-${this.currentPage}`);
            currentPageContainer.classList.add('componentsContainer');
            this.bigContainer.appendChild(currentPageContainer);
        }

        currentPageContainer.innerHTML = '';

        for (let i = startIndex; i < endIndex && i < totalItems; i++) {
            currentPageContainer.append(matchComponents[i].cloneNode(true));
        }

        currentPageContainer.style.display = 'block';

        this.updatePagination();

        console.log('Exiting updatePage()');
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
