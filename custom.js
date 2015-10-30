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
			var div_top = $('#sticky-anchor').offset.top;
			var div_stop = $('#sticky-anchor-stop').offset.top;

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

		$('.bundleNotif').click(function() {
			
			

		});

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