
// Globala variabler
const addToDoForm = document.querySelector('#add_todo')
const newToDoField = document.querySelector('#new_todo_field')
const dateField = document.querySelector('#date_field')
const toDoListElement = document.querySelector('#todo_list')
const toDoList = []
const categorySelect = document.querySelector('#category_select')
const categories = ['Arbete', 'Hushållsarbete', 'Skola']
const filterField = document.querySelector('#filter')
const filterButtonDiv = document.querySelector('#category_filter_buttons') 

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
        deadline: dateField.value,
        category: categorySelect.value
    })
    
    drawList(toDoList, true)
    
}
function deleteListitem(event) {
    deleteBtnNum = parseInt(event.currentTarget.dataset.listitem)

    const deleteIndex = toDoList.findIndex(function (item) {
        return item.idNum === deleteBtnNum
    })
    toDoList.splice(deleteIndex, 1)
    drawList(toDoList)  
}


function textFilter(search, list) {
    const filteredList = list.filter(function (item) {
        return item.content.toLowerCase().includes(search.toLowerCase())
    })
    return filteredList
}
function categoryFilter() {
    const theCategory = document
                        .querySelector('#category_filter_buttons input:checked')
                        .value
    
    if (theCategory !== 'Alla') {
        const filteredList = toDoList.filter(function (item) {
            return item.category.includes(theCategory)
        })
        drawList(filteredList)
        return filteredList 
    }
    else {
        drawList(toDoList)
        return toDoList
    }
    
}

function drawList(list, isNewItem = false) {
    toDoListElement.innerHTML = ''
    let i = 0

    list.forEach(item => {
        if (isNewItem) {
            toDoList[i].idNum = i
        }
        

        // Skapar div för varje todo
        const listitem = document.createElement('div')
        listitem.classList.add('listitem')

        // Skapar p för texten och radera-knapp
        const itemContent = document.createElement('p')
        itemContent.classList.add('item_content')
        //itemContent.dataset.listitem = i
        itemContent.textContent = item.content

        const deleteBtn = document.createElement('i')
        deleteBtn.dataset.listitem = item.idNum
        deleteBtn.classList.add('fas', 'fa-trash-alt', 'delete_btn')
        deleteBtn.addEventListener('click', deleteListitem)
        itemContent.appendChild(deleteBtn)
        
        listitem.appendChild(itemContent)
        
        // Lägger till datum 
        const endDate = document.createElement('time')
        endDate.textContent = item.deadline
        endDate.dateTime = item.deadline
        const dateIcon = document.createElement('i')
        dateIcon.classList.add('fas', 'fa-calendar-alt')
        endDate.prepend(dateIcon)
        listitem.appendChild(endDate)

        // Lägger till kategori
        const categoryP = document.createElement('p')
        categoryP.classList.add('category_tag')
        categoryP.textContent = item.category
        const categoryIcon = document.createElement('i')
        categoryIcon.classList.add('fas', 'fa-tag')
        categoryP.prepend(categoryIcon)
        listitem.appendChild(categoryP)
        
        toDoListElement.appendChild(listitem)

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
    categories.forEach(category => {
        const label = document.createElement('label')
        const rBtn = document.createElement('input')
        rBtn.type = 'radio'
        rBtn.value = category
        rBtn.name = 'category'

        rBtn.addEventListener('click', categoryFilter)
        label.textContent = category
        label.prepend(rBtn)
        
        filterButtonDiv.appendChild(label)
    });
    const allBtn = document.querySelector('#all_categories')
    allBtn.addEventListener('click', categoryFilter)

    
}


addToDoForm.addEventListener('submit', function (event) {
    event.preventDefault()

    addListitem()
    newToDoField.value = ''
    
})
filterField.addEventListener('input', function (event) {
    const filteredByCategory = categoryFilter()
    const searchWord = event.currentTarget.value
    const filteredByText = textFilter(searchWord, filteredByCategory)
    drawList(filteredByText)
})


dateField.value = getTodaysDate()
drawCategoriesOptions()
drawCategoriesFilters()

setInterval( checkDeadline, 86400000);


function checkDeadline() {
    const today = new Date()
    toDoList.forEach(item => {
        const dateParts = item.deadline.split('-')
        const deadline = new Date(dateParts[0], dateParts[1]-1, dateParts[2])        
        
        if (today > deadline) {
            item.pastDeadline = true
        }
        
    });
}








