function rollDice() {
  const dice = [...document.querySelectorAll(".die-list")];
  let stateColor = [0, 0, 0]; // red = 0, blue = 1, green = 2
  let stateDie = [0, 0, 0, 0, 0, 0];

  let currentRoll = getRoll(); // this triggers the roll counter.

  if (currentRoll === 3) {
    document.getElementById("roll-button").disabled = true;
    document.getElementById("roll-button").innerText = "Select Points";
  } else {
    document.getElementById("roll-button").innerText = "Roll";
  }

  dice.forEach((die) => {
    if (die.dataset.hold === "false") {
      toggleClasses(die);
      die.dataset.roll = getRandomNumber(1, 6);
      die.dataset.color = getRandomNumber(1, 3);
    }
    stateDie[die.dataset.roll - 1]++;
    stateColor[die.dataset.color - 1]++;
  });

  checkPoints(stateColor, stateDie);

  // Debugging stuff to check states
  // console.log(stateColor);
  // console.log(stateDie);
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRoll() {
  let roll = parseInt(document.getElementById("roll").innerText);
  roll = roll + 1;
  if (roll === 4) {
    roll = 1;
    clearDiceHolds();
  }
  document.getElementById("roll").innerText = roll;
  return roll;
}

function toggleHold(die) {
  const elDie = document.getElementById("die-" + die);

  if (parseInt(document.getElementById("roll").innerText) === 0) {
    return false;
  }

  if (elDie.dataset.hold === "false") {
    elDie.dataset.hold = "true";
    document.querySelector("button[data-die='" + die + "']").innerText =
      "Unhold";
  } else {
    elDie.dataset.hold = "false";
    document.querySelector("button[data-die='" + die + "']").innerText = "Hold";
  }
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearDiceHolds() {
  const dice = [...document.querySelectorAll(".die-list")];
  dice.forEach((die) => {
    die.dataset.hold = false;
  });
  document.querySelector("button[data-die='1']").innerText = "Hold";
  document.querySelector("button[data-die='2']").innerText = "Hold";
  document.querySelector("button[data-die='3']").innerText = "Hold";
  document.querySelector("button[data-die='4']").innerText = "Hold";
  document.querySelector("button[data-die='5']").innerText = "Hold";
}

function checkPoints(colors, dice) {
  // TODO: save game history / session / or highest score.

  // TODO: multiplayer mode, need to save each player state and switch
  // when round ends.

  // TODO: miscellaneous cleanup of code, its sloppy.

  // TODO: style and better front-end visuals / animations.

  // check if colors have 5
  if (document.getElementById("point-red").dataset.final === "false") {
    if (colors[0] === 5) {
      // reds
      document.getElementById("point-red").dataset.points = "35";
    } else {
      document.getElementById("point-red").dataset.points = 0;
    }
  }

  if (document.getElementById("point-blue").dataset.final === "false") {
    if (colors[1] === 5) {
      // blues
      document.getElementById("point-blue").dataset.points = "35";
    } else {
      document.getElementById("point-blue").dataset.points = 0;
    }
  }
  if (document.getElementById("point-green").dataset.final === "false") {
    if (colors[2] === 5) {
      // greens
      document.getElementById("point-green").dataset.points = "35";
    } else {
      document.getElementById("point-green").dataset.points = 0;
    }
  }

  // singles
  if (document.getElementById("point-1").dataset.final === "false") {
    if (dice[0] > 0) {
      document.getElementById("point-1").dataset.points = dice[0] * 1;
    } else {
      document.getElementById("point-1").dataset.points = 0;
    }
  }

  if (document.getElementById("point-2").dataset.final === "false") {
    if (dice[1] > 0) {
      document.getElementById("point-2").dataset.points = dice[1] * 2;
    } else {
      document.getElementById("point-2").dataset.points = 0;
    }
  }

  if (document.getElementById("point-3").dataset.final === "false") {
    if (dice[2] > 0) {
      document.getElementById("point-3").dataset.points = dice[2] * 3;
    } else {
      document.getElementById("point-3").dataset.points = 0;
    }
  }

  if (document.getElementById("point-4").dataset.final === "false") {
    if (dice[3] > 0) {
      document.getElementById("point-4").dataset.points = dice[3] * 4;
    } else {
      document.getElementById("point-4").dataset.points = 0;
    }
  }

  if (document.getElementById("point-5").dataset.final === "false") {
    if (dice[4] > 0) {
      document.getElementById("point-5").dataset.points = dice[4] * 5;
    } else {
      document.getElementById("point-5").dataset.points = 0;
    }
  }

  if (document.getElementById("point-6").dataset.final === "false") {
    if (dice[5] > 0) {
      document.getElementById("point-6").dataset.points = dice[5] * 6;
    } else {
      document.getElementById("point-6").dataset.points = 0;
    }
  }

  let sumOfDice = 0;
  for (let i = 0; i < 6; i++) {
    sumOfDice += dice[i] * (i + 1);
  }

  // chance
  if (document.getElementById("point-chance").dataset.final === "false") {
    document.getElementById("point-chance").dataset.points = sumOfDice;
  }

  // 3 of a kind.
  if (document.getElementById("point-3x").dataset.final === "false") {
    let threeFlag = false;
    for (let i = 0; i < 6; i++) {
      if (dice[i] >= 3) {
        threeFlag = true;
      }
    }
    if (threeFlag === false) {
      document.getElementById("point-3x").dataset.points = 0;
    } else {
      document.getElementById("point-3x").dataset.points = sumOfDice;
    }
  }

  // 4 of a kind
  if (document.getElementById("point-4x").dataset.final === "false") {
    let fourFlag = false;
    for (let i = 0; i < 6; i++) {
      if (dice[i] >= 4) {
        fourFlag = true;
      }
    }
    if (fourFlag === false) {
      document.getElementById("point-4x").dataset.points = 0;
    } else {
      document.getElementById("point-4x").dataset.points = sumOfDice;
    }
  }

  // full house, check if any are == 3, then loop again to find another with == 2 (25 points)
  if (document.getElementById("point-fh").dataset.final === "false") {
    let fhFlag = false;
    for (let i = 0; i < 6; i++) {
      if (dice[i] === 3) {
        //
        for (let x = 0; x < 6; x++) {
          if (x !== i) {
            if (dice[x] === 2) {
              fhFlag = true;
            }
          }
        }
      }
    }
    if (fhFlag === false) {
      document.getElementById("point-fh").dataset.points = 0;
    } else {
      document.getElementById("point-fh").dataset.points = 25;
    }
  }

  // color full house, check if any are == 3, then loop again to find another with == 2 (15 points)
  if (document.getElementById("point-color-fh").dataset.final === "false") {
    let cfhFlag = false;
    for (let i = 0; i < 3; i++) {
      if (colors[i] === 3) {
        //
        for (let x = 0; x < 3; x++) {
          if (x !== i) {
            if (colors[x] === 2) {
              cfhFlag = true;
            }
          }
        }
      }
    }
    if (cfhFlag === false) {
      document.getElementById("point-color-fh").dataset.points = 0;
    } else {
      document.getElementById("point-color-fh").dataset.points = 15;
    }
  }

  // large straight, if there are 5 that equal 1
  // 1 to 5, 2 to 6 == points
  if (document.getElementById("point-lg").dataset.final === "false") {
    let lgStraight1 = [1, 1, 1, 1, 1, 0];
    let lgStraight2 = [0, 1, 1, 1, 1, 1];
    if (
      dice.toString() === lgStraight1.toString() ||
      dice.toString() === lgStraight2.toString()
    ) {
      document.getElementById("point-lg").dataset.points = 40;
    } else {
      document.getElementById("point-lg").dataset.points = 0;
    }
  }

  // small straight, loop to find 4 in a row, could make this work on large too.
  if (document.getElementById("point-sm").dataset.final === "false") {
    let smCounter = 0;
    for (let i = 0; i < 6; i++) {
      if (dice[i] > 0) {
        smCounter++;
      } else {
        smCounter = 0;
      }
      if (smCounter >= 4) {
        break;
      }
    }
    if (smCounter >= 4) {
      document.getElementById("point-sm").dataset.points = 30;
    } else {
      document.getElementById("point-sm").dataset.points = 0;
    }
  }

  // yahtzee (50 then 100 extra bonus, can have multiple)
  if (document.getElementById("point-yahtzee").dataset.final === "false") {
    let yahtzeeFlag = false;
    for (let i = 0; i < 6; i++) {
      if (dice[i] === 5) {
        yahtzeeFlag = true;
      }
    }
    if (yahtzeeFlag === false) {
      document.getElementById("point-yahtzee").dataset.points = 0;
    } else {
      document.getElementById("point-yahtzee").dataset.points = 50;
    }
  } else {
    // TODO, this is where if they get a 2nd yahtzee they get a 100 point bonus
    // plus they can pick any of the remaining options and get the full points
    // example, they can pick a sm or lg straight for full points
    // requires some reworking of logic.
    // bonus conditions below
    // the dice value, 3x, 4x, full house, sm, lg, chance are options for full
    // points. add || yahtzee.final !== false, move yahtzee flag to top of func
    // this will have the current roll conditons for checks on these options.
  }

  if (document.getElementById("point-top-total").dataset.final === "false") {
    // calc only final datasets
    let topCount = 0;
    let itemsLeft = 0;
    for (let i = 1; i < 7; i++) {
      let elTemp = document.getElementById("point-" + i);
      if (elTemp.dataset.final !== "false") {
        topCount += parseInt(elTemp.dataset.final);
      } else {
        // still able to get the bonus
        itemsLeft++;
      }
    }

    // TODO clean this up
    document.getElementById("point-top-total").dataset.points = topCount;
    if (itemsLeft > 0) {
    } else {
      if (topCount > 62) {
        // add bonus
        topCount += 35;
        updateScore(35); // add bonus points.
        console.log("got bonus of 35 points!!");
      } else {
        topCount = 0;
      }
      document.getElementById("point-top-total").dataset.points = topCount;
      document.getElementById("point-top-total").dataset.final = topCount;
    }
  }

  // update front end points
  updatePoints();
}

function updatePoints() {
  let items = [
    "point-1",
    "point-2",
    "point-3",
    "point-4",
    "point-5",
    "point-6",
    "point-3x",
    "point-4x",
    "point-fh",
    "point-sm",
    "point-lg",
    "point-chance",
    "point-yahtzee",
    "point-red",
    "point-green",
    "point-blue",
    "point-color-fh",
    "point-top-total"
  ];

  // update front-end to reflect points.
  items.forEach((item) => {
    let el = document.getElementById(item);
    el.querySelector("div").innerText = el.dataset.points;
  });
}

function selectPoints(id) {
  // see if game has started, if so then allow clicks.
  if (parseInt(document.getElementById("roll").innerText) === 0) {
    return false;
  }

  // Make sure the point is available
  let el = document.getElementById(id);
  if (el.dataset.final === "false") {
    el.dataset.final = el.dataset.points;
    updateScore(el.dataset.points);
    clearDiceHolds();
    updateScoreBoard();
    document.getElementById("roll").innerText = 0;
    document.getElementById("roll-button").disabled = false;
    document.getElementById("roll-button").click();
  }
}

function updateScore(points) {
  let score = document.getElementById("score");
  score.innerText = parseInt(score.innerText) + parseInt(points);
}

function updateScoreBoard() {
  const points = [...document.querySelectorAll(".point-item")];
  let counter = 0;
  points.forEach((item) => {
    if (item.dataset.final !== "false") {
      counter++;
    }
  });

  document.getElementById("checked").innerText =
    counter + " / " + points.length;

  if (counter === 18) {
    document.getElementById("gameover").dataset.show = "true";
  }
}

function restartGame() {
  // this will reset all the options
  // TODO
  // reset score to 0
  // reset roll to 0
  // reset items to 0 / 18
  // clear all items final to false
  // clear item point values to -
  // reset hold buttons
  // set all dice to red 1s
  // update ui buttons
  // save score to local storage
}

document.getElementById("roll-button").addEventListener("click", rollDice);
