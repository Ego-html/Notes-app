let buttonSend = document.getElementById("send");
let inputs = document.querySelectorAll("input");
let notesArray = [];

function sendData() {
  let objNotes = {
    name: null,
    created: null,
    category: null,
    content: null,
    dates: null,
  };
  inputs.forEach((input) => {
    const key = input.dataset.key;
    const value = input.value;
    if (objNotes.hasOwnProperty(key)) {
      objNotes[key] = value;
    }
  });
  notesArray.push(objNotes);
  notesArray.forEach(function (item) {
    let clone = rowItems.cloneNode(true);
    clone.querySelector(".title").textContent = item.name;
    clone.querySelector(".created-data").textContent = item.created;
    clone.querySelector(".task").textContent = item.category;
    clone.querySelector(".content").textContent = item.content;
    clone.querySelector(".dates").textContent = item.dates;
    clone.setAttribute(
      "data-attribute",
      "Math.random() + 1).toString(36).substring(7)"
    );
    containerNotes.appendChild(clone);
  });
  notesArray = [];
  rowItems.remove();
}

buttonSend.addEventListener("click", sendData);

let containerNotes = document.querySelector(".conteiner-notes");
let rowItems = document.querySelector(".row-items");

// let r = (Math.random() + 1).toString(36).substring(7);
// console.log(r);
