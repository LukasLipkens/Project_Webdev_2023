//#region IMPORTS
import "../playedMatches/matchScore.js";
//#endregion IMPORTS

const template = document.createElement("template");
template.innerHTML = /*html*/ `
    <style>

        #historyContainer {
            border: 2px solid black;
            border-radius: 10px;
            width: 1200px;
            margin: auto;
            margin-top: 20px;
            padding-top: 10px;
        }
        #title {
            font-size: 60px;
            margin: 0 auto;
            text-align: center;
        }
        #pageContainer {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            margin-top: 20px;
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
            padding-right: 55px;
        }
        #pagination li {
            font-size: 18px;
            font-weight: bold;
            padding: 5px 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            cursor: pointer;
        }
        #pagination li.active {
            box-shadow: inset 0 0 2px green;
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



        this.currentPage = 1;
        this.itemsPerPage = 8;

        this.pageContainer = this.shadowRoot.querySelector('#pageContainer');
        this.pagination = this.shadowRoot.querySelector('#pagination');
    }

    connectedCallback() {
        this.matchData = [];
        this.socket = new WebSocket("ws://localhost:8080");
        this.socket.addEventListener("message", (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                console.log(reader.result);
                let message = reader.result;
                if (message == "refresh") {
                    console.log("refreshing");
                    this.fetchGames();
                }
            }
            reader.readAsText(e.data);

        });
        this.fetchGames();
    }
    fetchGames() {
        fetch('./test_php/getHistory.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                this.matchData = data;
                this.renderPage();
            })
    }

    renderPage() {
        this.totalPages = Math.ceil(this.matchData.length / this.itemsPerPage);

        this.showPage();
        this.renderPagination(this.totalPages);
    }

    showPage() {
        this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
        this.endIndex = this.startIndex + this.itemsPerPage;
        this.pageItems = this.matchData.slice(this.startIndex, this.endIndex);

        this.pageContainer.innerHTML = "";

        for (let item of this.pageItems) {
            this.matchComponent = document.createElement('match-comp');

            this.matchComponent.setAttribute('id', item.gameId); // moet er wel zijn om de "pijltjes" te kunnen togglen..
            // this.matchComponent.setAttribute('date', item.date);
            // this.matchComponent.setAttribute('startTime', item.startTime);
            // this.matchComponent.setAttribute('endTime', item.endTime);
            // this.matchComponent.setAttribute('playerName1', item.player1);
            // this.matchComponent.setAttribute('playerName2', item.player2);
            // this.matchComponent.setAttribute('score1', item.player1Score);
            // this.matchComponent.setAttribute('score2', item.player2Score);


            this.matchComponent.setMatchData({
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

            this.pageContainer.append(this.matchComponent);

            this.matchComponent.addEventListener('toggleContent', (event) => {
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

        for (let i = 1; i <= totalPages; i++) {
            this.pageItem = document.createElement('li');
            this.pageItem.textContent = i;
            this.pagination.append(this.pageItem);

            if (i == this.currentPage) {
                this.pageItem.classList.add('active');
            };

            this.pageItem.addEventListener('click', () => {
                this.changePage(i);
            });
        }
    }

    changePage(pageNumber) {
        this.currentPage = pageNumber;
        this.renderPage();
    }
}

customElements.define('history-comp', HistoryComp)