//Initializing Angular Module and also adding "itemSwipe" and "ngAnimate" dependency to the Angular Module
var app = angular.module('MsgApp', ['itemSwipe', 'ngAnimate']);

app.controller('MsgController', function ($scope, APIService) {

	$scope.messageList = [];
	$scope.pageToken = '';

	//Function to get data call APIService and store in scope to use in view
    $scope.loadMore = function() {
        for (var i = 0; i < 1; i++) {
            APIService.getRecords($scope.pageToken).then(function(res){
                $scope.messageList = $scope.messageList.concat(res.messages);
                $scope.pageToken = res.pageToken;
            });
        }
    };
	$scope.loadMore();//calling load more function for getting more data from API

	//function called when swipe right on the message
    $scope.removeMsg = function(msg){
        $scope.messageList.splice($scope.messageList.indexOf(msg), 1);
    };

});

//Created Service for Calling external API which will be used in our Controller
app.factory('APIService',['$http',function($http){
    return {
        getRecords : function(pageToken){
            var promise = $http
                            .get('https://message-list.appspot.com/messages?pageToken='+pageToken)
                            .then(function(response) {
                                return response.data;
                            },
                                function (error) {
                                    console.log("Error: " + error);
                                }
                            );
            return promise;
        }
    }
}]);


//Created Custom Directive whihc will be used when we scroll the section
app.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];

        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});
