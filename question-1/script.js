// for easier lookup and consistent variable naming
const CARD = {
  CARD: "card-preview__card",
  FORM: "card-preview__form",
  BACKGROUND: "card-preview__card-background",
  NUMBER: "card-preview__card-number",
  OWNER: "card-preview__card-owner",
  EXPIRATION: "card-preview__card-expiration",
};

window.onload = () => {
  const initialValues = {
    NUMBER: "xxxxxxxxxxxxxxxx",
    OWNER: "xxxxx xxxxx",
    EXPIRATION: "xxxx",
  };

  const card = document.getElementById(CARD.CARD);

  drawCardBackground(card);
  setupFormInputs();
};

// handle all styling (colors) from css
const getCSSColor = (variableName) =>
  getComputedStyle(document.documentElement).getPropertyValue(variableName);

const drawCardBackground = (card) => {
  // use canvas to draw the card background
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.setAttribute("id", CARD.BACKGROUND);
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

const setupFormInputs = () => {
  const { number, expiration, securitycode } = document.getElementById(
    CARD.FORM
  ).elements;

  // 16 digits + 3 separators
  number.maxLength = 19;
  number.addEventListener(
    "keyup",
    ({ target }) =>
      (target.value = chunkString(
        target.value.replace(/\D/g, "").slice(0, 16),
        4
      ).join("-"))
  );

  // 4 digits + 1 separator
  expiration.maxLength = 5;
  expiration.addEventListener(
    "keyup",
    ({ target }) =>
      (target.value = chunkString(
        target.value.replace(/\D/g, "").slice(0, 4),
        2
      ).join("/"))
  );

  securitycode.maxLength = 3;
};

const chunkString = (str, N) => {
  const result = [];
  for (let i = 0; i < str.length; i += N) {
    result.push(str.substr(i, N));
  }
  return result;
};
