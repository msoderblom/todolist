
// Globala variabler
const addToDoForm = document.querySelector('#add_todo')
const newToDoField = document.querySelector('#new_todo_field')
const dateField = document.querySelector('#date_field')
const toDoUl = document.querySelector('#todo_list')
const toDoList = []
const deleteIcon = '🗑️'
const categorySelect = document.querySelector('#category_select')
const categories = ['Arbete', 'Hushållsarbete', 'Skola']
const filterField = document.querySelector('#filter')

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

function addListitem() {
    const newToDo = newToDoField.value
    toDoList.push({
        content: newToDo,
        deadline: dateField.value
    })
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

function textFilter(search, list) {
    const filteredList = list.filter(function (item) {
        return item.content.toLowerCase().includes(search.toLowerCase())
    })
    return filteredList
    
}

function drawList(list) {
    toDoUl.innerHTML = ''
    let i = 0

    list.forEach(item => {
        const li = document.createElement('li')
        li.dataset.listitem = i
        li.textContent = item.content + item.deadline
        const deleteBtn = document.createElement('span')
        deleteBtn.dataset.listitem = i
        deleteBtn.textContent = deleteIcon
        deleteBtn.classList.add('delete_btn')
        deleteBtn.addEventListener('click', deleteListitem)
        
        li.appendChild(deleteBtn)
        toDoUl.appendChild(li)

        i++
    });
}
function drawCategoriesOptions() {
      categories.forEach(category => {
        const opt = document.createElement('option')
        opt.value = category
        opt.textContent = category
        categorySelect.appendChild(opt)
    });
}
function drawCategoriesFilters() {
    
}


addToDoForm.addEventListener('submit', function (event) {
    event.preventDefault()

    addListitem()
    newToDoField.value = ''
    
})
filterField.addEventListener('input', function (event) {
    const searchWord = event.currentTarget.value
    const filteredListText = textFilter(searchWord, toDoList)
    drawList(filteredListText)
})

dateField.value = getTodaysDate()
drawCategoriesOptions()


    









