



async function fetchAll() {
    let response = await fetch(`http://localhost:3000/habits`);
    let data = await response.json();
    data.forEach(habit => showAll(habit))
}




async function fetchOne(ID) {

    let response = await fetch(`http://localhost:3000/habits/${ID}`);
    let data = await response.json();
    showHabit(data.name, data.frequency, data.frequency_done, data.period)


}


function postHabit(e) {
    e.preventDefault();
    if (!document.querySelector('#new-habit-text').value) {
        document.querySelector('#new-habit-text').placeholder = "give your habit a name!"
    }
    else {

        
        console.log(document.querySelector('#new-habit-text').value)
        
        const entryData = {
            habit_name: document.querySelector('#new-habit-text').value,
            period: document.querySelector('#new-habit-period').value,
            frequency: document.querySelector('#new-habit-frequency').value,
            dateComplete: [],
            frequencyDone: 0
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(entryData),
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('http://localhost:3000/habits', options)
            .then(r => r.json())
            .catch(console.warn)
    }

   
}


async function appendFrequency(e) {
    try {
        const options = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                frequency_done: 1
            })
        }
        const ID = (e.target.id).slice(6)
        const response = await fetch(`http://localhost:3000/habits/${ID}`, options)
        const { err } = await response.json();
        if (err) {
            throw Error(err)
            
        } else {
        }
    } catch (err) {
        console.warn(err);
        location.reload();
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

const showAll = (entryData) => {
    if (entryData.frequency_done < entryData.frequency) {
        const newDiv = document.createElement('div');
        newDiv.className = 'habit'
        newDiv.id = "habit" + entryData.id

        const newHabitText = document.createElement('div');
        newHabitText.className = 'habit-text'
        newHabitText.id = "habit-text" + entryData.id

        newHabitText.textContent = capitalizeFirstLetter(entryData.habit_name)



        const newFreqCounter = document.createElement('div');
        newFreqCounter.className = 'habit-counter'
        newFreqCounter.id = "habit-counter" + entryData.id
        newFreqCounter.textContent = entryData.frequency_done + "/" + entryData.frequency

        const newDoneBtn = document.createElement('button');
        newDoneBtn.className = "add-completed-once-btn"
        newDoneBtn.textContent = "+"
        newDoneBtn.id = "append" + entryData.id
        newDoneBtn.textContent = "+"
        newDoneBtn.addEventListener('click', (e) => {
            appendFrequency(e)
        })

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
module.exports = { fetchAll,
showAll }



fetchAll();

