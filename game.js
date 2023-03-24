// Get game elements
const cookie = document.getElementById('cookie');
const scoreDisplay = document.getElementById('score');
const cpsDisplay = document.getElementById("cps")
const autoClickerBtn = document.getElementById('auto-clicker');
const autoClickerBtn2 = document.getElementById('auto-clicker-2');
const rebirthButton = document.getElementById("rebirth");
const clickSound = document.getElementById("click-sound");
const Mult = document.getElementById("Mult")
// Initialize the game
let autoClickerCost = 10;
let autoClickerIntervalId;
let score = 0;
let clickValue = 1;
let autoClickerCost2 = 100;
let autoClickerIntervalId2;
let cps = 0;
let upgrades = [];
let Rebirthcost = 1000;
let rebirthReward = 2;
autoClickerBtn.disabled = true;
autoClickerBtn2.disabled = true;
rebirthButton.innerHTML = `Rebirth cost ${Rebirthcost}`;
// UI Reseter
function ResetUI() {
  scoreDisplay.textContent = `Cookies: ${score}`;
  autoClickerBtn.textContent = `Purchase Cursor (Cost: ${autoClickerCost})`;
  autoClickerBtn2.textContent = `Purchase Granny (Cost: ${autoClickerCost2})`;
  cpsDisplay.textContent = `Cookies per second: ${cps}`;
  rebirthButton.innerHTML = `Rebirth cost ${Rebirthcost}`;
}
// Rebirth code
rebirthButton.onclick = function () {
  if (score >= Rebirthcost) {
    // Reset game
    score = 0;
    autoClickerCost2 = 100;
    autoClickerCost = 10;
    cps = 0;
    clearInterval(autoClickerIntervalId);
    clearInterval(autoClickerIntervalId2);
    // Give reawards
    clickValue *= rebirthReward;
    Rebirthcost *= rebirthReward * 10;

    // Reset UI
    ResetUI();
    Mult.textContent = `Current Multiplier: ${clickValue}`
  }
};

function saveGame() {
  // Get the game data to save
  var gameData = {
    cookies: score,
    id1: autoClickerIntervalId,
    id2: autoClickerIntervalId2,
    cost1: autoClickerCost,
    cost2: autoClickerCost2,
    cps: cps,
    rebirthCost: Rebirthcost
  };
  // Save the game data to local storage
  localStorage.setItem("gameData", JSON.stringify(gameData));
}
function loadGame() {
  // Get the saved game data from local storage
  var savedData = localStorage.getItem("gameData");
  if (savedData) {
    // Parse the saved data into a JavaScript object
    savedData = JSON.parse(savedData);
    // Update the game state with the saved data
    score = savedData.cookies;
    autoClickerCost2 = savedData.cost2;
    autoClickerCost = savedData.cost1;
    cps = savedData.cps;
    if (savedData.Rebirthcost) {
      Rebirthcost = savedData.Rebirthcost;
    }
    for (let index = 0; index < cps; index++) {
      autoClickerIntervalId = setInterval(function () {
        score += clickValue;
        scoreDisplay.textContent = `Cookies: ${score}`;
      }, 1000);
    }


    if (score < autoClickerCost) {
      autoClickerBtn.disabled = true;
    }
    else {
      autoClickerBtn.disabled = false
    }
    if (score < autoClickerCost2) {
      autoClickerBtn2.disabled = true;
    }
    else {
      autoClickerBtn2.disabled = false;
    }
    if (score < Rebirthcost) {
      rebirthButton.disabled = true;
    }
    else {
      rebirthButton.disabled = false;
    }
    if (score < Rebirthcost) {
      rebirthButton.disabled = true;
    }
    else {
      rebirthButton.disabled = false;
    }
    // Reset UI
    ResetUI();
  }
}
// Bonus Cookie
function showBonusCookie() {
  const bonusCookie = document.getElementById('bonus-cookie');
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const randomX = Math.floor(Math.random() * screenWidth);
  const randomY = Math.floor(Math.random() * screenHeight);
  bonusCookie.style.top = `${randomY}px`;
  bonusCookie.style.left = `${randomX}px`;
  bonusCookie.style.display = 'block';
}
function startBonusCookieTimer() {
  setInterval(function () {
    const chance = Math.random();
    if (chance < 0.2) {
      showBonusCookie();
      setTimeout(function () {
        const bonusCookie = document.getElementById('bonus-cookie');
      });
    }
  });
}

