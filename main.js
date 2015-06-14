$(function() {
    var iframeReady = false;
    var audioReady = false;

    //What wonderful things must we spam?
    var WORDS = ["Hack", "Leak"]

	//Look at /r/random
    var randomChoice = function(list) {
            return list[Math.floor(Math.random()*list.length)]
    }

	//Because js really doesn't try
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

	//What else would you do?
    var startRain = function () {
        console.log("ARE YOU READY FOR A MIRACLE?");

        //Let's box this
        var $box = $('.hax-box');
        //How long until we spam some more
        var interval = 200;
        var numBoxes = 0;

        //Add a box at a random place
        var addBox = function() {
            //Get the width every time we add a sale to account for dynamic widths.
			//Why would anyone do that though :|
            var pageWidth = $('body').width();
            var maxBoxage = (pageWidth/70)*5
            var xPos = getRandomInt(0, pageWidth);
            // Just copy the hidden box we had at page load time to make a new box.
            var newBox = $box.clone().show();

            newBox.text(randomChoice(WORDS))

            newBox.css("left", xPos);
            $('body').append(newBox);

            //Only have maxBoxage boxes onscreen at once.
			//Because size and lag etc.
            if (numBoxes < maxBoxage) {
                // Add a new box later.
                window.setTimeout(addBox, interval);
                numBoxes++;
            }

        };

        // Set an interval to decrease the interval #interval-ception
        window.setInterval(function() {
            interval = Math.max(10, interval - 10);
        }, 500);

        window.setTimeout(addBox, 2*1000);

    };

    var boxlateRain = function () {
		if (false) {
			//TODO activate this
			$('div.prepare-gag').hide();
		}
        startRain();
        $audio.trigger('play');
        window.setTimeout(
                function() {
                    $('div.sunburst').fadeIn(4000);
                }
                , 8000)
    }

	/*
    var $frame = $('iframe.website')

    $frame.load(function() {
        if (iframeReady) {
            return
        }
        iframeReady = true; //Programming level 10/10
    });
	*/
	
	//Let's get musical, musical
    $audio = $('audio');
    $audio.on('loadedmetadata', function() {
        audioReady = true;
    });
	//Music is set
    $audio.on('ended', function() {
        this.currentTime = 0;
        this.play();
    });
	//They can never escape

    var preload = function() {
		//Pick and mix, can overlay if we want
        //if (audioReady && iframeReady) {
		if (audioReady) {
			//Images can stall, but meh.
            //$('.prepare-loader').css('max-height', $('.prepare-loader > img').height() / 3 + 'px');
			//GO GO GO
            window.setTimeout(boxlateRain, 1000);
        } else {
			//Keep stalling until it's ready
            window.setTimeout(preload, 100);
        }
    }

    preload();
});
