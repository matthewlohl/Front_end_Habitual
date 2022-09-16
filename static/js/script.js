



async function fetchOne(ID) {

    let response = await fetch(`${ID}`);
    let data = await response.json();
    showHabit(data.name, data.frequency, data.period)

    
}


const showHabit = (habit, frequency, period) => {
    
    const card = document.createElement('div');
    const postArea = document.querySelector();
    
    


}
