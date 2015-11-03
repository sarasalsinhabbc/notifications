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
		}

		/*	-----------------------------------------------	* 
			Open ORB Panel
		 *	-----------------------------------------------	*/
		$('#bellIcon').click(function () {
			
			$('#tray').toggle(function () {
				$(this).css('height', '600px');
			});

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

		$('#openActions').click(function() {
			$(this).parent().toggleClass('moreActionsOpened');
		});

		/*	-----------------------------------------------	* 
			Open Actions for Mobile
		 *	-----------------------------------------------	*/

		$('#openActions').click(function() {

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

		/* Toggle Flag State */
		$('#flag_button').click(function() {
			
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

		sticky_relocate();

	});

})(jQuery);