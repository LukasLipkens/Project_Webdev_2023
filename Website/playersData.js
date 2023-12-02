
const playersAndScores = [
    { name: "Ruan", score: getRandomScore() },
    { name: "Lukas", score: getRandomScore() },
    { name: "Simon", score: getRandomScore() },
    { name: "Thomas", score: getRandomScore() },
    { name: "Niels", score: getRandomScore() },
    { name: "Hamza", score: getRandomScore() },
    { name: "Siegmund", score: getRandomScore() },
    { name: "Benny", score: getRandomScore() }
    // ...
];

function getRandomScore() {
    return Math.floor(Math.random() * 6);
};

export default playersAndScores;