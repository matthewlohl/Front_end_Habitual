fetchAll()
var addHabitBtn = document.querySelector('#add-habit-btn')
var closeFormBtn = document.querySelector('.close-button')
var doneCounter = document.querySelector(".habit-counter")
var completedSection = document.querySelector(".completed-container")
var submitBtn = document.querySelector('.add-habit-form')
var logoutBtn = document.querySelector('#logout-btn')

document.querySelector('#username').textContent = localStorage.getItem('username')

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

submitBtn.addEventListener('submit', postHabit)
// submitBtn.addEventListener('submit', () => {
//     location.reload()
// })

function logout(){
    localStorage.clear();
    location.replace('login.html')
}

logoutBtn.addEventListener('click', logout)



