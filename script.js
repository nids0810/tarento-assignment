(function () {
    var app = angular.module('myApp', []);
    app.directive('flexi', function () {
        return {
            restrict: 'E',
            scope: {
                config: '=',
                onSubmit: '&'
            },
            templateUrl: 'items.html'
        };
    });

    app.controller('flexiController', ['$scope', '$http', function ($scope, $http) {

        $http.get('data.json').then(function (flextData) {
            $scope.flexiConfig = flextData.data.items;
        });

        $scope.onFlexiSubmit = function () {
            var result = {};
            document.getElementById('response').style.display = 'block';

            for(var item of $scope.flexiConfig) {
                if(item.type === 'TextField') {
                    result[item.name] = document.getElementsByName(item.name)[0].value;
                } else if(item.type === 'DropDown') {
                    var dropdown = document.getElementsByName(item.name)[0];
                    result[item.name] = dropdown.options[dropdown.selectedIndex].value;
                }
            }
            $scope.response = result;
        };

    }]);
})();