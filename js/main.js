let buttonCreateTask = document.getElementById("send");
let inputs = document.querySelectorAll("input");
let rowItems = document.querySelector(".row-items-disable");
let containerNotes = document.querySelector(".conteiner-notes");
let clone = null;
let archive = "inactive";
let archiveArr = [];
let addTaskToArchive = [];
let map;
let tasks = null;
let activeTasks = document.querySelector(".active-tasks");
let checkOutArchiveTasks = document.querySelector(".archive-button");
let archiveContainer = document.querySelector(".archive-dates");
let archiveTaskContainer = document.querySelector(".archive-tasks-container");

document.addEventListener("DOMContentLoaded", function () {
  activeTasks.textContent = ourTasks.length;
});

let ourTasks = [
  {
    name: "Shopping list",
    created: "April 20,2021",
    category: "Task",
    content: "Tomatos, bread",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-корзина-50.png",
    archive: archive,
  },
  {
    name: "The theory of evolution",
    created: "April 27,2021",
    category: "Random Thougth",
    content: "The evolution theory",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-головной-мозг-48.png",
    archive: archive,
  },
  {
    name: "New Feature",
    created: "May 05,2021",
    category: "Idea",
    content: "Implement new idea",
    dates: "3/5/2021, 5/5/2021",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-экологичные-технологии-48.png",
    archive: archive,
  },
  {
    name: "William Gaddist",
    created: "May 07,2021",
    category: "Quote",
    content: "No pain, no gain",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-открытая-книга-48.png",
    archive: archive,
  },
  {
    name: "Books",
    created: "May 15,2021",
    category: "Task",
    content: "Learning Java Script",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-шапка-выпускника-48.png",
    archive: archive,
  },
  {
    name: "Task",
    created: "May 20,2021",
    category: "Task",
    content: "Learning Java Script",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-корзина-50.png",
    archive: archive,
  },
  {
    name: "Random Thought",
    created: "May 22,2021",
    category: "Task",
    content: "Learning Java Script",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-экологичные-технологии-48.png",
    archive: archive,
  },
];

render();

buttonCreateTask.addEventListener("click", createTask);

function createTask() {
  let objNotes = {
    name: null,
    created: null,
    category: null,
    content: null,
    dates: null,
    id: (Math.random() + 1).toString(36).substring(7),
  };
  inputs.forEach((input) => {
    const key = input.dataset.key;
    const value = input.value;
    if (objNotes.hasOwnProperty(key)) {
      objNotes[key] = value;
    }
  });
  ourTasks.push(objNotes);
  render();
  activeTasks.textContent = ourTasks.length;
}

let edit = document.querySelector(".edit");

let modal = new bootstrap.Modal(document.getElementById("exampleModa2"));

containerNotes.addEventListener("click", function (event) {
  if (event.target.id === "edit") {
    modal.show();
    let col = event.target.parentElement;
    let row = col.parentElement;
    let rowId = row.getAttribute("data-id");
    document.getElementById("modal-edit").setAttribute("data-row-id", rowId);
    let currentTask = getTask(rowId);
    let inputName = document.querySelector(".name-item");
    let createdItem = document.querySelector(".created-item");
    let category = document.querySelector(".category-item");
    let content = document.querySelector(".content-item");
    let date = document.querySelector(".dates-item");

    inputName.value = currentTask.name;
    createdItem.value = currentTask.created;
    category.value = currentTask.category;
    content.value = currentTask.content;
    date.value = currentTask.dates;
  }
});

function getTask(rowId) {
  return ourTasks.filter((item) => item.id === rowId)[0];
}

