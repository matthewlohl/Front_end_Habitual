// fetchAll()

var doneCounter = document.querySelector(".habit-frequency")
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