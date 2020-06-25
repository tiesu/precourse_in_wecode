// <form class="js-toDoForm">
// <input class="js-toDoInput">
// <ul class="js-ul">
// todolist 필요한 기능: 
// 1. 입력된 값을 li에 추가해서 화면에 표현
// 2. 입력된 값을 localstorage에 저장
// 3. 브라우저를 켰을 때 localstorage에 저장된 값을 로드해서 표현
// 4. 삭제 버튼을 클릭시 li와 localstorage에서 삭제시키는 기능

const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-ul");

const TODOLIST = 'toDos';
let toDos = [];

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    li.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOLIST, JSON.stringify(toDos));
}
    

function loadToDos(){
    const loadedValue = localStorage.getItem(TODOLIST);
    if(loadedValue !== null){
        const parseValue = JSON.parse(loadedValue);
        parseValue.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDo = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDo;
    saveToDos();
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();