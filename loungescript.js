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
  bundleAnchor = el.querySelector('.childrenNotif li');

  button.onclick = function(event) {
    if(!menu.hasClass('show')) {
      $(".childrenNotif").addClass('show');
      $('i.icon-arrow').addClass('open');
      $('i.icon-arrow').removeClass('close');
      $('.childrenNotif .singleNotif').removeClass('fadeOut');
      $('.childrenNotif .singleNotif').addClass('fadeIn');
      $(".childrenNotif").animate({maxHeight : "9999px"}, 500, easeInQuad);
      event.preventDefault();
      $(".bundleNotifTop").addClass('sticky');
      $("<div id='sticky-anchor'/>").insertBefore(bundleAnchor);
      $("#notificationList").scroll(sticky_relocate);
      sticky_relocate();
      $('.sticky').clone().addClass('clonedSticky').prependTo( "#notificationList" );
    }
    else {

      $('.childrenNotif .singleNotif').removeClass('fadeIn');
$('.childrenNotif .singleNotif').addClass('fadeOut');
      $('.childrenNotif').animate({maxHeight : "0px"}, 500, easeOutQuad);

      $('.childrenNotif').removeClass('show');
      $('.sticky').insertBefore('#firstDiv');
      $('i.icon-arrow').addClass('close');
      $('i.icon-arrow').removeClass('open');
      event.preventDefault();
      $(".bundleNotifTop").removeClass('sticky stick stickStop');
      $("#sticky-anchor").remove();
      $("#notificationList").off("scroll", sticky_relocate);
      $('.clonedSticky').remove();
    }
  };
});

Element.prototype.hasClass = function(className) {
  return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};







/* Start */
function init(){
  $("#includeOrb").load("orb/orb.html"); 
  bellIconClick();
  $(".more").click(openActions);
}

$(window).ready(init);