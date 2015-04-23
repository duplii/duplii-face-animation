var svgNS = 'http://www.w3.org/2000/svg',
	xlinkNS = 'http://www.w3.org/1999/xlink';

function pourDupliis( where, rgbColor, svgUrl ) {
	if ( pourDupliis.stopPouring ) {
		return;
	}
	
	// Helper function to get random numbers.
	function getRandomInt( min, max ) {
	    return Math.floor( Math.random() * (max - min + 1) ) + min;
	}
	// Define all variables.
	var face, faceWidth, alphaChannel, color, cssString, animationId, posX, posY, animDelay;
	// Define the diameter of the bubble.
	faceWidth = getRandomInt(10, 40);
	// Define the color. First we get the alpha channel and then create the rgba value. Rgba is used instead of solid colors so that we can create a nice overlapping effect without touching opacity. Opacity is in fact used in the animation for bursting the bubble.
	alphaChannel = getRandomInt(2, 6) / 10;
	color = rgbColor + ', ' + alphaChannel;
	// Define the position bottom and left.
	posX = getRandomInt(0, 100);
	posY = getRandomInt(0, 30);
	// Define an optional animation delay.
	animDelay = getRandomInt(0, 10) * 100;
	cssString = 'width:'+ faceWidth +'px;' +
		'height:'+ faceWidth +'px;' +
		'top:'+ posY +'%;' +
		'left:'+ posX +'%;' +
		'color:rgba('+ color +');' +
		'-webkit-animation-delay:'+ animDelay +'ms;' +
		'animation-delay:'+ animDelay +'ms;';
	// Decide what animation to apply.
	animationId = getRandomInt(1,3);
	// Create the thing.
	face = document.createElementNS( svgNS, 'svg' );
//	face.setAttribute('xmlns', svgNS);
//	face.setAttribute('xmlns:xlink', xlinkNS);
	face.setAttributeNS(svgNS, 'viewBox', '0 0 31 31');
	face.setAttributeNS(svgNS, 'preserveAspectRatio', 'xMinYMax meet');
	where.appendChild( face );
	useEl = document.createElementNS(svgNS, 'use');
	useEl.setAttributeNS(xlinkNS, 'xlink:href', svgUrl);
	useEl.setAttributeNS(svgNS, 'viewBox', '0 0 31 31');
	face.appendChild(useEl);
//	face.setAttribute( 'type', 'image/svg+xml' );
//	face.setAttribute( 'data', svgUrl );
	// Apply classes and styles.
	face.classList.add('duplii-pour-'+ animationId);
	face.style.cssText +=';'+ cssString;

	
	
	

	// Append it
//	where.appendChild( face );
//	face.addEventListener('load', function() {
//		svgDoc = face.contentDocument;
//		svgThing = svgDoc.getElementById('duplii-face');
//		svgThing.style.fill = 'rgba('+ color +')';
//	});
	
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
		face.parentNode.removeChild(face);
		pourDupliis( where, rgbColor, svgUrl );
	}, getAnimationDuration(face));
}

// This is the function that will actually fire the bubbles. Bubbles will be created in each .bubble-container element and will be optionally configurable with data-bubble-rgbcolor and data-bubble-quantity. Very flexible.
function pourEm() {
	pourDupliis.stopPouring = false;
	var places = document.querySelectorAll('.duplii-faces-container');
	Array.prototype.forEach.call(places, function(place) {
		// We set the color variable default, if none is specified.
		var rgbColor = place.getAttribute('data-face-rgbcolor') || '255, 130, 76';
		// We get the quantity from data attribute, ortherwise we'll set a default.
		var quantity = place.getAttribute('data-face-quantity') || 5;
		var svgUrl = place.getAttribute('data-face-svgurl');
		for (var i = 0; i < quantity; i++) {
			pourDupliis( place, rgbColor, svgUrl );
		}
	});
}