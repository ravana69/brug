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

var played = false
var playing = false
var already = false

function getCookie(cname) {
  let name = cname + "="
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == " ") {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  let expires = "expires=" + d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function os() {
  const canvas = document.getElementById("ctx")
  const ctx = canvas.getContext("2d")

  var width = document.documentElement.clientWidth
  var height = document.documentElement.clientHeight

  canvas.style.backgroundColor = "transparent"

  //setup
  initDesktop(height)

  document
    .getElementById("computertjes")
    .addEventListener("click", function () {
      let id = programs.terminal.exe()
      let input = document
        .getElementById(id)
        .getElementsByClassName("terminalInput")[0]
      input.value = "ipconfig"
      setTimeout(() => {
        terminalInput(document.getElementById(id))
        if (getCookie("played") != "true") {
          setCookie("played", "true")
        }
      }, 500)
    })

  document.getElementById("start").addEventListener("click", function () {
    if (document.body.classList.contains("rotate")) {
      document.body.classList.remove("rotate")
    }
    window.requestAnimationFrame(function () {
      document.body.classList.add("rotate")
    })
  })

  setTimeout(function () {
    {
      if (getCookie("visited") == "true") {
        programs.alert.exe("Welcome back..", "alert")
      } else {
        programs.alert.exe("Welcome back..", "alert")
        setCookie("visited", "true", 99999)
      }
    }
  }, 2000)

  //autostart debug
  if (debug.start) {
    debug.start()
  }

  window.requestAnimationFrame(function () {
    draw(ctx, canvas)
  })
}

function draw(ctx, canvas) {
  var width = document.documentElement.clientWidth
  var height = document.documentElement.clientHeight

  ctx.width = window.innerWidth
  ctx.height = window.innerHeight

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  //clear
  ctx.clearRect(0, 0, width, height)

  //icons
  for (var i in icons) {
    var icon = icons[i]

    //dvd ding
    if (dvd_ding && icon.name == "DVD") {
      icon.x += icon.direction.x
      icon.y += icon.direction.y

      if (
        document.getElementById(icon.id).classList.contains("icon_selected") &&
        !document.getElementById(icon.id).classList.contains("icon_grab")
      ) {
        document
          .getElementById(icon.id)
          .getElementsByTagName("img")[0].style.filter = ""
      } else {
        document
          .getElementById(icon.id)
          .getElementsByTagName(
            "img"
          )[0].style.filter = `hue-rotate(${icon.hue}deg)`
      }

      function color() {
        icon.hue = (icon.hue + Math.round(Math.random() * 90 + 90)) % 360
      }

      if (icon.x < 0) {
        icon.x = 0
        icon.direction.x *= -1
        color()
      }
      if (icon.x + icon.width > width) {
        icon.x = width - icon.width
        icon.direction.x *= -1
        color()
      }
      //y
      if (icon.y < 0) {
        icon.y = 0
        icon.direction.y *= -1
        color()
      }
      if (icon.y + icon.height > height - 30) {
        icon.y = height - icon.height - 30
        icon.direction.y *= -1
        color()
      }
    }

    // object = document.getElementById('tray').getElementsByTagName('span')[0].getBoundingClientRect();
    // console.log(object.top, object.left);

    //icons
    //drag
    if (icon.grab) {
      icon.x = mouse.x + icon.dragOffsetX
      icon.y = mouse.y + icon.dragOffsetY
    }

    //hold to drag
    if (icon.hold) {
      if (
        mouse.x - icon.holdX > 10 ||
        icon.holdX - mouse.x > 10 ||
        mouse.y - icon.holdY > 10 ||
        icon.holdY - mouse.y > 10
      ) {
        //check single grab
        var o = 0
        for (var b in icons) {
          if (icons[b].selected) {
            o++
          }
        }
        if (o < 2) {
          for (var n in icons) {
            if (!icons[n].click) {
              icons[n].selected = false
            }
          }
        }

        //non selected drag
        if (!icon.selected) {
          for (var v in icons) {
            if (!icons[v].click) {
              icons[v].selected = false
            }
          }
        }

        //proceed
        for (var e in icons) {
          if (icons[e].click || icons[e].selected) {
            if (!icons[e].grab) {
              mouse.grab = true
              mouse.grabbed = true
              icons[e].grab = true
              icons[e].selected = true
              icons[e].dragOffsetX = icons[e].x - icon.holdX
              icons[e].dragOffsetY = icons[e].y - icon.holdY
            }
          }
        }
      }
    }

    //mouse select coords
    if (mouse.x < mouse.selectX) {
      mouse.selectX1 = mouse.x
      mouse.selectX2 = mouse.selectX
    } else {
      mouse.selectX1 = mouse.selectX
      mouse.selectX2 = mouse.x
    }
    if (mouse.y < mouse.selectY) {
      mouse.selectY1 = mouse.y
      mouse.selectY2 = mouse.selectY
    } else {
      mouse.selectY1 = mouse.selectY
      mouse.selectY2 = mouse.y
    }

    //drag select
    if (mouse.select) {
      if (
        mouse.x - mouse.selectX > 10 ||
        mouse.selectX - mouse.x > 10 ||
        mouse.y - mouse.selectY > 10 ||
        mouse.selectY - mouse.y > 10
      ) {
        mouse.selected = true
        if (
          mouse.selectX1 < icon.x + icon.width &&
          mouse.selectX1 + mouse.selectX2 - mouse.selectX1 > icon.x &&
          mouse.selectY1 < icon.y + icon.height &&
          mouse.selectY2 - mouse.selectY1 + mouse.selectY1 > icon.y
        ) {
          icon.selected = true
        } else {
          icon.selected = false
          icon.clicked = false
        }
      }
    }

    //stylez
    if (icon.grab) {
      document.getElementById(icon.id).classList.add("icon_grab")
    } else {
      document.getElementById(icon.id).classList.remove("icon_grab")
    }

    if (icon.clicked && !icon.grab) {
      document.getElementById(icon.id).classList.add("icon_clicked")
    } else {
      document.getElementById(icon.id).classList.remove("icon_clicked")
    }

    if (icon.selected) {
      document.getElementById(icon.id).classList.add("icon_selected")
    } else {
      document.getElementById(icon.id).classList.remove("icon_selected")
    }

    //render

    //css
    document.getElementById(icon.id).style.left = Math.round(icon.x) + "px"
    document.getElementById(icon.id).style.top = Math.round(icon.y) + "px"
  }

  //processes
  for (var x in processes) {
    proc = processes[x]

    if (proc.active) {
      document
        .getElementById(proc.id)
        .getElementsByTagName("header")[0]
        .classList.add("active")
    } else {
      document
        .getElementById(proc.id)
        .getElementsByTagName("header")[0]
        .classList.remove("active")
    }

    if (proc.grab) {
      //boundaries
      if (mouse.x <= 0) {
        mouse.x = 0
      }
      if (mouse.x >= width) {
        mouse.x = width
      }
      if (mouse.y <= 0) {
        mouse.y = 0
      }
      if (mouse.y >= height) {
        mouse.y = height
      }

      if (proc.grabType == "window") {
        proc.x = mouse.x + proc.dragOffsetX
        proc.y = mouse.y + proc.dragOffsetY
      }

      //resize
      if (
        proc.grabType == "n" ||
        proc.grabType == "ne" ||
        proc.grabType == "nw"
      ) {
        let temp = proc.y + proc.height
        proc.y = mouse.y
        proc.height = temp - proc.y
        if (proc.height < proc.minHeight) {
          proc.height = proc.minHeight
          proc.y = temp - proc.minHeight
        }
      }
      if (
        proc.grabType == "w" ||
        proc.grabType == "sw" ||
        proc.grabType == "nw"
      ) {
        let temp = proc.x + proc.width
        proc.x = mouse.x
        proc.width = temp - proc.x
        if (proc.width < proc.minWidth) {
          proc.width = proc.minWidth
          proc.x = temp - proc.minWidth
        }
      }
      if (
        proc.grabType == "s" ||
        proc.grabType == "sw" ||
        proc.grabType == "se"
      ) {
        proc.height = mouse.y - proc.y
        if (proc.height < proc.minHeight) {
          proc.height = proc.minHeight
        }
      }
      if (
        proc.grabType == "e" ||
        proc.grabType == "ne" ||
        proc.grabType == "se"
      ) {
        proc.width = mouse.x - proc.x
        if (proc.width < proc.minWidth) {
          proc.width = proc.minWidth
        }
      }
    }

    if (proc.hold) {
      if (
        mouse.x - proc.holdX > 10 ||
        proc.holdX - mouse.x > 10 ||
        mouse.y - proc.holdY > 10 ||
        proc.holdY - mouse.y > 10
      ) {
        if (!proc.grab && !proc.maximized) {
          mouse.grab = true
          proc.grab = true
          proc.dragOffsetX = proc.x - proc.holdX
          proc.dragOffsetY = proc.y - proc.holdY
        }
      }
    }

    //coords
    document.getElementById(proc.id).style.left = proc.x + "px"
    document.getElementById(proc.id).style.top = proc.y + "px"

    //size
    document.getElementById(proc.id).style.width = proc.width + "px"
    document.getElementById(proc.id).style.height = proc.height + "px"
  }

  //mouse

  //to select
  if (mouse.selecting) {
    if (
      mouse.x - mouse.selectX > 10 ||
      mouse.selectX - mouse.x > 10 ||
      mouse.y - mouse.selectY > 10 ||
      mouse.selectY - mouse.y > 10
    ) {
      mouse.select = true
    }
  }

  if (mouse.select) {
    ctx.fillStyle = "rgba(0, 156, 255, 0.1)"
    ctx.fillRect(
      mouse.selectX1 - 0.5,
      mouse.selectY1 - 0.5,
      mouse.selectX2 - mouse.selectX1,
      mouse.selectY2 - mouse.selectY1
    )

    ctx.strokeStyle = "black"
    ctx.lineWidth = 1
    ctx.setLineDash([1, 2])
    ctx.strokeRect(
      mouse.x - 0.5,
      mouse.y - 0.5,
      mouse.selectX - mouse.x,
      mouse.selectY - mouse.y
    )
  }

  //mouse pointers
  if (mouse.grab) {
    document.getElementById("ctx").style.cursor = "grabbing"
  } else {
    document.getElementById("ctx").style.cursor = "default"
  }

  var list = document.getElementsByTagName("IFRAME")

  if (mouse.select || mouse.grab || mouse.hold) {
    document.getElementById("ctx").style.cursor = "grabbing"
    document.getElementById("ctx").style.pointerEvents = "all"
    for (var d = 0; d < list.length; d++) {
      list[d].style.pointerEvents = "none"
    }
  } else {
    document.getElementById("ctx").style.cursor = "default"
    document.getElementById("ctx").style.pointerEvents = "none"
    for (var q = 0; q < list.length; q++) {
      list[q].style.pointerEvents = "all"
    }
  }

  if (mouse.loading) {
    document.getElementById("ctx").style.cursor = "wait"
    document.getElementById("ctx").style.pointerEvents = "all"
  } else {
    document.getElementById("ctx").style.cursor = "default"
    document.getElementById("ctx").style.pointerEvents = "none"
  }

  //set time
  var date = new Date()
  var hours = date.getHours()
  if (hours < 10) {
    hours = "0" + hours
  }
  var minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = "0" + minutes
  }

  var dots = ":"
  if (date.getSeconds() % 2 == 0) {
    dots = '<span style="letter-spacing: -1.25px;"> </span>'
  }

  document.getElementById("time").innerHTML = hours + dots + minutes

  window.requestAnimationFrame(function () {
    draw(ctx, canvas)
  })
}
