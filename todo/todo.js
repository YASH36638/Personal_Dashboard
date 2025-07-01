let val = JSON.parse(localStorage.getItem("tasks")) || [];

function add(event)
{
    event.preventDefault();
    task=document.getElementById("task").value;
    if(task.trim()!=="")
    {
        const newTask=
        {
            text: task,  
            id: Date.now()
        };
        val.push(newTask)
        localStorage.setItem("tasks",JSON.stringify(val));
        document.getElementById("task").value = "";
    }
    renderT();
}

function renderT()
{
    const taskc=document.getElementsByClassName("tasklist")[0]
    taskc.innerHTML=val.map(task => `<div class="tasks" id=""task-${task.id}> <span>${task.text}</span>
    <button id="del-btn" onclick="deleteTask(${task.id})">Delete</button></div>`).join('');
}

window.onload=renderT();

function deleteTask(id)
{
    if(window.confirm("Are you sure?"))
    {
        val=val.filter(task => task.id!==id);
        let par=JSON.parse(localStorage.getItem("tasks"))
        par=par.filter(task=>task.id!==id);
        localStorage.setItem("tasks",JSON.stringify(par));
    }

    renderT()
}