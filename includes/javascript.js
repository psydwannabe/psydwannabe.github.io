var mySound,info,infoButton,initialized,playButton,pauseButton;
document.addEventListener("click", init, true);

window.onload = function(e){ 
	// Define info section handlers
	infoButton = document.getElementById("infoButton");
    info = document.getElementById("info");
    playButton = document.getElementById("play");
    pauseButton = document.getElementById("pause");

	// initialize "initialized" variable
    initialized = false;
    
    // Add event listener to handle key presses
	window.addEventListener("keydown", checkKeyPressed, false);

}
function init() {
	// Remove the listener
	document.removeEventListener("click", init, true);
	
	// Remove the preload class
    document.body.className="";
	
	// Set up and initialize Sound Manager
	soundManager.setup({
	  url: 'includes/swf/',
	  onready: function() {
		mySound = soundManager.createSound({
		  id: 'aSound',
		  url: 'includes/gz.mp3'
		});
		// Set us as initialized!
		initialized = true;
	  },
	  ontimeout: function() {
	  }
	}); 

}


function loopSound(pause) {
	if(typeof pause === "undefined") {
		var pause = false;
	}
	if(pause) {
		mySound.pause();
	} else {
		if(mySound.paused) { mySound.togglePause(); }
		else {
			mySound.play({
				onfinish: function() {
					loopSound(false);
	    		}
  			});
  		}
	}
}


function checkKeyPressed(e) {
	// Space bar plays or pauses
	if (e.keyCode == "32") {
		if(!initialized){
			init();
		}
		playPause(true);
	}
	
	// Escape closes modal windows.
	if (e.keyCode == "27") {
	    if(info.className == "show") {
	    	info.className="";
	    	infoButton.className="";
    	}	
	}
	
}

function toggleInfo() {
	
    if(info.className == "show") {
    	info.className="";
    	infoButton.className="";
    } else {
	    info.className="show";
    	infoButton.className="show";
	}
	return false;
}



function playPause(toggle) {
	if(typeof toggle === "undefined") {
		var toggle = true;
	}
	
    if (!mySound.playState || mySound.paused) {
        playButton.style.display = "block";
        pauseButton.style.display = "none";
		if(toggle) { loopSound(false); }
    } else {
        pauseButton.style.display = "block";
        playButton.style.display = "none";
        if(toggle) { loopSound(true); }
    }
}