define([
    'jquery',
    'underscore',
    'backbone',
    'app/templates'
], function ($, _, Backbone, Templates) {

    'use strict';

    var PictureView = Backbone.View.extend({

        template: Templates['picture'],

        events: {
            'click #btn-remove': 'removePicture',
            'click #btn-toggle': 'togglePicture'
        },

        initialize: function() {
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
            if (this.$('#expand').hasClass('hide')) {
                this.$('#collapse').addClass('hide');
                this.$('#expand').removeClass('hide');

                this.$('#picture-' + this.model.fixedPk + ' > img ').css('max-width', '200px');
                this.$('#picture-' + this.model.fixedPk + ' > img ').css('max-height', '200px');
            } else {
                this.$('#expand').addClass('hide');
                this.$('#collapse').removeClass('hide');

                this.$('#picture-' + this.model.fixedPk + ' > img ').css('max-width', '100%');
                this.$('#picture-' + this.model.fixedPk + ' > img ').css('max-height', '100%');
            }

            $(this.$el).trigger('resized', [this.model]);
        }
    });

    return PictureView;
});
