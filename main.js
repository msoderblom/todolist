
// Globala variabler
const addToDoForm = document.querySelector('#add_todo')
const newToDoField = document.querySelector('#new_todo_field')
const toDoUl = document.querySelector('#todo_list')
const toDoList = []
const deleteIcon = '🗑️'

/*****************************/

function addToList() {
    const newToDo = newToDoField.value
    toDoList.push(newToDo)
    drawList(toDoList)
    
}
function deleteListitem(event) {
    console.log('delete');
    
}

function drawList(list) {
    toDoUl.innerHTML = ''

    list.forEach(item => {
        const li = document.createElement('li')
        const deleteBtn = document.createElement('span')
        deleteBtn.textContent = deleteIcon
        deleteBtn.classList.add('delete_btn')
        deleteBtn.addEventListener('click', deleteListitem)
        li.textContent = item 
        li.appendChild(deleteBtn)
        toDoUl.appendChild(li)
    });
}


addToDoForm.addEventListener('submit', function (event) {
    event.preventDefault()

    addToList()
    newToDoField.value = ''
    
})




