let buttonCreateTask = document.getElementById("send");
let openCreateWindow = document.getElementById("button");
let inputs = document.querySelectorAll("input");
let rowItems = document.querySelector(".row-items-disable");
let containerNotes = document.querySelector(".conteiner-notes");
let archiveTasks;
let tasks = null;
let checkOutArchiveTasks = document.querySelector(".archive-button");
let archiveContainer = document.querySelector(".archive-dates");
let archiveTaskContainer = document.querySelector(".archive-tasks-container");
let editModal = document.querySelector(".container-tasks");
let countArchiveTasks = document.querySelector(".archive-tasks");
let activeTasks = document.querySelector(".active-tasks");
let archiveButton = document.getElementById("archive");

let ourTasks = [
  {
    name: "Shopping list",
    created: "April 20,2021",
    category: "Task",
    content: "Tomatos, bread",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-корзина-50.png",
    isArchive: false,
  },
  {
    name: "The theory of evolution",
    created: "April 27,2021",
    category: "Random Thougth",
    content: "The evolution theory",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-головной-мозг-48.png",
    isArchive: false,
  },
  {
    name: "New Feature",
    created: "May 05,2021",
    category: "Idea",
    content: "Implement new idea",
    dates: "3/5/2021, 5/5/2021",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-экологичные-технологии-48.png",
    isArchive: false,
  },
  {
    name: "William Gaddist",
    created: "May 07,2021",
    category: "Quote",
    content: "No pain, no gain",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-открытая-книга-48.png",
    isArchive: false,
  },
  {
    name: "Books",
    created: "May 15,2021",
    category: "Task",
    content: "Learning Java Script",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-шапка-выпускника-48.png",
    isArchive: false,
  },
  {
    name: "Task",
    created: "May 20,2021",
    category: "Task",
    content: "Learning Java Script",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-корзина-50.png",
    isArchive: false,
  },
  {
    name: "Random Thought",
    created: "May 22,2021",
    category: "Task",
    content: "Learning Java Script",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-экологичные-технологии-48.png",
    isArchive: false,
  },
];

render();

openCreateWindow.addEventListener("click", getCreateModalWindow);
buttonCreateTask.addEventListener("click", createTask);
containerNotes.addEventListener("click", editTasks);
editModal.addEventListener("click", viewEditTasks);
containerNotes.addEventListener("click", removeTasks);
tasks.addEventListener("click", addToArchive);
archiveContainer.addEventListener("click", getArchiveTasks);

function getCreateModalWindow() {
  $("#datepicker-create").datepicker();
}

function createTask() {
  let objNotes = {
    name: null,
    created: null,
    category: null,
    content: null,
    dates: null,
    id: (Math.random() + 1).toString(36).substring(7),
    isArchive: false,
  };
  inputs.forEach((input) => {
    const key = input.dataset.key;
    const value = input.value;
    if (objNotes.hasOwnProperty(key)) {
      objNotes[key] = value;
    }
  });
  ourTasks.push(objNotes);
  $("#exampleModal").modal("hide");

  render();
}

function editTasks(event) {
  if (event.target.id === "edit") {
    let modal = new bootstrap.Modal(document.getElementById("exampleModal2"));
    modal.show();
    let row = event.target.parentElement.parentElement;
    let rowId = row.getAttribute("data-id");
    document.getElementById("modal-edit").setAttribute("data-row-id", rowId);
    let currentTask = getTask(rowId);
    let inputName = document.querySelector(".name-item");
    let createdItem = document.querySelector(".created-item");
    let category = document.querySelector(".category-item");
    let content = document.querySelector(".content-item");
    let date = document.getElementById("datapicker-edit");
    $("#datapicker-edit").datepicker();
    inputName.value = currentTask.name;
    createdItem.value = currentTask.created;
    category.value = currentTask.category;
    content.value = currentTask.content;
    date.value = currentTask.dates;
  }
}

function viewEditTasks(event) {
  let target = event.target;
  if (target.id === "modal-edit") {
    let currentTask = getTask(target.getAttribute("data-row-id"));
    let inputName = document.querySelector(".name-item").value;
    let inputCreated = document.querySelector(".created-item").value;
    let inputCategory = document.querySelector(".category-item").value;
    let inputContent = document.querySelector(".content-item").value;
    let inputData = document.querySelector(".dates-item").value;

    currentTask.name = inputName;
    currentTask.created = inputCreated;
    currentTask.category = inputCategory;
    currentTask.content = inputContent;
    currentTask.dates = inputData;
    $("#exampleModal2").modal("hide");
    render();
  }
}

function removeTasks(event) {
  if (event.target.id === "basket") {
    let rowId =
      event.target.parentElement.parentElement.getAttribute("data-id");
    let currentTask = getTask(rowId);
    ourTasks = ourTasks.filter((obj) => obj.id !== currentTask.id);
    render();
  }
}

function addToArchive(event) {
  if (event.target.id === "archive") {
    let row = event.target.parentElement.parentElement;
    let id = row.getAttribute("data-id");
    const archiveTask = getTask(id);
    archiveTask.isArchive = true;

    render();
  }
}

function getArchiveTasks(event) {
  if (event.target.tagName === "BUTTON") {
    renderArchive();
  }
}

document.querySelector(".unarchive").addEventListener("click", function () {
  let inputsCheckbox = document.querySelectorAll(".inputs-checkbox");
  for (let i = 0; i < inputsCheckbox.length; i++) {
    if (inputsCheckbox[i].checked) {
      let row = inputsCheckbox[i].parentElement.parentElement;
      const unArchiveTask = getTask(row.getAttribute("data-id"));
      unArchiveTask.isArchive = false;
    }
  }
  renderArchive();
  render();
});

function getTask(rowId) {
  return ourTasks.filter((item) => item.id === rowId)[0];
}

function render() {
  tasks = document.getElementById("tasks");
  tasks.replaceChildren();

  ourTasks
    .filter((task) => !task.isArchive)
    .forEach((data) => {
      const rowHTML = createRow(data);
      tasks.innerHTML += rowHTML;
    });

  activeTasks.textContent = ourTasks.filter((task) => !task.isArchive).length;
  countArchiveTasks.textContent = ourTasks.filter(
    (task) => task.isArchive
  ).length;
}

function renderArchive() {
  archiveTaskContainer.replaceChildren();
  ourTasks
    .filter((task) => task.isArchive)
    .forEach((data) => {
      const rowHTML = crateArchiveRow(data);
      archiveTaskContainer.innerHTML += rowHTML;
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

function crateArchiveRow(obj) {
  return `<div class='row row-items-able row-checkbox' data-id="${obj.id}">
  <div class="col-2">
    <img src="images/icons/icones-notes/icons8-экологичные-технологии-48.png" class="img" />
    <span class="title">${obj.name}</span>
  </div>
  <div class="col-2">
    <span class="created-data">${obj.created}</span>
  </div>
  <div class="col-2">
    <span class="task">${obj.category}</span>
  </div>
  <div class="col-2">
    <span class="content">${obj.content}</span>
  </div>
  <div class="col-2">
    <span class="dates">${obj.dates}</span>
  </div>
  <div class="form-check col-2">
<input class="form-check-input inputs-checkbox" type="checkbox" value="">

</div>
<div class="form-check">

</div>
</div>
  `;
}
