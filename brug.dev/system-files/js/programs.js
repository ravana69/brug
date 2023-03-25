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

let processes = []
let dvd_ding = false

function execute(link, argument) {
  for (let i in processes) {
    processes[i].active = false
  }
  if (typeof argument === "undefined") {
    programs[link].exe()
  } else {
    programs[link].exe(argument)
  }
}

function onLoadWindow(id) {
  document.getElementById(id).style.visibility = "visible"
  mouse.loading = false
}

function closeWindow(id) {
  document.getElementById(processes[id].id).remove()
  document.getElementById(processes[id].tabId).remove()
  delete processes[id]
}

function maximizeWindow(id) {
  var p = processes[id]

  var width = document.documentElement.clientWidth
  var height = document.documentElement.clientHeight - 30

  if (p.maximized) {
    p.x = p.minX
    p.y = p.minY
    p.width = p.minimizedWidth
    p.height = p.minimizedHeight
    p.maximized = false
    document.getElementById(id + "_win").classList.remove("maximized")

    document.getElementById(id + "_win").querySelectorAll(".max")[0].src =
      "/system-files/img/max.png"
  } else {
    p.minX = p.x
    p.minY = p.y
    p.x = -1
    p.y = -1
    p.maximized = true
    p.minimizedWidth = p.width
    p.minimizedHeight = p.height
    p.width = width + 2
    p.height = height + 2
    document.getElementById(id + "_win").classList.add("maximized")
    document.getElementById(id + "_win").querySelectorAll(".max")[0].src =
      "/system-files/img/mid.png"
  }
}

function minimizeWindow(id) {
  var p = processes[id]
  if (p.open) {
    p.open = false
    p.active = false
    document.getElementById(id + "_win").style.visibility = "hidden"
    document.getElementById(id + "_tab").classList.remove("tab_open")
  } else {
    p.open = true
    p.active = true
    document.getElementById(id + "_win").style.visibility = "visible"
    document.getElementById(id + "_tab").classList.add("tab_open")

    for (var c in processes) {
      p.active = false
      document.getElementById(processes[c].id).style.zIndex--
    }
    p.active = true
    document.getElementById(p.id).style.zIndex = Object.keys(processes).length
  }
}

//     ____  _________  ____ __________ _____ ___  _____
//    / __ \/ ___/ __ \/ __ `/ ___/ __ `/ __ `__ \/ ___/
//   / /_/ / /  / /_/ / /_/ / /  / /_/ / / / / / (__  )
//  / .___/_/   \____/\__, /_/   \__,_/_/ /_/ /_/____/
// /_/               /____/

