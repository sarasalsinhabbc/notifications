window.URL = window.URL || window.webkitURL;

var uniquename;
var current_state = 1;
var action_state = 0;
var subButton = document.getElementById('subButton');
var dropdown = document.querySelectorAll('.bundleNotif');
var dropdownArray = Array.prototype.slice.call(dropdown,0);


/* Actions */
function openActions(){
  if (current_state < 1) {
      $(".moreActions").animate({right : "-90px"}, 500);
    current_state = 1;
  }else{
    $(".moreActions").animate({right : "-90px"}, 500);
      $(this).parent().animate({right : "0px"}, 500);
    current_state = 0;
  }
};

/* Skip initial */
function skipInitial(){
  $("#initial").css( 'display', 'none');
}

/* Orb */
function bellIconClick(){

$.ajax({
    url: 'readFavourite1.php',
    dataType: 'json',
    type:'post',
    success: function(data){
$("#iPlayer1Result").html(data + ' has a new episode!');
}
});

$.ajax({
    url: 'readFavourite2.php',
    dataType: 'json',
    type:'post',
    success: function(data){
$("#iPlayer2Result").html(data  + ' has a new episode!');
}
});

$.ajax({
    url: 'readFavourite3.php',
    dataType: 'json',
    type:'post',
    success: function(data){
$("#iPlayer3Result").html(data  + ' has a new episode!');
}
});

$.ajax({
    url: 'readFavourite4.php',
    dataType: 'json',
    type:'post',
    success: function(data){
$("#presenter1Result").html(data + ' added a new track!');
}
});

$.ajax({
    url: 'readFavourite5.php',
    dataType: 'json',
    type:'post',
    success: function(data){
$("#presenter2Result").html(data + ' added a new track!');
}
});

$.ajax({
    url: 'readFavourite6.php',
    dataType: 'json',
    type:'post',
    success: function(data){
$("#locationResult").html(data + ' has a severe incident! OMG!');
}
});

$.ajax({
    url: 'readFavourite7.php',
    dataType: 'json',
    type:'post',
    success: function(data){
$("#topicResult").html(data + ' has been found in Mars!');
}
});


  if (current_state < 2) {
    $("#tray").animate({height : "600px"}, 500);
    current_state = 2;
  }else{
    $("#tray").animate({height : "0px"}, 500);
    current_state = 1;
  }
}

/* Bundle */
function sticky_relocate() {
  var window_top = $("#notificationList").scrollTop();
  var div_top = $('#sticky-anchor').offset().top;
  var div_stop = $('#sticky-anchor-stop').offset().top;

  if (window_top > div_top) {
    $('.clonedSticky').addClass('stick');
    $('.clonedSticky').css('display', 'block');
  } else {
    $('.sticky').removeClass('stick');
    $('.clonedSticky').css('display', 'none');
  }

  if (window_top > div_stop) {
    $('.clonedSticky').css('display', 'none');
    $('.sticky').removeClass('stick');
    $('.sticky').insertBefore('#lastDiv');
    $('.sticky').addClass('stickStop');

  } else {
    $('.sticky').insertBefore('#firstDiv');
  }

}

dropdownArray.forEach(function(el){
  var button = el.querySelector('a[data-toggle="dropdown"]'),
  menu = el.querySelector('.childrenNotif'),
  bundleTop = el.querySelector('.bundleNotifTop'),
  bundleAnchor = el.querySelector('.childrenNotif li'),
  arrow = button.querySelector('i.icon-arrow');

  button.onclick = function(event) {
    if(!menu.hasClass('show')) {
      menu.classList.add('show');
      menu.classList.remove('hide');
      arrow.classList.add('open');
      arrow.classList.remove('close');
      event.preventDefault();
      bundleTop.classList.add('sticky');
      $("<div id='sticky-anchor'/>").insertBefore(bundleAnchor);
      $("#notificationList").scroll(sticky_relocate);
      sticky_relocate();
      $('.sticky').clone().addClass('clonedSticky').prependTo( "#notificationList" );
    }
    else {
      $('.sticky').insertBefore('#firstDiv');
      menu.classList.remove('show');
      menu.classList.add('hide');
      arrow.classList.remove('open');
      arrow.classList.add('close');
      event.preventDefault();
      bundleTop.classList.remove('sticky');
      bundleTop.classList.remove('stick');
      bundleTop.classList.remove('stickStop');
      $("#sticky-anchor").remove();
      $("#notificationList").off("scroll", sticky_relocate);
      $('.clonedSticky').remove();
    }
  };
});

Element.prototype.hasClass = function(className) {
  return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};



/* DOESN'T WORK PROPERLY */
function moveActions() {

  $('.actionsTrigger').click(function() {

    var parentTag = $( this ).parent().get( 0 ).tagName;
    $(parentTag).css('position', 'relative');
    $(parentTag).css('right', '153px');

  });
}


/* Form */

function getFavourites() {

  $("#initial").css({display : "none"});

  $.ajax({
    url: 'writeFavourites.php',
    type: 'post',
    data: { result1: $("#iPlayerField1").val(), result2: $("#iPlayerField2").val(), result3: $("#iPlayerField3").val(), result4: $("#presenterField1").val(), result5: $("#presenterField2").val(), result6: $("#locationField").val(), result7: $("#topicField").val() },
    success: function(data){
    }
  }); 

}



/* Start */
function init(){
  $("#includeOrb").load("orb/orb.html"); 
  $("#bellIcon").click(bellIconClick);
  $("#skipLink").click(skipInitial);
  $(".more").click(openActions);
  moveActions();
  skipInitial();
}

$(window).ready(init);