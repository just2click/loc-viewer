define([
    'jquery',
    'underscore',
    'backbone',
    'app/views/modal',
    'text!templates/settings.html',
], function ($, _, Backbone, ModalView, tmpl) {
    'use strict';

    var SettingsView = ModalView.extend( {

        template: _.template(tmpl),

        events: {
            'click #btn-save': 'saveSettings'
        },

        initialize: function () {
            ModalView.prototype.initialize.apply(this, arguments);
            this.$bodyEl.html(this.template(this.model.toJSON()));
        },

        saveSettings: function (e) {
            var data = {
                selectedTheme: this.$('#selectedTheme').val()
            };

            this.model.save(data);
            this.$modalEl.modal('hide');
        }
    });

    return SettingsView;
});