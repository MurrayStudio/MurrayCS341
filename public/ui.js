/**
 * ui.js
 *
 * Defines functionality for instrumenting the user-interface.
 *
 */

var librs = librs || {};
librs.ui = {};
librs.ui = function() {

	var fetch = function() {
		var year = document.getElementById('year');
		var yearValue = year.value;
		console.log(yearValue);
		vizController(yearValue);
	};

	var toggle = function() {

		console.log('About!');

		var text = document.getElementById('about');

		if (hasClass(text, 'show')) {
			librs.utility.removeClass(text, 'show');
		} else {
			librs.utility.addClass(text, 'show');
		}

	};

	var initialize = function() {

		console.log('Initialize!');
		fetch();

		// Grab the 'About' button element, identified by the
		// 'about-btn' id.
		var button = document.getElementById('about-btn');

		//Grab 'Submit' button element
		var submitBtn = document.getElementById('submit-btn');

		// From this point forward, when the button is clicked, the
		// toggle function shall be invoked.
		button.onclick = toggle;
		//ditto for submit button
		submitBtn.onclick = fetch;

	};

	// When this file is included at the bottom of the page,
	// the js is loaded after the DOM is loaded.  It is a
	// good time to initialize the UI elements in the page.
	initialize();

};
// end module

// Invoke module. After invocation, the module’s code is now added to
// the namespace and is accessible through the librs object.
librs.ui(); 