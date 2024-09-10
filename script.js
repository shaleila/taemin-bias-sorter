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

let sortedTracks = [];
let compareQueue = [];
let ranking = new Array(taeminTracks.length).fill(null);

// Prepare comparison queue
function prepareComparisonQueue(tracks) {
    for (let i = 0; i < tracks.length; i++) {
        for (let j = i + 1; j < tracks.length; j++) {
            compareQueue.push([i, j]); // Store the index of two tracks to compare
        }
    }
}

function updateOptions() {
    if (compareQueue.length === 0) {
        showResults();
        return;
    }

    const [leftIndex, rightIndex] = compareQueue.shift(); // Get next comparison from the queue
    document.getElementById('options').innerHTML = `
        <h3>${taeminTracks[leftIndex]} vs ${taeminTracks[rightIndex]}</h3>
    `;

    // Store these indexes in buttons for comparison
    document.getElementById('left-button').dataset.index = leftIndex;
    document.getElementById('right-button').dataset.index = rightIndex;
}

function sortTracks(winnerIndex, loserIndex) {
    // If the winner has not been ranked yet, rank it higher
    if (!sortedTracks.includes(winnerIndex)) {
        sortedTracks.push(winnerIndex);
    }
    // Ensure the loser is placed after the winner
    if (!sortedTracks.includes(loserIndex)) {
        sortedTracks.push(loserIndex);
    }

    updateOptions(); // Move to the next comparison
}

function showResults() {
    document.getElementById('container').style.display = 'none'; // Hide the sorting UI
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';

    const rankings = document.getElementById('rankings');
    rankings.innerHTML = '';

    // Iterate over the sorted indexes to display the final ranking
    sortedTracks.forEach((trackIndex) => {
        rankings.innerHTML += `<li>${taeminTracks[trackIndex]}</li>`;
    });

    console.log("Final Rankings:", sortedTracks); // Debugging check
}

// Event listeners for user input
document.getElementById('left-button').addEventListener('click', (e) => {
    const winnerIndex = parseInt(e.target.dataset.index);
    const loserIndex = parseInt(document.getElementById('right-button').dataset.index);
    sortTracks(winnerIndex, loserIndex);
});

document.getElementById('right-button').addEventListener('click', (e) => {
    const winnerIndex = parseInt(e.target.dataset.index);
    const loserIndex = parseInt(document.getElementById('left-button').dataset.index);
    sortTracks(winnerIndex, loserIndex);
});

// Initialize the comparison queue and start
prepareComparisonQueue(taeminTracks);
updateOptions();
