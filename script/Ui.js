

// GITHUB
$("#github").click(function() {
    document.location.href = "https://github.com/QGruber67/Stacker-Remake";
});

$( "#github" ).mouseover(function() {
    $("#github").css("cursor","hand");
    $( "#github" ).css("opacity","0.5");
  });

 $( "#github" ).mouseout(function() {
   $( "#github" ).css("opacity","1");
});

// Mute

isMuted = false;
hasClicked = false;

$("#Mute").click(function() {
    if (isMuted){
        isMuted = false;
        hasClicked = true;
        $( "#Mute" ).attr("src", "asset/mute_icon/on.png");
    }
    else{
        isMuted = true;
        hasClicked = true;
        $( "#Mute" ).attr("src", "asset/mute_icon/off.png");
    }
});

$( "#Mute" ).mouseover(function() {
    $("#Mute").css("cursor","hand");
    if (isMuted){
        $( "#Mute" ).attr("src", "asset/mute_icon/on.png");
    }
    else{
        $( "#Mute" ).attr("src", "asset/mute_icon/off.png");
    }
  });

 $( "#Mute" ).mouseout(function() {
    if (isMuted && !hasClicked){
        $( "#Mute" ).attr("src", "asset/mute_icon/off.png");
    }
    if(!isMuted && !hasClicked){
        $( "#Mute" ).attr("src", "asset/mute_icon/on.png");
    }
    if(hasClicked){
        hasClicked=false;
    }
});

