
// Globala variabler
const addToDoForm = document.querySelector('#add_todo')
const newToDoField = document.querySelector('#new_todo_field')
const toDoUl = document.querySelector('#todo_list')
const toDoList = []

/*****************************/

function addToList() {
    const newToDo = newToDoField.value
    toDoList.push(newToDo)
    drawList(toDoList)
    
}

function drawList(list) {
    toDoUl.innerHTML = ''

    list.forEach(item => {
        const li = document.createElement('li')
        li.textContent = item
        toDoUl.appendChild(li)
    });
}


addToDoForm.addEventListener('submit', function (event) {
    event.preventDefault()

    addToList()
    newToDoField.value = ''
    
})




