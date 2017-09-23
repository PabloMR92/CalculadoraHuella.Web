import angular from 'angular';

import 'angular-ui-router';
import routesConfig from './routes';

import './assets/css/animation.css';
import './assets/css/fontello-codes.css';
import './assets/css/fontello-embedded.css';
import './assets/css/fontello-ie7-codes.css';
import './assets/css/fontello-ie7.css';
import './assets/css/fontello.css';
import './assets/css/eco-codes.css';
import './assets/css/eco-embedded.css';
import './assets/css/eco-ie7-codes.css';
import './assets/css/eco-ie7.css';
import './assets/css/eco.css';
import './assets/css/eco-main.css';

import './assets/js/dropdownfix';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import angularInview from 'angular-inview';

import 'angular-dropdowns/dist/angular-dropdowns.min.css';
import 'angular-dropdowns/dist/angular-dropdowns.min.js';

import {
    intro
} from './app/intro/intro';

import {
    questionnaire
} from './app/questionnaire/questionnaire';

import {
    transpselector
} from './app/questionnaire/transpselector/transpselector';

import sticky from './app/directive/sticky';

import nganimate from 'angular-animate';

export const app = 'app';

angular
    .module(app, ['ui.router', nganimate, angularInview.name, 'ngDropdowns'])
    .config(routesConfig)
    .component('intro', intro)
    .component('questionnaire', questionnaire)
    .component('transpselector', transpselector)
    .directive('sticky', sticky);