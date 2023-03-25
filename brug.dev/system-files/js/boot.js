/* jshint -W083 */

//    _____ _______ ____  _____
//   / ____|__   __/ __ \|  __ \
//  | (___    | | | |  | | |__) |
//   \___ \   | | | |  | |  ___/
//   ____) |  | | | |__| | |
//  |_____/   |_|  \____/|_|
// You are about to enter the source code.
// It is adviced to stop reading immediatly and to close this file for your own personal mental health.
// Its workings are unknown but is suspected to be contagious and should be left alone.
// Thank you for your understanding.

//inofrmation
var browserInfo = [
  ">browser-info: " + navigator.appVersion,
  ">user-agent: " + navigator.userAgent,
  ">browser-driver: " + navigator.product,
]

var systemInfo = [
  " ",
  ">date: " + new Date(),
  ">language: " + navigator.language,
  ">os: " + navigator.platform,
  ">online?: " + navigator.onLine,
  ">cookies enabled?: " + navigator.cookieEnabled,
  ">screen-width: " + screen.width,
  ">screen-height: " + screen.height,
]

var osInfo = [
  " ",
  ">space-os v0.1b (wip)",
  ">author: Cas Brugman",
  ">INTERNET    [  <span style='color: lime;'> OK </span>  ]",
  ">BROWSER     [  <span style='color: lime;'> OK </span>  ]",
  ">OS          [  <span style='color: lime;'> OK? </span> ]",
]

function printFor(variable, delay) {
  for (var i in variable) {
    printLog(variable, i, delay)
  }
}

function printLog(variable, i, delay) {
  setTimeout(function () {
    document.getElementById("log").innerHTML += variable[i] + "<br>"
  }, delay * i)
}

printFor(browserInfo, 0)

setTimeout(function () {
  printFor(systemInfo, 20)
}, 500)
setTimeout(function () {
  printFor(osInfo, 30)
}, 2000)

if (debug.boot) {
  document.addEventListener("click", () => {
    var date = new Date()
    if (!played && (date.getHours() != 2 || date.getMinutes() != 27)) {
      playing = true
      var audio = new Audio("start.mp3")
      audio.addEventListener("canplay", () => {
        audio.play()
      })
      audio.addEventListener("ended", () => {
        playing = false
      })
      played = true
    }
  })

  setTimeout(function () {
    document.getElementById("boot").style.visibility = "hidden"
    document.getElementById("os").style.visibility = "visible"

    // //random background
    // //direction
    // var deg = Math.floor(Math.random() * 359);
    // //generate colors
    // var r1 = Math.floor(Math.random() * 255);
    // var g1 = Math.floor(Math.random() * 255);
    // var b1 = Math.floor(Math.random() * 255);
    // //2
    // var r2 = Math.floor(Math.random() * 255);
    // var g2 = Math.floor(Math.random() * 255);
    // var b2 = Math.floor(Math.random() * 255);
    //
    // var randomColor1 = "rgb("+ r1 +", "+ g1 +", "+ b1 +")";
    // var randomColor2 = "rgb("+ r2 +", "+ g2 +", "+ b2 +")";
    // //set style of windows
    // // document.getElementById('desktop').style.backgroundColor = randomColor1;
    // // document.getElementById('desktop').style.backgroundImage = "linear-gradient("+ deg +"deg, "+ randomColor1 +", "+randomColor2+")";

    os()
  }, 3000)
} else {
  document.getElementById("boot").style.visibility = "hidden"
  document.getElementById("os").style.visibility = "visible"
  os()
}
