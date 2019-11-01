
// Globala variabler
const addToDoForm = document.querySelector('#add_todo')
const newToDoField = document.querySelector('#new_todo_field')
const dateField = document.querySelector('#date_field')
const toDoUl = document.querySelector('#todo_list')
const toDoList = []
const deleteIcon = '🗑️'

/*****************************/

function getTodaysDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = addZero(today.getMonth()+1)
    const date = addZero(today.getDate())
    return `${year}-${month}-${date}`
}
function addZero(num) {
    if (num < 10) {
        num = `0${num}`
    }
    return num
}

function addToList() {
    const newToDo = newToDoField.value
    toDoList.push(newToDo)
    drawList(toDoList)
    
}
function deleteListitem(event) {
    const listitems = document.querySelectorAll('#todo_list li')
    console.log(listitems);
    
    /*
    toDoList = toDoList.filter(function (item) {
        return item !== event.dataset.listitem
    })
    */
    
}

function drawList(list) {
    toDoUl.innerHTML = ''
    let i = 0

    list.forEach(item => {
        const li = document.createElement('li')
        li.dataset.listitem = i
        const deleteBtn = document.createElement('span')
        deleteBtn.dataset.listitem = i
        deleteBtn.textContent = deleteIcon
        deleteBtn.classList.add('delete_btn')
        deleteBtn.addEventListener('click', deleteListitem)
        li.textContent = item 
        li.appendChild(deleteBtn)
        toDoUl.appendChild(li)

        i++
    });
}


addToDoForm.addEventListener('submit', function (event) {
    event.preventDefault()

    addToList()
    newToDoField.value = ''
    
})


dateField.value = getTodaysDate()







