export const resultController = result;

/** @ngInject */
function result(result) {
    const vm = this;
    vm.result = result;
}