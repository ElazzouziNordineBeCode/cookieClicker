// COPY
// COPY
// COPY
// COPY
// COPY
// COPY
// COPY
// COPY
// COPY

const cookieBtn = document.querySelector(".cookie-clic-container");
let score = document.querySelector(".cookie-number");
let multiplicator = document.querySelector(".multiply-total-value");
let multiplicatorCounter = 1; // increase score
let bonus200Counter = 1;
const boosters = document.querySelectorAll(".booster-btn");
const bonusBtns = document.querySelectorAll(".bonus-btn");
let clicAnime = document.getElementById("anime-onclic"); // the +1 at clicking cookie button
let x, y; // to save timer of clearinterval: x for interval auto-clic, y for interval bonus 200%
let chronoValue = document.querySelector(".chrono");
let chrono = 30; //secondes

// function to disable, by default, boosters and bonus
const disableDefault = (btns) => {
  btns.forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = "0.6";
    btn.style.cursor = "not-allowed";
  });
};

// disable boosters
disableDefault(boosters);

// disable bonus
disableDefault(bonusBtns);

// disable drag/drop for all images by default
document.querySelectorAll("img").forEach((img) => {
  img.ondragstart = () => {
    return false;
  };
});

// function to anime +1 at clicking
const animeMultiplyValue = (top, left) => {
  // keep the current multiply value and anime it at clicking
  let spanClic = document.createElement("span");
  spanClic.setAttribute("id", "anime-onclic");
  spanClic.innerHTML = `${
    bonus200Counter === 2 ? "200%" : `+${multiplicator.innerHTML}`
  }`;
  top = top - (parseInt(Math.random() * 20) + 1); // random 1 to 10px
  left = left + (parseInt(Math.random() * 40) - 20); // random -20 to 40px
  spanClic.animate(
    [
      {
        transform: "translateY(-20px) rotateY(0)",
        top: `${top}px`,
        left: `${left}px`,
        opacity: "1",
      },
      {
        transform: "translateY(-100px) rotateY(360deg)",
        top: `${top}px`,
        left: `${left}px`,
        opacity: "0",
      },
    ],
    {
      duration: 1500,
    }
  );
  document.querySelector(".cookie-clic-container").appendChild(spanClic);
  setTimeout(() => {
    document.querySelector(".cookie-clic-container").removeChild(spanClic);
  }, 1600);
};

// function to check if we have enough of cookies to buy
const enoughCookie = (btns, classPriceValue) => {
  btns.forEach((btn) => {
    let btnPrice = btn.querySelector(`.${classPriceValue}`);
    if (
      parseInt(score.innerHTML) >= parseInt(btnPrice.innerHTML) &&
      btn.disabled === true
    ) {
      btn.disabled = false;
      btn.classList.add("light");
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
    }
  });
};

// generate raining of cookies on background at clic cookie btn
const rainImgs = [
  "oreonoir.png",
  "oreoblanc.png",
  "oreobrun.png",
  "princelu.png",
  "cookie.png",
];
const rainImgsSizes = ["50", "80", "100"];

const cookieRain = () => {
  let img = document.createElement("img");
  img.src = rainImgs[Math.floor(Math.random() * rainImgs.length)];
  img.style.width = `${
    rainImgsSizes[Math.floor(Math.random() * rainImgsSizes.length)]
  }px`;
  img.ondragstart=(ev)=>{
    ev.target.style.opacity = '0.5';
  }
  img.ondragend=(ev)=>{
    ev.target.style.opacity = '1';
  }
  let span = document.createElement("span");
  span.appendChild(img);
  span.style.left = `${Math.floor(Math.random() * 100)}%`;
  span.animate(
    [
      { transform: "translateY(-40vh)" },
      { transform: "translateY(120vh) rotate(180deg)" },
    ],
    {
      duration: 10000,
      iterations: Infinity,
    }
  );
  document.querySelector(".bg-cookie").appendChild(span);
};

// drag/drop cookieBtn
cookieBtn.addEventListener('dragover', (ev)=>{
  ev.preventDefault();
  cookieBtn.style.opacity = '0.5';
});
cookieBtn.addEventListener('dragleave', ()=>{
  cookieBtn.style.opacity = '1';
});
cookieBtn.addEventListener('drop', (ev)=>{
  console.log('ok');
});

// increase score at cookie clic
cookieBtn.addEventListener("click", (e) => {
  // generate raining of cookies on background at clic cookie btn
  cookieRain();
  // keep position of cursor at clicking and anime +1
  let top = e.offsetY;
  let left = e.offsetX;
  animeMultiplyValue(top, left);
  // anime the cookie button at clicking
  e.target.animate([{ transform: "scale(1)" }, { transform: "scale(1.1)" }], {
    duration: 300,
  });
  // upate the score
  score.innerHTML =
    parseInt(score.innerHTML) + multiplicatorCounter * bonus200Counter;
  // checking if we have enough of cookies to enable the booster
  enoughCookie(boosters, "booster-price-value");
  // checking if we have enough of cookies to enable the bonus
  enoughCookie(bonusBtns, "bonus-price-value");
});

