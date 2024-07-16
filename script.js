const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        
        let editSpan = document.createElement('span');
        editSpan.innerHTML = "✎"; 
        editSpan.className = "edit"; 
        editSpan.onclick = function() {
            editTask(li);
        };
        li.appendChild(editSpan); 

        
        let deleteSpan = document.createElement('span');
        deleteSpan.innerHTML = "×";
        deleteSpan.className = "delete"; 
        deleteSpan.onclick = function() {
            li.remove();
            saveData();
        };
        li.appendChild(deleteSpan); 

        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("edit")) {
        editTask(e.target.parentElement);
    } else if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTasks() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

function editTask(li) {
    let currentText = li.childNodes[0].nodeValue;
    let newText = prompt("Edit your task:", currentText);
    if (newText !== null) {
        li.childNodes[0].nodeValue = newText;
        saveData();
    }
}

showTasks();
document.addEventListener("keyup",(event)=>{

  if(event.key == "Enter") addTask()
  
    
    console.log(event)
})
