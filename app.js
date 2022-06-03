// increment cookie number after cookie clicking

const score = document.querySelector(".cookie-number");
const cookieClic = document.querySelector(".cookie-clic");
let counter = 1;

cookieClic.addEventListener("click", () => {
  score.innerHTML = counter++;
});
