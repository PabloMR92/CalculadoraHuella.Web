const modal = require('./result/result.html');

export const questionnaire = {
    template: require('./questionnaire.html'),
    controller: questionnaireController
};

/** @ngInject */
function questionnaireController($log, $localStorage, Popeye, $timeout) {
    // $localStorage.$reset();
    const vm = this;
    vm.onlyNumbers = /^\d+$/;

    angular.extend(vm, {
        activeHome: false,
        activeTransp: false,
        activeResid: false
    });
    let inviewpartHome = false;
    let inviewpartTransp = false;
    let inviewpartResid = false;

    vm.bolsasOptions = [{
            name: '1/2 kg (Muy Chica)',
            factor: 0.5
        },
        {
            name: '1 kg (Chica)',
            factor: 1
        }, {
            name: '3 kg (Mediana)',
            factor: 3
        },
        {
            name: '6 kg (Grande)',
            factor: 6
        }
    ];

    vm.dietaOptions = [{
            name: 'Ninguno',
            factor: 0
        }, {
            name: 'Rica en carne',
            factor: 6
        },
        {
            name: 'Baje en carne',
            factor: 3
        }, {
            name: 'Sin carne',
            factor: 2
        }
    ];

    vm.dimensionOptions = [{
            name: 'Dimensiones de la vivienda',
            factor: 0
        }, {
            name: 'Pequeña: Menor que 80 m2',
            factor: 5200
        },
        {
            name: 'Mediana: Entre 80 y 160 m2',
            factor: 14000
        }, {
            name: 'Grande: Entre 160 y 240 m2',
            factor: 26000
        }, {
            name: 'Muy grande: Mayor que 240 m2',
            factor: 37500
        }
    ];

    vm.eficienciaOptions = [{
            name: 'Nivel de eficiencia',
            factor: 0
        }, {
            name: 'Alta',
            factor: 0.75
        },
        {
            name: 'Baja',
            factor: 1
        }
    ];

    vm.selectBolsa = option => {
        vm.optionselectedbolsa = option;
    };

    vm.selectDieta = option => {
        vm.optionselecteddieta = option;
    };

    vm.selectDimension = option => {
        vm.optionselecteddimension = option;
    };

    vm.selectEficiencia = option => {
        vm.optionselectedeficiencia = option;
    };

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
        if (inviewpartResid) {
            vm.activeHome = false;
            vm.activeTransp = false;
            vm.activeResid = true;
        }
        if (inviewpartTransp) {
            vm.activeHome = false;
            vm.activeTransp = true;
            vm.activeResid = false;
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

    vm.highlightHabitantes = false;

    vm.setHabitantes = () => {
        if (vm.habitantes !== null && angular.isDefined(vm.habitantes)) {
            vm.showErrorHabitantes = false;
        }
    };

    vm.addCommutingTransp = selected => {
        vm.transpCommuting.push({
            consumo: 0,
            valido: true,
            showOther: true,
            highlight: false
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
            highlight: false
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
            highlight: false
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
            highlight: false
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
        return invalidItem;
    }

    function resetHighlight(array) {
        array.forEach(item => {
            item.highlight = false;
        });
    }

    vm.calcular = () => {
        const invalidCommuting = getInvalid(vm.transpCommuting);
        let highlighted = false;

        if (vm.habitantes === null || angular.isUndefined(vm.habitantes)) {
            highlighted = true;
            vm.showErrorHabitantes = true;
            vm.highlightHabitantes = true;
        }

        if (invalidCommuting.length > 0) {
            if (!highlighted) {
                invalidCommuting[0].highlight = true;
                highlighted = true;
            }
            invalidCommuting.forEach(item => {
                item.showError = true;
            });
        }

        const invalidActividad = getInvalid(vm.transpActividades);
        if (invalidActividad.length > 0) {
            if (!highlighted) {
                invalidActividad[0].highlight = true;
                highlighted = true;
            }
            invalidActividad.forEach(item => {
                item.showError = true;
            });
        }
        const invalidViaje = getInvalid(vm.transpViajes);
        if (invalidViaje.length > 0) {
            if (!highlighted) {
                invalidViaje[0].highlight = true;
                highlighted = true;
            }
            invalidViaje.forEach(item => {
                item.showError = true;
            });
        }
        const invalidVuelo = getInvalid(vm.transpVuelos);
        if (invalidVuelo.length > 0) {
            if (!highlighted) {
                invalidVuelo[0].highlight = true;
                highlighted = true;
            }
            invalidVuelo.forEach(item => {
                item.showError = true;
            });
        }

        if (!highlighted) {
            const habitantes = vm.habitantes ? vm.habitantes : 0;

            const totalCommuting = vm.transpCommuting.reduce((valorAnterior, valorActual) => {
                return valorAnterior + (valorActual.consumo ? valorActual.consumo * 230 : 0);
            }, 0);

            const totalActividades = vm.transpActividades.reduce((valorAnterior, valorActual) => {
                return valorAnterior + (valorActual.consumo ? valorActual.consumo * 230 : 0);
            }, 0);

            const totalViajes = vm.transpViajes.reduce((valorAnterior, valorActual) => {
                return valorAnterior + (valorActual.consumo ? valorActual.consumo : 0);
            }, 0);

            const totalVuelos = vm.transpVuelos.reduce((valorAnterior, valorActual) => {
                return valorAnterior + (valorActual.consumo ? valorActual.consumo : 0);
            }, 0);

            const hospedajeFactor = vm.hospedaje ? vm.hospedaje : 0;
            const totalHospedaje = hospedajeFactor * 12;

            let residuosFactor = vm.residuos ? vm.residuos : 0;
            if (residuosFactor !== 0) {
                residuosFactor = vm.optionselectedbolsa ? vm.optionselectedbolsa.factor * residuosFactor : 0;
            }
            const totalResiduos = habitantes === 0 ? 0 : (residuosFactor / habitantes) * 1.668 * 360;

            const totalDieta = vm.optionselecteddieta ? vm.optionselecteddieta.factor * 360 : 0;

            const totalDimension = vm.optionselecteddimension ? vm.optionselecteddimension.factor : 0;

            const totalEficiencia = vm.optionselectedeficiencia ? vm.optionselectedeficiencia.factor : 0;

            const totalAlternativo = totalDimension * totalEficiencia * 0.347;

            let totalElectricidad = 0;
            let totalGas = 0;
            let totalAgua = 0;

            if (totalAlternativo === 0) {
                totalElectricidad = habitantes === 0 ? 0 : vm.electricidadBimestres.reduce((valorAnterior, valorActual) => {
                    return valorAnterior + (((valorActual.consumo ? valorActual.consumo : 0) * 0.347) / habitantes);
                }, 0);

                totalGas = habitantes === 0 ? 0 : vm.gasBimestres.reduce((valorAnterior, valorActual) => {
                    return valorAnterior + (((valorActual.consumo ? valorActual.consumo : 0) * 1.973) / habitantes);
                }, 0);

                totalAgua = habitantes === 0 ? 0 : vm.aguaBimestres.reduce((valorAnterior, valorActual) => {
                    return valorAnterior + (((valorActual.consumo ? valorActual.consumo : 0) * 0.104) / habitantes);
                }, 0);
            }

            // $log.info('Consumo total:' + (totalCommuting + totalActividades + totalViajes + totalVuelos + totalHospedaje + totalResiduos + totalElectricidad + totalGas + totalAgua));

            Popeye.openModal({
                template: modal,
                controller: 'resultController as ctrl',
                resolve: {
                    result: function() {
                        return (totalCommuting + totalActividades + totalViajes + totalVuelos + totalHospedaje + totalResiduos + totalElectricidad + totalGas + totalAgua + totalDieta + totalAlternativo) / 1000;
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
                aguaBimestres: vm.aguaBimestres,
                residuosBolsa: vm.optionselectedbolsa,
                dieta: vm.optionselecteddieta,
                dimension: vm.optionselecteddimension,
                eficiencia: vm.optionselectedeficiencia
            };
        } else {
            $timeout(() => {
                resetHighlight(vm.transpCommuting);
                resetHighlight(vm.transpActividades);
                resetHighlight(vm.transpViajes);
                resetHighlight(vm.transpVuelos);
                // vm.highlightHabitantes = false;
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
            const previousResult = angular.copy($localStorage.previousResult);
            vm.habitantes = parseInt(previousResult.habitantes, 10);
            vm.hospedaje = parseInt(previousResult.hospedaje, 10);
            vm.residuos = parseInt(previousResult.residuos, 10);
            vm.electricidadBimestres = previousResult.electricidadBimestres;
            vm.gasBimestres = previousResult.gasBimestres;
            vm.aguaBimestres = previousResult.aguaBimestres;
            vm.optionselectedbolsa = previousResult.residuosBolsa;
            vm.optionselecteddieta = previousResult.dieta;
            vm.optionselecteddimension = previousResult.dimension;
            vm.optionselectedeficiencia = previousResult.eficiencia;

            const filterTranspCommuting = previousResult.transpCommuting.filter(item => {
                return angular.isDefined(item.obj) && (angular.isDefined(item.obj.optionselectedtransp) && angular.isDefined(item.obj.optionselectedcomb) && angular.isDefined(item.obj.recorrido));
            });

            if (filterTranspCommuting.length > 0) {
                setPreviousResultlShowOther(filterTranspCommuting);
                vm.transpCommuting = filterTranspCommuting;
            } else {
                vm.addCommutingTransp();
            }

            const filterTranspActividades = previousResult.transpActividades.filter(item => {
                return angular.isDefined(item.obj) && (angular.isDefined(item.obj.optionselectedtransp) && angular.isDefined(item.obj.optionselectedcomb) && angular.isDefined(item.obj.recorrido));
            });

            if (filterTranspActividades.length > 0) {
                setPreviousResultlShowOther(filterTranspActividades);
                vm.transpActividades = filterTranspActividades;
            } else {
                vm.addActividadTransp();
            }

            const filterTranspViajes = previousResult.transpViajes.filter(item => {
                return angular.isDefined(item.obj) && (angular.isDefined(item.obj.optionselectedtransp) && angular.isDefined(item.obj.optionselectedcomb) && angular.isDefined(item.obj.recorrido));
            });

            if (filterTranspViajes.length > 0) {
                setPreviousResultlShowOther(filterTranspViajes);
                vm.transpViajes = filterTranspViajes;
            } else {
                vm.addViajeTransp();
            }

            const filterTranspVuelos = previousResult.transpVuelos.filter(item => {
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
