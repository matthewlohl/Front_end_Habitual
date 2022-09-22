var server_URL = `https://habitual-backend-fp.herokuapp.com`
var client_URL = `https://front-end-habitual.netlify.app/`


async function fetchAll() {
    var userID = localStorage.getItem('id')
    let response = await fetch(`${server_URL}/habits/${userID}`);
    let data = await response.json();
    data.forEach(habit => showAll(habit))
}

function postHabit(e) {
    e.preventDefault();
    if (!document.querySelector('#new-habit-text').value) {
        document.querySelector('#new-habit-text').placeholder = "give your habit a name!"
    }
    else {

        console.log(document.querySelector('#new-habit-period').value)
        console.log(document.querySelector('#new-habit-text').value)
        
        const entryData = {
            habit_name: document.querySelector('#new-habit-text').value,
            period: document.querySelector('#new-habit-period').value,
            frequency: document.querySelector('#new-habit-frequency').value,
            userid: localStorage.getItem('id'),
            frequency_done: 0
        };

        console.log(`${entryData} - client line 43`)

        const options = {
            method: 'POST',
            body: JSON.stringify(entryData),
            headers: {
                "Content-Type": "application/json"
            }

        };

        fetch(`${server_URL}/habits`, options)
            .then(r => r.json())
            .catch(console.warn)
    }

   
}

async function completedDate(e) {
    const completion = new Date().getTime();
    const ID = localStorage.getItem('id')
    try {
        const options = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date_complete: completion
            })
        }
        const response = await fetch(`${server_URL}/habits/${ID}/${e}`, options)
        const { err } = await response.json();
        if (err) {
            throw Error(err)
        } else {
            location.reload();
        }
    }
    catch (err){
        console.warn(err);
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
        const response = await fetch(`${server_URL}/habits/${ID}`, options)
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
  

const showAll = (entryData) => {
    if (entryData.frequency_done < entryData.frequency) {
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
            completedDate(entryData.id)
        }
        else if (entryData.period === 2) {
            weeklyDiv.appendChild(newDiv)
            completedDate(entryData.id)
        }
        else {
            monthlyDiv.appendChild(newDiv)
            completedDate(entryData.id)
        }
    }



}
module.exports = {fetchAll, showAll }




