const toDoList = document.querySelector(`.to-do-list`)

const addTasksToDOM = async () => {
    const tasks = await getTasks();
    toDoList.innerHTML = ``;
    tasks.forEach(task => {
        newLi = document.createElement(`li`);
        // checkboxes toevoegen
        checkbox = document.createElement(`input`);
        checkbox.setAttribute (`type`, `checkbox`);
        checkbox.classList.add(`checkbox`);
        checkbox.addEventListener(`click`, async ()=>{
            if(task.done == false){
                await completeOneTask(task._id, task.description, true);
                addTasksToDOM();
            } if(task.done == true){
                await completeOneTask(task._id, task.description, false);
                addTasksToDOM();
                }
        });
        // content toevoegen
        taskContent = document.createElement(`span`);
        taskContent.classList.add(`task-content`);
        taskContent.appendChild(document.createTextNode(task.description));
        // icon toevoegen
        removeIcon = document.createElement(`button`);
        removeIcon.innerHTML = `<i class="far fa-trash-alt"></i>`;
        removeIcon.classList.add(`remove-icon`);
        removeIcon.addEventListener(`click`, async ()=> {
            await deleteOneTask(task._id);
            addTasksToDOM()
        });
        if (task.done == true){
            checkbox.checked = true;
            taskContent.classList.add(`line-through`);
            removeIcon.classList.add(`grey`)
        };
        // li opbouwen
        newLi.appendChild(checkbox);
        newLi.appendChild(taskContent);
        newLi.appendChild(removeIcon);
        toDoList.appendChild(newLi);
    });
}

addTasksToDOM();

const addTaskButton = document.querySelector(`.add-task-button`);
const addTaskToAPI = addTaskButton.addEventListener(`click`, async () => {
    const inputField = document.querySelector(`.input-field`);
    await postTask({ description: inputField.value, done: false });
    inputField.value = null;
    addTasksToDOM();
});

const removeAllTasks = document.querySelector(`.delete-all-button`).addEventListener(`click`, async () => {
    await deleteAllTasks();
    toDoList.innerHTML = ``;
})


