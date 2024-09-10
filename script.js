const taeminTracks = [
    "Danger",
    "Drip Drop",
    "Press Your Number",
    "MOVE",
    "WANT",
    "Criminal",
    "IDEA",
    "Advice",
    "Guilty",
    "The Rizzness",
    "Sexy In The Air",
    "Horizon"
];

let leftIndex = 0;
let rightIndex = 1;
let results = [];

function updateOptions() {
    if (leftIndex >= taeminTracks.length - 1) {
        // If all comparisons are done, show the results.
        showResults();
        return;
    }

    document.getElementById('options').innerHTML = `
        <h3>${taeminTracks[leftIndex]} vs ${taeminTracks[rightIndex]}</h3>
    `;
}

function sortTracks(winnerIndex, loserIndex) {
    const winner = taeminTracks[winnerIndex];
    const loser = taeminTracks[loserIndex];

    // Add winner and loser to results if not already there
    if (results.indexOf(winner) === -1) {
        results.push(winner);
    }
    if (results.indexOf(loser) === -1) {
        results.push(loser);
    }

    // Move to the next comparison
    rightIndex++;
    if (rightIndex >= taeminTracks.length) {
        leftIndex++;
        rightIndex = leftIndex + 1;
    }

    // Check if we are done with all comparisons
    if (leftIndex >= taeminTracks.length - 1) {
        showResults();
    } else {
        updateOptions();
    }
}

function showResults() {
    document.getElementById('container').style.display = 'none';
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';

    const rankings = document.getElementById('rankings');
    rankings.innerHTML = '';
    results.forEach(track => {
        rankings.innerHTML += `<li>${track}</li>`;
    });
}

document.getElementById('left-button').addEventListener('click', () => {
    sortTracks(leftIndex, rightIndex);
});

document.getElementById('right-button').addEventListener('click', () => {
    sortTracks(rightIndex, leftIndex);
});

updateOptions();
