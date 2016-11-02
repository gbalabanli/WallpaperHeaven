/**
 * TODO
 * 
 * author SNM
 * 
 * License MIT
 */

/**
 * 
 * @constructor
 */
function Transition() {
}


Transition.prototype.initTransition = function() {
	return PhoneGap.exec(null, null, 'TransitionPlugin', 'initTransitionView', []);
}

/**
 * Show loading view.
 */
Transition.prototype.showLoadingView = function(animation) {
	return PhoneGap.exec(null, null, 'TransitionPlugin', 'showLoadingView', [animation]);
};

/**
 * Hide loading view.
 */
Transition.prototype.hideLoadingView = function() {
    return PhoneGap.exec(null, null, 'TransitionPlugin', 'hideLoadingView', []);
};


PhoneGap.addConstructor(function() {
	//Register the javascript plugin with PhoneGap
	PhoneGap.addPlugin('transition', new Transition());

	//Register the native class of plugin with PhoneGap
	PluginManager.addService("TransitionPlugin", "de.sandstein.phonegap.plugin.transition.TransitionPlugin");
});

