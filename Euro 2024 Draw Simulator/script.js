const pot1 = ['Portugal', 'France', 'Spain', 'Belgium', 'England'];
const pot2 = ['Hungary', 'Turkiye', 'Romania', 'Denmark', 'Albania', 'Austria'];
const pot3 = ['Netherlands', 'Scotland', 'Croatia', 'Slovenia', 'Slovakia', 'Czechia'];
const pot4 = ['Italy', 'Serbia', 'Switzerland', 'Playoff A', 'Playoff B', 'Playoff C'];

const groups = ['A', 'B', 'C', 'D', 'E', 'F'];

let drawnTeams = ['Germany']; // Njemačka je domacin, prva je uvijek
let currentGroupIndex = 1; // Počinjemo od druge grupe jer je Njemačka već u prvoj
let currentPotIndex = 0; // Indeks pota iz kojeg se trenutno izvlače ekipe

document.getElementById('drawButton').addEventListener('click', drawTeam);

function drawTeam() {
    if (currentPotIndex < 4) {
        const currentPot = getCurrentPot();
        const drawnTeam = drawRandomTeam(currentPot);

        addToGroup(groups[currentGroupIndex], drawnTeam);
        updateHighlightedTeams();
        markDrawnTeamInPot(`pot${currentPotIndex + 1}`, drawnTeam);

        if (currentGroupIndex === 5) {
            currentGroupIndex = 0;
            currentPotIndex++;
        } else {
            currentGroupIndex++;
        }

        if (currentPotIndex === 4 && currentGroupIndex === 5) {
            alert("Izvlačenje iz svih potova je završeno.");
        }
    }
}


function getCurrentPot() {
    switch (currentPotIndex) {
        case 0:
            return ['Germany', ...pot1];
        case 1:
            return pot2;
        case 2:
            return pot3;
        case 3:
            return pot4;
        default:
            return [];
    }
}

function drawRandomTeam(pot) {
    const availableTeams = pot.filter(team => !drawnTeams.includes(team));

    if (availableTeams.length === 0) {
        drawnTeams = [];
        return pot[Math.floor(Math.random() * pot.length)];
    }

    const randomIndex = Math.floor(Math.random() * availableTeams.length);
    const drawnTeam = availableTeams[randomIndex];

    drawnTeams.push(drawnTeam);

    return drawnTeam;
}

function addToGroup(group, team) {
    const groupDiv = document.getElementById(`pot${group}`);
    const teamParagraphs = groupDiv.getElementsByClassName('team');

    for (let i = 0; i < teamParagraphs.length; i++) {
        if (!teamParagraphs[i].textContent) {
            teamParagraphs[i].textContent = team;
            teamParagraphs[i].classList.add('highlighted');
            break;
        }
    }
}

function updateHighlightedTeams() {
    const allTeams = document.querySelectorAll('.team');

    allTeams.forEach(team => {
        if (drawnTeams.includes(team.textContent)) {
            team.classList.add('highlighted');
        }
    });
}

// Reset
document.getElementById('resetButton').addEventListener('click', resetGroups);

function resetGroups() {
    for (let i = 0; i < groups.length; i++) {
        const groupDiv = document.getElementById(`pot${groups[i]}`);
        const teamParagraphs = groupDiv.getElementsByClassName('team');

        for (let j = 0; j < teamParagraphs.length; j++) {
            teamParagraphs[j].textContent = '';
            teamParagraphs[j].classList.remove('highlighted');
        }
    }

    // Resetirajte izvučene ekipe i indekse
drawnTeams = ['Germany']; // Njemačka je domacin, prva je uvijek
currentGroupIndex = 1; // Počinjemo od druge grupe jer je Njemačka već u prvoj
currentPotIndex = 0; // Indeks pota iz kojeg se trenutno izvlače ekipe

const firstGroup = document.getElementById('potA');
const firstGroupTeam = firstGroup.getElementsByClassName('team')[0];
firstGroupTeam.textContent = 'Germany';
firstGroupTeam.classList.add('highlighted');
}

function markDrawnTeamInPot(potId, teamName) {
    const pot = document.getElementById(potId);
    const teams = pot.getElementsByTagName('p');

    for (let i = 0; i < teams.length; i++) {
        if (teams[i].textContent === teamName) {
            teams[i].classList.add('drawn');
            break;
        }
    }
}


