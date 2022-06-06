const cookieBtn = document.querySelector(".cookie-clic-container");
let score = document.querySelector(".cookie-number");
let multiplicator = document.querySelector(".multiply-total-value");
let multiplicatorCounter = 1; // increase score
let bonus200Counter = 1;
const boosters = document.querySelectorAll(".booster-btn");
const bonusBtns = document.querySelectorAll(".bonus-btn");
let clicAnime = document.getElementById("anime-onclic"); // the +1 at clicking cookie button
let x, y; // to save timer of clearinterval: x for interval auto-clic, y for interval bonus 200%

// function to disable, by default, boosters and bonus
const disableDefault = (btns) => {
  btns.forEach((btn) => {
    btn.disabled = true;
    btn.style.cursor = "not-allowed";
  });
};

// disable boosters
disableDefault(boosters);

// disable bonus
disableDefault(bonusBtns);

// disable drag/drop cookie image
cookieBtn.ondragstart = () => {
  return false;
};

// function to anime +1 at clicking
const animeMultiplyValue = (top, left) => {
  // keep the current multiply value and anime it at clicking
  clicAnime.innerHTML = `${
    bonus200Counter === 2 ? "200%" : `+${multiplicator.innerHTML}`
  }`;
  clicAnime.animate(
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
      btn.style.cursor = "pointer";
    }
  });
};

// increase score at cookie clic
cookieBtn.addEventListener("click", (e) => {
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
        let autoClicValue = document.querySelector(".autoClic-total-value");
        // setInterval = async, we use a new variable to increase score
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
        autoClicValue.innerHTML = parseInt(autoClicValue.innerHTML) + 1;
        break;
      case "200%":
        let bonus200Value = document.querySelector(".timer-bonus200");
        let chrono = 30; //secondes
        bonus200Value.style.color = "red";
        bonus200Counter = 2;
        clearInterval(y);
        y = setInterval(() => {
          bonus200Value.innerHTML = chrono--;
          chrono === -1 &&
            (clearInterval(y),
            (bonus200Value.style.color = "unset"),
            (bonus200Counter = 1));
        }, 1000);
        break;
    }
    // after updating score disable booster wich we can't buy it
    disableButton(boosters, "booster-price-value");
    // after updating score disable bonus wich we can't buy it
    disableButton(bonusBtns, "bonus-price-value");
  });
});
