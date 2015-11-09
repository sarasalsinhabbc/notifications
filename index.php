<!-- Load Header -->
<?php include('header.php'); ?>

	<!-- Load ORB -->
	<?php include('orb.php'); ?>

    <!--Your Favourites-->
    <div id='initial'>
        <div class='wrapper'><p class="trafalgar">Let's get started!<br>What are your favourites?</p></div>
        <form class='wrapper'>
            <div class='formGroup'>
                <div ><p class="longPrimer">BBC iPlayer Programmes</p></div>
                <lable class='longPrimer' for='iPlayerField1'></lable>
                <input id='iPlayerField1' class='longPrimer' type='text' maxlength='80'></input>
                <lable class='longPrimer' for='iPlayerField2'><br></lable>
                <input id='iPlayerField2' class='longPrimer' type='text' maxlength='80'></input>
                <lable class='longPrimer' for='iPlayerField3'><br></lable>
                <input id='iPlayerField3' class='longPrimer' type='text' maxlength='80'></input>
            </div>
            <div class='formGroup'>
                <div ><p class="longPrimer">BBC Radio Presenter</p></div>
                <lable class='longPrimer' for='presenterField1'></lable>
                <input id='presenterField1' class='longPrimer' type='text' maxlength='80'></input>
                <lable class='longPrimer' for='presenterField2'><br></lable>
                <input id='presenterField2' class='longPrimer' type='text' maxlength='80'></input>
            </div>
            <div class='formGroup'>
                <div ><p class="longPrimer">Location</p></div>
                <lable class='longPrimer' for='locationField'></lable>
                <input id='locationField' class='longPrimer' type='text' maxlength='80'></input>
            </div>
            <div class='formGroup'>
                <div ><p class="longPrimer">News topic</p></div>
                <lable class='longPrimer' for='topicField'></lable>
                <input id='topicField' class='longPrimer' type='text' maxlength='80'></input>
            </div>
            <div class='form-sub'>
                <button id='subButton' class='longPrimer' type='button'>I'm done. Go!</button>
            </div>
            <div id='skipLink'><a href="#"><p class="longPrimer">Skip</p></a></div>
        </form>
    </div>

	<!--Tray-->
	<div id="tray">

		<!-- Load Notification Header Home -->
		<?php include('notification_header_home.php'); ?>

		<!-- Load Notifications / Tray -->
		<?php include('notifications.php'); ?>

	</div>

<?php include('website.php'); ?>
<!-- Load Footer -->
<?php include('footer.php'); ?>