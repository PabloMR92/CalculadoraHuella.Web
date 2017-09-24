export const avionselector = {
    template: require('./avionselector.html'),
    bindings: {
        data: '=',
        addOther: '&',
        remove: '&'
    },
    controller: function() {
        const vm = this;

        const traspOptions = [{
                name: 'Cabotaje',
                factor: 0.001,
                factorEscalas: 18
            },
            {
                name: 'Internacional',
                factor: 0.182,
                factorEscalas: 32
            }
        ];

        function selectTransp(option) {
            vm.optionselectedtransp = option;
            compute();
        }

        function compute() {
            if (vm.optionselectedtransp) {
                vm.data.consumo = (vm.optionselectedtransp.factor * vm.recorrido) + (vm.escalas * vm.optionselectedtransp.factorEscalas);
            } else {
                vm.data.consumo = 0;
            }
        }

        angular.extend(vm, {
            traspOptions: traspOptions,
            selectTransp: selectTransp,
            compute: compute
        });
    }
};