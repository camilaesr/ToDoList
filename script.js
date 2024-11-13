// Função para carregar as tarefas salvas no localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.description;

        // Aplica a classe "completed" se a tarefa estiver concluída
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        // Adiciona evento de clique para marcar/desmarcar a tarefa como concluída
        taskItem.onclick = () => toggleTaskCompletion(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = (event) => {
            event.stopPropagation(); // Impede que o clique no botão exclua também marque a tarefa
            deleteTask(index);
        };

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

// Função para adicionar uma nova tarefa
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = taskInput.value.trim();

    if (taskDescription) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ description: taskDescription, completed: false }); // Define completed como falso
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        loadTasks();
    }
}

// Função para marcar/desmarcar uma tarefa como concluída
function toggleTaskCompletion(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed; // Alterna entre true e false
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Função para deletar uma tarefa
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Carregar as tarefas quando a página for carregada
window.onload = loadTasks;
