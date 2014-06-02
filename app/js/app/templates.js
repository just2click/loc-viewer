define([
    'underscore'
], function (_) {
    var Templates = {};

    Templates['picture'] = [
        '<div class="item panel panel-info" id="panel-<%= pk %>">',
            '<div class="panel-heading" id="<%= pk %>">',
                '<div class="btn-group pull-right">',
                '<button id="btn-remove" type="button" class="btn btn-info btn-xs">',
                    '<span class="glyphicon glyphicon-remove"></span>',
                '</button>',
                '<button id="btn-toggle" type="button" class="btn btn-info btn-xs">',
                    '<span id="collapse" class="glyphicon glyphicon-minus hide"></span>',
                    '<span id="expand" class="glyphicon glyphicon-plus"></span>',
                '</button>',
            '</div>',
            '<h3 class="panel-title" id="panel-title-<%= pk %>">',
                '<%= title %>',
            '</h3>',
            '</div>',
            '<div class="picture-wrapper" id="picture-<%= pk %>">',
                '<img class="img" itemprop="image" src="<%= full %>" title="<%= title %>" />',
            '</div>',
        '</div>'
    ].join('');

    Templates['modal'] = [
        '<div class="modal fade">',
            '<div class="modal-dialog">',
                '<div class="modal-content">',
                    '<div class="modal-header">',
                        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>',
                        '<h4 class="modal-title"><%=title %></h4>',
                    '</div>',
                    '<div class="modal-body">test</div>',
                '</div>',
            '</div>',
        '</div>'
    ].join('');

    Templates['settings'] = [
        '<form role="form">',
            '<div class="form-group">',
                '<label for="searchForValue">Number of images per search</label>',
                '<input type="text" class="form-control" id="searchForValueInput" placeholder="Set number of images to search for" value="<%= searchForValue %>"/>',
            '</div>',
            '<div class="form-group">',
                '<label for="bootstrapTheme">Select Bootstrap Theme</label>',
                '<select id="selectedTheme" class="form-control">',
                    '<option value="default" <% if (selectedTheme==\"default\") print(\"selected\") %>>Default</option>',
                    '<option value="amelia" <% if (selectedTheme==\"amelia\") print(\"selected\") %>>Amelia</option>',
                    '<option value="cerulean" <% if (selectedTheme==\"cerulean\") print(\"selected\") %>>Cerulean</option>',
                    '<option value="cosmo" <% if (selectedTheme==\"cosmo\") print(\"selected\") %>>Cosmo</option>',
                    '<option value="cyborg" <% if (selectedTheme==\"cyborg\") print(\"selected\") %>>Cyborg</option>',
                    '<option value="flatly" <% if (selectedTheme==\"flatly\") print(\"selected\") %>>Flatly</option>',
                    '<option value="journal" <% if (selectedTheme==\"journal\") print(\"selected\") %>>Journal</option>',
                    '<option value="readable" <% if (selectedTheme==\"readable\") print(\"selected\") %>>Readable</option>',
                    '<option value="simplex" <% if (selectedTheme==\"simplex\") print(\"selected\") %>>Simplex</option>',
                    '<option value="slate" <% if (selectedTheme==\"slate\") print(\"selected\") %>>Slate</option>',
                    '<option value="spacelab" <% if (selectedTheme==\"spacelab\") print(\"selected\") %>>Space Lab</option>',
                    '<option value="united" <% if (selectedTheme==\"united\") print(\"selected\") %>>United</option>',
                '</select>',
            '</div>',
            '<div id="btn-save" class="btn btn-default">Save</div>',
        '</form>'
    ].join('');

    Templates['singleImage'] = [
        '<div class="container-fluid galleryContainer">',
            '<div class="row-fluid">',
            '<div class="span8" id="selectedImageArea"></div>',
        '</div>'
    ].join('');

    Templates['largerImage'] = [
        '<img class="img" itemprop="image" src="<%= full %>" title="<%= title %>" />'
    ].join('');

    for (var tmpl in Templates) {
        if (Templates.hasOwnProperty(tmpl)) {
            Templates[tmpl] = _.template(Templates[tmpl]);
        }
    }

    return Templates;
});