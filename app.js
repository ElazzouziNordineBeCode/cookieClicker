// increment cookie number after cookie clicking

const score = document.querySelector(".cookie-number");
const cookieClic = document.querySelector(".cookie-clic");
let counter = 1;

// clic cookie
cookieClic.addEventListener("click", () => {
  score.innerHTML = parseInt(score.innerHTML) + counter;
});

// clic multiplicator
const cookieMulyiply = document.querySelector(".cookie-multiply");
let counterMult = parseInt(cookieMulyiply.innerHTML);
const pricesLabel = document.querySelectorAll(".label-price");

for (let priceLabel of pricesLabel) {
  priceLabel.addEventListener("click", () => {
    switch (priceLabel.id) {
      case "mult2":
        cookieMulyiply.innerHTML = parseInt(cookieMulyiply.innerHTML) * 2;
        counter = parseInt(cookieMulyiply.innerHTML);
        break;
      case "mult3":
        cookieMulyiply.innerHTML = parseInt(cookieMulyiply.innerHTML) + 3;
        counter = parseInt(cookieMulyiply.innerHTML);
        break;
      case "mult4":
        cookieMulyiply.innerHTML = parseInt(cookieMulyiply.innerHTML) + 4;
        counter = parseInt(cookieMulyiply.innerHTML);
        break;
    }
  });
}
