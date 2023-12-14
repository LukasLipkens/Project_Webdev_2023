export const playerData = [
    { gameId: 1, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 2, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 3, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 4, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 5, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 6, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 7, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 8, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 9, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 10, date: "12/12/'23", player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    // ...
];

export const scoreData = [
    { gameId: 2, teamId: 1, setNr: 1, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 2, teamId: 1, setNr: 2, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 2, teamId: 1, setNr: 3, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 2, teamId: 1, setNr: 4, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 2, teamId: 1, setNr: 5, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 2, teamId: 1, setNr: 6, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 2, teamId: 1, setNr: 7, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 2, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 3, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 3, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 3, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 1, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 1, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 1, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 1, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 1, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 8, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 8, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 8, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 8, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 8, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 5, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 5, teamId: 1, setNr: 8, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
];

function getRandomName() {
    const namesArray = ["Ruan", "Lukas", "Simon", "Thomas", "Niels", "Hamza", "Siegmund", "Benny"];
    return namesArray[Math.floor(Math.random() * namesArray.length)];
}

function getRandomScore() {
    return Math.floor(Math.random() * 6);
};

function getRandomSetScore() {
    const setScore = [0, 15, 30, 45];
    return setScore[Math.floor(Math.random() * setScore.length)];
}
