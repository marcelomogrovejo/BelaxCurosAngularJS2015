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

//      var bkgInR = element[0].children[1];
//      var bkgInG = element[0].children[3];
//      var bkgInB = element[0].children[5];

      /**
       * STEP 1: Gets values from model and updates the view values.
       *         Reading $modelValue and returning $viewValue
       */
      //Formats hex to rgb
      ngModelCtrl.$formatters.push(function(modelValue) {
        return {
          r: parseInt(modelValue.substring(0,2),16),
          g: parseInt(modelValue.substring(2,4),16),
          b: parseInt(modelValue.substring(4,6),16)
        };
      });

      //Renders dom elements with values from formatter
      ngModelCtrl.$render = function() {
        inputR.value = ngModelCtrl.$viewValue.r;
        inputG.value = ngModelCtrl.$viewValue.g;
        inputB.value = ngModelCtrl.$viewValue.b;

//        bkgInR.value = ngModelCtrl.$viewValue.r;
//        bkgInG.value = ngModelCtrl.$viewValue.g;
//        bkgInB.value = ngModelCtrl.$viewValue.b;
      };

      /**
       * STEP 2: Gets values from view and updates the model values
       *         Reading $viewValue and returning $modelValue
       */
       //On input events
       angular.element(inputR).bind("change", updateViewValue);
       angular.element(inputG).bind("change", updateViewValue);
       angular.element(inputB).bind("change", updateViewValue);

//       angular.element(bkgInR).bind("change", updateViewValue);
//       angular.element(bkgInG).bind("change", updateViewValue);
//       angular.element(bkgInB).bind("change", updateViewValue);

       function updateViewValue() {
         console.log('color: #' + rgb2HexColor(inputR.value, inputG.value, inputB.value));
//         console.log('background: ' + rgb2HexColor(bkgInR.value, bkgInG.value, bkgInB.value));
         ngModelCtrl.$setViewValue({
           foreground: rgb2HexColor(inputR.value, inputG.value, inputB.value),
//           background: rgb2HexColor(inputR.value, inputG.value, inputB.value)
//            foreground: '0f445e',
            background: '727272'
         });
       }

       // Convert rgb to hex color
       function rgb2HexColor(r, g, b) {
         console.log('rgb2HexColor: r->' + r + ', g->' + g + ', b->' + b);
         return byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
       }
       function byte2Hex(n) {
         var hexString = "0123456789ABCDEF";
         return String(hexString.substr((n >> 4) & 0x0F,1)) + hexString.substr(n & 0x0F,1);
       }

       //Parses
       ngModelCtrl.$parsers.push(function(viewValue) {
         scope.foreground = viewValue.foreground;
         scope.background = viewValue.background;
       });
    }
  };
});
