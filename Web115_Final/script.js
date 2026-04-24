let tasks = [];
let nextId = 1; // Sequential integer ID counter

function addTask() {
    // Get form values
    const taskNameInput = document.getElementById('task-input');
    const taskPriorityInput = document.getElementById('priority-select');
    const taskDateInput = document.getElementById('task-date');
    const taskImportantInput = document.getElementById('important-checkbox');

    // Validate task name
    const taskName = taskNameInput.value.trim();
    const taskPriority = taskPriorityInput.value;
    const taskDate = taskDateInput.value;
    const taskImportant = taskImportantInput.checked;

    // Make task name required
    if (taskName === '') {
        alert('Please enter a task name.');
        return;
    }

    // Create new task object matching the required data structure
    const newTask = {
        id: nextId++,           // Sequential integer . Task IDs exist to perform operations like delete and toggle complete.
        name: taskName,
        priority: taskPriority,
        isImportant: taskImportant,
        isCompleted: false,
        dateAdded: new Date().toLocaleDateString(),
        dueDate: taskDate
    };

    tasks.push(newTask); // Add new task to the end of the array
    renderTasks();

    // Clear form inputs
    taskNameInput.value = '';
    taskPriorityInput.value = 'Medium'; // Reset to default priority
    taskDateInput.value = '';
    taskImportantInput.checked = false;

    // Print to console
    console.log(JSON.stringify(tasks));
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id); // Remove task with matching id
    renderTasks();
    // Print to console
    console.log(JSON.stringify(tasks));
}

function toggleComplete(id) {
    const task = tasks.find(task => task.id === id); // Find task with matching id
    if (task) {
        task.isCompleted = !task.isCompleted; // Toggle completed status
        renderTasks();
    }
    // Print to console
    console.log(JSON.stringify(tasks));
}

function renderTasks() {
    const taskTableBody = document.getElementById('taskmanager'); // Get the table body element
    const emptyMsg = document.getElementById('empty-msg'); // Get the empty message element

    taskTableBody.innerHTML = ''; // Clear existing tasks

    if (tasks.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    }

    emptyMsg.style.display = 'none'; // Hide empty message if there are tasks

    tasks.forEach(task => {
        const row = document.createElement('tr'); // Create a new table row for each task

        // Determine priority badge color
        const priorityColors = {
            High: '#d32f2f',
            Medium: '#f57c00',
            Low: '#388e3c'
        };
        const badgeColor = priorityColors[task.priority] || '#378ace'; // Default color if priority is somehow invalid

        // Determine if due date is past due
        let dueDateDisplay = task.dueDate || '—';
        let dueDateClass = 'due-date';
        if (task.dueDate) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const due = new Date(task.dueDate + 'T00:00:00');
            if (due < today) {
                dueDateClass += ' past-due'; // Add past-due class if the task is overdue
            }
        }

        // Apply completed styling using .style property
        if (task.isCompleted) {
            row.style.textDecoration = 'line-through';
            row.style.opacity = '0.45';
            row.style.transition = 'opacity 0.3s ease';
        } else {
            row.style.textDecoration = 'none';
            row.style.opacity = '1';
            row.style.transition = 'opacity 0.3s ease';
        }

        // Highlight important tasks in red using .style property (per spec)
        if (task.isImportant) {
            row.style.backgroundColor = 'rgba(211, 47, 47, 0.35)'; // Light red background for important tasks
        } else {
            row.style.backgroundColor = '';
        }

        // Set the inner HTML of the row with task details and action buttons
        row.innerHTML = `
            <td class="task-name" title="${task.name}">${task.name}</td>
            <td>
                <span class="priority-badge" style="background-color: ${badgeColor};">
                    ${task.priority}
                </span>
            </td>
            <td>${task.dateAdded}</td>
            <td><span class="${dueDateClass}">${dueDateDisplay}</span></td>
            <td>${task.isImportant ? '⭐ Yes' : 'No'}</td>
            <td style="display: flex; gap: 6px; align-items: center;">
                <label class="done-label" title="Mark as completed">
                    <input
                        type="checkbox"
                        class="done-checkbox"
                        ${task.isCompleted ? 'checked' : ''}
                        onchange="toggleComplete(${task.id})"
                    />
                    <span>${task.isCompleted ? '✓ Done' : 'Done'}</span>
                </label>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;

        taskTableBody.appendChild(row); // Add the new row to the table body
    });
}

// Wire up the Add Task button
document.getElementById('add-task-button').addEventListener('click', addTask);

// Also allow pressing Enter in the task name field to add a task
document.getElementById('task-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addTask();
});
