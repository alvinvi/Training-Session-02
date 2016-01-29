(function () {
    var tokenUrl = "http://localhost:54477/token";

    var app = angular.module("app");
    app.controller("LoginCtrl", ['$scope', '$http',
        function ($scope, $http) {
            $scope.loginData = {
                username: "alvin@sample.com",
                password: "P@ssw0rd_100"
            };

            $scope.login = function () {
                var loginData = $scope.loginData;
                var config = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };
                var formurlencoded = "grant_type=password&username=" + encodeURIComponent(loginData.username) + "&password=" + encodeURIComponent(loginData.password);

                $http.post(tokenUrl, formurlencoded, config)
                    .then(function success(response) {
                        sessionStorage.setItem("accessToken", response.data.access_token);
                        BootstrapDialog.show({ title: "Login success", message: "Welcome, " + loginData.username, type: BootstrapDialog.TYPE_SUCCESS });
                    }, function error(response) {
                        BootstrapDialog.show({ title: "Error", message: "Unable to login.", type: BootstrapDialog.TYPE_DANGER });
                    });
            };

            $scope.hasUserLoggedIn = function () {
                var accessToken = sessionStorage.getItem("accessToken");
                if (typeof (accessToken) == 'undefined' || accessToken == null) {
                    return false;
                }
                return true;
            }

        }
    ]);
}());