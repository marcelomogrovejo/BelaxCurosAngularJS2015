var app = angular.module('myApp', []);

app.controller('ColorPickerController', function($scope) {
  $scope.foreground = 'f6f6f6';
  $scope.background = '5177ef';
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
      console.log(element);
      var frgInR = element[0].children[1];
      var frgInG = element[0].children[3];
      var frgInB = element[0].children[5];

      var bkgInR = element[0].children[1];
      var bkgInG = element[0].children[3];
      var bkgInB = element[0].children[5];

      /**
       * STEP 1: Gets values from model and updates the view values.
       *         Reading $modelValue and returning $viewValue
       */
      //Formats hex to rgb
      ngModelCtrl.$formatters.push(function(modelValue) {
        var red = parseInt(modelValue.substring(0,2),16);
        var green = parseInt(modelValue.substring(2,4),16);
        var blue = parseInt(modelValue.substring(4,6),16);

        return {
          r: red,
          g: green,
          b: blue
        };
      });

      //Renders dom elements with values from formatter
      ngModelCtrl.$render = function() {
        frgInR.value = ngModelCtrl.$viewValue.r;
        frgInG.value = ngModelCtrl.$viewValue.g;
        frgInB.value = ngModelCtrl.$viewValue.b;

        bkgInR.value = ngModelCtrl.$viewValue.r;
        bkgInG.value = ngModelCtrl.$viewValue.g;
        bkgInB.value = ngModelCtrl.$viewValue.b;
      };

      /**
       * STEP 2: Gets values from view and updates the model values
       *         Reading $viewValue and returning $modelValue
       */
       //On input events
//       angular.element(frgInR).bind("keypress", updateViewValue);
//       angular.element(frgInG).bind("keypress", updateViewValue);
//       angular.element(frgInB).bind("keypress", updateViewValue);
       angular.element(frgInR).bind("change", updateViewValue);
       angular.element(frgInG).bind("change", updateViewValue);
       angular.element(frgInB).bind("change", updateViewValue);

//       angular.element(bkgInR).bind("keypress", updateViewValue);
//       angular.element(bkgInG).bind("keypress", updateViewValue);
//       angular.element(bkgInB).bind("keypress", updateViewValue);
       angular.element(bkgInR).bind("change", updateViewValue);
       angular.element(bkgInG).bind("change", updateViewValue);
       angular.element(bkgInB).bind("change", updateViewValue);

       function updateViewValue() {
         console.log('foreground: ' + rgbToHex(frgInR.value, frgInG.value, frgInB.value));
         console.log('background: ' + rgbToHex(bkgInR.value, bkgInG.value, bkgInB.value));
         ngModelCtrl.$setViewValue({
//           foreground: rgbToHex(frgInR.value, frgInG.value, frgInB.value),
//           background: rgbToHex(bkgInR.value, bkgInG.value, bkgInB.value)
            foreground: 'ffffff',
            background: '0f445e'
         })
       }

       function rgbToHex(r, g, b) {
         var hex = componentToHex(r) + componentToHex(g) + componentToHex(b);
         console.log('hex: ' + hex);
         return hex;
       }

       function componentToHex(c) {
         var hex = c.toString(16);
         console.log('component: ' + hex);
         console.log('return: ' + hex.length == 1? "0" + hex : hex);
         return hex.length === 1? "0" + hex : hex;
       }

       //Parses
//       console.log(ngModelCtrl.$viewValue);
       ngModelCtrl.$parsers.push(function(viewValue) {
         var foreground = viewValue.foreground;
         var background = viewValue.background;
         return background;
       });

    }
  };
});
