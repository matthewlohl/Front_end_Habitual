

async function fetchOne(ID) {

    let response = await fetch(`${ID}`);
    let data = await response.json();
    showHabit(data.name, data.frequency, data.period)

    
}


const showHabit = (habit, frequency, period) => {
    
    const card = document.createElement('div');
    const postArea = document.createElement('div'); 
    // Add classes to card and postArea 
    postArea.appendChild(card);

    const cardTitle = document.createElement('div');
    cardTitle.textContent = habit;
    // Add class to cardTitle
    card.appendChild(cardTitle)

    const cardFrequencyBox = document.createElement('div');
    cardFrequency.textContent = frequency;
    // Add class to cardTitle
    card.appendChild(cardFrequencyBox);
    


    
    


}