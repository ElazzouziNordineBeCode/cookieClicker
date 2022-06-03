// increment cookie number after cookie clicking

const score = document.querySelector(".cookie-number");
const cookieClic = document.querySelector(".cookie-clic");
let counter = 1;

cookieClic.addEventListener("click", () => {
  score.innerHTML = parseInt(score.innerHTML) + counter;
});

const labelMultiply = document.querySelector(".label-multiply");
const cookieMulyiply = document.querySelector(".cookie-multiply");
let counterMult = parseInt(cookieMulyiply.innerHTML);
labelMultiply.addEventListener("click", () => {
  cookieMulyiply.innerHTML = ++counterMult;
  counter = counterMult
});
