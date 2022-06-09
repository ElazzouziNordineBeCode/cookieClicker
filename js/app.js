import { rainImgs } from "./rainImgsList.js";
// START BUTTON REFRESH

let restart = document.getElementById("restart-btn");
restart.onclick = function () {
  window.location.reload();
};

// END BUTTON REFRESH

const cookieBtn = document.querySelector(".cookie-clic-container");
let score = document.querySelector(".cookie-number");
let multiplicator = document.querySelector(".multiply-total-value");
let multiplicatorCounter = 1; // increase score
let bonus200Counter = 1;
const boosters = document.querySelectorAll(".booster-btn");
const bonusBtns = document.querySelectorAll(".bonus-btn");
let x, y; // to save timer of clearinterval: x for interval auto-clic, y for interval bonus 200%
let chronoValue = document.querySelector(".chrono");
let chrono = 30; //secondes
let popUpBtn = document.querySelector(".pop-up-play");


popUpBtn.addEventListener("click", () => {
  document.getElementById("pop-up-main").style.display = "none";
  document.getElementById("pop-up-main").style.transition = "0.5s";
  document.body.style.overflowY = "auto";
});
/**
 *
 * @param {Array} btns
 * disable all btns by default
 */
const disableDefault = (btns) => {
  btns.forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = "0.6";
    btn.style.cursor = "not-allowed";
  });
};

disableDefault(boosters);

disableDefault(bonusBtns);

// disable by default drag/drop for all images
document.querySelectorAll(".container img").forEach((img) => {
  /**
   *
   * @returns false
   */
  img.ondragstart = () => {
    return false;
  };
});

/**
 *
 * @param {number} top : ;
 * @param {number} left
 */
