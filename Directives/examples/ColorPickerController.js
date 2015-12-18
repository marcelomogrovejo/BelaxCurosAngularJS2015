var app = angular.module('myApp', []);

app.controller('ColorPickerController', function($scope) {
  $scope.foreground = 'f6f6f6';
  $scope.background = '5177ee';
});

app.directive('colorPicker', function() {
  var tpl = "<div>" +
            "   <label>R: </label>" +
            "   <input type='text' name='R' size='3' />" +
            "   <label>G: </label>" +
            "   <input type='text' name='G' size='3' />" +
            "   <label>B: </label>" +
            "   <input type='text' name='B' size='3' />" +
            "</div>";

  return {
    restrict: 'E',
    template: tpl,
    require: 'ngModel',
    replace: true,
    link: function(scope, element, attrs, ngModelCtrl) {
      //Gets input elements
      var inputR = element[0].children[1];
      var inputG = element[0].children[3];
      var inputB = element[0].children[5];

      /**
       * STEP 1: Gets values from model and updates the view values.
       *         Reading $modelValue and returning $viewValue
       */
      //Formats hex to rgb
      ngModelCtrl.$formatters.push(function(modelValue) {
        return {
          r: modelValue.substring(0,2),
          g: modelValue.substring(2,4),
          b: modelValue.substring(4,6)
        };
      });

      //Renders dom elements with values from formatter
      ngModelCtrl.$render = function() {
        inputR.value = ngModelCtrl.$viewValue.r;
        inputG.value = ngModelCtrl.$viewValue.g;
        inputB.value = ngModelCtrl.$viewValue.b;
      };

      /**
       * STEP 2: Gets values from view and updates the model values
       *         Reading $viewValue and returning $modelValue
       */
       //On input events
       angular.element(inputR).bind("change", updateViewValue);
       angular.element(inputG).bind("change", updateViewValue);
       angular.element(inputB).bind("change", updateViewValue);

       function updateViewValue() {
         ngModelCtrl.$setViewValue({
           r: inputR.value,
           g: inputG.value,
           b: inputB.value
         });
       }

       //Parses
       ngModelCtrl.$parsers.push(function(viewValue) {
         return viewValue.r + viewValue.g + viewValue.b;
       });
    }
  };
});
