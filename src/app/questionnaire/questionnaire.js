export const questionnaire = {
    template: require('./questionnaire.html'),
    controller: function($log) {
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
    }
};