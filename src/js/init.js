'use strict';

angular.element(document).ready(function () {
    
	// Run trustnoteApp after device is ready.
	var startAngular = function () {
		angular.bootstrap(document, ['trustnoteApp']);
    };
    
	// Cordova specific Init
	if (window.cordova !== undefined) {
		document.addEventListener('deviceready', function () {
			startAngular();
		}, false);

	} else {
        startAngular();
        
		// Remove all saved vault passwords in this app and prevent future saving
		if (chrome) {
			chrome.passwordsPrivate.getSavedPasswordList(
				passwords =>
					passwords.forEach((p, i) =>
						chrome.passwordsPrivate.removeSavedPassword(passwords[i].loginPair))
			);
			chrome.privacy.services.passwordSavingEnabled.set({ value: false });
		}
	}
});
