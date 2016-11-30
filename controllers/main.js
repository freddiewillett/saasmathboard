angular.module('livecode').controller('MainController', function($scope, Room, AuthWaitForLogged, Auth, $location) {
	
	if (AuthWaitForLogged == null) {

		// nobody is logged in
		$scope.isLoggedIn = false;
	}
	else {

		// somebody is logged in
		$scope.isLoggedIn = true;
		$scope.currentUser = Auth.checkUser(AuthWaitForLogged);
	}

	$scope.roomsList = Room.getRooms();

	$scope.showAddRoom = function() {
		$("#addRoomModal").modal('show');
	};

	$scope.addRoom = function(newRoom) {
		newRoom.occupied = false;
		Room.addRoom(newRoom).then(function(theNewRoom) {
			Room.addCreatorToRoom(theNewRoom.key, AuthWaitForLogged.uid);
			$("#addRoomModal").modal('hide');
		});
	};
	$scope.addJoinerToRoom = function(room_id) {
		Room.addJoinerToRoom(room_id, AuthWaitForLogged.uid);
	};
	$scope.completeRoom = function(room_id) {
		Room.removeTodo(room_id);
	};
});
