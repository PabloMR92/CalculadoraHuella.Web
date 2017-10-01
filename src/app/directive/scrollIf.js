export default scrollIfDirective;

/** @ngInject */
function scrollIfDirective($timeout) {
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            const scrollableWatcher = angular.element(attrs.scrollableWatcher);
            const offset = attrs.offset || 150;
            scope.$watch(attrs.scrollIf, value => {
                if (value) {
                    $timeout(() => {
                        const elementTop = angular.element(element).offset().top;
                        const scrollableWatcherTop = scrollableWatcher.scrollTop();
                        const parentHeight = (element.parent().outerHeight() + parseInt(offset, 10));
                        const pos = elementTop + scrollableWatcherTop - parentHeight;
                        scrollableWatcher.animate({
                            scrollTop: pos
                        }, 300);
                    });
                }
            });
        }
    };
}