define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/largePicture',
    'app/templates'
], function ($, _, Backbone, LargePicture ,Templates) {

    'use strict';

    var PictureView = Backbone.View.extend({

        template: Templates['picture'],

        events: {
            'click #btn-remove': 'removePicture',
            'click #btn-toggle': 'togglePicture'
        },

        initialize: function(options) {
            this.parent = options.parent;

            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            this.$bodyEl = this.$('.panel-body');
        },

        render: function() {
            return this;
        },

        removePicture: function(e) {
            this.model.destroy();
        },

        togglePicture: function (e) {
            this.showTheLargePicture(this.model);
        },

        showTheLargePicture: function (picture, refreshOnly) {
            this.$modal = new LargePicture ({
                'title': picture.attributes.title,
                'id': 'modal-large-picture-' + picture.fixedPk,
                model: this.model,
                parent: this
            });
            //if (!refreshOnly) {
                this.$modal.show();
            //}
            this.$modal.render();
        },

        getPrevPk: function(currentPk) {
            var model = this.parent.getPrevPk(currentPk);

            this.$modal.options.title = model.attributes.title;
            this.$modal.options.id = 'modal-large-picture-' + model.fixedPk;
            return model;
        },

        getNextPk: function (currentPk) {
            var model =  this.parent.getNextPk(currentPk);

            this.$modal.options.title = model.attributes.title;
            this.$modal.options.id = 'modal-large-picture-' + model.fixedPk;
            return model;
        }
    });

    return PictureView;
});
