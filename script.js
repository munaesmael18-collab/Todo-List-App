const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const remainingCount = document.getElementById("remainingCount");
const clearBtn = document.getElementById("clearBtn");
const allDoneMsg = document.getElementById("allDoneMsg");
const colorCircles = document.querySelectorAll(".color-circle");

let tasks = [];

// Add task
addBtn.addEventListener("click", addTask);

function addTask() {
    const text = taskInput.value.trim();

    if (!text) {
        errorMsg.textContent = "Please type a task first";
        return;
    }

    // Prevent duplicates
    if (tasks.some(task => task.text.toLowerCase() === text.toLowerCase())) {
        errorMsg.textContent = "This task already exists!";
        return;
    }

    errorMsg.textContent = "";

    tasks.push({
        text: text,
        done: false
    });

    taskInput.value = "";

    renderTasks();
}

// Display tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = "task-item";

        if (task.done) {
            li.classList.add("done");
        }

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        const doneBtn = document.createElement("button");
        doneBtn.className = "done-btn";
        doneBtn.textContent = task.done ? "Undo" : "Done";

        doneBtn.addEventListener("click", function () {
            tasks[index].done = !tasks[index].done;
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateCounter();
}

// Update counters
function updateCounter() {

    const remaining = tasks.filter(task => !task.done).length;
    remainingCount.textContent = remaining;

    if (tasks.length > 0 && remaining === 0) {
        allDoneMsg.classList.add("visible");
    } else {
        allDoneMsg.classList.remove("visible");
    }
}

// Clear all
clearBtn.addEventListener("click", function () {
    tasks = [];
    renderTasks();
});

// Color picker
colorCircles.forEach(circle => {

    circle.addEventListener("click", function () {

        document.body.style.backgroundColor = circle.dataset.color;

        colorCircles.forEach(c => c.classList.remove("active"));

        circle.classList.add("active");

    });

});