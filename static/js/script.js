
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


async function postHabit(e) {
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
        if (err) {
            throw Error(err)
        } else {
            fetchOne(id)
        }
    } catch (err) {
        console.warn(err);
    }
}

async function appendFrequency(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                frequency: 1
            })
        }

        const response = await fetch(`http://localhost:3000/habits/${ID}`, options)
        const { id, err } = await response.json();
        if (err) {
            throw Error(err)
        } else {
            fetchAll(id)
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
    if (entryData.frequencyDone < entryData.frequency) {
        const newDiv = document.createElement('div');
        newDiv.className = 'habit'
        newDiv.id = "habit" + entryData.id

        const newHabitText = document.createElement('div');
        newHabitText.className = 'habit-text'
        newHabitText.id = "habit-text" + entryData.id
        newHabitText.textContent = entryData.habit_name

        const newFreqCounter = document.createElement('div');
        newFreqCounter.className = 'habit-counter'
        newFreqCounter.id = "habit-counter" + entryData.id
        newFreqCounter.textContent = entryData.frequencyDone + "/" + entryData.frequency

        const newDoneBtn = document.createElement('button');
        newDoneBtn.className = "add-completed-once-btn"
        newDoneBtn.id = "add-completed-once-btn" + entryData.id

        newDiv.appendChild(newHabitText)
        newDiv.appendChild(newFreqCounter)
        newDiv.appendChild(newDoneBtn)

        const dailyDiv = document.querySelector(".daily-container")
        const weeklyDiv = document.querySelector(".weekly-container")
        const monthlyDiv = document.querySelector(".monthly-container")

        if (entryData.period === 1) {
            dailyDiv.appendChild(newDiv)
        }
        else if (entryData.period === 2) {
            weeklyDiv.appendChild(newDiv)
        }
        else {
            monthlyDiv.appendChild(newDiv)
        }
        const doneBtns = document.querySelectorAll('.add-completed-once-btn')
        doneBtns.forEach((e) => {
            e.addEventListener('click', () => {
                appendFrequency(e)
            })
        })
    } else {
        const newDiv = document.createElement('div');
        newDiv.className = 'habit'
        newDiv.id = "habit" + entryData.id

        const newHabitText = document.createElement('div');
        newHabitText.className = 'habit-text'
        newHabitText.id = "habit-text" + entryData.id
        newHabitText.textContent = entryData.habit_name

        newDiv.appendChild(newHabitText)
        const dailyDiv = document.querySelector(".completed-daily")
        const weeklyDiv = document.querySelector(".completed-weekly")
        const monthlyDiv = document.querySelector(".completed-monthly")

        if (entryData.period === 1) {
            dailyDiv.appendChild(newDiv)
        }
        else if (entryData.period === 2) {
            weeklyDiv.appendChild(newDiv)
        }
        else {
            monthlyDiv.appendChild(newDiv)
        }
    }



}
