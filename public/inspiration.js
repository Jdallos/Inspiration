function responsiveNav() {
  var nav = document.getElementById("nav");
  if (nav.className === "open-nav") {
    nav.className += " responsive";
  } else {
    nav.className = "open-nav";
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  const button = document.querySelector("#random-button");

  function quoteGenerator() {
    const quoteSpace = document.querySelector("#random-quote");

    const newQuote = async () => {
      const quoteText = await getQuote();
      console.log(quoteText);
      quoteSpace.innerText = quoteText;
      quoteSpace.style.fontFamily = randFont();
    };

    const getQuote = async () => {
      try {
        const res = await axios.get("https://www.boredapi.com/api/activity/");
        return res.data.activity;
      } catch {
        return "Oh no, something went wrong! Someone once said, 'To overcome bordeom we must investigate it closely...'";
      }
    };

    function randFont() {
      const fonts = ["Lora", "Roboto", "Cinzel", "Average", "Permanent Marker"];
      return fonts[Math.floor(Math.random() * 5)];
    }

    const allText = document.querySelectorAll(".all-Text");
    const contentBackground = document.querySelector(
      ".main-content-background"
    );

    function colorChanger() {
      const newColor = randomColor();
      contentBackground.style.backgroundColor = newColor;
    }

    function randomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      //if background is dark, lighten text
      if (r + g + b <= 230) {
        for (let each of allText) {
          each.style.color = "white";
        }
      }
      if (r + g + b > 230) {
        for (let each of allText) {
          each.style.color = "black";
        }
      }
      return `rgba(${r},${g},${b}, 0.7)`;
    }

    newQuote();
    colorChanger();
  }

  let numOfClicks = 0;
  function clickEffects() {
    numOfClicks++;
    if (numOfClicks == 3) {
      button.classList.add("buttonSwell");
    }
    if (numOfClicks == 5) {
      button.classList.remove("buttonSwell");
    }
    if (numOfClicks == 7) {
      button.classList.add("randButtonMove1");
    }
    if (numOfClicks == 9) {
      button.classList.remove("randButtonMove1");
    }
    if (numOfClicks == 15) {
      button.classList.add("randButtonMove2");
    }
    if (numOfClicks == 17) {
      button.classList.remove("randButtonMove2");
    }
    if (numOfClicks == 25) {
      button.classList.add("randButtonMove3");
    }
    if (numOfClicks == 27) {
      button.classList.remove("randButtonMove3");
    }
    if (numOfClicks == 30) {
      button.classList.add("randButtonMove4");
    }
    if (numOfClicks == 33) {
      button.classList.remove("randButtonMove4");
    }
  }

  if (window.location.pathname == "/") {
    button.addEventListener("click", function () {
      quoteGenerator();
      clickEffects();
    });
  }
});