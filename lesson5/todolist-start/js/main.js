window.addEventListener('load', init);

let inputValue;
let list;
let todoItems = [];
/**
 * Initialize the application
 */
function init()
{
    inputValue = document.querySelector('#todo-field');
    list = document.getElementById('list');

    const todoForm = document.getElementById('todo-form');
    todoForm.addEventListener('submit', formSubmitHandler);
    list.addEventListener('click', todoItemClickhandler)

    fillFieldsFromLocalStorage();
}

function formSubmitHandler(e) {
    e.preventDefault();

    const text = inputValue.value;

    if (text !== ""){
        addTodoItem(text);
        addItemToLocalStorage(text)
        inputValue.value = '';
        inputValue.classList.remove('error');
    } else {
        inputValue.classList.add('error');
    }
}
function addTodoItem(text) {
    let li = document.createElement('li');
    li.innerHTML = text;
    list.appendChild(li);
}

function addItemToLocalStorage(text) {
    todoItems.push(text);
    localStorage.setItem('todo-items', JSON.stringify(todoItems));

}

function fillFieldsFromLocalStorage() {
    const todoItemsString = localStorage.getItem('todo-items');
    if (todoItemsString !== null) {
        todoItems = JSON.parse(todoItemsString);
        for (const item of todoItems) {
            addTodoItem(item);
        }
    }
}

function todoItemClickhandler(e) {

    let clickedItem = e.target
    if (clickedItem.nodeName !== 'LI') {
        return;
    }

    removeItemFromLocalStrorage(clickedItem.innerText);

    clickedItem.remove();
}

function removeItemFromLocalStrorage(text) {
    const itemIndex = todoItems.indexOf(text);
    todoItems.splice(itemIndex, 1);
    localStorage.setItem('todo-items', JSON.stringify(todoItems));

}