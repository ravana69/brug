/* jshint -W083 */
/* jshint -W119 */

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

var icons = []

var icoList = [
  {
    name: "Space",
    image: "../program-files/space/img/icon32.png",
    exe: "space",
  },
  {
    name: "Virtual-os",
    image: "../program-files/virtual/img/icon32.png",
    exe: "virtual",
  },
  {
    name: "SHADER",
    image: "../program-files/shader/img/icon32.png",
    exe: "shader",
  },
  {
    name: "Instagram",
    image: "../program-files/insta/img/icon32.png",
    exe: "hyperlink",
    arguments: "https://www.instagram.com/ikbencasdoei/",
  },
  {
    name: "Github",
    image: "../program-files/github/img/icon32.png",
    exe: "hyperlink",
    arguments: "https://github.com/ikbencasdoei",
  },
  {
    name: "Bluescreen",
    image: "../system-files/img/bluescreen.png",
    exe: "bluescreen",
  },
  {
    name: "SOURCE",
    image: "../system-files/img/source.png",
    exe: "hyperlink",
    arguments: "https://github.com/ikbencasdoei/JS98",
  },
  {
    name: "DVD",
    image: "../system-files/img/dvd.png",
    exe: "dvd",
  },
]

function initDesktop(height) {
  for (var i in icoList) {
    generateIcon(i, height)
  }
}

function generateIcon(i, height) {
  setTimeout(function () {
    var ico = icoList[i]
    var icoId = ico.name + "_icon_" + i

    //add variables
    icons.push({
      id: icoId,
      name: ico.name,
      image: ico.image,
      exe: ico.exe,
      arguments: ico.arguments,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      hold: false,
      selected: false,
      focus: false,
      grab: false,
      grabbed: false,
      click: false,
      executed: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
    })

    //create element
    contents =
      '<div class="icon" id="' +
      icons[i].id +
      '"> ' +
      '<img draggable="false" ondragstart="return false;" src="' +
      ico.image +
      '"> ' +
      "<span>" +
      ico.name +
      "</span></div>"

    document.getElementById("desktop").innerHTML += contents

    //get height
    icons[i].height = parseInt(
      window
        .getComputedStyle(document.getElementById(icons[i].id))
        .getPropertyValue("height"),
      10
    )
    icons[i].width = parseInt(
      window
        .getComputedStyle(document.getElementById(icons[i].id))
        .getPropertyValue("width"),
      10
    )

    //set y
    var y = 0
    var x = 0

    for (var e in icons) {
      if (y > height - icons[e].height - 30) {
        y = 0
        x += icons[e].width
      }
      y += icons[e].height
    }
    icons[i].y = y + 5 - 50
    icons[i].x = x
  }, i * 30)
}

function resize() {
  var width = document.documentElement.clientWidth
  var height = document.documentElement.clientHeight

  for (var e in icons) {
    icon = icons[e]
    //x
    if (icon.x < 0) {
      icon.x = 0
    }
    if (icon.x + icon.width > width) {
      icon.x = width - icon.width
    }
    //y
    if (icon.y < 0) {
      icon.y = 0
    }
    if (icon.y + icon.height > height - 30) {
      icon.y = height - icon.height - 30
    }
  }

  for (var m in processes) {
    var proc = processes[m]
    if (proc.maximized) {
      proc.width = width + 2
      proc.height = height - 28
    }
  }
}
