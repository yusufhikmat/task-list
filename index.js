const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const btnAdd = document.querySelector('.btn-add');
const filter = document.querySelector('#filter');
const liList = document.querySelector('.collection');

const btnClear = document.querySelector('.clear-task');

//load all event listener
loadEventListener()

//add event listener
function loadEventListener(){
    //dom loadevent
    document.addEventListener('DOMContentLoaded', getTasks)
    form.addEventListener('submit' , addTask);
    liList.addEventListener('click' ,removeTask);
    btnClear.addEventListener('click', clearBtn)
    filter.addEventListener('keyup', filterText);
}
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
            //create an element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //createtextNode
    li.appendChild(document.createTextNode(task))

    //create link
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    //add ico
    link.innerHTML='<i class="fa fa-remove"></i>';

    //append link to li
    li.appendChild(link)
        //append it to it parent
        liList.appendChild(li)
    })
}

//function addTask
function addTask(e){
    if(taskInput.value===''){
        alert('Input field is empty')
    }

    //create an element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //createtextNode
    li.appendChild(document.createTextNode(taskInput.value))

    //create link
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    //add ico
    link.innerHTML='<i class="fa fa-remove"></i>';

    //append link to li
    li.appendChild(link)
        //append it to it parent
        liList.appendChild(li)

        // class function of local storage
        storeTaskInLocalStorage(taskInput.value)
    //clear input
    taskInput.value='';
    e.preventDefault()
}

//function store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //push the task into the array
    tasks.push(task);
       localStorage.setItem('tasks', JSON.stringify(tasks))
    
    }
//function remove task
function removeTask(e){{
   
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to remove this item')){
            e.target.parentElement.parentElement.remove()
       
       //remove from local storage
       removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
    e.preventDefault()
}}
//remove from local storage
function removeTaskFromLocalStorage(liList){ 
let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(liList.textContent === task){
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear btn
function clearBtn(){
   // liList.innerHTML='';
   while(liList.firstChild){
    liList.removeChild(liList.firstChild)
   }
   //clear from ls
   clearTasksFromLocalStorage();
}

//clear  task from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear()
}
//filter task
function filterText(e){
    const text = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll('.collection-item')
    listItem.forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
  
}
