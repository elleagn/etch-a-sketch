const getRandomInteger = function (max) {
  return Math.floor(max * Math.random());
};

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
  toggleRainbow();
  toggleShade();
  toggleEraser(false);
};

const clone = function (element) {
  const twin = element.cloneNode(true);
  element.replaceWith(twin);
  return twin;
};

const defineTheColor = function (color, box) {
  const randomColor = getRandomInteger(16777216).toString(16);
  const backgroundColor = box.style.backgroundColor;
  const rainbow = document.getElementById("rainbow");
  const shade = document.getElementById("shade");
  switch (color) {
    case "rainbow":
      if (!backgroundColor || backgroundColor === "transparent") {
        box.style.backgroundColor = `#${randomColor}`;
      } else {
        box.style.backgroundColor = shade.checked
          ? `color-mix(in srgb, ${backgroundColor},#000000 20%)`
          : `#${randomColor}`;
      }

      break;
    case "shade":
      if (backgroundColor && backgroundColor !== "transparent") {
        box.style.backgroundColor = `color-mix(in srgb, ${backgroundColor},#000000 20%)`;
      } else {
        box.style.backgroundColor = rainbow.checked
          ? randomColor
          : document.querySelector("input[type=color]").value;
      }
      break;

    default:
      box.style.backgroundColor = color;
  }
};

const colorOnHover = function (color = "transparent") {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach(function (box) {
    box = clone(box);
    box.addEventListener("mouseover", () => {
      defineTheColor(color, box);
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
  colorOnHover(document.querySelector("input[type=color]").value);
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

const toggleEraser = function (bool) {
  const button = document.getElementById("eraser");
  if (bool) {
    button.style.backgroundColor = `color-mix(in srgb, black, #ffffff  20%)`;
    colorOnHover();
    button.addEventListener(
      "click",
      () => {
        toggleEraser(false);
      },
      { once: true }
    );
  } else {
    button.style.backgroundColor = "black";
    colorOnHover(document.querySelector("input[type=color]").value);
    button.addEventListener(
      "click",
      () => {
        toggleEraser(true);
      },
      { once: true }
    );
  }
};

const eraseEverything = function () {
  document.querySelectorAll(".box").forEach((box) => {
    box.style.backgroundColor = "transparent";
  });
};

const toggleRainbow = function () {
  const rainbow = document.getElementById("rainbow");
  const shade = document.getElementById("shade");
  if (rainbow.checked) {
    colorOnHover("rainbow");
  } else {
    colorOnHover(
      shade.checked
        ? "shade"
        : document.querySelector("input[type=color]").value
    );
  }
};

const toggleShade = function (bool) {
  const rainbow = document.getElementById("rainbow");
  const shade = document.getElementById("shade");
  if (shade.checked) {
    colorOnHover("shade");
  } else {
    colorOnHover(
      rainbow.checked
        ? "rainbow"
        : document.querySelector("input[type=color]").value
    );
  }
};

const setupThePage = function () {
  setDefault();
  const color = document.querySelector("input[type=color]");
  createGrid(16);
  colorOnHover(color.value);
  const size = document.querySelector("input[type=range]");
  size.addEventListener("input", handleRangeChange);

  color.addEventListener("input", changeTheColor);
  const eraser = document.getElementById("eraser");
  eraser.addEventListener(
    "click",
    () => {
      toggleEraser(true);
    },
    { once: true }
  );
  const eraseAll = document.getElementById("erase-everything");
  eraseAll.addEventListener("click", eraseEverything);
  const rainbow = document.getElementById("rainbow");
  rainbow.checked = false;
  rainbow.addEventListener("input", toggleRainbow);
  const shade = document.getElementById("shade");
  shade.checked = false;
  shade.addEventListener("input", toggleShade);
};

setupThePage();
