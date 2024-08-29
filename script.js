document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    const renderTodos = (todos) => {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            li.className = todo.completed ? 'completed' : '';

            const toggleButton = document.createElement('button');
            toggleButton.textContent = todo.completed ? 'Undo' : 'Complete';
            toggleButton.onclick = () => {
                updateTodos(todos.map(t =>
                    t === todo ? { ...t, completed: !t.completed } : t
                ));
            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                updateTodos(todos.filter(t => t !== todo));
            };

            li.appendChild(toggleButton);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    };

    const updateTodos = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos(todos);
    };

    const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos(initialTodos);

    todoForm.onsubmit = (event) => {
        event.preventDefault();
        const newTodo = { text: todoInput.value, completed: false };
        updateTodos([...initialTodos, newTodo]);
        todoInput.value = '';
    };
});
