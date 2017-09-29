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

        function selectNone() {
            vm.optionselectedtransp = null;
            vm.recorrido = null;
            compute();
        }

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

            vm.data.obj = {
                optionselectedtransp: vm.optionselectedtransp,
                recorrido: vm.recorrido,
                escalas: vm.escalas
            };
        }

        vm.$onInit = function() {
            if (vm.data.obj) {
                vm.optionselectedtransp = vm.data.obj.optionselectedtransp;
                vm.recorrido = vm.data.obj.recorrido;
                vm.escalas = vm.data.obj.escalas;
            }
        };

        angular.extend(vm, {
            traspOptions: traspOptions,
            selectTransp: selectTransp,
            compute: compute,
            selectNone: selectNone
        });
    }
};