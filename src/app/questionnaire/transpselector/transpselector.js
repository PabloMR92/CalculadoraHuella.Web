export const transpselector = {
    template: require('./transpselector.html'),
    bindings: {
        data: '=',
        addOther: '&',
        remove: '&',
        correct: '<'
    },
    controller: function() {
        const vm = this;

        const traspOptions = [{
                name: 'Auto',
                factor: null,
                combOptions: [{
                        name: 'Nafta',
                        factor: 114
                    },
                    {
                        name: 'Gasoil',
                        factor: 112
                    },
                    {
                        name: 'GNC',
                        factor: 88
                    }
                ],
                icon: 'icon-eco_auto'
            },
            {
                name: 'Camioneta',
                factor: null,
                combOptions: [{
                        name: 'Nafta',
                        factor: 158
                    },
                    {
                        name: 'Gasoil',
                        factor: 154
                    },
                    {
                        name: 'GNC',
                        factor: 124
                    }
                ],
                icon: 'icon-eco_colectivo'
            },
            {
                name: 'Colectivo o micro',
                factor: 36,
                comb: false,
                icon: 'icon-eco_micro'
            },
            {
                name: 'Tren',
                factor: 3,
                comb: false,
                icon: 'icon-eco_tren'
            },
            {
                name: 'Subte',
                factor: 2,
                comb: false,
                icon: 'icon-eco_subte'
            },
            {
                name: 'Moto',
                factor: 45,
                comb: false,
                icon: 'icon-eco_moto'
            },
            {
                name: 'Bicicleta o a pie',
                factor: 0,
                comb: false,
                icon: 'icon-eco_bici'
            }
        ];

        function selectNone() {
            vm.optionselectedtransp = null;
            vm.optionselectedcomb = null;
            vm.recorrido = null;
            vm.data.valido = true;
            vm.data.correcto = true;
            compute();
        }

        function selectTransp(option) {
            vm.optionselectedtransp = option;
            vm.data.valido = angular.isDefined(vm.optionselectedcomb) && (vm.recorrido);
            vm.data.correcto = true;
            compute();
        }

        function selectComb(option) {
            vm.optionselectedcomb = option;
            vm.data.valido = angular.isDefined(vm.optionselectedtransp) && angular.isDefined(vm.recorrido);
            vm.data.correcto = true;
            compute();
        }

        function compute() {
            if (vm.optionselectedtransp) {
                const factor = vm.optionselectedtransp.factor !== null ? vm.optionselectedtransp.factor : (vm.optionselectedcomb === null || angular.isUndefined(vm.optionselectedcomb) ? 0 : vm.optionselectedcomb.factor);
                vm.data.consumo = factor * vm.recorrido;
            } else {
                vm.data.consumo = 0;
            }
            vm.data.obj = {
                optionselectedtransp: vm.optionselectedtransp,
                optionselectedcomb: vm.optionselectedcomb,
                recorrido: vm.recorrido
            };
        }

        vm.$onInit = function() {
            if (vm.data.obj) {
                vm.optionselectedtransp = vm.data.obj.optionselectedtransp;
                vm.optionselectedcomb = vm.data.obj.optionselectedcomb;
                vm.recorrido = vm.data.obj.recorrido;
            }
        };

        angular.extend(vm, {
            traspOptions: traspOptions,
            selectTransp: selectTransp,
            selectComb: selectComb,
            compute: compute,
            selectNone: selectNone
        });
    }
};