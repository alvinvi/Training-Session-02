(function () {
    var tokenUrl = "http://localhost:54477/token";

    var app = angular.module("app");
    app.controller("LoginCtrl", ['$scope', '$http', 'tokenService',
        function ($scope, $http, tokenService) {
            $scope.loginData = {
                username: "alvin@sample.com",
                password: "P@ssw0rd_100"
            };
            $scope.hasUserLoggedIn = tokenService.hasUserLoggedIn();

            $scope.logIn = function () {
                var loginData = $scope.loginData;
                var config = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };
                var formurlencoded = "grant_type=password&username=" + encodeURIComponent(loginData.username) + "&password=" + encodeURIComponent(loginData.password);

                $http.post(tokenUrl, formurlencoded, config)
                    .then(function success(response) {
                        tokenService.setToken(response.data.access_token);
                        BootstrapDialog.show({ title: "Login success", message: "Welcome, " + loginData.username, type: BootstrapDialog.TYPE_SUCCESS });
                        $scope.hasUserLoggedIn = true;
                    }, function error(response) {
                        BootstrapDialog.show({ title: "Error", message: "Unable to login.", type: BootstrapDialog.TYPE_DANGER });
                    });
            };

            $scope.logOut = function () {
                tokenService.removeToken();
                $scope.hasUserLoggedIn = false;
            };

        }
    ]);
}());