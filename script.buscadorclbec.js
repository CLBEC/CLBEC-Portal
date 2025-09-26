// La clase 'Portal' es el "plano" de nuestro proyecto.
class Portal {
    constructor() {
        // En el constructor, inicializamos todos los elementos HTML
        this.form = document.getElementById('taskForm');
        this.input = document.getElementById('taskInput');
        this.sheet = document.querySelector('.sheet');
        this.searchInput = document.getElementById('searchInput');
        this.statusFilter = document.getElementById('statusFilter');

        // Llamamos a la función que inicializa todos los eventos.
        this.addEventListeners();
        // Cargamos las tareas al iniciar.
        this.loadTasks();
    }

    // Método para manejar todos los "escuchadores" de eventos.
    addEventListeners() {
        this.form.addEventListener('submit', this.addTask.bind(this));
        this.searchInput.addEventListener('keyup', this.filterTasks.bind(this));
        this.statusFilter.addEventListener('change', this.filterTasks.bind(this));
    }

    // Método para agregar un tema
    addTask(event) {
        event.preventDefault();
        const taskText = this.input.value.trim();
        if (taskText === '') return;

        const currentTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        currentTasks.push({ text: taskText, status: 'Pendiente' });
        
        this.saveTasks(currentTasks);
        this.input.value = '';
        this.loadTasks();
    }

    // Método para guardar los temas en localStorage.
    saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Método para cargar y mostrar los temas.
    loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.sheet.innerHTML = ''; 
        tasks.forEach(task => {
            this.renderTask(task.text, task.status);
        });
    }

    // Método para eliminar un tema.
    deleteTask(taskText) {
        let currentTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        currentTasks = currentTasks.filter(task => task.text !== taskText);
        this.saveTasks(currentTasks);
        this.loadTasks();
    }

    // Método para editar un tema.
    editTask(oldText, newText) {
        let currentTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = currentTasks.map(task => {
            if (task.text === oldText) {
                return { text: newText, status: task.status };
            }
            return task;
        });
        this.saveTasks(updatedTasks);
        this.loadTasks();
    }

    // Método para renderizar una tarea en el HTML.
    renderTask(taskText, taskStatus) {
        const newRow = document.createElement('div');
        newRow.classList.add('task-row');
        
        const descriptionCell = document.createElement('div');
        descriptionCell.classList.add('task-cell');
        
        const taskLink = document.createElement('a');
        taskLink.textContent = taskText;
        taskLink.href = `https://es.wikipedia.org/wiki/${taskText.replace(/ /g, '_')}`;
        taskLink.target = '_blank';
        
        descriptionCell.appendChild(taskLink);
        
        const statusCell = document.createElement('div');
        statusCell.classList.add('status-cell');
        
        const statusSelect = document.createElement('select');
        statusSelect.innerHTML = `
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Completado">Completado</option>
        `;
        statusSelect.value = taskStatus;
    
        statusSelect.addEventListener('change', (e) => {
            const currentTasks = JSON.parse(localStorage.getItem('tasks'));
            const updatedTasks = currentTasks.map(task => {
                if (task.text === taskText) {
                    return { text: task.text, status: e.target.value };
                }
                return task;
            });
            this.saveTasks(updatedTasks);
        });
        
        statusCell.appendChild(statusSelect);
        
        const actionsCell = document.createElement('div');
        actionsCell.classList.add('actions-cell');
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            const newText = prompt('Editar tema:', taskText);
            if (newText !== null && newText.trim() !== '') {
                this.editTask(taskText, newText);
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            this.deleteTask(taskText);
        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        
        newRow.appendChild(descriptionCell);
        newRow.appendChild(statusCell);
        newRow.appendChild(actionsCell);
        
        this.sheet.appendChild(newRow);
    }

    // Método para filtrar temas.
    filterTasks() {
        const searchText = this.searchInput.value.toLowerCase();
        const selectedStatus = this.statusFilter.value;
        const allTasks = document.querySelectorAll('.task-row');
        
        allTasks.forEach(taskRow => {
            const taskDescription = taskRow.querySelector('.task-cell a').textContent.toLowerCase();
            const taskStatus = taskRow.querySelector('.status-cell select').value;
            
            const matchesSearch = taskDescription.includes(searchText);
            const matchesStatus = selectedStatus === 'todos' || taskStatus === selectedStatus;
            
            if (matchesSearch && matchesStatus) {
                taskRow.style.display = 'grid'; 
            } else {
                taskRow.style.display = 'none';
            }
        });
    }
}

// Creamos una nueva instancia de nuestra clase Portal.
// Esto es lo que pone en marcha toda la aplicación.X   
document.addEventListener('DOMContentLoaded', () => {
    new Portal();
});
