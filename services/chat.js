angular.module('livecode').factory('Chat', function($firebaseObject, $firebaseArray) {

	var chatRef = firebase.database().ref().child("messages");

	var Chat = {
		messages: [],

		// addRoom: function(newRoom) {
		// 	return Room.rooms.$add(newRoom);
		// },
		// getRooms: function() {
		// 	return Room.rooms;
		// },
		getMessages: function(room_id) {
			console.log(room_id);
			var messagesRef = chatRef.child(room_id);
			return $firebaseArray(messagesRef);
		},
		sendMessage: function(room_id, displayName, message) {
			var messagesRef = chatRef.child(room_id);
			var theMessages = $firebaseArray(messagesRef);
				theMessages.$add({
					user_id: displayName,
					message: message,
				})
		},
		// removeRoom: function(room_id) {
		// 	var individualRoomRef = roomRef.child(room_id);
		// 	var theRoom = $firebaseObject(individualRoomRef);
		// 	return theRoom.$remove();
		// },
		// addCreatorToRoom: function(room_id, user_id) {
		// 	var individualRoomMemberRef = roomMembersRef.child(room_id);
		// 	var theRoomMembers = $firebaseObject(individualRoomMemberRef);
		// 		theRoomMembers.creator = user_id;
		// 		theRoomMembers.$save();
		// 	return theRoomMembers;
		// },
		// addJoinerToRoom: function(room_id, user_id) {
		// 	var individualRoomMemberRef = roomMembersRef.child(room_id);
		// 	var theRoomMembers = $firebaseObject(individualRoomMemberRef);
		// 		theRoomMembers.$loaded().then (function(){
		// 			theRoomMembers.joiner = user_id;
		// 			theRoomMembers.$save();
		// 	})
			
		// 	var individualRoomRef = roomRef.child(room_id);
		// 	var theRoom = $firebaseObject(individualRoomRef);
		// 		theRoom.$loaded().then (function(){
		// 			theRoom.occupied = true;
		// 			theRoom.$save();
		// 	})
			
		// 	return theRoomMembers;
		// }
	};

	//Chat.messages = $firebaseArray(chatRef);

	return Chat;
});