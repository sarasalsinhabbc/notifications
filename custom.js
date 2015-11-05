/*	----------------------------------------------------------------------------	* 
	Custom jQuery Document
 *	----------------------------------------------------------------------------	*/

;(function($) {
	"use strict";

	$(document).ready(function() {


if ($('#lounge').hasClass('loungy')) {
        getFavourites();
} else{

}


		/*	-----------------------------------------------	* 
			Open ORB Panel
		 *	-----------------------------------------------	*/
		$('#bellIcon').click(function () {
			getFavourites();
			$('#tray').slideToggle('slow');
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
		 			$("#iPlayer1Result1").html(data + ' has 4 new episodes. Check it out!');
		 			$("#iPlayer1Result2").html(data + ' Episode 30/10/2015 expires today. Don&#39;t miss out!');
		 		}
		 	});

		 	$.ajax({
		 		url: 'readFavourite2.php',
		 		dataType: 'json',
		 		type:'post',
		 		success: function(data){
		 			$("#iPlayer2Result1").html(data  + ' Episode 12, Season 1 expires in a week. Don&#39;t miss out!');
		 			$("#iPlayer2Result2").html(data  + ' Episode 3 Season 2 in now available. Check it out!');
		 		}
		 	});

		 	$.ajax({
		 		url: 'readFavourite3.php',
		 		dataType: 'json',
		 		type:'post',
		 		success: function(data){
		 			$("#iPlayer3Result1").html(data  + ' has 2 new episodes. Check it out!');
		 		}
		 	});

		 	$.ajax({
		 		url: 'readFavourite4.php',
		 		dataType: 'json',
		 		type:'post',
		 		success: function(data){
		 			$("#presenter1Result1").html(data + ' added Simba Simba - Delux. Tune in!');
		 		}
		 	});

		 	$.ajax({
		 		url: 'readFavourite5.php',
		 		dataType: 'json',
		 		type:'post',
		 		success: function(data){
		 			$("#presenter2Result1").html(data + ' added 10 new tracks. Stay tuned!');
		 		}
		 	});

		 	$.ajax({
		 		url: 'readFavourite6.php',
		 		dataType: 'json',
		 		type:'post',
		 		success: function(data){
		 			$("#travelResult1").html(data + ' as a severe accident. Get more details.');
		 		}
		 	});

		 	$.ajax({
		 		url: 'readFavourite7.php',
		 		dataType: 'json',
		 		type:'post',
		 		success: function(data){
		 			$("#topicResult1").html(data + ' gains increasing awareness in the UK.');
		 			$("#topicResult2").html('UK police in investigating the effects of ' + data + ' on their everyday work.');
		 		}
		 	});
		};


		/*	-----------------------------------------------	* 
			Form actions
		 *	-----------------------------------------------	*/
  			
  			$("#subButton").click(writeFavourites);

  			$("#skipLink").click(function (){
  				$("#initial").hide();
  			});


		/*	-----------------------------------------------	* 
			Bundle Opening & Closing & Sticky 1
		 *	-----------------------------------------------	*/

		var bundle1 = $('#bundle1').find('.arrow');

		bundle1.click(function() {
			var bundleItems = $(this).parent().parent().siblings('.childrenNotif'),
			bundleTop = $(this).parent().parent(),
			arrowRotate = $(this),
			last_div = $(this).parent().parent().siblings('.childrenNotif').find('.lastDiv');


				function sticky_relocate() {
				 	var window_top = $("#notificationList").scrollTop();
				 	var div_top = $('#sticky-anchor').offset().top;
				 	var div_stop = $('#sticky-anchor-stop').offset().top;


				 	if (window_top > div_top) {
				 		$('.clonedSticky').addClass('stick');
				 		$('.clonedSticky').show();
				 	} else {
				 		$('.sticky').removeClass('stick');
				 		$('.clonedSticky').hide();
				 	}

				 	if (window_top > div_stop) {
				 		$('.clonedSticky').hide();
				 		$('.sticky').removeClass('stick');
				 		$('.sticky').addClass('stickStop');
				 		$('.sticky').insertBefore(last_div);

				 	} else {
				 		$('.sticky').insertBefore(bundleItems);
				 	}
				 }

				 function closeOtherBundles() {
				 	$(".childrenNotif").animate({maxHeight : "0px"}, 500, 'easeOutQuart');
		 			$(".childrenNotif").removeClass('show');
		 			$(".childrenNotif").find('.singleNotif').removeClass('fadeIn');
		 			$(".childrenNotif").find('.singleNotif').addClass('fadeOut');
		 			$(".arrow").removeClass('open');
		 			$('.bundleNotifTop').removeClass('sticky stick stickStop');
				    $('#notificationList').off("scroll", sticky_relocate);
				    $('#sticky-anchor').remove();
				    $('.clonedSticky').remove();
				 }


		 		if(!bundleItems.hasClass('show')) {
		 			closeOtherBundles();
		 			bundleItems.animate({maxHeight : "9999px"}, 1000, 'easeInQuart');
		 			bundleItems.toggleClass('show');
		 			bundleItems.find('.singleNotif').removeClass('fadeOut');
		 			bundleItems.find('.singleNotif').addClass('fadeIn');
		 			arrowRotate.toggleClass('open');
		 			bundleTop.addClass('sticky');
      				$("<div id='sticky-anchor'/>").insertBefore(bundleTop);
      				$("#notificationList").scroll(sticky_relocate);
      				//sticky_relocate();
      				$('.sticky').clone().addClass('clonedSticky').prependTo( "#notificationList" );
		 		}
		 		else {
		 			bundleItems.animate({maxHeight : "0px"}, 1000, 'easeOutQuart');
		 			bundleItems.find('.singleNotif').removeClass('fadeIn');
		 			bundleItems.find('.singleNotif').addClass('fadeOut');
		 			bundleItems.toggleClass('show');
		 			arrowRotate.toggleClass('open');
		 			$('.sticky').insertBefore(bundleItems);
		 			bundleTop.removeClass('sticky stick stickStop');
				    $("#notificationList").off("scroll", sticky_relocate);
				    $("#sticky-anchor").remove();
				    $('.clonedSticky').remove();
		 		}
		});




		/*	-----------------------------------------------	* 
			Bundle Opening & Closing & Sticky 2
		 *	-----------------------------------------------	*/

		var bundle2 = $('#bundle2').find('.arrow');

		bundle2.click(function() {
			var bundleItems = $(this).parent().parent().siblings('.childrenNotif'),
			bundleTop = $(this).parent().parent(),
			arrowRotate = $(this),
			last_div = $(this).parent().parent().siblings('.childrenNotif').find('.lastDiv');


				function sticky_relocate() {
				 	var window_top = $("#notificationList").scrollTop();
				 	var div_top = $('#sticky-anchor2').offset().top;
				 	var div_stop = $('#sticky-anchor-stop2').offset().top;


				 	if (window_top > div_top) {
				 		$('.clonedSticky').addClass('stick');
				 		$('.clonedSticky').show();
				 	} else {
				 		$('.sticky').removeClass('stick');
				 		$('.clonedSticky').hide();
				 	}

				 	if (window_top > div_stop) {
				 		$('.clonedSticky').hide();
				 		$('.sticky').removeClass('stick');
				 		$('.sticky').addClass('stickStop');
				 		$('.sticky').insertBefore(last_div);

				 	} else {
				 		$('.sticky').insertBefore(bundleItems);
				 	}
				 }

				 function closeOtherBundles() {
				 	$(".childrenNotif").animate({maxHeight : "0px"}, 500, 'easeOutQuart');
		 			$(".childrenNotif").removeClass('show');
		 			$(".childrenNotif").find('.singleNotif').removeClass('fadeIn');
		 			$(".childrenNotif").find('.singleNotif').addClass('fadeOut');
		 			$(".arrow").removeClass('open');
		 			$('.bundleNotifTop').removeClass('sticky stick stickStop');
				    $('#notificationList').off("scroll", sticky_relocate);
				    $('#sticky-anchor2').remove();
				    $('.clonedSticky').remove();
				 }


		 		if(!bundleItems.hasClass('show')) {
		 			closeOtherBundles();
		 			bundleItems.animate({maxHeight : "9999px"}, 1000, 'easeInQuart');
		 			bundleItems.toggleClass('show');
		 			bundleItems.find('.singleNotif').removeClass('fadeOut');
		 			bundleItems.find('.singleNotif').addClass('fadeIn');
		 			arrowRotate.toggleClass('open');
		 			bundleTop.addClass('sticky');
      				$("<div id='sticky-anchor2'/>").insertBefore(bundleTop);
      				$("#notificationList").scroll(sticky_relocate);
      				//sticky_relocate();
      				$('.sticky').clone().addClass('clonedSticky').prependTo( "#notificationList" );
		 		}
		 		else {
		 			bundleItems.animate({maxHeight : "0px"}, 1000, 'easeOutQuart');
		 			bundleItems.find('.singleNotif').removeClass('fadeIn');
		 			bundleItems.find('.singleNotif').addClass('fadeOut');
		 			bundleItems.toggleClass('show');
		 			arrowRotate.toggleClass('open');
		 			$('.sticky').insertBefore(bundleItems);
		 			bundleTop.removeClass('sticky stick stickStop');
				    $("#notificationList").off("scroll", sticky_relocate);
				    $("#sticky-anchor2").remove();
				    $('.clonedSticky').remove();
		 		}
		});




		/*	-----------------------------------------------	* 
			Bundle Opening & Closing & Sticky 2
		 *	-----------------------------------------------	*/

		var bundle3 = $('#bundle3').find('.arrow');

		bundle3.click(function() {
			var bundleItems = $(this).parent().parent().siblings('.childrenNotif'),
			bundleTop = $(this).parent().parent(),
			arrowRotate = $(this),
			last_div = $(this).parent().parent().siblings('.childrenNotif').find('.lastDiv');

				 function closeOtherBundles() {
				 	$(".childrenNotif").animate({maxHeight : "0px"}, 500, 'easeOutQuart');
		 			$(".childrenNotif").removeClass('show');
		 			$(".childrenNotif").find('.singleNotif').removeClass('fadeIn');
		 			$(".childrenNotif").find('.singleNotif').addClass('fadeOut');
		 			$(".arrow").removeClass('open');
		 			$('.bundleNotifTop').removeClass('sticky stick stickStop');
				    $('#sticky-anchor2').remove();
				    $('.clonedSticky').remove();
				 }


		 		if(!bundleItems.hasClass('show')) {
		 			closeOtherBundles();
		 			bundleItems.animate({maxHeight : "9999px"}, 1000, 'easeInQuart');
		 			bundleItems.toggleClass('show');
		 			bundleItems.find('.singleNotif').removeClass('fadeOut');
		 			bundleItems.find('.singleNotif').addClass('fadeIn');
		 			arrowRotate.toggleClass('open');
		 		}
		 		else {
		 			bundleItems.animate({maxHeight : "0px"}, 1000, 'easeOutQuart');
		 			bundleItems.find('.singleNotif').removeClass('fadeIn');
		 			bundleItems.find('.singleNotif').addClass('fadeOut');
		 			bundleItems.toggleClass('show');
		 			arrowRotate.toggleClass('open');
		 		}
		});



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

			$('#notificationList > ul > li:not(.flaggedBundle) + li:not(.flaggedAction)').toggle(0);
			$('#notificationList > ul > li:not(.flaggedAction) > ul.childrenNotif > li:not(.flaggedAction)').toggle(0);

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

			var isBundle = $(this).parent().parent().parent().parent();

			if ( isBundle.hasClass('bundleNotif') ) {
				
				isBundle.toggleClass('flaggedBundle');

			}

		});


		/*	-----------------------------------------------	* 
			Remove
		 *	-----------------------------------------------	*/

		$('.remove').click(function() {

			if( $(this).parent().parent().hasClass('singleNotif') ) {

				var getRemoveItem = $(this).parent().parent();

				var getRemoveLabel = $(this).find('.longPrimer');
				getRemoveLabel.replaceWith('<p class="longPrimer">Removing</p>');

				var remove_icon_action = $(this).children('#remove_action_icon');
				var remove_icon_action_source = remove_icon_action.attr('src');
				var swap = remove_icon_action.attr("data-swap");

				remove_icon_action.attr('src', swap).attr("data-swap", remove_icon_action_source);

				remove_icon_action.toggleClass('loadingSpinner');

				setTimeout(function (){

				  getRemoveItem.slideUp('slow', function() {
				  	$(this).remove();
				  });

				}, 2000);

				/*
				 * Remove Bundle Notification if no
				 * notifications exist in the bundle
				 */
				if ( $(this).parent().parent().parent().children().length == 2 ) {

					setTimeout(function (){

						getRemoveItem.parent().parent().slideUp('slow', function() {
							$(this).remove();
						});

					}, 2000);

				}

			}

		});

		/*	-----------------------------------------------	* 
			Add
		 *	-----------------------------------------------	*/

		function changeAddToTick(getThis) {

			var getAddLabel = getThis.parent().parent();

			var getAddLabel = getThis.find('.longPrimer');

			getAddLabel.html( getAddLabel.text() == 'Add' ? 'Added' : 'Add');

			var add_icon_action = getThis.children('#add_action_icon');
			var add_icon_action_source = add_icon_action.attr('src');
			var swap = add_icon_action.attr("data-swap");

			add_icon_action.attr('src', swap).attr("data-swap", add_icon_action_source);

			add_icon_action.parent().parent().parent().toggleClass('addedNotification');
		}

		$('.add').click(function() {

			if ( $(this).parent().parent().hasClass('singleNotif') ) {
				changeAddToTick( $(this) );
			}

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
$('#initial').hide();

		//sticky_relocate();

	});

})(jQuery);