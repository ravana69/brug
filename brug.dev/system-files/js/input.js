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

var mouse = {
  x: 0,
  y: 0,
  lastX: 0,
  lastY: 0,
  selectX: 0,
  selectY: 0,
  select: false,
  hold: false,
  control: false,
  grabbed: false,
  selected: false,
  loading: false,
  touch: false,
  movementX: 0,
  movementY: 0,
}

window.onerror = function (error, source, line) {
  console.log(error)
  if (error == "Object doesn't support property or method 'composedPath'") {
    message =
      "At the moment is Microsoft Edge not supported. Some things may not work for you.<br>Sorry for the inconvenience"
    programs.alert.exe(message, "error")
  } else if (document.getElementById("bluescreen") == null) {
    message =
      "An error has occurred. To continue:<br><br>" +
      "Reload the page.<br><br><br>" +
      "Error: " +
      error +
      "<br><br><br>" +
      "Location: " +
      source +
      ":" +
      line +
      "<br><br><br>" +
      "It is possible your browser does not support this functionality.. <br><br><br>"
    programs.bluescreen.exe(message)
  }
}

//keyboard
document.onkeydown = function (event) {
  if (event.key == "Control") {
    mouse.control = true
  }
}

document.onkeyup = function (event) {
  if (event.key == "Control") {
    mouse.control = false
  }
}

//mouse position
document.onmousemove = function (event) {
  mouse.lastX = mouse.x
  mouse.lastY = mouse.y

  mouse.x = event.clientX
  mouse.y = event.clientY

  if (!Number.isNaN(event.mnouseX) && !Number.isNaN(event.mnouseY)) {
    mouse.movementX = event.movementX
    mouse.movementY = event.movementY
  }
}

document.ontouchmove = function (event) {
  mouse.x = event.touches[0].clientX
  mouse.y = event.touches[0].clientY

  mouse.movementX = mouse.x - mouse.lastX
  mouse.movementY = mouse.y - mouse.lastY

  mouse.lastX = mouse.x
  mouse.lastY = mouse.y
}

//mouse events
document.onmousedown = function (event) {
  if (!mouse.touch) {
    onDown(event)
  }
}

document.onmouseup = function (event) {
  if (!mouse.touch) {
    onUp(event)
  }
  mouse.touch = false
}

document.ontouchstart = function (event) {
  mouse.touch = true
  mouse.x = event.touches[0].clientX
  mouse.y = event.touches[0].clientY
  onDown(event)
}

document.ontouchend = function (event) {
  onUp(event)
}

//fuctions
function focus_reset(icon) {
  setTimeout(function () {
    icon.focus = false
  }, 500)
}

function onDown(event) {
  //firefox compatibility
  if (typeof event.path === "undefined") {
    event.path = event.composedPath()
  }

  //left click only // touch
  if (event.which == 1 || event.which == 0) {
    //not on contextMenu
    if (
      !contextmenu.open ||
      (contextmenu.open &&
        !(
          mouse.x > contextmenu.x &&
          mouse.x < contextmenu.x + contextmenu.width &&
          mouse.y > contextmenu.y &&
          mouse.y < contextmenu.y + contextmenu.height
        ))
    ) {
      if (contextmenu.open) {
        removeContextMenu()
      }
      var o = 0

      for (var m in event.path) {
        if (
          typeof event.path[m].className !== "undefined" &&
          event.path[m].className.includes("icon")
        ) {
          //all icons
          for (var i in event.path) {
            //check click
            for (var e in icons) {
              var icon = icons[e]

              if (event.path[i].id == icon.id) {
                if (
                  event.path[0].localName == "img" ||
                  event.path[0].localName == "span"
                ) {
                  icon.click = true
                  icon.hold = true

                  icon.holdX = mouse.x
                  icon.holdY = mouse.y

                  mouse.hold = true
                }
              }
            }
          }
          break
        } else if (
          typeof event.path[m].className !== "undefined" &&
          event.path[m].className.includes("window")
        ) {
          //all programs
          for (var b in event.path) {
            for (var v in processes) {
              var proc = processes[v]

              if (event.path[b].id == proc.id) {
                //active
                for (var c in processes) {
                  document.getElementById(processes[c].id).style.zIndex--
                  processes[c].active = false
                }
                document.getElementById(proc.id).style.zIndex =
                  Object.keys(processes).length
                proc.active = true

                //drag
                if (event.path[0].classList[0] == "resizer") {
                  proc.hold = true

                  proc.holdX = mouse.x
                  proc.holdY = mouse.y

                  mouse.hold = true

                  if (event.path[0].classList[1] == "resizer-n") {
                    proc.grabType = "n"
                  } else if (event.path[0].classList[1] == "resizer-w") {
                    proc.grabType = "w"
                  } else if (event.path[0].classList[1] == "resizer-s") {
                    proc.grabType = "s"
                  } else if (event.path[0].classList[1] == "resizer-e") {
                    proc.grabType = "e"
                  } else if (event.path[0].classList[1] == "resizer-ne") {
                    proc.grabType = "ne"
                  } else if (event.path[0].classList[1] == "resizer-se") {
                    proc.grabType = "se"
                  } else if (event.path[0].classList[1] == "resizer-sw") {
                    proc.grabType = "sw"
                  } else if (event.path[0].classList[1] == "resizer-nw") {
                    proc.grabType = "nw"
                  }
                } else if (
                  event.path[0].localName == "header" ||
                  event.path[1].localName == "header"
                ) {
                  proc.hold = true

                  proc.grabType = "window"

                  proc.holdX = mouse.x
                  proc.holdY = mouse.y

                  mouse.hold = true
                }
              }
            }
          }
          break
        } else {
          o++
        }
        if (o == event.path.length) {
          //not on anything
          mouse.selecting = true
          mouse.selectX = mouse.x
          mouse.selectY = mouse.y
          for (let c in processes) {
            document.getElementById(processes[c].id).style.zIndex--
            processes[c].active = false
          }
        }
      }
    }
  }
}

