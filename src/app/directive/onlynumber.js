export default onlyNumber;

/** @ngInject */
function onlyNumber() {
    return {
        restrict: 'A',
        link: (scope, element) => {
            element.on('keypress', event => {
                if (!isIntegerChar()) {
                    event.preventDefault();
                }

                function isIntegerChar() {
                    return /[0-9]|-/.test(
                        String.fromCharCode(event.which));
                }
            });
        }
    };
}