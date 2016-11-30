angular.module('livecode').factory('Auth', function($firebaseAuth, $firebaseObject) {

	var auth = $firebaseAuth();
	var loggedIn = false;

	auth.$onAuthStateChanged(function(firebaseUser) {
		if (firebaseUser) {
			Auth.user = firebaseUser;
		} else {
			console.log("Not signed in");
		}
	});

	var Auth = {
		user: {},

		loginWithGoogle: function() {
			return auth.$signInWithPopup("google");
		},
		loginWithTwitter: function() {
			return auth.$signInWithPopup("twitter");
			console.log()
		},

		isLoggedIn: function() {
			return Auth.user != {};
		},

		getAuth: function() {
			return auth;
		},

		checkUser: function(user) {
			var ref = firebase.database().ref().child('profiles').child(user.uid);
			var theUser = $firebaseObject(ref);
			theUser.display_name = user.displayName;
			theUser.email = user.email;
			theUser.$save();

			return theUser;
		},

		logout: function() {
			return auth.$signOut();
		},
	};

	return Auth;
});