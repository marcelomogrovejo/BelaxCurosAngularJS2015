app.directive('ngLength', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      console.log('element: ');
      console.log(element);
      angular.element(element[0]).bind("change", validate);

      function validate() {
        console.log('viewValue: ' + viewValue);
      }
      console.log('kk: ' + ngModelCtrl.$viewValue.property);
      ngModelCtrl.$setValidity('error_name', true);
    }
  };
});
