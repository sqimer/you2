// Subscribe
$("#subscribe").on("click", function () {
  var email = $("#email").val();
  if (email == "") {
    $("#email").css("border", "1px solid #ff0000");
    return false;
  }

  if (IsEmail(email) === false) {
    $("#email").css("border", "1px solid #ff0000");
    return false;
  }
});

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    return false;
  } else {
    $(".subscribe").hide();
    $(".congratulation").css("display", "flex");
  }
}

// Popup
$("#download").magnificPopup({
  type: "inline",
  midClick: true,
  mainClass: "mfp-fade",
  closeOnBgClick: true,
  enableEscapeKey: true,
  showCloseBtn: true,
});

$(document).on("click", "#congrats", function (e) {
  e.preventDefault();
  $(".congratulation").hide();
  $(".subscribe").show();
  $.magnificPopup.close();
});

// Timer
$("#timer").countdown("2020/11/30", function (event) {
  $(this).html(
    event.strftime(
      "<div class='popup__data'> %D <p>Дней</p></div> <span>:</span> <div class='popup__data'> %H <p>Часов</p></div> <span>:</span> <div class='popup__data'> %M <p>Минут</p></div> <span>:</span> <div class='popup__data'> %S <p>Секунд</p></div>"
    )
  );
});

// Slider
$(".slider").slick({
  dots: true,
  infinite: true,
  arrows: false,
  autoplay: true,
  speed: 500,
  fade: true,
  adaptiveHeight: true,
  cssEase: "linear",
});
