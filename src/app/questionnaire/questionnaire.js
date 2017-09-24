export const questionnaire = {
    template: require('./questionnaire.html'),
    controller: function($log, $localStorage) {
        const vm = this;
        angular.extend(vm, {
            activeHome: false,
            activeTransp: false,
            activeResid: false
        });
        let inviewpartHome = false;
        let inviewpartTransp = false;
        let inviewpartResid = false;

        vm.homeInView = (index, inview) => {
            inviewpartHome = inview;
            setInviewp();
        };

        vm.transpInView = (index, inview) => {
            inviewpartTransp = inview;
            setInviewp();
        };

        vm.residInView = (index, inview) => {
            inviewpartResid = inview;
            setInviewp();
        };

        function setInviewp() {
            if (inviewpartHome) {
                vm.activeHome = true;
                vm.activeTransp = false;
                vm.activeResid = false;
            }
            if (inviewpartTransp) {
                vm.activeHome = false;
                vm.activeTransp = true;
                vm.activeResid = false;
            }
            if (inviewpartResid) {
                vm.activeHome = false;
                vm.activeTransp = false;
                vm.activeResid = true;
            }
        }

        vm.gasBimestres = [{
            consumo: null
        }, {
            consumo: null
        }, {
            consumo: null
        }, {
            consumo: null
        }, {
            consumo: null
        }, {
            consumo: null
        }];
        vm.electricidadBimestres = [{
            consumo: null
        }, {
            consumo: null
        }, {
            consumo: null
        }, {
            consumo: null
        }, {
            consumo: null
        }, {
            consumo: null
        }];
        vm.aguaBimestres = [{
            consumo: null
        }, {
            consumo: null
        }, {
            consumo: null
        }, {
            consumo: null
        }, {
            consumo: null
        }, {
            consumo: null
        }];

        vm.transpCommuting = [];

        vm.addCommutingTransp = selected => {
            vm.transpCommuting.push({
                consumo: 0,
                valido: false,
                showOther: true
            });
            if (selected) {
                selected.showOther = false;
                $log.info(selected.consumo);
            }
        };

        vm.removeCommutingTransp = toRemove => {
            vm.transpCommuting = vm.transpCommuting.filter(item => {
                return item !== toRemove;
            });
        };

        vm.addCommutingTransp();

        vm.transpActividades = [];

        vm.addActividadTransp = selected => {
            vm.transpActividades.push({
                consumo: 0,
                valido: false,
                showOther: true
            });
            if (selected) {
                selected.showOther = false;
                $log.info(selected.consumo);
            }
        };

        vm.removeActividadTransp = toRemove => {
            vm.transpActividades = vm.transpActividades.filter(item => {
                return item !== toRemove;
            });
        };

        vm.addActividadTransp();

        vm.transpViajes = [];

        vm.addViajeTransp = selected => {
            vm.transpViajes.push({
                consumo: 0,
                valido: false,
                showOther: true
            });
            if (selected) {
                selected.showOther = false;
                $log.info(selected.consumo);
            }
        };

        vm.removeViajeTransp = toRemove => {
            vm.transpViajes = vm.transpViajes.filter(item => {
                return item !== toRemove;
            });
        };

        vm.addViajeTransp();

        vm.transpVuelos = [];

        vm.addViajeVuelo = selected => {
            vm.transpVuelos.push({
                consumo: 0,
                valido: false,
                showOther: true
            });
            if (selected) {
                selected.showOther = false;
                $log.info(selected.consumo);
            }
        };

        vm.removeViajeVuelo = toRemove => {
            vm.transpVuelos = vm.transpVuelos.filter(item => {
                return item !== toRemove;
            });
        };

        vm.addViajeVuelo();

        vm.calcular = () => {
            const habitantes = vm.habitantes ? vm.habitantes : 0;

            const totalCommuting = vm.transpCommuting.reduce((valorAnterior, valorActual) => {
                return valorAnterior + (valorActual.consumo ? valorActual.consumo : 0);
            }, 0);

            const totalActividades = vm.transpActividades.reduce((valorAnterior, valorActual) => {
                return valorAnterior + (valorActual.consumo ? valorActual.consumo : 0);
            }, 0);

            const totalViajes = vm.transpViajes.reduce((valorAnterior, valorActual) => {
                return valorAnterior + (valorActual.consumo ? valorActual.consumo : 0);
            }, 0);

            const totalVuelos = vm.transpVuelos.reduce((valorAnterior, valorActual) => {
                return valorAnterior + (valorActual.consumo ? valorActual.consumo : 0);
            }, 0);

            const hospedajeFactor = vm.hospedaje ? vm.hospedaje : 0;
            const totalHospedaje = hospedajeFactor * 12;

            const residuosFactor = vm.residuos ? vm.residuos : 0;
            const totalResiduos = habitantes === 0 ? 0 : (residuosFactor / habitantes) * 6.671 * 365;

            const totalElectricidad = habitantes === 0 ? 0 : vm.electricidadBimestres.reduce((valorAnterior, valorActual) => {
                return valorAnterior + (((valorActual.consumo ? valorActual.consumo : 0) * 0.347) / habitantes);
            }, 0);

            const totalGas = habitantes === 0 ? 0 : vm.gasBimestres.reduce((valorAnterior, valorActual) => {
                return valorAnterior + (((valorActual.consumo ? valorActual.consumo : 0) * 0.347) / habitantes);
            }, 0);

            const totalAgua = habitantes === 0 ? 0 : vm.aguaBimestres.reduce((valorAnterior, valorActual) => {
                return valorAnterior + (((valorActual.consumo ? valorActual.consumo : 0) * 0.347) / habitantes);
            }, 0);

            $log.info('Consumo total:' + (totalCommuting + totalActividades + totalViajes + totalVuelos + totalHospedaje + totalResiduos + totalElectricidad + totalGas + totalAgua));

            $localStorage.previousResult = {
                habitantes: vm.habitantes,
                transpCommuting: vm.transpCommuting,
                transpActividades: vm.transpActividades,
                transpViajes: vm.transpViajes,
                transpVuelos: vm.transpVuelos,
                hospedaje: vm.hospedaje,
                residuos: vm.residuos,
                electricidadBimestres: vm.electricidadBimestres,
                gasBimestres: vm.gasBimestres,
                aguaBimestres: vm.aguaBimestres
            };
        };

        this.$onInit = function() {
            if ($localStorage.previousResult) {
                vm.habitantes = $localStorage.previousResult.habitantes;
                vm.transpCommuting = $localStorage.previousResult.transpCommuting;
                vm.transpActividades = $localStorage.previousResult.transpActividades;
                vm.transpViajes = $localStorage.previousResult.transpViajes;
                vm.transpVuelos = $localStorage.previousResult.transpVuelos;
                vm.hospedaje = $localStorage.previousResult.hospedaje;
                vm.residuos = $localStorage.previousResult.residuos;
                vm.electricidadBimestres = $localStorage.previousResult.electricidadBimestres;
                vm.gasBimestres = $localStorage.previousResult.gasBimestres;
                vm.aguaBimestres = $localStorage.previousResult.aguaBimestres;
            }
        };
    }
};