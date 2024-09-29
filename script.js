const form = document.querySelector("#task-form");
const textInput = document.querySelector(".input");
const submit = document.querySelector("#task-submit");
const listElement = document.querySelector("#tasks");
const taskDone = document.querySelector("#task-done");
const doneSection = document.querySelector(".done");
const taskSection = document.querySelector(".task-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = textInput.value;
  if (!text) {
    alert("Please fill the task");
    return;
  }
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  const taskContent = document.createElement("div");
  taskContent.classList.add("content");
  //   taskContent.innerText = text;

  taskElement.appendChild(taskContent);

  const taskInput = document.createElement("input");
  taskInput.classList.add("text");
  taskInput.type = "text";
  taskInput.value = text;
  taskInput.setAttribute("readonly", "readonly");

  taskContent.appendChild(taskInput);

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const edit = document.createElement("button");
  edit.classList.add("edit");
  edit.innerHTML = "edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = "delete";

  const check = document.createElement("button");
  check.classList.add("check");
  check.innerHTML = "check";

  const undoBtn = document.createElement("button");
  undoBtn.classList.add("undo");
  undoBtn.innerHTML = "undo";

  actions.appendChild(check);
  actions.appendChild(edit);
  actions.appendChild(deleteBtn);
  taskElement.appendChild(actions);
  listElement.appendChild(taskElement);
  textInput.value = "";

  taskSection.style.display =
    listElement.children.length > 0 ? "block" : "none";
  doneSection.style.display = taskDone.children.length > 0 ? "block" : "none";

  edit.addEventListener("click", () => {
    if (edit.innerText.toLocaleLowerCase() == "edit") {
      taskInput.removeAttribute("readonly");
      taskInput.focus();
      edit.innerHTML = "Save";
    } else {
      taskInput.setAttribute("readonly", "readonly");
      edit.innerHTML = "Edit";
    }
  });

  deleteBtn.addEventListener("click", () => {
    taskElement.remove();
    taskSection.style.display =
      listElement.children.length > 0 ? "block" : "none";
    doneSection.style.display = taskDone.children.length > 0 ? "block" : "none";
  });

  check.addEventListener("click", () => {
    actions.removeChild(edit);
    actions.removeChild(check);
    actions.appendChild(undoBtn);
    taskDone.appendChild(taskElement);
    if (taskDone.children.length > 0) {
      doneSection.style.display = "block";
    } else {
      doneSection.style.display = "none";
    }
    taskSection.style.display =
      listElement.children.length > 0 ? "block" : "none";
  });

  undoBtn.addEventListener("click", () => {
    actions.appendChild(check);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    actions.removeChild(undoBtn);
    taskDone.removeChild(taskElement);
    listElement.appendChild(taskElement);
    if (taskDone.children.length > 0) {
      doneSection.style.display = "block";
    } else {
      doneSection.style.display = "none";
    }
    taskSection.style.display =
      listElement.children.length > 0 ? "block" : "none";
  });
});