const animeMultiplyValue = (top, left) => {
  // keep the current multiply value and anime it at clicking
  let spanClic = document.createElement("span");
  spanClic.setAttribute("id", "anime-onclic");
  spanClic.innerHTML = `${bonus200Counter === 2 ? `<span style="color:white">200%</span>` : `+<span style="color:white">${multiplicator.innerHTML}</span>`}`;
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

/**
 *
 * @param {Array} btns
 * @param {string} classPriceValue
 * function to check if we have enough of cookies to buy
 */
const enoughCookie = (btns, classPriceValue) => {
  btns.forEach((btn) => {
    let btnPrice = btn.querySelector(`.${classPriceValue}`);
    if (parseInt(score.innerHTML) >= parseInt(btnPrice.innerHTML) && btn.disabled === true) {
      btn.disabled = false;
      btn.classList.add("light");
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
    }
  });
};

// widths
const rainImgsSizes = ["50", "80", "100"];

// cloud of cookies background
const cookieRain = () => {
  let img = document.createElement("img");
  img.style.width = `${rainImgsSizes[Math.floor(Math.random() * rainImgsSizes.length)]}px`;
  let rainImg = rainImgs[Math.floor(Math.random() * rainImgs.length)];
  img.src = rainImg.source;
  img.setAttribute("bgColor", `${rainImg.bgColor}`);
  img.setAttribute("bgurl", `${rainImg.bgUrl}`);
  img.setAttribute("id", `${rainImg.biscuit}`);
  img.ondragstart = (ev) => {
    ev.target.style.opacity = "0.5";
    ev.dataTransfer.setData("src", ev.target.getAttribute("src"));
    ev.dataTransfer.setData("bgColor", ev.target.getAttribute("bgcolor"));
    ev.dataTransfer.setData("bgurl", ev.target.getAttribute("bgurl"));
    ev.dataTransfer.setData("name", ev.target.id);
  };
  img.ondragend = (ev) => {
    ev.target.style.opacity = "1";
  };
  let span = document.createElement("span");
  span.appendChild(img);
  span.style.left = `${Math.floor(Math.random() * 100)}%`;
  span.animate([{ transform: "translateY(-40vh)" }, { transform: "translateY(120vh) rotate(180deg)" }], {
    duration: 10000,
    iterations: Infinity,
  });
  document.querySelector(".bg-cookie").appendChild(span);
};

// active drag for imgs on small screen
document.querySelectorAll(".container-mini-cookies img").forEach((img) => {
  img.ondragstart = (ev) => {
    ev.target.style.opacity = "0.5";
    ev.dataTransfer.setData("src", ev.target.getAttribute("src"));
    ev.dataTransfer.setData("bgColor", ev.target.getAttribute("bgcolor"));
    ev.dataTransfer.setData("bgurl", ev.target.getAttribute("bgurl"));
    ev.dataTransfer.setData("name", ev.target.id);
  };
  img.ondragend = (ev) => {
    ev.target.style.opacity = "1";
  };
});

// drag/drop cookieBtn
cookieBtn.addEventListener(
  "dragover",
  (ev) => {
    ev.preventDefault();
    cookieBtn.style.opacity = "0.5";
  },
  false
);
cookieBtn.addEventListener(
  "dragleave",
  (ev) => {
    ev.preventDefault();
    cookieBtn.style.opacity = "1";
  },
  false
);
cookieBtn.addEventListener(
  "drop",
  (ev) => {
    let songDrop = new Audio('../assets/song/song-drop.mp3');
    songDrop.play();
    ev.preventDefault();
    cookieBtn.style.opacity = "1";
    ev.target.src = ev.dataTransfer.getData("src", ev.target.src);
    document.body.style.background = `url(${ev.dataTransfer.getData("bgurl", ev.target.getAttribute("bgurl"))}) no-repeat bottom center/contain fixed, ${ev.dataTransfer.getData(
      "bgColor"
    )}`;
    document.querySelectorAll(".biscuit-name").forEach((biscuitLabel) => {
      biscuitLabel.innerHTML = ev.dataTransfer.getData("name", ev.target.id);
    });
  },
  false
);

// increase score at cookie clic
cookieBtn.addEventListener("click", (e) => {
  // generate raining of cookies on background at clic cookie btn
  parseInt(score.innerHTML) <= 50 && cookieRain();
  // keep position of cursor at clicking and anime +1
  let top = e.offsetY;
  let left = e.offsetX;
  animeMultiplyValue(top, left);
  // anime the cookie button at clicking
  e.target.animate([{ transform: "scale(1)" }, { transform: "scale(1.1)" }], {
    duration: 300,
  });
  // upate the score
  score.innerHTML = parseInt(score.innerHTML) + multiplicatorCounter * bonus200Counter;
  // checking if we have enough of cookies to enable the booster
  enoughCookie(boosters, "booster-price-value");
  // checking if we have enough of cookies to enable the bonus
  enoughCookie(bonusBtns, "bonus-price-value");
});

/**
 *
 * @param {Array} btns
 * @param {string} classPriceValue
 */
const disableButton = (btns, classPriceValue) => {
  btns.forEach((btn) => {
    let btnPrice = btn.querySelector(`${classPriceValue}`);
    if (parseInt(score.innerHTML) < parseInt(btnPrice.innerHTML) && btn.disabled === false) {
      btn.disabled = true;
      btn.classList.remove("light");
      btn.style.opacity = "0.6";
      btn.style.cursor = "not-allowed";
    }
  });
};

/**
 *
 * @param {Array} btns
 */
const buyBoosterBonus = (btns) => {
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let price = btn.querySelector('[class$="price-value"]');
      // update score at buying
      score.innerHTML = parseInt(score.innerHTML) - parseInt(price.innerHTML);
      // increase the booster +10%
      price.innerHTML = Math.round(parseInt(price.innerHTML) * 1.8);
      // after updating score disable button
      disableButton(boosters, '[class$="price-value"]');
      disableButton(bonusBtns, '[class$="price-value"]');
      // update the multiplicator depending the booster clicked
      let multiplyIconValue;
      let multiplyIconImg;
      switch (btn.id) {
        case "boosterX2":
          let songboostx2 = new Audio('../assets/song/song-boostx2.mp3');
          songboostx2.play();
          // update the multiply value
          multiplicator.innerHTML = parseInt(multiplicator.innerHTML) + parseInt(`${multiplicator.innerHTML === "1" ? 1 : 2}`);
          // updtae the multiply icon
          multiplyIconValue = document.querySelector(".multiply-icon-value-x2");
          multiplyIconImg = document.getElementById("multiply-icon-escargot");
          break;
        case "boosterX3":
          let songboostx3 = new Audio('../assets/song/song-boostx3.mp3');
          songboostx3.play();
          // update the multiply value
          multiplicator.innerHTML = parseInt(multiplicator.innerHTML) + parseInt(`${multiplicator.innerHTML === "1" ? 2 : 3}`);
          // updtae the multiply icon
          multiplyIconValue = document.querySelector(".multiply-icon-value-x3");
          multiplyIconImg = document.getElementById("multiply-icon-speedy");
          break;
        case "boosterX4":
          let songboostx4 = new Audio('../assets/song/song-boostx4.mp3');
          songboostx4.play();
          // update the multiply value
          multiplicator.innerHTML = parseInt(multiplicator.innerHTML) + parseInt(`${multiplicator.innerHTML === "1" ? 3 : 4}`);
          // updtae the multiply icon
          multiplyIconValue = document.querySelector(".multiply-icon-value-x4");
          multiplyIconImg = document.getElementById("multiply-icon-bipbip");
          break;
        case "auto-clic":
          let songAutoClic = new Audio('../assets/song/song-autoclic.mp3');
          songAutoClic.play();
          let autoClicValue = document.querySelector(".timer-auto-clic");
          // setInterval = async, we use a new variable to increase score
          autoClicValue.innerHTML = parseInt(autoClicValue.innerHTML) + 1;
          let counterAutoClic = autoClicValue.innerHTML;
          // clear previous interval before execute the new interval to delete asynchron
          clearInterval(x);
          x = setInterval(() => {
            score.innerHTML = parseInt(score.innerHTML) + parseInt(counterAutoClic) * parseInt(multiplicator.innerHTML) * bonus200Counter;
          }, 1000);
          // update timer value
          let timerAutoClic = document.querySelector(".timer-auto-clic");
          timerAutoClic.innerHTML = autoClicValue.innerHTML;
          // increase auto clic total
          break;
        case "bonus-pourcent":
          let songBonus = new Audio('../assets/song/song-bonus.mp3');
          songBonus.play();
          bonus200Counter = 2;
          chronoValue.style.display = "flex";
          y = setInterval(() => {
            chronoValue.innerHTML = `${--chrono}s`;
            chrono === -1 && (clearInterval(y), (chrono = 30), (chronoValue.innerHTML = `${chrono}s`), (bonus200Counter = 1), (chronoValue.style.display = "none"));
          }, 1000);
          break;
      }
      // anime the icon multiply
      if (multiplyIconImg !== undefined) {
        multiplyIconImg.animate([{ transform: "scale(1)" }, { transform: "scale(1.3)" }], {
          duration: 500,
        });
        // update mulitply value
        multiplyIconValue.innerHTML = parseInt(multiplyIconValue.innerHTML) + 1;
        // update mulitply counter
        multiplicatorCounter = parseInt(multiplicator.innerHTML);
      }
    });
  });
};

buyBoosterBonus(boosters);
buyBoosterBonus(bonusBtns);