function onUp(event) {
  var width = document.documentElement.clientWidth
  var height = document.documentElement.clientHeight

  mouse.grab = false
  mouse.hold = false
  mouse.selecting = false
  mouse.select = false

  //icons
  for (var e in icons) {
    icon = icons[e]

    icon.hold = false
    icon.clicked = false

    if (icon.focus) {
      if (typeof event.path === "undefined") {
        event.path = event.composedPath()
      }

      for (var v in event.path) {
        if (event.path[v].id == icon.id) {
          if (typeof icon.arguments === "undefined") {
            execute(icon.exe)

            if (icon.name == "DVD") {
              icon.direction = {
                x: 0,
                y: 0,
              }

              if (icon.hue == undefined) {
                icon.hue = 0
              }

              icon.direction.x = 2
              icon.direction.y = 1
            }
          } else {
            execute(icon.exe, icon.arguments)
          }
          icon.executed = true
          icon.selected = false
        }
      }
    }

    if (mouse.grabbed) {
      icon.grab = false
      //boundaries
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

      if (icon.name == "DVD" && icon.selected) {
        let len = Math.abs(
          Math.sqrt(Math.pow(mouse.movementX, 2) + Math.pow(mouse.movementY, 2))
        )

        if (icon.hue == undefined) {
          icon.hue = 0
        }

        icon.direction = {
          x: 0,
          y: 0,
        }

        if (len > 0) {
          icon.direction.x = (mouse.movementX / len) * Math.min(len, 5)
          icon.direction.y = (mouse.movementY / len) * Math.min(len, 5)
        }

        execute(icon.exe)
      }
    } else if (!mouse.selected && !mouse.control) {
      for (var c in icons) {
        if (!icons[c].click) {
          icons[c].selected = false
        }
      }
    }

    //click
    if (icon.click && !icon.executed) {
      if (
        icon.name == "DVD" &&
        icon.direction &&
        icon.direction.x != 0 &&
        icon.direction.x != 0
      ) {
        icon.selected = false
      } else {
        icon.selected = true
      }

      icon.focus = true
      focus_reset(icon)
    }
    if (icon.click && !mouse.grabbed && !mouse.selected) {
      icon.clicked = true
    }
  }
  for (var b in icons) {
    icons[b].click = false
    icons[b].executed = false
  }

  //programs
  for (var m in processes) {
    var proc = processes[m]

    proc.hold = false
    proc.grab = false
  }

  mouse.grabbed = false
  mouse.select = false
  mouse.selected = false
}

function contextMenu() {
  //remove previous menu
  removeContextMenu()
  programs.contextmenu.exe()
}

function removeContextMenu() {
  let i = document.getElementById("contextmenu")
  while (i.firstChild) {
    i.removeChild(i.firstChild)
  }
  contextmenu.open = false
}
