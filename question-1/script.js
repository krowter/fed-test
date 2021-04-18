window.onload = () => {
  const card = document.getElementById("card-preview__card");
  drawCardBackground(card);
  createCardElements(card);
};

//helper functions

// handle all styling (colors) from css
const getCSSColor = (variableName) =>
  getComputedStyle(document.documentElement).getPropertyValue(variableName);

const drawCardBackground = (card) => {
  // use canvas to draw the card background
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.setAttribute("id", "card-preview__card-background");
  canvas.width = 400;
  canvas.height = 300;

  ctx.beginPath();
  ctx.moveTo(0, 150);
  ctx.bezierCurveTo(290, 60, 380, 110, 400, 120);
  ctx.lineTo(400, 300);
  ctx.lineTo(0, 300);
  card.style.background = getCSSColor("--blue");
  ctx.fillStyle = getCSSColor("--darkblue");
  ctx.fill();

  card.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
};
