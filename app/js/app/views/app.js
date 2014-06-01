define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/search',
    'app/views/about',
    'text!templates/main.html',
], function ($, _, Backbone, SearchView, AboutView, tmpl) {
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
        },

        render: function () {
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
        }
    });

    return AppView;
});