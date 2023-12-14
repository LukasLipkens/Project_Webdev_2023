const playerData = [
    { gameId: 1, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 2, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 3, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 4, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 5, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 6, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 7, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 8, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 9, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() }
    // ...
];

function getRandomName() {
    const namesArray = ["Ruan", "Lukas", "Simon", "Thomas", "Niels", "Hamza", "Siegmund", "Benny"];
    return namesArray[Math.floor(Math.random() * namesArray.length)];
}

function getRandomScore() {
    return Math.floor(Math.random() * 6);
};

export default playerData;