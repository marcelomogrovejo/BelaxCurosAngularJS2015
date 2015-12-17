var app = angular.module('angularContacts', [])

.run(["$rootScope", function ($rootScope) {
    $rootScope.uid = 1;
}]);


app.controller('ContactController', function ($scope, $rootScope) {

    $scope.contacts = [];
    $scope.newcontact = {};

    $scope.saveContact = function() {
        if($scope.newcontact.id == null) {
            $scope.newcontact.id = $rootScope.uid++;
            $scope.contacts.push($scope.newcontact);
        } else {
            angular.forEach($scope.contacts, function (value) {
                if (value.id == $scope.newcontact.id) {
                    var i = $scope.contacts.indexOf(value);
                    $scope.contacts[i] = $scope.newcontact;
                }
                return;
            });
        }
        $scope.newcontact = {};
    }

    $scope.delete = function(id) {
        angular.forEach($scope.contacts, function (value) {
            if (value.id == id) {
                var i = $scope.contacts.indexOf(value);
                $scope.contacts.splice(i,1);
                $scope.newcontact = {};
            return;
            }
        });
    }

    $scope.edit = function(id) {
        angular.forEach($scope.contacts, function (value) {
            if (value.id == id) {
                $scope.newcontact = angular.copy(value);
            }
            return;
        });
    }
});