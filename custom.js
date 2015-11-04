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
			
			$('#tray').slideToggle('slow');

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
$('#initial').css('display', 'none');

		sticky_relocate();

	});

})(jQuery);