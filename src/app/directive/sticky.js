export default stickyDirective;

/** @ngInject */
function stickyDirective($compile) {
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            const stickyPusher = angular.element('<div class="sticky-pusher"></div>');
            stickyPusher.insertBefore(element);
            $compile(stickyPusher)(scope);

            const origOffsetY = element.offset().top;

            if (attrs.scrollableWatcher) {
                const scrollableWatcher = angular.element(attrs.scrollableWatcher);

                scrollableWatcher.bind('scroll', () => {
                    const scrollableWatcherOffsetY = scrollableWatcher.scrollTop();
                    if (scrollableWatcherOffsetY > origOffsetY) {
                        element.addClass('fixed');
                        element.css({
                            top: scrollableWatcher.scrollTop() + 'px'
                        });
                        stickyPusher.css({
                            height: element.outerHeight() + 'px'
                        });
                    } else {
                        stickyPusher.css({
                            height: '0px'
                        });

                        element.removeClass('fixed');
                    }
                });
            }
        }
    };
}