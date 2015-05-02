function pourDupliis( where, svgUrl ) {
	if ( pourDupliis.stopPouring ) {
		return;
	}
	
	// Helper function to get random numbers.
	function getRandomInt( min, max ) {
	    return Math.floor( Math.random() * (max - min + 1) ) + min;
	}
	// Define all variables.
	var animationId, minWidth, maxWidth, minOpacity, maxOpacity, faceWidth, faceOpacity, cssString, posX, posY, animDelay, faceCont, face;
	// Decide what animation to apply.
	animationId = getRandomInt(1,3);
	switch ( animationId ) {
		case 1:
			minWidth = 60;
			maxWidth = 80;
			minOpacity = 35;
			maxOpacity = 45;
			break;
		case 2:
			minWidth = 30;
			maxWidth = 50;
			minOpacity = 25;
			maxOpacity = 33;
			break;
		case 3:
			minWidth = 10;
			maxWidth = 25;
			minOpacity = 10;
			maxOpacity = 25;
			break;
	}
	// Define the diameter of the face.
	faceWidth = getRandomInt(minWidth, maxWidth);
	faceOpacity = getRandomInt(minOpacity, maxOpacity) / 100;
	// Define the position bottom and left.
	posX = getRandomInt(0, 100);
	posY = getRandomInt(0, 30);
	// Define an optional animation delay.
	animDelay = getRandomInt(0, 10) * 100;
	cssString = 'width:'+ faceWidth +'px;' +
		'top:'+ posY +'%;' +
		'left:'+ posX +'%;' +
		'-webkit-animation-delay:'+ animDelay +'ms;' +
		'animation-delay:'+ animDelay +'ms;';
	// Create the thing.
	faceCont = document.createElement( 'span' );
	face = document.createElement( 'img' );
	face.setAttribute( 'src', svgUrl );
	face.style.opacity = faceOpacity;
	// Apply classes and styles.
	faceCont.classList.add('duplii-pour-'+ animationId);
	faceCont.style.cssText +=';'+ cssString;
	faceCont.appendChild(face);

	// Append it
	where.appendChild( faceCont );
	
	// We need to calculate how much time will the animation last (delay + duration). The duration needs to be in milliseconds, hence the * 1000.
	function getAnimationDuration( el ) {
		var elStyle = getComputedStyle(el);
		var animDuration = elStyle.getPropertyValue('animation-duration') || 
				elStyle.getPropertyValue('-webkit-animation-duration');
			animDuration = parseFloat(animDuration) * 1000;
			animDelay = elStyle.getPropertyValue('animation-delay') || 
					elStyle.getPropertyValue('-webkit-animation-delay');
			animDelay = parseFloat(animDelay) * 1000;
		return animDuration + animDelay;
	}
	
	// We then wait for the animation to end, and then we remove the element and fire the main function all over again.
	setTimeout(function () {
		faceCont.parentNode.removeChild(faceCont);
		pourDupliis( where, svgUrl );
	}, getAnimationDuration(faceCont));
}

// This is the function that will actually start pouring the faces.
function pourEm() {
	pourDupliis.stopPouring = false;
	var places = document.querySelectorAll('.duplii-faces-container');
	Array.prototype.forEach.call(places, function(place) {
		// We get the quantity from data attribute, ortherwise we'll set a default.
		var quantity = place.getAttribute('data-face-quantity') || 5;
		var svgUrl = place.getAttribute('data-face-svgurl');
		for (var i = 0; i < quantity; i++) {
			pourDupliis( place, svgUrl );
		}
	});
}