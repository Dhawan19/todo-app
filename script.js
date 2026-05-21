const taskInput = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

function renderTasks(){

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(currentFilter === "active"){
            return !task.completed;
        }

        if(currentFilter === "completed"){
            return task.completed;
        }

        return true;

    });

    filteredTasks.forEach((task,index)=>{

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `

            <span>${task.text}</span>

            <div>

                <button class="complete-btn">
                    ✓
                </button>

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>

        `;

        li.querySelector(".complete-btn")
        .addEventListener("click",()=>{

            task.completed = !task.completed;

            saveTasks();

            renderTasks();

        });

        li.querySelector(".edit-btn")
        .addEventListener("click",()=>{

            const updatedTask = prompt(
                "Edit Task",
                task.text
            );

            if(updatedTask !== null){

                task.text = updatedTask;

                saveTasks();

                renderTasks();

            }

        });

        li.querySelector(".delete-btn")
        .addEventListener("click",()=>{

            tasks.splice(index,1);

            saveTasks();

            renderTasks();

        });

        taskList.appendChild(li);

    });

}

addBtn.addEventListener("click",()=>{

    const taskText = taskInput.value.trim();

    if(taskText === "") return;

    tasks.push({

        text: taskText,

        completed: false

    });

    saveTasks();

    renderTasks();

    taskInput.value = "";

});

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        currentFilter = button.dataset.filter;

        renderTasks();

    });

});

renderTasks();