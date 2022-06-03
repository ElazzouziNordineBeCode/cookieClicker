// on clic on the image called Cookie.png multiply 2 one on value called cookie-counter-number

var cookieCounter = document.getElementById("cookie-counter-number");
var cookieButton = document.getElementById("cookie-img");

cookieButton.addEventListener("click", function () {
  cookieCounter.innerHTML = parseInt(cookieCounter.innerHTML) * 2;
});
