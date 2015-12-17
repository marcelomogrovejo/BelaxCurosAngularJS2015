var app = angular.module(“testFilter”, []);

app.filter("ordinal", function() {
    return function (number) {
        var result = number,
            lastDigit;

        if (!isNaN(number) && number > 0) {
            lastDigit = number % 10;

            switch (lastDigit) {
                case 1:
                    result = number + "st";
                    break;
                case 2:
                    result = number + "nd";
                    break;
                case 3:
                    result = number + "rd";
                    break;
                default:
                    result = number + "th";
            }
        }

        return result;
    }
});
