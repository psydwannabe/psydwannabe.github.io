var mySound,info,infoButton,initialized;
document.addEventListener("click", init, true);

window.onload = function(e){ 
	// Define info section handlers
	infoButton = document.getElementById("infoButton");
    info = document.getElementById("info");

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
	if(toggle) {
		mySound.togglePause();
	}
    var play = document.getElementById("play");
    var pause = document.getElementById("pause");
    if (play.style.display === "none") {
        play.style.display = "block";
        pause.style.display = "none";
    } else {
        pause.style.display = "block";
        play.style.display = "none";
    }
}