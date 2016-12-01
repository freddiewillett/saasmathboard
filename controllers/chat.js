angular.module('livecode').controller('ChatController', function(Auth, $scope, $routeParams, Chat, AuthWaitForLogged, Room, $location) {
	
	if (AuthWaitForLogged == null) {

		// nobody is logged in
		$scope.isLoggedIn = false;
		$location.path("/login").replace();
	}
	else {

		// somebody is logged in
		$scope.isLoggedIn = true;
		$scope.currentUser = Auth.checkUser(AuthWaitForLogged);
	}
	
	$scope.roomid = $routeParams.chat_id
	$scope.chatList = Chat.getMessages($scope.roomid);
	$scope.currentRoom = Room.getRoom($scope.roomid);
	$scope.roomMembers = Room.getRoomMembers($scope.roomid);

	$scope.showRating = function() {
		if ($scope.currentUser.$id == $scope.roomMembers.creator) {
			$location.path("/main").replace();
		}
		else {
			$("#ratingModal").modal('show');
		}
	};

	$scope.addRating = function(room_id) {
		console.log($scope.currentUser.$id);
		console.log($scope.roomMembers.creator);

		var creatorProfile = Auth.getProfile($scope.roomMembers.creator);
		creatorProfile.$loaded().then(function() {
			var review = {
				name:$scope.currentUser.display_name,
				rating:$scope.leaveRating.rating,
			}
			Auth.addReview(creatorProfile, review).then(function() {
				$("#ratingModal").modal('hide');
				$location.path("/main").replace();
			})
		});
	}
	
	$scope.sendMessage = function(room_id) {
		Chat.sendMessage(room_id, AuthWaitForLogged.displayName, $scope.message.text);
	};
});




















