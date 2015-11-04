/*	----------------------------------------------------------------------------	* 
	Custom jQuery Document
 *	----------------------------------------------------------------------------	*/

;(function($) {
	"use strict";

	$(document).ready(function() {

		/*	-----------------------------------------------	* 
			Bundle Sticky
		 *	-----------------------------------------------	*/
		function sticky_relocate() {

			var window_top = $('#notificationList').scrollTop();
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
		};

		/*	-----------------------------------------------	* 
			Open ORB Panel
		 *	-----------------------------------------------	*/
		$('#bellIcon').click(function () {

			getFavourites();

			$('#tray').toggle(0, function () {
				$(this).css('height', '600px');
			});

		});

		/*	-----------------------------------------------	* 
			Write favourites to file
		 *	-----------------------------------------------	*/

		 function writeFavourites() {

		 	$("#initial").css({display : "none"});

		 	$.ajax({
		 		url: 'writeFavourites.php',
		 		type: 'post',
		 		data: { result1: $("#iPlayerField1").val(), result2: $("#iPlayerField2").val(), result3: $("#iPlayerField3").val(), result4: $("#presenterField1").val(), result5: $("#presenterField2").val(), result6: $("#locationField").val(), result7: $("#topicField").val() },
		 		success: function(data){
		 		}
		 	}); 

		 };

		/*	-----------------------------------------------	* 
			Get favourites from file and write in list
		 *	-----------------------------------------------	*/

		 function getFavourites() {

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
		};


		/*	-----------------------------------------------	* 
			Form actions
		 *	-----------------------------------------------	*/
  			
  			$("#subButton").click(writeFavourites);

  			$("#skipLink").click(function (){
  				$("#initial").css({display : "none"});
  			});


		/*	-----------------------------------------------	* 
			Bundle Opening & Closing
		 *	-----------------------------------------------	*/

		var dropdown = document.querySelectorAll('.bundleNotif');
		var dropdownArray = Array.prototype.slice.call(dropdown,0);

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

		/*	-----------------------------------------------	* 
			Open Actions
		 *	-----------------------------------------------	*/

		$('.openActions').click(function() {
			$(this).parent().toggleClass('moreActionsOpened');
		});

		/*	-----------------------------------------------	* 
			Open Actions for Mobile
		 *	-----------------------------------------------	*/

		$('.openActions').click(function() {

			$(this).parent().parent().toggleClass('moreActionsOpenedMobile');

		});

		/*	-----------------------------------------------	* 
			Resize Height of Actions based on Notifications
		 *	-----------------------------------------------	*/

		var notificationHeight = $('.singleNotif').height();
		$('.action').css( 'height', notificationHeight);		

		$( window ).resize(function() {
			var notificationHeight = $('.singleNotif').height();
			$('.action').css( 'height', notificationHeight);
		});


		/*	-----------------------------------------------	* 
			Flag / Flagging
		 *	-----------------------------------------------	*/

		/* Toggle Flag State and Add Class of Flagged */
		$('#flag_button').click(function() {

			var flag_icon = $('#flag_icon');
			var flag_icon_source = flag_icon.attr('src');
			var swap = flag_icon.attr("data-swap");

			flag_icon.attr('src', swap).attr("data-swap", flag_icon_source);

			$(this).toggleClass('flagged');

			$('#notificationList > ul > li:not(.flaggedAction)').toggle(0);

			if( ($('#notificationList ul' ).children().css('display') == 'none') && !($('#notificationList ul' ).children().hasClass('flaggedAction')) ) {

				$('#sorryMessage').show();

			} else {
				$('#sorryMessage').hide();				
			}
		});

		/* Change State of Flag Action and Add Class */
		$('.flag').click(function() {

			if ( $(this).parent().parent().hasClass('singleNotif') ) {

				var flag_icon_action = $(this).children('#flag_action_icon');
				var flag_icon_action_source = flag_icon_action.attr('src');
				var swap = flag_icon_action.attr("data-swap");

				flag_icon_action.attr('src', swap).attr("data-swap", flag_icon_action_source);				
			}

			$(this).parent().parent().toggleClass('flaggedAction');

		});

/*	-----------------------------------------------	* 
	Add Class to new notifications after 5 seconds (TESTING)
 *	-----------------------------------------------	*/

// setTimeout(function () {
// 	$('.singleNotif').addClass('newNotification');
// }, 5000);
	

		/*	-----------------------------------------------	* 
			Initialisation
		 *	-----------------------------------------------	*/

		// Includes ORB
		$('#includeOrb').load('orb/orb.html');

// ONLY TEMP
$('#initial').css('display', 'none');

		//sticky_relocate();

	});

})(jQuery);