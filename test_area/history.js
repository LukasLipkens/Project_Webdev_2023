//#region IMPORTS
import "./MatchLine.js"
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
        <div id="content">...</div>
        <ul id="pagination" class="pagination">...</ul>
        <div class="componentsContainer"></div>
    </div>
`;

class HistoryComponent extends HTMLElement {
    latestMatchId = 0;
    itemsPerPage = 8;
    currentPage = 1;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.append(template.content.cloneNode(true));

        this.bigContainer = this.shadow.querySelector('.big-container');
        this.contentContainer = this.shadow.getElementById('content');
        this.paginationContainer = this.shadow.getElementById('pagination');
        this.componentsContainer = this.shadow.querySelector('.componentsContainer');

        this.append = true;
        this.previousComponent = null;
    }

    connectedCallback() {
        console.log('latestMatch:', this.latestMatchId);
        const another = this.shadow.querySelector('.anotherone');

        another.addEventListener('click', () => {
            this.createNewMatchComponent();
        })
    }

    createNewMatchComponent() {
        this.newMatch = document.createElement('match-comp');

        this.newMatch.setAttribute('id', this.getNewMatchId());
        console.log('newMatchId', this.latestMatchId);

        this.newMatch.addEventListener('toggleContent', (e) => {
            this.onMatchCompToggle(e);
        })

        this.editScoreAndPlayers();

        this.updatePage();
    }

    editScoreAndPlayers() {
        const names = ["Ruan", "Lukas", "Simon", "Thomas", "Niels", "Hamza", "Siegmund", "Benny", "Jule", "Mathijs", "Ragnar", "Zoran", "Philip", "Warre"];
        const randomName1 = names[Math.floor(Math.random() * names.length)];
        const randomName2 = names[Math.floor(Math.random() * names.length)];
        const randomScore1 = Math.floor(Math.random() * 7);
        const randomScore2 = Math.floor(Math.random() * 7);

        let winningSide = '';
        if (randomScore1 > randomScore2) {
            winningSide = 'left';
        }
        else if (randomScore2 > randomScore1) {
            winningSide = 'right';
        }
        else {
            winningSide = 'both';
        }

        this.newMatch.setAttribute('playerName1', randomName1);
        this.newMatch.setAttribute('playerName2', randomName2);
        this.newMatch.setAttribute('score1', randomScore1);
        this.newMatch.setAttribute('score2', randomScore2);
        this.newMatch.setAttribute('whoWon', winningSide);

        this.addComponent(this.newMatch);
    }

    getNewMatchId() {
        //verhogen voordat deze wordt opgeroepen.
        return `match-${++this.latestMatchId}`;
    }

    onMatchCompToggle(e) {
        const matchId = e.detail.matchId;
        console.log('event: ', matchId);

        const matchComponents = this.shadow.querySelectorAll('match-comp'); // moet apart gedeclareerd 
        matchComponents.forEach(comp => {
            if (comp.getAttribute('id') === matchId) {
                comp.toggle(true);
            }
            else {
                // comp.setExpanded(false);
                comp.toggle(false);
            }
        });
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
        this.contentContainer.innerHTML = ''; // reset

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const matchComponents = Array.from(this.componentsContainer.querySelectorAll('match-comp'));
        const totalItems = matchComponents.length;

        this.updatePagination();
    }

    updatePagination() {
        this.paginationContainer.innerHTML = '';

        const matchComponents = this.shadow.querySelectorAll('match-comp');
        const totalItems = matchComponents.length;
        console.log('total Items', totalItems);

        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        console.log('total pages: ', totalPages);

        for (let i = 1; i <= totalPages; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = i;
            listItem.addEventListener('click', () => {
                this.currentPage = i;
                this.updatePage();
                this.updatePagination();
                console.log('current page: ', this.currentPage);
            });

            if (i == this.currentPage) {
                listItem.style.fontWeight = 'bold';
            }

            this.paginationContainer.append(listItem);
        }
    }
}

customElements.define('history-comp', HistoryComponent);
