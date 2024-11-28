const elements = document.querySelectorAll(".element");
const containers = document.querySelectorAll(".container");
const checks = document.querySelectorAll(".check");
const tasks = document.querySelectorAll(".task");
const deletes = document.querySelectorAll(".deletee");

const btn = document.getElementById("btn");
const input = document.getElementById("input");

btn.addEventListener("click", (e) => {
  handleTaskAddition(e);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleTaskAddition(e);
  }
});

function handleTaskAddition(e) {
  e.preventDefault();

  const value = input.value.trim();

  if (!value) return;

  const element = document.createElement("div");
  const tas = document.createElement("div");
  const check = document.createElement("div");
  const p = document.createElement("p");
  const deletee = document.createElement("div");

  element.classList.add("element");
  tas.classList.add("tas");
  check.classList.add("check");
  p.classList.add("task");
  deletee.classList.add("deletee");

  element.setAttribute("draggable", "true");
  p.innerText = value;
  deletee.innerHTML = "&#10005;";

  element.appendChild(tas);
  element.appendChild(deletee);
  tas.appendChild(check);
  tas.appendChild(p);

  element.addEventListener("dragstart", () => {
    element.classList.add("dragging");
  });

  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");
  });

  deletee.addEventListener("click", () => {
    element.classList.toggle("x");
  });

  check.addEventListener("click", () => {
    check.classList.toggle("selected");
    p.classList.toggle("done");
  });

  containers[0].appendChild(element);

  input.value = "";
  input.focus();
}

checks.forEach((check, index) => {
  check.addEventListener("click", () => {
    check.classList.toggle("selected");
    tasks[index].classList.toggle("done");
  });
});

deletes.forEach((delet, index) => {
  delet.addEventListener("click", () => {
    elements[index].classList.toggle("x");
  });
});

elements.forEach((element) => {
  element.addEventListener("mouseover", (event) => {
    event.target.style.borderColor = "#666";
  });

  element.addEventListener("mouseout", (event) => {
    event.target.style.borderColor = "#444";
  });

  element.addEventListener("dragstart", (event) => {
    event.target.classList.add("dragging");
  });

  element.addEventListener("dragend", (event) => {
    event.target.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();

    const dragging = document.querySelector(".dragging");
    const belowTask = insertAboveTask(container, e.clientY);

    if (!belowTask) {
      container.appendChild(dragging);
    } else {
      container.insertBefore(dragging, belowTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const elements = zone.querySelectorAll(".element:not(.dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  elements.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};
