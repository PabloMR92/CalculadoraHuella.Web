export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('intro', {
            url: '/Comenzar',
            component: 'intro'
        })

    .state('questionnaire', {
        url: '/Cuestionario',
        component: 'questionnaire'
    });
}