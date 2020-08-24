const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0, 0, 0, 0]; //represent timer in form of array  //minutes seconds hund of seconds
//thousand of sec

// Add leading zero to numbers 9 or below (purely for aesthetics):
function helper(time) {
  if (time < 9) time = "0" + time;
  return time;
}

// Run a standard mi{nute/second/hundredths timer:
function runtimer() {
  let time = helper(timer[0]) + ":" + helper(timer[1]) + ":" + helper(timer[2]);
  theTimer.innerHTML = time;
  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

// Match the text entered with the provided text on the page:
function spelling() {
  let text = testArea.value;
  let origintextmatch = originText.substring(0, text.length);

  if (text == originText) {
    clearInterval(interval);
    testWrapper.setAttribute("style", "border: 10px solid green;");
  } else if (text == origintextmatch)
    testWrapper.setAttribute("style", "border: 10px solid blue;");
  else testWrapper.setAttribute("style", "border: 10px solid red;");
}

var interval; //global variable to stop the setinterval funct.
var timerisrunning = false;

// Start the timer:
function starttimer() {
  let textLength = testArea.value.length;
  if (textLength === 0 && !timerisrunning) {
    timerisrunning = true;
    interval = setInterval(runtimer, 10); //a controlled loop set at 1 sec
  }

  console.log(textLength);
}

// Reset everything:
function reset() {
  clearInterval(interval);
  timerisrunning = false;
  timer = [0, 0, 0, 0];

  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", starttimer, false);
testArea.addEventListener("keyup", spelling, false); // keyup works before the entering of letter
resetButton.addEventListener("click", reset, false);
