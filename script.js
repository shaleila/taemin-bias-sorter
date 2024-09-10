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
    // Move winner to the front if it's not already in sortedTracks
    if (!sortedTracks.includes(taeminTracks[winnerIndex])) {
        sortedTracks.unshift(taeminTracks[winnerIndex]);
    }
    
    // Add the loser after the winner in the sorted list
    if (!sortedTracks.includes(taeminTracks[loserIndex])) {
        sortedTracks.push(taeminTracks[loserIndex]);
    }

    // Update the next comparison
    updateOptions();
}

function showResults() {
    document.getElementById('container').style.display = 'none';
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';

    const rankings = document.getElementById('rankings');
    rankings.innerHTML = '';
    sortedTracks.forEach(track => {
        rankings.innerHTML += `<li>${track}</li>`;
    });
}

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

// Prepare the queue of all possible comparisons
prepareComparisonQueue(taeminTracks);
updateOptions();
