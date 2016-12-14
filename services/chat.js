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
			var messagesRef = chatRef.child(room_id);
			return $firebaseArray(messagesRef);
		},
		sendMessage: function(room_id, user_id, message) {
			var messagesRef = chatRef.child(room_id);
			var theMessages = $firebaseArray(messagesRef);
				theMessages.$add({
					user_id: user_id,
					message: message,
				})
		},
		leaveMessage: function(room_id, user_id, message) {
			var messagesRef = chatRef.child(room_id);
			var theMessages = $firebaseArray(messagesRef);
				theMessages.$add({
					user_id: user_id,
					message: "has left!",
				})
		},
	};
	return Chat;
});