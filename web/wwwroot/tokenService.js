
(function () {
    var app = angular.module("app");
    app.factory("tokenService", function () {
        var self = this;

        var setToken = function (accessToken) {
            sessionStorage.setItem("accessToken", accessToken);
        };

        var getToken = function () {
            return sessionStorage.getItem("accessToken");
        };

        var removeToken = function () {
            sessionStorage.removeItem("accessToken");
        };

        var hasUserLoggedIn = function () {
            var accessToken = getToken();
            if (typeof (accessToken) == 'undefined' || accessToken == null) {
                return false;
            }
            return true;
        };

        return {
            setToken: setToken,
            getToken: getToken,
            removeToken: removeToken,
            hasUserLoggedIn: hasUserLoggedIn
        };
    });
}());