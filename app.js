// Selector
const inputElement = document.querySelector('form .task-input');
const btnElement = document.querySelector('form button');
const listElement = document.querySelector('.tasks-container .tasks-list');
const selectElement = document.querySelector('.filter select');

// Functions
const addTask = function(event) {
    event.preventDefault();
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <span>${inputElement.value}</span>
        <button class="btn-delete"><i class="fas fa-times"></i></button>
        <button class="btn-finish"><i class="fas fa-check"></i></button>
        <div class="clear"></div>
    `;
    listElement.appendChild(newTask);
    inputElement.value = '';
    checkFinishedAllTasks();
}

const deleteTask = function(event) {
    const clickElement = event.target;
    if (clickElement.className === 'btn-delete') {
        const task = clickElement.parentNode;
        task.classList.add('fall-task');

        task.addEventListener('transitionend', event => {
            task.remove();
            checkFinishedAllTasks();
        });
    }

}

const finishTask = function(event) {
    const clickElement = event.target;

    if (clickElement.classList.contains('btn-finish')) {
        const finished = clickElement.classList.contains('finish-task');
        if (finished) {
            clickElement.classList.remove('finish-task');
        } else {
            clickElement.classList.add('finish-task');
        }
    }

    checkFinishedAllTasks();
}

const changedSelect = function(event) {
    const filterValue = event.target.value;
    const tasksList = Array.from(listElement.children);

    if (filterValue === 'all') {
        tasksList.forEach(task => task.style.display = 'block');
    } else if (filterValue === 'finished') {
        tasksList.forEach(task => {
            var finishedCheck = task.querySelector('.finish-task');
            if (finishedCheck === null) {
                task.style.display = 'none';
            } else {
                task.style.display = 'block';
            }
        });
    } else {
        tasksList.forEach(task => {
            var finishedCheck = task.querySelector('.finish-task');
            if (finishedCheck === null) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    }
}

const checkFinishedAllTasks = function() {
    var count = 0;
    const tasksList = Array.from(listElement.children);
    
    tasksList.forEach(task => {
        if (task.querySelector('.finish-task') != null) {
            count++;
        }
    });
    const finishedMessage = document.querySelector('.finished-message');
    if (tasksList.length === count && count > 0) {
        finishedMessage.style.opacity = '1';
    } else {
        finishedMessage.style.opacity = '0';
    }
}

// Event Listeners
btnElement.addEventListener('click', addTask);
listElement.addEventListener('click', deleteTask);
listElement.addEventListener('click', finishTask);
selectElement.addEventListener('change', changedSelect);