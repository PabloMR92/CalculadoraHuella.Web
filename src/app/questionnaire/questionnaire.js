const modal = require('./result/result.html');

export const questionnaire = {
    template: require('./questionnaire.html'),
    controller: function($log, $localStorage, Popeye, $timeout) {
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

        vm.addCommutingTransp = selected => {
            vm.transpCommuting.push({
                consumo: 0,
                valido: true,
                showOther: true,
                correcto: true
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
            if (vm.transpCommuting.length === 0) {
                vm.addCommutingTransp();
            }
        };

        vm.addActividadTransp = selected => {
            vm.transpActividades.push({
                consumo: 0,
                valido: true,
                showOther: true,
                correcto: true
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
            if (vm.transpActividades.length === 0) {
                vm.addActividadTransp();
            }
        };

        vm.addViajeTransp = selected => {
            vm.transpViajes.push({
                consumo: 0,
                valido: true,
                showOther: true,
                correcto: true
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
            if (vm.transpViajes.length === 0) {
                vm.addViajeTransp();
            }
        };

        vm.addViajeVuelo = selected => {
            vm.transpVuelos.push({
                consumo: 0,
                valido: true,
                showOther: true,
                correcto: true
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
            if (vm.transpVuelos.length === 0) {
                vm.addViajeVuelo();
            }
        };

        function getInvalid(array) {
            const invalidItem = array.filter(item => {
                return !item.valido;
            });
            return invalidItem[0];
        }

        function resetCorrecto(array) {
            array.forEach(item => {
                item.correcto = true;
            });
        }

        vm.calcular = () => {
            const invalidCommuting = getInvalid(vm.transpCommuting);
            if (invalidCommuting) {
                invalidCommuting.correcto = false;
            }
            const invalidActividad = getInvalid(vm.transpActividades);
            if (invalidActividad) {
                invalidActividad.correcto = false;
            }
            const invalidViaje = getInvalid(vm.transpViajes);
            if (invalidViaje) {
                invalidViaje.correcto = false;
            }
            const invalidVuelo = getInvalid(vm.transpVuelos);
            if (invalidVuelo) {
                invalidVuelo.correcto = false;
            }

            if (!invalidCommuting && !invalidActividad && !invalidViaje && !invalidVuelo) {
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

                Popeye.openModal({
                    template: modal,
                    controller: 'resultController as ctrl',
                    resolve: {
                        result: function() {
                            return (totalCommuting + totalActividades + totalViajes + totalVuelos + totalHospedaje + totalResiduos + totalElectricidad + totalGas + totalAgua);
                        }
                    }
                });

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
            } else {
                $timeout(() => {
                    resetCorrecto(vm.transpCommuting);
                    resetCorrecto(vm.transpActividades);
                    resetCorrecto(vm.transpViajes);
                    resetCorrecto(vm.transpVuelos);
                });
            }
        };

        vm.transpActividades = [];
        vm.transpCommuting = [];
        vm.transpViajes = [];
        vm.transpVuelos = [];

        function setPreviousResultlShowOther(array) {
            array.forEach(item => {
                item.showOther = false;
            });
            array[array.length - 1].showOther = true;
        }

        this.$onInit = function() {
            if ($localStorage.previousResult) {
                vm.habitantes = parseInt($localStorage.previousResult.habitantes, 10);
                vm.hospedaje = parseInt($localStorage.previousResult.hospedaje, 10);
                vm.residuos = parseInt($localStorage.previousResult.residuos, 10);
                vm.electricidadBimestres = $localStorage.previousResult.electricidadBimestres;
                vm.gasBimestres = $localStorage.previousResult.gasBimestres;
                vm.aguaBimestres = $localStorage.previousResult.aguaBimestres;

                const filterTranspCommuting = $localStorage.previousResult.transpCommuting.filter(item => {
                    return angular.isDefined(item.obj) && (angular.isDefined(item.obj.optionselectedtransp) && angular.isDefined(item.obj.optionselectedcomb) && angular.isDefined(item.obj.recorrido));
                });

                if (filterTranspCommuting.length > 0) {
                    setPreviousResultlShowOther(filterTranspCommuting);
                    vm.transpCommuting = filterTranspCommuting;
                } else {
                    vm.addCommutingTransp();
                }

                const filterTranspActividades = $localStorage.previousResult.transpActividades.filter(item => {
                    return angular.isDefined(item.obj) && (angular.isDefined(item.obj.optionselectedtransp) && angular.isDefined(item.obj.optionselectedcomb) && angular.isDefined(item.obj.recorrido));
                });

                if (filterTranspActividades.length > 0) {
                    setPreviousResultlShowOther(filterTranspActividades);
                    vm.transpActividades = filterTranspActividades;
                } else {
                    vm.addActividadTransp();
                }

                const filterTranspViajes = $localStorage.previousResult.transpViajes.filter(item => {
                    return angular.isDefined(item.obj) && (angular.isDefined(item.obj.optionselectedtransp) && angular.isDefined(item.obj.optionselectedcomb) && angular.isDefined(item.obj.recorrido));
                });

                if (filterTranspViajes.length > 0) {
                    setPreviousResultlShowOther(filterTranspViajes);
                    vm.transpViajes = filterTranspViajes;
                } else {
                    vm.addViajeTransp();
                }

                const filterTranspVuelos = $localStorage.previousResult.transpVuelos.filter(item => {
                    return angular.isDefined(item.obj) && (angular.isDefined(item.obj.optionselectedtransp) && angular.isDefined(item.obj.optionselectedcomb) && angular.isDefined(item.obj.recorrido));
                });

                if (filterTranspVuelos.length > 0) {
                    setPreviousResultlShowOther(filterTranspVuelos);
                    vm.transpVuelos = filterTranspVuelos;
                } else {
                    vm.addViajeVuelo();
                }
            } else {
                vm.addCommutingTransp();
                vm.addActividadTransp();
                vm.addViajeTransp();
                vm.addViajeVuelo();
            }
        };
    }
};