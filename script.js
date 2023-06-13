const createGrid = function (size) {
  const container = document.querySelector(".container");
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (j = 0; j < size; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      row.appendChild(box);
    }
    container.appendChild(row);
  }
};

const colorOnHover = function (color) {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.addEventListener("mouseover", () => {
      box.style.backgroundColor = color;
    });
  });
};

const handleRangeChange = function (event) {
  const grid = document.querySelector(".container");
  const rows = document.querySelectorAll(".row");
  rows.forEach((row) => {
    grid.removeChild(row);
  });
  const range = event.target;
  const size = range.valueAsNumber;
  createGrid(size);
  colorOnHover();
  document.querySelector("output").textContent = `${size}`;
};

const changeTheColor = function (event) {
  const color = event.target;
  colorOnHover(color.value);
};
const setDefault = function () {
  const size = document.querySelector("input[type=range]");
  size.value = 16;
  const color = document.querySelector("input[type=color]");
  color.value = "#f5f5f5";
};

const setupThePage = function () {
  setDefault();
  createGrid(16);
  colorOnHover("whitesmoke");
  const size = document.querySelector("input[type=range]");
  size.addEventListener("input", handleRangeChange);
  const color = document.querySelector("input[type=color]");
  color.addEventListener("input", changeTheColor);
};

setupThePage();
