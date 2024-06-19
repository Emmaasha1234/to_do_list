document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos(todos) {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos(todos);
                renderTodos(todos);
            });
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }

    renderTodos(savedTodos);

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newTodo = todoInput.value.trim();
        if (newTodo) {
            savedTodos.push(newTodo);
            saveTodos(savedTodos);
            renderTodos(savedTodos);
            todoInput.value = '';
        }
    });
});
