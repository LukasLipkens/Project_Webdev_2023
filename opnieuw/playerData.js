export const playerData = [
    { gameId: 1, date: getDate(), startTime: getStartingTime(), endTime: getEndingTime(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 2, date: getDate(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 3, date: getDate(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 4, date: getDate(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 5, date: getDate(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 6, date: getDate(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 7, date: getDate(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 8, date: getDate(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 9, date: getDate(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
    { gameId: 10, date: getDate(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomScore() },
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
    { gameId: 3, teamId: 1, setNr: 1, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 3, teamId: 1, setNr: 2, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 3, teamId: 1, setNr: 3, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 1, teamId: 1, setNr: 1, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 1, teamId: 1, setNr: 2, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 1, teamId: 1, setNr: 3, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 1, teamId: 1, setNr: 4, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 1, teamId: 1, setNr: 5, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 8, teamId: 1, setNr: 1, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 8, teamId: 1, setNr: 2, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 8, teamId: 1, setNr: 3, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 8, teamId: 1, setNr: 4, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 8, teamId: 1, setNr: 5, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 5, teamId: 1, setNr: 1, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
    { gameId: 5, teamId: 1, setNr: 2, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
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

function getDate() {
    let currentDate = new Date();

    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear() % 100;

    let dateText = `${day}/${month}/'${year}`;
    return dateText;
}

function getStartingTime() {
    let currentTime = new Date();

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
}

function getEndingTime() {
    let currentTime = new Date();

    let hours = currentTime.getHours() + 2;
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
}
