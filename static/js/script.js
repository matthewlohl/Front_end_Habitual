
async function fetchAll() {
    let response = await fetch(`http://localhost:3000/habits`);
    let data = await response.json();
    data.forEach(habit => showAll(habit))
    }

    


async function fetchOne(ID) {

    let response = await fetch(`http://localhost:3000/habits/${ID}`);
    let data = await response.json();
    showHabit(data.name, data.frequency, data.frequencyDone, data.period)

    
}

async function postHabit(e){
    e.preventDefault();        
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: document.querySelector('#habit-name').value,
                period: document.querySelector('#habit-period').value,
                frequency: document.querySelector('#habit-frequency').value,
                frequencyDone: 0
            })
        }

        const response = await fetch('http://localhost:3000/habits', options);
        const { id, err } = await response.json();
        if(err) { 
            throw Error(err) 
        } else {
            fetchOne(id)
        }
    } catch (err) {
        console.warn(err);
    }
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


const showAll = (entryData) => {

    const newDiv = document.createElement('div');
    newDiv.className = 'habit'
    newDiv.id = entryData.id




}