// function to disable bonus and booster
const disableButton = (btns, classPriceValue) => {
  btns.forEach((btn) => {
    let btnPrice = btn.querySelector(`.${classPriceValue}`);
    if (
      parseInt(score.innerHTML) < parseInt(btnPrice.innerHTML) &&
      btn.disabled === false
    ) {
      btn.disabled = true;
      btn.classList.remove("light");
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    }
  });
};

// buy a booster
boosters.forEach((booster) => {
  booster.addEventListener("click", () => {
    let boosterPrice = booster.querySelector(".booster-price-value");
    // update score at buying
    score.innerHTML =
      parseInt(score.innerHTML) - parseInt(boosterPrice.innerHTML);
    // increase the booster +10%
    boosterPrice.innerHTML = Math.round(parseInt(boosterPrice.innerHTML) * 1.8);
    // after updating score disable booster wich we can't buy it
    disableButton(boosters, "booster-price-value");
    // after updating score disable bonus wich we can't buy it
    disableButton(bonusBtns, "bonus-price-value");
    // update the multiplicator depending the booster clicked
    let multiplyIconValue;
    let multiplyIconImg;
    switch (booster.id) {
      case "boosterX2":
        // update the multiply value
        multiplicator.innerHTML =
          parseInt(multiplicator.innerHTML) +
          parseInt(`${multiplicator.innerHTML === "1" ? 1 : 2}`);
        // updtae the multiply icon
        multiplyIconValue = document.querySelector(".multiply-icon-value-x2");
        multiplyIconImg = document.getElementById("multiply-icon-escargot");
        break;
      case "boosterX3":
        // update the multiply value
        multiplicator.innerHTML =
          parseInt(multiplicator.innerHTML) +
          parseInt(`${multiplicator.innerHTML === "1" ? 2 : 3}`);
        // updtae the multiply icon
        multiplyIconValue = document.querySelector(".multiply-icon-value-x3");
        multiplyIconImg = document.getElementById("multiply-icon-speedy");
        break;
      case "boosterX4":
        // update the multiply value
        multiplicator.innerHTML =
          parseInt(multiplicator.innerHTML) +
          parseInt(`${multiplicator.innerHTML === "1" ? 3 : 4}`);
        // updtae the multiply icon
        multiplyIconValue = document.querySelector(".multiply-icon-value-x4");
        multiplyIconImg = document.getElementById("multiply-icon-bipbip");
        break;
    }
    // anime the icon multiply
    multiplyIconImg.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.3)" }],
      {
        duration: 500,
      }
    );
    // update mulitply value
    multiplyIconValue.innerHTML = parseInt(multiplyIconValue.innerHTML) + 1;
    // update mulitply counter
    multiplicatorCounter = parseInt(multiplicator.innerHTML);
  });
});

// buy a bonus
bonusBtns.forEach((bonusBtn) => {
  bonusBtn.addEventListener("click", () => {
    let bonusPrice = bonusBtn.querySelector(".bonus-price-value");
    // update score at buying
    score.innerHTML =
      parseInt(score.innerHTML) - parseInt(bonusPrice.innerHTML);
    // increase the booster +10%
    bonusPrice.innerHTML = Math.round(parseInt(bonusPrice.innerHTML) * 1.8);
    switch (bonusBtn.id) {
      case "auto-clic":
        let autoClicValue = document.querySelector(".timer-auto-clic");
        // setInterval = async, we use a new variable to increase score
        autoClicValue.innerHTML = parseInt(autoClicValue.innerHTML) + 1;
        let counterAutoClic = autoClicValue.innerHTML;
        // clear previous interval before execute the new interval to delete asynchron
        clearInterval(x);
        x = setInterval(() => {
          score.innerHTML =
            parseInt(score.innerHTML) + parseInt(counterAutoClic);
        }, 1000);
        // update timer value
        let timerAutoClic = document.querySelector(".timer-auto-clic");
        timerAutoClic.innerHTML = autoClicValue.innerHTML;
        // increase auto clic total
        break;
      case "bonus-pourcent":
        bonus200Counter = 2;
        chronoValue.style.display = "flex";
        y = setInterval(() => {
          chronoValue.innerHTML = `${--chrono}s`;
          chrono === -1 &&
            (clearInterval(y),
            (chrono = 30),
            (chronoValue.innerHTML = `${chrono}s`),
            (bonus200Counter = 1),
            (chronoValue.style.display = "none"));
        }, 1000);
        break;
    }
    // after updating score disable booster wich we can't buy it
    disableButton(boosters, "booster-price-value");
    // after updating score disable bonus wich we can't buy it
    disableButton(bonusBtns, "bonus-price-value");
  });
});

// COPY
// COPY
// COPY
// COPY
// COPY
// COPY
// COPY
// COPY
