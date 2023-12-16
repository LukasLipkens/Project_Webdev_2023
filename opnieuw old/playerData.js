let value;



export const playingInfo = [
    {
        fieldData: [
            { gameId: 1, date: getDate(), startTime: getStartingTime(), endTime: getEndingTime(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomNonTwoScore(value), status: "on" },
            { gameId: 2, date: getDate(), startTime: getStartingTime(), endTime: getEndingTime(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomNonTwoScore(value), status: "fin" },
            { gameId: 3, date: getDate(), startTime: getStartingTime(), endTime: getEndingTime(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomNonTwoScore(value), status: "fin" },
            { gameId: 4, date: getDate(), startTime: getStartingTime(), endTime: getEndingTime(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomNonTwoScore(value), status: "fin" },
            { gameId: 5, date: getDate(), startTime: getStartingTime(), endTime: getEndingTime(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomNonTwoScore(value), status: "fin" },
            { gameId: 6, date: getDate(), startTime: getStartingTime(), endTime: getEndingTime(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomNonTwoScore(value), status: "fin" },
            { gameId: 7, date: getDate(), startTime: getStartingTime(), endTime: getEndingTime(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomNonTwoScore(value), status: "fin" },
            { gameId: 8, date: getDate(), startTime: getStartingTime(), endTime: getEndingTime(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomNonTwoScore(value), status: "fin" },
            { gameId: 9, date: getDate(), startTime: getStartingTime(), endTime: getEndingTime(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomNonTwoScore(value), status: "fin" },
            { gameId: 10, date: getDate(), startTime: getStartingTime(), endTime: getEndingTime(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomNonTwoScore(value), status: "fin" },
            { gameId: 11, date: getDate(), startTime: getStartingTime(), endTime: getEndingTime(), player1: getRandomName(), player2: getRandomName(), player1Score: getRandomScore(), player2Score: getRandomNonTwoScore(value), status: "fin" }],
        scoringData: [
            { gameId: 2, teamId: 1, setNr: 1, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
            { gameId: 2, teamId: 1, setNr: 2, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
            { gameId: 4, teamId: 1, setNr: 3, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
            { gameId: 3, teamId: 1, setNr: 2, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
            { gameId: 3, teamId: 1, setNr: 3, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
            { gameId: 1, teamId: 1, setNr: 1, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
            { gameId: 1, teamId: 1, setNr: 3, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
            { gameId: 1, teamId: 1, setNr: 4, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
            { gameId: 8, teamId: 1, setNr: 1, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
            { gameId: 8, teamId: 1, setNr: 2, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
            { gameId: 5, teamId: 1, setNr: 1, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
            { gameId: 5, teamId: 1, setNr: 2, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() },
            { gameId: 5, teamId: 1, setNr: 2, team1Points: getRandomSetScore(), team2Points: getRandomSetScore() }]
    }];

function getRandomName() {
    const namesArray = ["Ruan", "Lukas", "Simon", "Thomas", "Niels", "Hamza", "Siegmund", "Benny"];
    return namesArray[Math.floor(Math.random() * namesArray.length)];
}

function getRandomScore() {
    value = Math.floor(Math.random() * 3);
    return value;
}

function getRandomNonTwoScore(player1Score) {
    let score = getRandomScore();
    if (player1Score == 2) {
        do {
            score = getRandomScore();
        } while (score == 2)
    }
    else {
        score = 2;
    }
    return score;
}

function getRandomSetScore() {
    return Math.floor(Math.random() * 7);
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
