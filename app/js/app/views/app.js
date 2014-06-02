define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/search',
    'app/views/about',
    'app/views/settings',
    'text!templates/main.html',
], function ($, _, Backbone, SearchView, AboutView, SettingsView, tmpl) {
    'use strict';

    var AppView = Backbone.View.extend({
        id: 'app-view',

        events: {
            'click #btn-settings': 'openSettings',
            'enter #srch-term': 'runSearch',
            'click #run-search': 'runSearch',
            'click #btn-clear': 'clearImages'
        },

        views: {},

        template: _.template(tmpl),

        themes: {
            "default": "//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css",
            "amelia" : "//bootswatch.com/amelia/bootstrap.min.css",
            "cerulean" : "//bootswatch.com/cerulean/bootstrap.min.css",
            "cosmo" : "//bootswatch.com/cosmo/bootstrap.min.css",
            "cyborg" : "//bootswatch.com/cyborg/bootstrap.min.css",
            "flatly" : "//bootswatch.com/flatly/bootstrap.min.css",
            "journal" : "//bootswatch.com/journal/bootstrap.min.css",
            "readable" : "//bootswatch.com/readable/bootstrap.min.css",
            "simplex" : "//bootswatch.com/simplex/bootstrap.min.css",
            "slate" : "//bootswatch.com/slate/bootstrap.min.css",
            "spacelab" : "//bootswatch.com/spacelab/bootstrap.min.css",
            "united" : "//bootswatch.com/united/bootstrap.min.css"
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);

            this.views['about'] = new AboutView({
                id: 'page-about',
                className: 'page-view'
            });

            this.views['search'] = new SearchView({
                id: 'page-search',
                className: 'page-view'
            });

            this.$el.append(this.template);
            this.$('#content').append(this.views['about'].render().el);
            this.$('#content').append(this.views['search'].render().el);
            this.$searchTerm = this.$('#srch-term');
            this.$searchButtons = this.$('#search-utils');
            this.$themesheet = $('<link href="' + this.themes['default'] + '" rel="stylesheet" />');

            this.$themesheet.appendTo('head');
        },

        render: function () {
            var themeUrl = this.themes[this.model.get('selectedTheme')];
            this.$themesheet.attr('href', themeUrl);
            return this;
        },

        setPage: function (page) {
            this.$('.nav li').removeClass('active');
            this.$('.page-view').hide();
            this.$('#page-' + page).show();
            this.$('#nav-' + page).addClass('active');
            this.$searchButtons.hide();

            if (page === 'search') {
                this.$searchTerm.focus();
                this.$searchButtons.hide();
            } else if (page === 'about') {
                this.views['search'].cleanUp();
            }

            this.views['search'].hasNoImages();
        },

        runSearch: function (srchTerm) {
            if (typeof srchTerm !== 'string') {
                srchTerm = '';
            }

            var searchTerm = this.$searchTerm.val() || srchTerm;
            if ((searchTerm.length === 0) && srchTerm) {
            } else {
                window.location.hash = 'search/' + escape(searchTerm);

            }

            this.$searchTerm.val(srchTerm);

            if (!this.$('#page-search').is(':visible')) {
                this.setPage('search');
            }
            if (searchTerm.length > 0) {
                this.$searchButtons.show();
                this.views['search'].runSearch(searchTerm);
            }
            return false;
        },

        clearImages: function () {
            this.views['search'].cleanUp();
            this.$searchButtons.hide();
            this.$searchTerm.val('');
            this.$searchTerm.focus();
        },

        openSettings: function (e) {
            var modal = new SettingsView ({
                'title': 'Application Settings',
                'id': 'modal-settings',
                model: this.model
            });
            modal.show();
        }
    });

    return AppView;
});