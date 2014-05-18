define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/search',
    'app/views/about'
], function ($, _, Backbone, SearchView, AboutView) {
    'use strict';

    var AppView = Backbone.View.extend({
        id: 'app-view',

        html: [
            '<div id="wrap">',
                '<div class="navbar navbar-default navbar-fixed-top" role="navigation">',
                    '<a class="navbar-brand" href="#">Image Search</a>',
                    '<div class="col-sm-5 col-md-5">',
                        '<form class="navbar-form" role="search">',
                            '<div class="input-group">',
                                '<input type="text" class="form-control" placeholder="Search" name="srch-term" id="srch-term">',
                                '<div class="input-group-btn">',
                                    '<button class="btn btn-default" type="submit" id="run-search"><i class="glyphicon glyphicon-search"></i></button>',
                                '</div>',
                            '</div>',
                        '</form>',
                    '</div>',
                    '<ul class="nav navbar-nav pull-right">',
                        '<li id="nav-about"><a href="#about">About</a></li>',
                    '</ul>',
                '</div>',
                '<div id="search-buttons" class="clearfix">',
                    '<button id="btn-clear" type="button" class="btn btn-default">Clear</button>',
                '</div>',
                '<div class="container fill">',
                    '<div id="content"></div>',
                '</div>',
                '<div id="footer" class="navbar navbar-default navbar-fixed-bottom">',
                    '<div class="container">',
                        '<p class="muted credit">',
                            'by Dror Avidov',
                        '</p>',
                    '</div>',
                '</div>',
            '</div>'
        ].join(''),

        events: {
            'click #btn-settings': 'openSettings',
            'enter #srch-term': 'runSearch',
            'click #run-search': 'runSearch',
            'click #btn-clear': 'clearImages'
        },

        views: {},

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

            this.$el.append(this.html);
            this.$('#content').append(this.views['about'].render().el);
            this.$('#content').append(this.views['search'].render().el);
            this.$searchTerm = this.$('#srch-term');
            this.$searchButtons = this.$('#search-buttons');
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
            }
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
            this.$searchTerm.val('');
            this.$searchTerm.focus();
        }
    });

    return AppView;
});