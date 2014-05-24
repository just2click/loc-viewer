require.config({
    baseUrl: 'js',

    paths: {
        'text': 'libs/text',
        'jquery': 'libs/jquery-1.11.0.min',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'bootstrap': 'libs/bootstrap',
        'backbone.localStorage': 'libs/backbone.localStorage',
        'imagesloaded': 'libs/imagesloaded.pkgd.min',
        'masonry': 'libs/masonry.pkgd.min',
        'templates': '../js/app/templates',
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: [
                'jquery'
            ]
        },
        'masonry': {
            exports: 'Masonry'
        }
    },
});

require([
    'backbone',
    'app'
], function (Backbone, App) {
    'use strict';

    App.initialize();
});