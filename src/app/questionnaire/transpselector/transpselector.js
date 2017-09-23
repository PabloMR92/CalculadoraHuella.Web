export const transpselector = {
    template: require('./transpselector.html'),
    bindings: {
        data: '=',
        addOther: '&',
        remove: '&'
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
                ]
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
                ]
            },
            {
                name: 'Colectivo o micro',
                factor: 36,
                comb: false
            },
            {
                name: 'Tren',
                factor: 3,
                comb: false
            },
            {
                name: 'Subte',
                factor: 2,
                comb: false
            },
            {
                name: 'Moto',
                factor: 45,
                comb: false
            },
            {
                name: 'Bicicleta o a pie',
                factor: 0,
                comb: false
            }
        ];

        function selectTransp(option) {
            vm.optionselectedtransp = option;
        }

        function selectComb(option) {
            vm.optionselectedcomb = option;
        }

        function compute() {
            const factor = vm.optionselectedtransp.factor !== null ? vm.optionselectedtransp.factor : vm.optionselectedcomb.factor;
            vm.data.consumo = factor * vm.recorrido;
        }

        angular.extend(vm, {
            traspOptions: traspOptions,
            selectTransp: selectTransp,
            selectComb: selectComb,
            compute: compute
        });
    }
};