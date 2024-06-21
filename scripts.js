


document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const datetimeInput = document.getElementById('datetime-input');
    const taskTypeSelect = document.getElementById('task-type');
    const addTaskButton = document.getElementById('add-task-button');
    const fromDateInput = document.getElementById('from-date');
    const toDateInput = document.getElementById('to-date');
    const filterTaskTypeSelect = document.getElementById('filter-task-type');
    const filterButton = document.getElementById('filter-button');
    const taskList = document.getElementById('task-list');

    // Add 20 tasks of different categories when the page loads
    const defaultTasks = [
        { task: 'Do math homework', datetime: '2024-07-01T08:00', taskType: 'homework' },
        { task: 'Submit English assignment', datetime: '2024-07-02T10:00', taskType: 'assignment' },
        { task: 'Do math homework', datetime: '2024-07-01T08:00', taskType: 'homework' },
        { task: 'Submit English assignment', datetime: '2024-07-02T10:00', taskType: 'assignment' },
        { task: 'Study for Science exam', datetime: '2024-07-03T14:00', taskType: 'exam' },
        { task: 'Work on Project X', datetime: '2024-07-04T12:00', taskType: 'project' },
        { task: 'Attend club meeting', datetime: '2024-07-05T16:00', taskType: 'activity' },
        { task: 'Go for a run', datetime: '2024-07-06T07:00', taskType: 'personal' },
        { task: 'Buy groceries', datetime: '2024-07-07T18:00', taskType: 'personal' },
        { task: 'Pay utility bills', datetime: '2024-07-08T09:00', taskType: 'expense' },
        { task: 'Submit History assignment', datetime: '2024-07-09T11:00', taskType: 'assignment' },
        { task: 'Practice guitar', datetime: '2024-07-10T15:00', taskType: 'personal' },
        { task: 'Study for Math exam', datetime: '2024-07-11T17:00', taskType: 'exam' },
        { task: 'Prepare for Science project', datetime: '2024-07-12T10:00', taskType: 'project' },
        { task: 'Volunteer at community center', datetime: '2024-07-13T13:00', taskType: 'activity' },
        { task: 'Read a book', datetime: '2024-07-14T19:00', taskType: 'personal' },
        { task: 'Attend club meeting', datetime: '2024-07-15T16:00', taskType: 'activity' },
        { task: 'Study for English exam', datetime: '2024-07-16T14:00', taskType: 'exam' },
        { task: 'Submit Math assignment', datetime: '2024-07-17T12:00', taskType: 'assignment' },
        { task: 'Practice coding', datetime: '2024-07-18T10:00', taskType: 'personal' },
        { task: 'Plan weekend trip', datetime: '2024-07-19T08:00', taskType: 'personal' },
        { task: 'Pay rent', datetime: '2024-07-20T09:00', taskType: 'expense' },
        // Add more tasks here...
    ];

    defaultTasks.forEach(({ task, datetime, taskType }) => {
        addTask(task, datetime, taskType);
    });

    addTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        const datetime = datetimeInput.value.trim();
        const taskType = taskTypeSelect.value;
        if (task && datetime) {
            addTask(task, datetime, taskType);
            taskInput.value = '';
            datetimeInput.value = '';
        } else {
            alert('Please fill in all task details.');
        }
    });

    filterButton.addEventListener('click', () => {
        const fromDate = fromDateInput.value ? new Date(fromDateInput.value) : null;
        const toDate = toDateInput.value ? new Date(toDateInput.value) : null;
        const taskType = filterTaskTypeSelect.value;
        filterTasks(fromDate, toDate, taskType);
    });

    function addTask(task, datetime, taskType) {
        const li = document.createElement('li');
        li.textContent = `${task} - ${datetime} - ${taskType}`;
        taskList.appendChild(li);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            editTask(li);
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);
    }

    function filterTasks(fromDate, toDate, taskType) {
        Array.from(taskList.children).forEach(taskItem => {
            const taskText = taskItem.textContent.toLowerCase();
            const taskDateTime = new Date(taskText.split(' - ')[1]);

            const taskTypeMatch = taskType === '' || taskText.includes(taskType);
            const dateRangeMatch = (!fromDate || taskDateTime >= fromDate) && (!toDate || taskDateTime <= toDate);

            if (taskTypeMatch && dateRangeMatch) {
                taskItem.style.display = 'block';
            } else {
                taskItem.style.display = 'none';
            }
        });
    }

    function editTask(taskItem) {
        const taskText = taskItem.textContent;
        const taskParts = taskText.split(' - ');
        taskInput.value = taskParts[0];
        datetimeInput.value = taskParts[1];
        taskTypeSelect.value = taskParts[2];
        taskList.removeChild(taskItem);
    }
});