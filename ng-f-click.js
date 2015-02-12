angular.module('ng-f-click', ['ng'])
.directive('fClick', function($exceptionHandler, $parse, $timeout) {
  return {
    compile: function($element, attr) {
      var fn = $parse(attr.fClick);
      return function(scope, element, attr) {
        element.on('click', function(event) {
          var parentingLevel = attr.parentingLevel || 0;
          var targetScope = scope;

          // Search for target scope
          while (parentingLevel > 0) {
            if (targetScope.$parent) {
              targetScope = targetScope.$parent;
            }
            parentingLevel--;
          }

          try {
            fn(scope, {$event:event});
          } catch (e) {
            $exceptionHandler(e);
          } finally {
            try {
              targetScope.$digest();
            } catch (e) {
              $exceptionHandler(e);
            } finally {
              setTimeout(function() {
                scope.$apply();
              }, 10);
            }
          }
        });
      };
    }
  };
});
