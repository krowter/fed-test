// main function
window.onload = () => {
  // for easier lookup and consistent variable naming
  const CARD = {
    CARD: "card-preview__card",
    LOGO: "card-preview__logo",
    FORM: "card-preview__form",
    BACKGROUND: "card-preview__card-background",
    NUMBER: "card-preview__card-number",
    OWNER: "card-preview__card-owner",
    EXPIRATION: "card-preview__card-expiration",
  };

  drawCardBackground(CARD);
  setupFormEventHandlers(CARD);
};

const drawCardBackground = (CARD) => {
  const card = document.getElementById(CARD.CARD);

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

const setupFormEventHandlers = (CARD) => {
  const cardOwner = document.getElementById(CARD.OWNER);

  const { owner, number, expiration, securitycode } = document.getElementById(
    CARD.FORM
  ).elements;

  // 16 is arbitrary, just so the styling won't break
  owner.maxLength = 16;
  owner.addEventListener("keyup", ({ target }) => {
    cardOwner.textContent = target.value.toUpperCase();
  });

  // 16 digits + 3 separators
  number.maxLength = 19;
  number.addEventListener("keyup", (e) =>
    handleCardNumberChange(e.target, CARD)
  );

  // 4 digits + 1 separator
  expiration.maxLength = 5;
  expiration.addEventListener("keyup", (e) =>
    handleCardExpirationChange(e.target, CARD)
  );

  securitycode.maxLength = 3;
};

const handleCardNumberChange = (target, CARD) => {
  const cardLogo = document.getElementById(CARD.LOGO);
  const cardNumber = document.getElementById(CARD.NUMBER);

  const formatted = chunkString(
    target.value.replace(/\D/g, "").slice(0, 16),
    4
  ).join("-");
  target.value = formatted;
  cardNumber.textContent = formatted;

  if (target.value.startsWith("4")) {
    cardLogo.src = "./assets/visa.png";
    target.style.backgroundImage = `url(./assets/visa.png)`;
  } else if (target.value.startsWith("5")) {
    cardLogo.src = "./assets/mastercard.png";
    target.style.backgroundImage = `url(./assets/mastercard.png)`;
  } else {
    cardLogo.src = "";
  }
};

const handleCardExpirationChange = (target, CARD) => {
  const cardExpiration = document.getElementById(CARD.EXPIRATION);

  const formatted = chunkString(
    target.value.replace(/\D/g, "").slice(0, 4),
    2
  ).join("/");
  target.value = formatted;
  cardExpiration.textContent = formatted;
};

const chunkString = (str, N) => {
  const result = [];
  for (let i = 0; i < str.length; i += N) {
    result.push(str.substr(i, N));
  }
  return result;
};

// handle all styling (colors) from css
const getCSSColor = (variableName) =>
  getComputedStyle(document.documentElement).getPropertyValue(variableName);
