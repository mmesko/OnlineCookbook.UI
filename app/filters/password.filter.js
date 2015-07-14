(function (angular) {


    // pretvara string u password string, npr someName u ********
    angular.module("cookbookFilters", []).filter('password', function () {

        return function (input) {

            var string = toString(input);
            var stringLength = string.length;
            var passwordString = "";

            for (var i = 0; i < stringLength; i++) {
                passwordString += "*";
            }

            return passwordString;
        };
    });

})(angular)