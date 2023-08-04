let buttonCreateTask = document.getElementById("send");
let inputs = document.querySelectorAll("input");
let rowItems = document.querySelector(".row-items-disable");
let containerNotes = document.querySelector(".conteiner-notes");
let clone = null;

let ourTasks = [
  {
    name: "Shopping list",
    created: "April 20,2021",
    category: "Task",
    content: "Tomatos, bread",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-корзина-50.png",
  },
  {
    name: "The theory of evolution",
    created: "April 27,2021",
    category: "Random Thougth",
    content: "The evolution theory",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-головной-мозг-48.png",
  },
  {
    name: "New Feature",
    created: "May 05,2021",
    category: "Idea",
    content: "Implement new idea",
    dates: "3/5/2021, 5/5/2021",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-экологичные-технологии-48.png",
  },
  {
    name: "William Gaddist",
    created: "May 07,2021",
    category: "Quote",
    content: "No pain, no gain",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-открытая-книга-48.png",
  },
  {
    name: "Books",
    created: "May 15,2021",
    category: "Task",
    content: "Learning Java Script",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-шапка-выпускника-48.png",
  },
  {
    name: "Task",
    created: "May 20,2021",
    category: "Task",
    content: "Learning Java Script",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-корзина-50.png",
  },
  {
    name: "Random Thought",
    created: "May 22,2021",
    category: "Task",
    content: "Learning Java Script",
    dates: "",
    id: (Math.random() + 1).toString(36).substring(7),
    src: "images/icons/icones-notes/icons8-экологичные-технологии-48.png",
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
}

let edit = document.querySelector(".edit");

let modal = new bootstrap.Modal(document.getElementById("exampleModa2"));

containerNotes.addEventListener("click", function (event) {
  if (event.target.id === "edit") {
    modal.show();
  }
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
  const tasks = document.getElementById("tasks");
  tasks.replaceChildren();
  ourTasks.forEach((data) => {
    const rowHTML = createRow(data);
    tasks.innerHTML += rowHTML;
  });
}

function createRow(data) {
  const rowHTML = `
    <div class='row row-items-able' data-id="${data.id}">
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
        <img src="images/icons/icons8-архив-48.png" />
        <img src="images/icons/icons8-корзина-50.png" />
      </div>
    </div>
  `;

  return rowHTML;
}
