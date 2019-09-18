let person = [];

        if (sessionStorage['person'] == null) {
            person = {
                "tasks": [{
                    "info": "Go to gym",
                    "status": false
                }, {
                    "info": "Watch series",
                    "status": false
                }, {
                    "info": "Pray namaz",
                    "status": true
                }, {
                    "info": "Collect NIC",
                    "status": true
                }]
            };
        } else {
            person = JSON.parse(sessionStorage['person']);
        }

        let tasksBox = document.getElementById('taskList');
        let taskCount = 0;

        for (let task of person.tasks) {
            addTask(task);
        }

        let listItems = document.querySelectorAll('.list__item');
        addEvents(listItems);

        let addTaskForm = document.getElementById('new-task-form');
        addTaskForm.onsubmit = function (e) {
            e.preventDefault();
            let addTaskText = addTaskForm.firstElementChild.value;

            if (addTaskText != "") {
                let task={
                    info: addTaskText,
                    status: false
                }
                person.tasks.push(task); 
                updateJSON();
                addTask(task);
                addTaskText="";
                addEvents(document.querySelectorAll('.list__item'));
            }
        };

        function addEvents(listItems) {
            for (let listItem of listItems) {
            let deleteItem = listItem.lastElementChild;
            let checkItem = listItem.children[2];

            listItem.addEventListener('mouseover', () => deleteItem.style.display = "inline");

            listItem.addEventListener('mouseout', () => deleteItem.style.display = "none");

            deleteItem.addEventListener('click', function () {
                for (let taskKey in person.tasks) {
                    if (person.tasks[taskKey].info == listItem.firstElementChild.textContent) {
                        person.tasks.splice(taskKey, 1);
                        listItem.style.display = "none";
                        updateJSON()
                        break;
                    }
                }
            });

            checkItem.addEventListener('change', function (e) {
                for (let taskKey in person.tasks) {
                    if (person.tasks[taskKey].info == listItem.firstElementChild.textContent) {
                        person.tasks[taskKey].status = e.target.checked;
                        updateJSON();
                        break;
                    }
                }
            })
        }
        }

        function updateJSON() {
            sessionStorage['person'] = JSON.stringify(person);
        }

        function addTask(task){
            ++taskCount;
            let status = (task.status) ? "checked" : "";
            let html = `<li class="list-group-item form-check list__item"> 
                    <label class="form-check-label" for="check-item-${taskCount}" >${task.info}</label>
                    <code> &nbsp;&nbsp </code>
                    <input type="checkbox" class="check__item" id="check-item-${taskCount}" ${status}> 
                    <code id="delete-item" class="delete__item" >&#9986;</code> 
                    </li>`;

            tasksBox.innerHTML += html;
        }