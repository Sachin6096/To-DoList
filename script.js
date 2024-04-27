document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("todoList") === null) {
        localStorage.setItem("todoList", JSON.stringify([]));
    }

    displayTasks();
});

function addItem(){
    let itemName = document.getElementById("itemName").value;
    let itemDate = document.getElementById("date").value;
    let priority = document.getElementById("priority").value;

    let newItem = {
        name : itemName,
        date: itemDate,
        priority:priority,
        completed: false
    };

    let todoList = JSON.parse(localStorage.getItem("todoList"));

    todoList.push(newItem);

    localStorage.setItem("todoList",JSON.stringify(todoList));

    displayTasks();
}

function displayTasks() {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    const todayDate = getCurrentDate();

    const todaysTasks = todoList.filter(task => task.date === todayDate);
    const futureTasks = todoList.filter(task => (task.date > todayDate || !task.completed) && task.date !== todayDate);
    const completedTasks = todoList.filter(task => task.completed);

    displayTaskList(todaysTasks, "todaysTasks");
    displayTaskList(futureTasks, "futureTasks");
    displayTaskList(completedTasks, "completedTasks");
}

function displayTaskList(tasks, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        if (task.completed) {
            taskCard.classList.add("completed");
        }
        if (task.date < getCurrentDate() && !task.completed) {
            taskCard.classList.add("expired");
        }
        taskCard.innerHTML = `
            <p>Name: ${task.name}</p>
            <p>Date: ${task.date}</p>
            <p>Priority: ${task.priority}</p>
            <button onclick="toggleCompletion('${task.name}')">Completed</button>
            <button onclick="deleteTask('${task.name}')">Delete</button>
        `;
        container.appendChild(taskCard);
    });
}

function toggleCompletion(taskName) {
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    todoList.forEach(task => {
        if (task.name === taskName) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));
    displayTasks();
}

function deleteTask(taskName) {
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    const updatedList = todoList.filter(task => task.name !== taskName);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
    displayTasks();
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
