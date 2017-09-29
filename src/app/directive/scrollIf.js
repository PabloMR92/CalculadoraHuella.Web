export default scrollIfDirective;

/** @ngInject */
function scrollIfDirective($timeout) {
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            const scrollableWatcher = angular.element(attrs.scrollableWatcher);
            scope.$watch(attrs.scrollIf, value => {
                if (value) {
                    $timeout(() => {
                        const pos = angular.element(element).offset().top + scrollableWatcher.scrollTop() - (element.parent().outerHeight() + 150);
                        scrollableWatcher.animate({
                            scrollTop: pos
                        }, 300);
                    });
                }
            });
        }
    };
}