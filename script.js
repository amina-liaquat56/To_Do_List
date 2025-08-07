document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Render existing tasks
    renderTasks();
    
    // Add task event
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    
    // Event delegation for task list
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = parseInt(e.target.dataset.id);
            deleteTask(id);
        } else if (e.target.tagName === 'SPAN') {
            const id = parseInt(e.target.dataset.id);
            toggleTask(id);
        }
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
    
    function toggleTask(id) {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
    }
    
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
    
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            
            li.innerHTML = `
                <span data-id="${task.id}">${task.text}</span>
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            `;
            
            taskList.appendChild(li);
        });
    }
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
