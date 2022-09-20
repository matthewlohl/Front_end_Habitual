// fetchAll()
var addHabitBtn = document.querySelector('#add-habit-btn')
var closeFormBtn = document.querySelector('.close-button')
var doneCounter = document.querySelector(".habit-counter")
var habit = document.querySelector(".habit")
var completedSection = document.querySelector(".completed-container")
var button = document.querySelector(".add-completed-once-btn"),
  count = 0;
button.onclick = function() {
  count += 1;
  console.log(count)
  if (count < 2) {
    doneCounter.textContent = count + "/2";
  }
  else {
    habit.removeChild(button)
    habit.removeChild(doneCounter)
    completedSection.appendChild(habit)

  }
  
};

addHabitBtn.addEventListener('click', () => {
    const modal = document.querySelector('#modal')
    openModal(modal)
})

function openModal(modal) {
    modal.style.display = 'block'
    document.querySelector('.habit-container').style.opacity = '30%'
}

closeFormBtn.addEventListener('click', () => {
    const modal = document.querySelector('#modal')
    closeModal(modal)
})

function closeModal(modal) {
    modal.style.display = 'none'
    document.querySelector('.habit-container').style.opacity = '100%'
}