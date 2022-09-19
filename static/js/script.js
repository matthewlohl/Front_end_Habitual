
async function fetchAll() {
    let response = await fetch(`http://localhost:3000/habits`);
    let data = await response.json();
    for (const [key, value] of Object.entries(data)){
        showAll(data.habit, data.period)
    }
    
}

async function fetchOne(ID) {

    let response = await fetch(`http://localhost:3000/habits/${ID}`);
    let data = await response.json();
    showHabit(data.name, data.frequency, data.frequencyDone, data.period)

    
}


const showHabit = (habit, frequency, frequencyDone) => {
    
    const card = document.createElement('div');
    const postArea = document.createElement('div'); 
    // Add classes to card and postArea 
    postArea.appendChild(card);

    const cardTitle = document.createElement('div');
    cardTitle.textContent = habit;
    // Add class to cardTitle
    card.appendChild(cardTitle)

    const cardFrequencyBox = document.createElement('div');
    cardFrequency.textContent = (frequencyDone.toString() + " / " + frequency.toString());
    // Add class to cardTitle
    card.appendChild(cardFrequencyBox);



}


const showAll = (habit, period) => {

    



}