<?php if ( $_SERVER['PHP_SELF'] == 'index.php' ) { ?>

    <div class='wrapper'>
        <div id="trayHeader">
            <p class="title">NOTIFICATIONS</p>
                <div class="trayMenu">
                    <a href="#" id="flag_button">
                    
                        <div class="button">
                            <img id="flag_icon" src="imgs/flag.svg" data-swap="imgs/flagged_new.svg">
                            <p class="longPrimer">Flagged</p>
                        </div>

                    </a>

                    <div class="button">
                        <img src="imgs/settings.svg">
                        <p class="longPrimer">Settings</p>
                    </div>

                </div>
        </div>
    </div>

<?php } else { ?>

    <div id="loungeHeader">
        <div class='wrapper'>
            <p class="title">Notifications</p>
            <div class="trayMenu">
                <div class="button"><img src="imgs/flag_white.svg"><p class="longPrimer">Flagged</p></div>
                <div class="button"><img src="imgs/settings_white.svg"><p class="longPrimer">Settings</p></div>
            </div>
        </div>
    </div>

<?php } ?>