var programs = {
  space: {
    name: "space",
    img: "../program-files/space/img/icon16.png",
    link: "../program-files/space/3d.html",
    width: 300,
    height: 300,
    exe: function () {
      var deskWidth = document.documentElement.clientWidth
      var deskHeight = document.documentElement.clientHeight - 30

      var p = programs.space

      var id = p.name + "_process_" + Object.keys(processes).length
      var winId = id + "_win"
      var tabId = id + "_tab"

      var x
      var y

      if (deskWidth < p.width) {
        x = 0
        p.width = deskWidth
      } else {
        x = deskWidth / 2 - p.width / 2
      }

      if (deskHeight < p.height) {
        y = 0
        p.height = deskHeight
      } else {
        y = deskHeight / 2 - p.height / 2
      }

      processes[id] = {
        id: winId,
        tabId: tabId,
        name: p.name,
        width: p.width,
        height: p.height,
        maxWidth: 0,
        maxHeight: 0,
        minimizedWidth: 0,
        minimizedHeight: 0,
        x: x,
        y: y,
        minX: 0,
        minY: 0,
        active: true,
        open: true,
        maximized: false,
        holdX: 0,
        holdY: 0,
        dragOffsetX: 0,
        dragOffsetY: 0,
        hold: false,
        grab: false,
        grabType: "",
        minWidth: 110,
        minHeight: 45,
      }

      //window
      contents =
        '<div class="window" style="visibility: hidden;" id="' +
        winId +
        '">' +
        '<header><img draggable="false" src="' +
        p.img +
        '">' +
        p.name +
        "<button onclick=\"closeWindow('" +
        id +
        '\');"><img draggable="false"class="close" src="/system-files/img/close.png"></button>' +
        "<button onclick=\"maximizeWindow('" +
        id +
        '\');"><img draggable="false" class="max" src="/system-files/img/max.png"></button>' +
        "<button onclick=\"minimizeWindow('" +
        id +
        '\');"><img draggable="false" src="/system-files/img/min.png"></button>' +
        '<a href="' +
        p.link +
        '" target="_blank" draggable="false"><button><img draggable="false" src="/system-files/img/open.png"></button></a>' +
        "</header>" +
        '<iframe src="' +
        p.link +
        '" onload="onLoadWindow(\'' +
        winId +
        "')\"></iframe></div>"

      document
        .getElementById("windows")
        .insertAdjacentHTML("beforeend", contents)

      //taskbar
      contents =
        "<div onclick=\"minimizeWindow('" +
        id +
        '\')" class="tab tab_open" id="' +
        tabId +
        '">' +
        '<img draggable="false" src="' +
        p.img +
        '"><span>' +
        p.name +
        "</span>" +
        "</div>"

      document.getElementById("dock").insertAdjacentHTML("beforeend", contents)

      document.getElementById(winId).style.zIndex =
        Object.keys(processes).length

      document.getElementById(winId).style.height = p.height + "px"
      document.getElementById(winId).style.width = p.width + "px"

      document.getElementById(winId).style.left = x + "px"
      document.getElementById(winId).style.top = y + "px"

      //Loading
      mouse.loading = true

      //resize
      contents =
        '<div class="resizer resizer-n"></div>' +
        '<div class="resizer resizer-w"></div>' +
        '<div class="resizer resizer-s"></div>' +
        '<div class="resizer resizer-e"></div>' +
        '<div class="resizer resizer-ne"></div>' +
        '<div class="resizer resizer-se"></div>' +
        '<div class="resizer resizer-sw"></div>' +
        '<div class="resizer resizer-nw"></div>'

      document.getElementById(winId).insertAdjacentHTML("beforeend", contents)
    },
  },

  virtual: {
    name: "virtual os",
    img: "../program-files/virtual/img/icon16.png",
    link: "../../../../",
    width: 600,
    height: 500,
    exe: function () {
      var deskWidth = document.documentElement.clientWidth
      var deskHeight = document.documentElement.clientHeight - 30

      var p = programs.virtual

      var id = p.name + "_process_" + Object.keys(processes).length
      var winId = id + "_win"
      var tabId = id + "_tab"

      var x
      var y

      if (deskWidth < p.width) {
        x = 0
        p.width = deskWidth
      } else {
        x = deskWidth / 2 - p.width / 2
      }

      if (deskHeight < p.height) {
        y = 0
        p.height = deskHeight
      } else {
        y = deskHeight / 2 - p.height / 2
      }

      processes[id] = {
        id: winId,
        tabId: tabId,
        name: p.name,
        width: p.width,
        height: p.height,
        maxWidth: 0,
        maxHeight: 0,
        minimizedWidth: 0,
        minimizedHeight: 0,
        x: x,
        y: y,
        minX: 0,
        minY: 0,
        active: true,
        open: true,
        maximized: false,
        holdX: 0,
        holdY: 0,
        dragOffsetX: 0,
        dragOffsetY: 0,
        hold: false,
        grab: false,
        grabType: "",
        minWidth: 127,
        minHeight: 31,
      }

      //window
      contents =
        '<div class="window" id="' +
        winId +
        '">' +
        '<header><img draggable="false" src="' +
        p.img +
        '">' +
        p.name +
        "<button onclick=\"closeWindow('" +
        id +
        '\');"><img draggable="false"class="close" src="/system-files/img/close.png"></button>' +
        "<button onclick=\"maximizeWindow('" +
        id +
        '\');"><img draggable="false" class="max" src="/system-files/img/max.png"></button>' +
        "<button onclick=\"minimizeWindow('" +
        id +
        '\');"><img draggable="false" src="/system-files/img/min.png"></button>' +
        '<a href="' +
        p.link +
        '" target="_blank" draggable="false"><button><img draggable="false" src="/system-files/img/open.png"></button></a>' +
        "</header>" +
        '<iframe src="' +
        p.link +
        '" onload="onLoadWindow(\'' +
        winId +
        "')\"></iframe></div>"

      document
        .getElementById("windows")
        .insertAdjacentHTML("beforeend", contents)

      //taskbar
      contents =
        "<div onclick=\"minimizeWindow('" +
        id +
        '\')" class="tab tab_open" id="' +
        tabId +
        '">' +
        '<img draggable="false" src="' +
        p.img +
        '"><span>' +
        p.name +
        "</span>" +
        "</div>"

      document.getElementById("dock").insertAdjacentHTML("beforeend", contents)

      document.getElementById(winId).style.zIndex =
        Object.keys(processes).length

      document.getElementById(winId).style.height = p.height + "px"
      document.getElementById(winId).style.width = p.width + "px"

      document.getElementById(winId).style.left = x + "px"
      document.getElementById(winId).style.top = y + "px"

      //Loading
      mouse.loading = true

      //resize
      contents =
        '<div class="resizer resizer-n"></div>' +
        '<div class="resizer resizer-w"></div>' +
        '<div class="resizer resizer-s"></div>' +
        '<div class="resizer resizer-e"></div>' +
        '<div class="resizer resizer-ne"></div>' +
        '<div class="resizer resizer-se"></div>' +
        '<div class="resizer resizer-sw"></div>' +
        '<div class="resizer resizer-nw"></div>'

      document.getElementById(winId).insertAdjacentHTML("beforeend", contents)
    },
  },

  alert: {
    width: 400,
    height: 130,
    exe: function (message, type) {
      var deskWidth = document.documentElement.clientWidth
      var deskHeight = document.documentElement.clientHeight - 30

      var i = 0
      for (var m in processes) {
        if (processes[m].message == message) {
          i++
        }
      }

      if (i < 1) {
        var p = programs.alert

        if (type == "error") {
          p.img = "../program-files/message/img/error16.png"
          p.img32 = "../program-files/message/img/error32.png"
          p.name = "error"
        } else {
          p.img = "../program-files/message/img/icon16.png"
          p.img32 = "../program-files/message/img/icon32.png"
          p.name = type
        }

        var id = p.name + "_process_" + Object.keys(processes).length
        var winId = id + "_win"
        var tabId = id + "_tab"

        var x
        var y

        if (deskWidth < p.width) {
          x = 0
          p.width = deskWidth
        } else {
          x = deskWidth / 2 - p.width / 2
        }

        if (deskHeight < p.height) {
          y = 0
          p.height = deskHeight
        } else {
          y = deskHeight / 2 - p.height / 2
        }

        processes[id] = {
          id: winId,
          tabId: tabId,
          name: p.name,
          width: p.width,
          height: p.height,
          maxWidth: 0,
          maxHeight: 0,
          x: x,
          y: y,
          minX: 0,
          minY: 0,
          active: true,
          open: true,
          maximized: false,
          holdX: 0,
          holdY: 0,
          dragOffsetX: 0,
          dragOffsetY: 0,
          hold: false,
          grab: false,
          grabType: "",
          message: message,
        }

        //window
        contents =
          '<div class="window" id="' +
          winId +
          '">' +
          '<header><img draggable="false" src="' +
          p.img +
          '">' +
          p.name +
          "<button onclick=\"closeWindow('" +
          id +
          '\');"><img draggable="false"class="close" src="/system-files/img/close.png"></button>' +
          '</header><div class="message"><img src="' +
          p.img32 +
          '"><p>' +
          message +
          "</p>" +
          "<button onclick=\"closeWindow('" +
          id +
          "');\">OK</button></div></div>"

        document
          .getElementById("windows")
          .insertAdjacentHTML("beforeend", contents)

        //taskbar
        contents =
          "<div onclick=\"minimizeWindow('" +
          id +
          '\')" class="tab tab_open" id="' +
          tabId +
          '">' +
          '<img draggable="false" src="' +
          p.img +
          '"><span>' +
          p.name +
          "</span>" +
          "</div>"

        document
          .getElementById("dock")
          .insertAdjacentHTML("beforeend", contents)

        document.getElementById(winId).style.zIndex =
          Object.keys(processes).length

        document.getElementById(winId).style.height = p.height + "px"
        document.getElementById(winId).style.width = p.width + "px"

        document.getElementById(winId).style.left = x + "px"
        document.getElementById(winId).style.top = y + "px"
      }
    },
  },

  bluescreen: {
    exe: function (message) {
      document
        .getElementsByTagName("body")[0]
        .insertAdjacentHTML("beforeend", '<div id="bluescreen"></div>')

      setTimeout(function () {
        if (typeof message === "undefined") {
          message =
            "An error has occurred. To continue:<br><br>" +
            "Reload the page.<br><br><br>" +
            "Error: Task failed successfully.<br><br><br>" +
            "Location: index.html <br><br><br>"
        }
        contents =
          '<div id="bluescreenContainer" onclick="location.reload();"><br><br><br><br><br>' +
          "<span>[[ Space OS ]]</span><br><br>" +
          "<p>" +
          message +
          "</p>" +
          "Click here to continue" +
          '<img width="8px" src="system-files/img/insert.gif">' +
          "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div>"

        document
          .getElementById("bluescreen")
          .insertAdjacentHTML("beforeend", contents)
      }, 1000)
    },
  },

  hyperlink: {
    name: "Hyperlink",
    exe: function (link) {
      let page = window.open(link)
      page.focus()
    },
  },

  contextmenu: {
    list: [
      {
        name: "Open terminal here...",
        exe: "terminal",
        image: "../system-files/img/terminal.png",
      },
    ],

    exe: function () {
      var deskWidth = document.documentElement.clientWidth
      var deskHeight = document.documentElement.clientHeight - 30

      let contents = '<div class="contextmenu" style="position:absolute;">'

      for (let i in programs.contextmenu.list) {
        let item = programs.contextmenu.list[i]
        contents +=
          '<div onclick="programs.' +
          item.exe +
          '.exe();removeContextMenu();" class="item">' +
          '<img height="16px" src="' +
          item.image +
          '">' +
          "<span>" +
          item.name +
          "</span></div>"
      }

      contents += "</div>"
      document
        .getElementById("contextmenu")
        .insertAdjacentHTML("beforeend", contents)

      contextmenu = {
        open: true,
        x: mouse.x,
        y: mouse.y,
        width: parseInt(
          window
            .getComputedStyle(document.getElementsByClassName("contextmenu")[0])
            .getPropertyValue("width")
        ),
        height: parseInt(
          window
            .getComputedStyle(document.getElementsByClassName("contextmenu")[0])
            .getPropertyValue("height")
        ),
      }

      if (mouse.x + contextmenu.width >= deskWidth) {
        contextmenu.x = mouse.x - contextmenu.width
      }

      if (mouse.y + contextmenu.height >= deskHeight) {
        contextmenu.y = mouse.y - contextmenu.height
      }

      document.getElementsByClassName("contextmenu")[0].style.left =
        contextmenu.x + "px"
      document.getElementsByClassName("contextmenu")[0].style.top =
        contextmenu.y + "px"
    },
  },

  terminal: {
    name: "Terminal",
    img: "../system-files/img/terminal.png",
    width: 300,
    height: 300,
    exe: function () {
      var deskWidth = document.documentElement.clientWidth
      var deskHeight = document.documentElement.clientHeight - 30

      var p = programs.terminal

      var id = p.name + "_process_" + Object.keys(processes).length
      var winId = id + "_win"
      var tabId = id + "_tab"

      var x
      var y

      if (deskWidth < p.width) {
        x = 0
        p.width = deskWidth
      } else {
        x = deskWidth / 2 - p.width / 2
      }

      if (deskHeight < p.height) {
        y = 0
        p.height = deskHeight
      } else {
        y = deskHeight / 2 - p.height / 2
      }

      processes[id] = {
        id: winId,
        tabId: tabId,
        name: p.name,
        width: p.width,
        height: p.height,
        maxWidth: 0,
        maxHeight: 0,
        minimizedWidth: 0,
        minimizedHeight: 0,
        x: x,
        y: y,
        minX: 0,
        minY: 0,
        active: true,
        open: true,
        maximized: false,
        holdX: 0,
        holdY: 0,
        dragOffsetX: 0,
        dragOffsetY: 0,
        hold: false,
        grab: false,
        grabType: "",
        minWidth: 120,
        minHeight: 30,
      }

      //window
      contents =
        '<div class="window" id="' +
        winId +
        '">' +
        '<header><img draggable="false" src="' +
        p.img +
        '">' +
        p.name +
        "<button onclick=\"closeWindow('" +
        id +
        '\');"><img draggable="false"class="close" src="/system-files/img/close.png"></button>' +
        "<button onclick=\"maximizeWindow('" +
        id +
        '\');"><img draggable="false" class="max" src="/system-files/img/max.png"></button>' +
        "<button onclick=\"minimizeWindow('" +
        id +
        '\');"><img draggable="false" src="/system-files/img/min.png"></button>' +
        '</header><div class="terminal"><div class="terminalOutput"></div>' +
        '<div><span>C:\\Users\\Internetppl:></span><textarea placeholder="type something.." autofocus spellcheck="false" wrap="off" class="terminalInput" onkeypress="if(window.event.keyCode == 13){terminalInput(' +
        winId +
        '); return false;}" rows="1"></textarea></div>' +
        "</div></div>"

      document
        .getElementById("windows")
        .insertAdjacentHTML("beforeend", contents)

      //taskbar
      contents =
        "<div onclick=\"minimizeWindow('" +
        id +
        '\')" class="tab tab_open" id="' +
        tabId +
        '">' +
        '<img draggable="false" src="' +
        p.img +
        '"><span>' +
        p.name +
        "</span>" +
        "</div>"

      document.getElementById("dock").insertAdjacentHTML("beforeend", contents)

      document.getElementById(winId).style.zIndex =
        Object.keys(processes).length

      document.getElementById(winId).style.height = p.height + "px"
      document.getElementById(winId).style.width = p.width + "px"

      document.getElementById(winId).style.left = x + "px"
      document.getElementById(winId).style.top = y + "px"

      contents =
        '<div class="resizer resizer-n"></div>' +
        '<div class="resizer resizer-w"></div>' +
        '<div class="resizer resizer-s"></div>' +
        '<div class="resizer resizer-e"></div>' +
        '<div class="resizer resizer-ne"></div>' +
        '<div class="resizer resizer-se"></div>' +
        '<div class="resizer resizer-sw"></div>' +
        '<div class="resizer resizer-nw"></div>'

      document.getElementById(winId).insertAdjacentHTML("beforeend", contents)

      document
        .getElementById(winId)
        .getElementsByClassName("terminalInput")[0]
        .focus()

      return winId
    },
  },

  shader: {
    name: "SHADER",
    img: "../program-files/shader/img/icon16.png",
    link: "https://www.shadertoy.com/embed/7dX3W8?gui=false&t=10&paused=false&muted=false",
    link2: "https://www.shadertoy.com/view/7dX3W8",
    width: 600,
    height: 500,
    exe: function () {
      var deskWidth = document.documentElement.clientWidth
      var deskHeight = document.documentElement.clientHeight - 30

      var p = programs.shader

      var id = p.name + "_process_" + Object.keys(processes).length
      var winId = id + "_win"
      var tabId = id + "_tab"

      var x
      var y

      if (deskWidth < p.width) {
        x = 0
        p.width = deskWidth
      } else {
        x = deskWidth / 2 - p.width / 2
      }

      if (deskHeight < p.height) {
        y = 0
        p.height = deskHeight
      } else {
        y = deskHeight / 2 - p.height / 2
      }

      processes[id] = {
        id: winId,
        tabId: tabId,
        name: p.name,
        width: p.width,
        height: p.height,
        maxWidth: 0,
        maxHeight: 0,
        minimizedWidth: 0,
        minimizedHeight: 0,
        x: x,
        y: y,
        minX: 0,
        minY: 0,
        active: true,
        open: true,
        maximized: false,
        holdX: 0,
        holdY: 0,
        dragOffsetX: 0,
        dragOffsetY: 0,
        hold: false,
        grab: false,
        grabType: "",
        minWidth: 127,
        minHeight: 31,
      }

      //window
      contents =
        '<div class="window" id="' +
        winId +
        '">' +
        '<header><img draggable="false" src="' +
        p.img +
        '">' +
        p.name +
        "<button onclick=\"closeWindow('" +
        id +
        '\');"><img draggable="false"class="close" src="/system-files/img/close.png"></button>' +
        "<button onclick=\"maximizeWindow('" +
        id +
        '\');"><img draggable="false" class="max" src="/system-files/img/max.png"></button>' +
        "<button onclick=\"minimizeWindow('" +
        id +
        '\');"><img draggable="false" src="/system-files/img/min.png"></button>' +
        '<a href="' +
        p.link2 +
        '" target="_blank" draggable="false"><button><img draggable="false" src="/system-files/img/open.png"></button></a>' +
        "</header>" +
        '<iframe src="' +
        p.link +
        '" onload="onLoadWindow(\'' +
        winId +
        "')\" allowfullscreen></iframe></div>"

      document
        .getElementById("windows")
        .insertAdjacentHTML("beforeend", contents)

      //taskbar
      contents =
        "<div onclick=\"minimizeWindow('" +
        id +
        '\')" class="tab tab_open" id="' +
        tabId +
        '">' +
        '<img draggable="false" src="' +
        p.img +
        '"><span>' +
        p.name +
        "</span>" +
        "</div>"

      document.getElementById("dock").insertAdjacentHTML("beforeend", contents)

      document.getElementById(winId).style.zIndex =
        Object.keys(processes).length

      document.getElementById(winId).style.height = p.height + "px"
      document.getElementById(winId).style.width = p.width + "px"

      document.getElementById(winId).style.left = x + "px"
      document.getElementById(winId).style.top = y + "px"

      //Loading
      mouse.loading = true

      //resize
      contents =
        '<div class="resizer resizer-n"></div>' +
        '<div class="resizer resizer-w"></div>' +
        '<div class="resizer resizer-s"></div>' +
        '<div class="resizer resizer-e"></div>' +
        '<div class="resizer resizer-ne"></div>' +
        '<div class="resizer resizer-se"></div>' +
        '<div class="resizer resizer-sw"></div>' +
        '<div class="resizer resizer-nw"></div>'

      document.getElementById(winId).insertAdjacentHTML("beforeend", contents)
    },
  },
  dvd: {
    exe: function () {
      dvd_ding = true
    },
  },
  img: {
    name: "img",
    img: "../program-files/img/img/icon16.png",
    width: 300,
    height: 300,
    exe: function (img) {
      // if (Math.random() < 0.9) {
      //   execute(
      //     "bluescreen",
      //     "An error has occurred. To continue:<br><br>" +
      //       "Reload the page.<br><br><br>" +
      //       `Error: Something unexpected happend while trying to open ${img}..<br><br><br>` +
      //       "Location: index.html <br><br><br>"
      //   )
      // }

      var deskWidth = document.documentElement.clientWidth
      var deskHeight = document.documentElement.clientHeight - 30

      var p = programs.img
      p.name = img

      var id = p.name + "_process_" + Object.keys(processes).length
      var winId = id + "_win"
      var tabId = id + "_tab"

      var x
      var y

      if (deskWidth < p.width) {
        x = 0
        p.width = deskWidth
      } else {
        x = deskWidth / 2 - p.width / 2
      }

      if (deskHeight < p.height) {
        y = 0
        p.height = deskHeight
      } else {
        y = deskHeight / 2 - p.height / 2
      }

      processes[id] = {
        id: winId,
        tabId: tabId,
        name: p.name,
        width: p.width,
        height: p.height,
        maxWidth: 0,
        maxHeight: 0,
        minimizedWidth: 0,
        minimizedHeight: 0,
        x: x,
        y: y,
        minX: 0,
        minY: 0,
        active: true,
        open: true,
        maximized: false,
        holdX: 0,
        holdY: 0,
        dragOffsetX: 0,
        dragOffsetY: 0,
        hold: false,
        grab: false,
        grabType: "",
        minWidth: 110,
        minHeight: 45,
      }

      let fake_img_element = document.createElement("img")
      fake_img_element.setAttribute("src", img)
      p.name = fake_img_element.src

      //window
      contents =
        '<div class="window" style="visibility: hidden;" id="' +
        winId +
        '">' +
        '<header><img draggable="false" src="' +
        p.img +
        '">' +
        p.name +
        "<button onclick=\"closeWindow('" +
        id +
        '\');"><img draggable="false"class="close" src="/system-files/img/close.png"></button>' +
        "<button onclick=\"maximizeWindow('" +
        id +
        '\');"><img draggable="false" class="max" src="/system-files/img/max.png"></button>' +
        "<button onclick=\"minimizeWindow('" +
        id +
        '\');"><img draggable="false" src="/system-files/img/min.png"></button>' +
        '<a href="' +
        img +
        '" target="_blank" draggable="false"><button><img draggable="false" src="/system-files/img/open.png"></button></a>' +
        "</header>" +
        `<img class="imgimg" id=${winId}imgimg src="` +
        img +
        '" onload="onLoadWindow(\'' +
        winId +
        "')\"></iframe></div>"

      document
        .getElementById("windows")
        .insertAdjacentHTML("beforeend", contents)

      let img_element = document.getElementById(`${winId}imgimg`)

      img_element.addEventListener("load", function () {
        processes[id].width = img_element.naturalWidth + 9
        processes[id].height = img_element.naturalHeight + 30
      })

      //taskbar
      contents =
        "<div onclick=\"minimizeWindow('" +
        id +
        '\')" class="tab tab_open" id="' +
        tabId +
        '">' +
        '<img draggable="false" src="' +
        p.img +
        '"><span>' +
        p.name +
        "</span>" +
        "</div>"

      document.getElementById("dock").insertAdjacentHTML("beforeend", contents)

      document.getElementById(winId).style.zIndex =
        Object.keys(processes).length

      document.getElementById(winId).style.height = p.height + "px"
      document.getElementById(winId).style.width = p.width + "px"

      document.getElementById(winId).style.left = x + "px"
      document.getElementById(winId).style.top = y + "px"

      //Loading
      mouse.loading = true

      //resize
      contents =
        '<div class="resizer resizer-n"></div>' +
        '<div class="resizer resizer-w"></div>' +
        '<div class="resizer resizer-s"></div>' +
        '<div class="resizer resizer-e"></div>' +
        '<div class="resizer resizer-ne"></div>' +
        '<div class="resizer resizer-se"></div>' +
        '<div class="resizer resizer-sw"></div>' +
        '<div class="resizer resizer-nw"></div>'

      document.getElementById(winId).insertAdjacentHTML("beforeend", contents)
    },
  },
}
