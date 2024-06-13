
// =======================================================================================================================================================
// builder

// sideBar Left
function sideBarLeft() {
  let sidbarStat = "left";

  let colorBoxWidth = $("#colorBox").outerWidth();
  // $(".sideBarLeftCssClass").css("left", "-100%");

  $("#sideBar").addClass("sideBarLeftCssClass");
  $("#sideBar").removeClass("sideBarRightCssClass");
  $("#colorBox").css("order", "0");
  $(".btn-arrow-left").css("transform", "rotate(0deg)");

  $(".btn-arrow-left").css("order", "0");


  $("#sideBar").animate({ left: `-${colorBoxWidth}` }, 0);

  $("#sideBarToggle,.btn-arrow-left").click(function () {
    if ($(".sideBarLeftCssClass").css("left") == "0px") {
      $(".sideBarLeftCssClass").animate({ left: `-${colorBoxWidth}` }, 2000);
    } else {
      $(".sideBarLeftCssClass").animate({ left: `0px` }, 2000);
    }
  });
  console.log("sideBarLeft");

}
// sideBarLeft();

// --------------------------------
// sideBar Right
function sideBarRight() {
  // $(".sideBarRightCssClass").css("left", "auto");
  let sidbarStat = "right";

  let colorBoxWidth = $("#colorBox").outerWidth();

  // $("#sideBar").css("right", "0px" )
  // $(".sideBarRightCssClass").css("right", "-100%");

  

  $(".sideBarRightCssClass").css("left", "100px");


  $("#colorBox").css("order", "1");
  $(".btn-arrow-left").css("transform", "rotate(180deg)");
  $(".btn-arrow-left").css("order", "1");

  $("#sideBar").addClass("sideBarRightCssClass");
  $("#sideBar").removeClass("sideBarLeftCssClass");

  $("#sideBar").animate({ right: `-${colorBoxWidth}` }, 0);

  $("#sideBarToggle,.btn-arrow-left").click(function () {
    if ($(".sideBarRightCssClass").css("right") == "0px") {
      $(".sideBarRightCssClass").animate({ right: `-${colorBoxWidth}` }, 2000);
    } else {
      $(".sideBarRightCssClass").animate({ right: `0px` }, 2000);
    }
  });
  console.log("sideBarRight");
}
// sideBarRight();
sideBarLeft();

// --------------------------------

let sidebarStat = "left";

function toggleSidebar() {
  if (sidebarStat === "left") {
    sideBarRight();
    console.log("Opened right sidebar");
  $(".sideBarRightCssClass").css("left", "auto");
  $(".sideBarRightCssClass").css("right", "0px");


  } else {
    sideBarLeft();
    console.log("Opened left sidebar");
  $(".sideBarLeftCssClass").css("right", "auto");
  $(".sideBarLeftCssClass").css("left", "0px");

  }

  sidebarStat = (sidebarStat === "left") ? "right" : "left";
}

$(".btn-left-right").click(toggleSidebar);

// -----------------------------------------------------------------------
// device looks (smartphone / laptop)

$("#laptopdevice").click(function () {
  $(".iframeLaptop").show(500);
  $(".iframeMobile").hide(500);
});

$("#mobiledevice").click(function () {
  $(".iframeMobile").show(500);
  $(".iframeLaptop").hide(500);
});

// -----------------------------------------------------------------------
// En Ar sideBar

$(".btn-En").hide(0);

$(".btn-Ar").click(function () {
  $(".btn-Ar").hide(0);
  $(".btn-En").show(0);
});

$(".btn-En").click(function () {
  $(".btn-Ar").show(0);
  $(".btn-En").hide(0);
});

// -----------------------------------------------------------------------
// En Ar sideBar iframe
// $(".iframe-Ar").hide(0);
$(".btn-Ar").click(function () {
  $(".iframe-En").hide(0);
  $(".iframe-Ar").show(0);
});

$(".btn-En").click(function () {
  $(".iframe-En").show(0);
  $(".iframe-Ar").hide(0);
});

// =======================================================================================================================================================
