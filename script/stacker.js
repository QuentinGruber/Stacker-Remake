var Interval_Wtm,
  Interval_Ud,
  Interval_Tc,
  Xpos = -1,
  Ypos = 14,
  ExtraBlue = 2,
  GoingRight = 1,
  InGame = 1,
  LvlLength = 15,
  Speed = 130,
  AntiSpam = 0,
  CanLose = 0,
  Score_enable = !1,
  Score = 0,
  PlayTime = 20;
function tableCreate() {
  var e = document.body,
    o = document.createElement("table");
  o.id = "Board";
  for (var n = 0; n < 15; n++)
    for (var t = o.insertRow(), r = 0; r < 7; r++) {
      var a = t.insertCell();
      (a.style.border = "1px solid black"),
        (a.style.backgroundColor = "white"),
        (a.id = "c" + (r + 1) + "r" + (n + 1));
    }
  e.appendChild(o);
}
function ArrayCreate() {
  for (var e = [], o = [], n = 0; n < 15; n++) {
    o = [];
    for (var t = 0; t < 7; t++) o.push(0);
    e.push(o);
  }
  return e;
}
function UpdateDisplay() {
  for (var e = 0; e < 7; e++) {
    if (1 == Board[Ypos][e])
      document.getElementById(
        "c" + (e + 1) + "r" + (Ypos + 1)
      ).style.backgroundColor = "blue";
    else
      document.getElementById(
        "c" + (e + 1) + "r" + (Ypos + 1)
      ).style.backgroundColor = "white";
  }
}
function MoveBlue(e) {
  1 == e
    ? ((Board[Ypos][Xpos - ExtraBlue] = 0),
      (Xpos += 1),
      (Board[Ypos][Xpos] = 1),
      Xpos - ExtraBlue >= 6 && (GoingRight = 0))
    : ((Board[Ypos][Xpos + ExtraBlue] = 0),
      (Xpos -= 1),
      (Board[Ypos][Xpos] = 1),
      Xpos + ExtraBlue <= 0 && (GoingRight = 1));
}
function WhereToMove() {
  MoveBlue(1 == GoingRight ? 1 : 0);
}
function CheckPlacement() {
  for (var e = [], o = 0; o < 7; o++)
    if (1 == Board[Ypos][o] && 1 != Board[Ypos + 1][o]) {
      var n = document.getElementById("c" + (o + 1) + "r" + (Ypos + 1));
      (n.style.backgroundColor = "white"),
        (Board[Ypos][o] = 0),
        e.push(n),
        (ExtraBlue -= 1) < 0 &&
          (Loose(),
          setInterval(function () {
            LastRedBlinking(e);
          }, 500));
    }
  InGame &&
    Score_enable &&
    ((Score += 1),
    (document.getElementById("score").innerHTML = "<h1>" + Score + "</h1>"));
}
function Loose() {
  (InGame = 0),
    (AntiSpam = 0),
    MakeAllCube("red"),
    clearInterval(Interval_Wtm),
    clearInterval(Interval_Ud),
    clearInterval(Interval_Tc);
}
function LastRedBlinking(e) {
  for (var o = 0; o < e.length; o++)
    "red" == e[o].style.backgroundColor
      ? (e[o].style.backgroundColor = "white")
      : (e[o].style.backgroundColor = "red");
}
function Win() {
  MakeAllCube("lime", (Blinking = !0)), (InGame = 0), (AntiSpam = 0);
}
function VictoryAnim(e) {
  for (var o = 0; o < e.length; o++)
    "lime" == e[o].style.backgroundColor
      ? (e[o].style.backgroundColor = "white")
      : (e[o].style.backgroundColor = "lime");
}
function MakeAllCube(e, o = !1) {
  for (var n = [], t = 0; t < 15; t++)
    for (var r = 0; r < 7; r++)
      if (1 == Board[t][r]) {
        var a = document.getElementById("c" + (r + 1) + "r" + (t + 1));
        o ? n.push(a) : (a.style.backgroundColor = e);
      } else {
        (a = document.getElementById(
          "c" + (r + 1) + "r" + (t + 1)
        )).style.backgroundColor = "white";
      }
  o &&
    setInterval(function () {
      VictoryAnim(n);
    }, 200);
}
function TimeoutCountdown() {
  (PlayTime -= 1),
    (document.getElementById("Playtime").innerHTML =
      "<p id=timer>Time left &nbsp&nbsp&nbsp" + PlayTime + "s</p>"),
    PlayTime < 10 && $("#timer").css("color", "red"),
    0 == PlayTime && Loose();
}
function Restart() {
  document.location.reload();
}
function StopBlocks(e = !1) {
  InGame || Restart(),
    0 == AntiSpam &&
      (clearInterval(Interval_Wtm),
      clearInterval(Interval_Ud),
      clearInterval(Interval_Tc),
      CanLose && InGame && CheckPlacement(),
      (CanLose = 1),
      (Ypos -= 1),
      (PlayTime = 21),
      TimeoutCountdown(),
      Ypos < 0 && InGame && Win(),
      InGame &&
        (((11 == Ypos && 2 == ExtraBlue) || (7 == Ypos && 1 == ExtraBlue)) &&
          (ExtraBlue -= 1),
        (Speed *= 0.95),
        e && (AntiSpam = 1),
        LaunchBlue()));
}
function LaunchBlue() {
  (Interval_Wtm = setInterval(function () {
    WhereToMove();
  }, Speed)),
    (Interval_Ud = setInterval(function () {
      UpdateDisplay();
    }, 1)),
    (Interval_Tc = setInterval(function () {
      TimeoutCountdown();
    }, 1e3)),
    (document.onkeydown = function () {
      StopBlocks((KeyBoardAction = !0));
    }),
    (document.onkeyup = function () {
      InGame && (AntiSpam = 0);
    }),
    (document.onmousedown = function () {
      StopBlocks();
    });
}
tableCreate(), (Board = ArrayCreate()), LaunchBlue();