// Cookie Click
cookie.addEventListener('click', function () {
  clickSound.currentTime = 0;
  clickSound.play();
  score += clickValue;
  scoreDisplay.textContent = `Cookies: ${score}`;
  cookie.classList.add('clicked');
  setTimeout(function () {
    cookie.classList.remove('clicked');
  }, 200);
  if (score < autoClickerCost) {
    autoClickerBtn.disabled = true;
  }
  else {
    autoClickerBtn.disabled = false
  }
  if (score < autoClickerCost2) {
    autoClickerBtn2.disabled = true;
  }
  else {
    autoClickerBtn2.disabled = false;
  }
  if (score < Rebirthcost) {
    rebirthButton.disabled = true;
  }
  else {
    rebirthButton.disabled = false;
  }
  const bonusCookie = document.getElementById('bonus-cookie');
  if (bonusCookie.style.display === 'block') {
    score += score / 10;
    scoreDisplay.textContent = `Cookies: ${score}`;
    bonusCookie.style.display = 'none';
  }
});
// Shop
autoClickerBtn.addEventListener('click', function () {
  if (score >= autoClickerCost) {
    score -= autoClickerCost;
    autoClickerCost *= 2;
    if (score < autoClickerCost) {
      autoClickerBtn.disabled = true;
    }
    else {
      autoClickerBtn.disabled = false
    }
    if (score < autoClickerCost2) {
      autoClickerBtn2.disabled = true;
    }
    else {
      autoClickerBtn2.disabled = false;
    }
    if (score < Rebirthcost) {
      rebirthButton.disabled = true;
    }
    else {
      rebirthButton.disabled = false;
    }
    scoreDisplay.textContent = `Cookies: ${score}`;
    autoClickerBtn.textContent = `Purchase Cursor (Cost: ${autoClickerCost})`;
    cps++;
    cpsDisplay.textContent = `Cookies per second: ${cps}`;
    autoClickerIntervalId = setInterval(function () {
      score += clickValue;
      scoreDisplay.textContent = `Cookies: ${score}`;
      if (score < autoClickerCost) {
        autoClickerBtn.disabled = true;
      }
      else {
        autoClickerBtn.disabled = false
      }
      if (score < autoClickerCost2) {
        autoClickerBtn2.disabled = true;
      }
      else {
        autoClickerBtn2.disabled = false;
      }
      if (score < Rebirthcost) {
        rebirthButton.disabled = true;
      }
      else {
        rebirthButton.disabled = false;
      }
      clickSound.currentTime = 0;
      clickSound.play();
    }, 1000);

  }
});
autoClickerBtn2.addEventListener('click', function () {
  if (score >= autoClickerCost2) {
    score -= autoClickerCost2;
    autoClickerCost2 *= 2;
    if (score < autoClickerCost) {
      autoClickerBtn.disabled = true;
    }
    else {
      autoClickerBtn.disabled = false
    }
    if (score < autoClickerCost2) {
      autoClickerBtn2.disabled = true;
    }
    else {
      autoClickerBtn2.disabled = false;
    }
    if (score < Rebirthcost) {
      rebirthButton.disabled = true;
    }
    else {
      rebirthButton.disabled = false;
    }
    scoreDisplay.textContent = `Cookies: ${score}`;
    autoClickerBtn2.textContent = `Purchase Granny (Cost: ${autoClickerCost2})`;
    cps += 10;
    cpsDisplay.textContent = `Cookies per second: ${cps}`;
    autoClickerIntervalId2 = setInterval(function () {
      score += 10 * clickValue;
      scoreDisplay.textContent = `Cookies: ${score}`;
      clickSound.currentTime = 0;
      clickSound.play();
      if (score < autoClickerCost) {
        autoClickerBtn.disabled = true;
      }
      else {
        autoClickerBtn.disabled = false
      }
      if (score < autoClickerCost2) {
        autoClickerBtn2.disabled = true;
      }
      else {
        autoClickerBtn2.disabled = false;
      }
      if (score < Rebirthcost) {
        rebirthButton.disabled = true;
      }
      else {
        rebirthButton.disabled = false;
      }
    }, 1000);
  }
});
// Call the loadGame function when the page loads
window.addEventListener("load", loadGame);
// Set a timer to save the game data every 10 seconds
setInterval(saveGame, 100);
