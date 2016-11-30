angular.module('livecode').controller('ChatController', function($scope, $routeParams, Chat, AuthWaitForLogged) {
	
	console.log($routeParams.chat_id)
	$scope.roomid = $routeParams.chat_id
	$scope.chatList = Chat.getMessages($scope.roomid);
	console.log($scope.roomid);
	
	$scope.sendMessage = function(room_id) {
		Chat.sendMessage(room_id, AuthWaitForLogged.uid, $scope.message.text);
	};
});




