let editModal = document.querySelector(".container-tasks");
editModal.addEventListener("click", function (event) {
  let target = event.target;
  if (target.id === "modal-edit") {
    console.log(target);
    let id = target.getAttribute("data-row-id");
    let currentTask = getTask(id);
    console.log(currentTask);
    let inputName = document.querySelector(".name-item").value;
    let inputCreated = document.querySelector(".created-item").value;
    let inputCategory = document.querySelector(".category-item").value;
    let inputContent = document.querySelector(".content-item").value;
    let inputData = document.querySelector(".dates-item").value;

    ourTasks.forEach((obj) => {
      if (obj.id === id) {
        obj.name = inputName;
        obj.created = inputCreated;
        obj.category = inputCategory;
        obj.content = inputContent;
        obj.dates = inputData;
      }
    });
    render();
  }
});

function render() {
  tasks = document.getElementById("tasks");
  tasks.replaceChildren();
  ourTasks.forEach((data) => {
    const rowHTML = createRow(data);
    tasks.innerHTML += rowHTML;
  });
}

function createRow(data) {
  const rowHTML = `
    <div class='row row-items-able' data-id="${data.id}" data-archive=${data.archive}">
      <div class="col-sm">
        <img src="images/icons/icones-notes/icons8-экологичные-технологии-48.png" class="img" />
        <span class="title">${data.name}</span>
      </div>
      <div class="col-sm">
        <span class="created-data">${data.created}</span>
      </div>
      <div class="col-sm">
        <span class="task">${data.category}</span>
      </div>
      <div class="col-sm">
        <span class="content">${data.content}</span>
      </div>
      <div class="col-sm">
        <span class="dates">${data.dates}</span>
      </div>
      <div class="col-sm">
        <img src="images/icons/icones-notes/icons8-редактировать-50.png" id="edit" />
        <img src="images/icons/icons8-архив-48.png" id="archive" />
        <img src="images/icons/icons8-корзина-50.png" id="basket" />
      </div>
    </div>
  `;

  return rowHTML;
}

let bascket = document.getElementById("basket");

containerNotes.addEventListener("click", function removeTasks(event) {
  if (event.target.id === "basket") {
    let col = event.target.parentElement;
    let row = col.parentElement;
    let rowId = row.getAttribute("data-id");
    let currentTask = getTask(rowId);
    ourTasks = ourTasks.filter((obj) => obj.id !== currentTask.id);
    render();
    activeTasks.textContent = ourTasks.length;
  }
});

let archiveButton = document.getElementById("archive");
let countArchiveTasks = document.querySelector(".archive-tasks");

tasks.addEventListener("click", function addToArchive(event) {
  if (event.target.id === "archive") {
    let col = event.target.parentElement;
    let row = col.parentElement;
    let rowArchive = row.getAttribute("data-id");
    let currentTaskArchive = getTask(rowArchive);
    archiveArr.push(
      ourTasks.filter((obj) => obj.id === currentTaskArchive.id)[0]
    );
    ourTasks = ourTasks.filter((obj) => obj.id !== currentTaskArchive.id);
    render();
    countArchiveTasks.textContent = archiveArr.length;
    activeTasks.textContent = ourTasks.length;
  }
});

archiveContainer.addEventListener("click", function getArchiveTasks(event) {
  if (event.target.tagName === "BUTTON") {
    let uniqueArr = archiveArr.filter(
      (obj1) => !addTaskToArchive.some((obj2) => obj2.id === obj1.id)
    );
    uniqueArr.forEach(function (obj) {
      archiveTaskContainer.innerHTML += `
      <div class='row row-items-able' data-id="${obj.id}">
      <div class="col-sm">
        <img src="images/icons/icones-notes/icons8-экологичные-технологии-48.png" class="img" />
        <span class="title">${obj.name}</span>
      </div>
      <div class="col-sm">
        <span class="created-data">${obj.created}</span>
      </div>
      <div class="col-sm">
        <span class="task">${obj.category}</span>
      </div>
      <div class="col-sm">
        <span class="content">${obj.content}</span>
      </div>
      <div class="col-sm">
        <span class="dates">${obj.dates}</span>
      </div>
    </div>
      `;
      addTaskToArchive.push(obj);
    });
  }
});

// let arr = [{name:1}, {id: 2}]
