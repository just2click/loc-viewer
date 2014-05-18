require.config({
    paths: {
        'jquery': 'libs/jquery-1.11.0.min',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'bootstrap': 'libs/bootstrap',
        'backbone.localStorage': 'libs/backbone.localStorage',
        'imagesloaded': 'libs/imagesloaded.pkgd.min',
        'masonry': 'libs/masonry.pkgd.min'
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
    'app/app'
], function (Backbone, App) {
    'use strict';

    App.initialize();
});