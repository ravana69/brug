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

function terminalInput(id) {
  if (id == null) {
    return
  }
  let commandText = id
    .getElementsByClassName("terminalInput")[0]
    .value.trim()
    .toLowerCase()
  id.getElementsByClassName("terminalOutput")[0].insertAdjacentHTML(
    "beforeend",
    "C:\\Users\\Internetppl:>" + commandText + "<br>"
  )
  id.getElementsByClassName("terminalInput")[0].value = null

  if (commandText == "") {
    return
  }

  commandRaw = commandText.split('"')

  for (let i in commandRaw) {
    if (i % 2 == 0) {
      commandRaw[i] = commandRaw[i].split(" ")
    }
  }

  //remove nested arrays
  let counter = 0
  let command = []

  for (let i in commandRaw) {
    if (typeof commandRaw[i] == "object") {
      for (let x in commandRaw[i]) {
        command[counter] = commandRaw[i][x]
        counter++
      }
    } else {
      command[counter] = commandRaw[i]
      counter++
    }
  }

  //remove empty list elements
  command = command.filter(function (el) {
    return el != ""
  })

  //look for possible programs else go into commandtree
  try {
    if (typeof programs[command[0]].exe == "function") {
      programs[command[0]].exe(command[1], command[2])
    }
  } catch (err) {
    commandLoop(commandTree, command, 0, id)
  }

  id.getElementsByClassName("terminalInput")[0].focus()
}

function commandLoop(tree, command, iteration, id) {
  if (typeof tree[command[iteration]] != "undefined") {
    if (typeof tree[command[iteration]] == "function") {
      tree[command[iteration]](id, command)
    } else {
      commandLoop(tree[command[iteration]], command, iteration + 1, id)
      return
    }
  } else {
    if (iteration == 0) {
      terminalOutput(
        id,
        "'" +
          command[iteration] +
          "' is not recognized as an internal or external command"
      )
    } else {
      let text = ""
      for (let i in command) {
        if (command.length - 1 == i) {
          break
        } else {
          text += command[i] + " "
        }
      }
      terminalOutput(
        id,
        'Error: incorrect or incomplete input, do: "' + text + ' help" for help'
      )
    }
  }
}

function terminalOutput(id, out) {
  id.getElementsByClassName("terminalOutput")[0].insertAdjacentHTML(
    "beforeend",
    out + "<br><br>"
  )
  id.getElementsByClassName("terminal")[0].scrollTop =
    id.getElementsByClassName("terminal")[0].scrollHeight
}

var commandTree = {
  style: {
    background: {
      color: function (id, command) {
        try {
          document.getElementById("desktop").style.backgroundImage =
            "linear-gradient(to bottom right, " +
            command[3] +
            " ,  " +
            command[3] +
            ")"
        } catch (err) {}
      },
      gradient: function (id, command) {
        try {
          document.getElementById("desktop").style.backgroundImage =
            "linear-gradient(to bottom right, " +
            command[3] +
            " ,  " +
            command[4] +
            ")"
        } catch (err) {}
      },
      image: function (id, command) {
        try {
          document.getElementById("desktop").style.backgroundImage =
            'url("' + command[3] + '")'
        } catch (err) {}
      },
      help: function (id) {
        let content =
          "[HELP] __STYLE BACKGROUND__<br>" +
          "description: Change your background.<br>" +
          "<br>" +
          "<i>parameters:</i><br>" +
          "COLOR &ltcolor(name/hex/rgb)&gt<br>" +
          "GRADIENT &ltcolor1(name/hex/rgb)&gt &ltcolor2(name/hex/rgb)&gt<br>" +
          "IMAGE &lturl&gt<br>"
        terminalOutput(id, content)
      },
    },
    help: function (id) {
      let content =
        "[HELP] __STYLE__<br>" +
        "description: Change the look of your environment.<br>" +
        "<br>" +
        "<i>parameters:</i><br>" +
        "BACKGROUND: color, gradient; Change the background."
      terminalOutput(id, content)
    },
  },
  help: function (id) {
    let content =
      "[HELP] <br>" +
      "for more information type: '&ltcommand-name&gt help'.<br>" +
      "<br>" +
      "<i>list of commands:</i><br>" +
      "STYLE: background; Change the look of your environment.<br>" +
      "<br>" +
      "<i>you can also open all programs in the programs variable</i>"
    terminalOutput(id, content)
  },
  cas: function (id) {
    let content = `Dames en heren, koeken en peren`
    terminalOutput(id, content)
  },
  ipconfig: function (id) {
    let content = `IPv4 Address. . . . . . . . . . . : ${Math.round(
      Math.random() * 255
    )}.${Math.round(Math.random() * 255)}.${Math.round(
      Math.random() * 255
    )}.25<br>
    Connection-specific DNS Suffix  . : unknown
    `
    terminalOutput(id, content)
  },
}
