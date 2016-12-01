angular.module('livecode').factory('Room', function($firebaseArray, $firebaseObject) {
	
	// @NOTE: this is the ref that you need to set to point at the list
	//		  of todos. Please see the instructions on the page for the location.
	var roomRef = firebase.database().ref().child("rooms");
	var roomMembersRef = firebase.database().ref().child("roomMembers");

	var Room = {
		rooms: [],

		addRoom: function(newRoom) {
			return Room.rooms.$add(newRoom);
		},
		getRooms: function() {
			return Room.rooms;
		},
		getRoom: function(room_id) {
			var individualRoomRef = roomRef.child(room_id);
			return $firebaseObject(individualRoomRef);
		},
		getRoomMembers: function(room_id) {
			var individualRoomMembersRef = roomMembersRef.child(room_id);
			return $firebaseObject(individualRoomMembersRef);
		},
		removeRoom: function(room_id) {
			var individualRoomRef = roomRef.child(room_id);
			var theRoom = $firebaseObject(individualRoomRef);
			return theRoom.$remove();
		},
		addCreatorToRoom: function(room_id, user_id) {
			var individualRoomMemberRef = roomMembersRef.child(room_id);
			var theRoomMembers = $firebaseObject(individualRoomMemberRef);
				theRoomMembers.creator = user_id;
				theRoomMembers.$save();
			return theRoomMembers;
		},
		addJoinerToRoom: function(room_id, user_id) {
			var individualRoomMemberRef = roomMembersRef.child(room_id);
			var theRoomMembers = $firebaseObject(individualRoomMemberRef);
				theRoomMembers.$loaded().then (function(){
					theRoomMembers.joiner = user_id;
					theRoomMembers.$save();
			})
			
			var individualRoomRef = roomRef.child(room_id);
			var theRoom = $firebaseObject(individualRoomRef);
				theRoom.$loaded().then (function(){
					theRoom.occupied = true;
					theRoom.$save();
			})
			
			return theRoomMembers;
		}
	};

	Room.rooms = $firebaseArray(roomRef);

	return Room;
});