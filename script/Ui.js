$("#github").click(function () {
  document.location.href = "https://github.com/QGruber67/Stacker-Remake";
}),
  $("#github").mouseover(function () {
    $("#github").css("cursor", "hand"), $("#github").css("opacity", "0.5");
  }),
  $("#github").mouseout(function () {
    $("#github").css("opacity", "1");
  });
