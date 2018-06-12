/* global angular */
var schemaFormPanel = angular.module('schemaFormPanel', ['schemaForm', 'templates']);

schemaFormPanel.config([
    'schemaFormProvider',
    'schemaFormDecoratorsProvider',
    'sfBuilderProvider',
    function (schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider) {

        function repeatTransclusion(args) {
            var transclusions = args.fieldFrag.querySelectorAll('[sf-repeat-transclude]');

            if (transclusions.length) {
                transclusions.forEach(function (node) {
                    var sub = node.getAttribute('sf-repeat-transclude') || 'items';
                    var items = args.form[sub];
                    if (items && items.length) {
                        var childFrag = args.build(items, args.path + '.' + sub, args.state);
                        var children = Array.from(childFrag.childNodes);
                        children.forEach(function (item) {
                            var newNode = node.cloneNode();
                            newNode.appendChild(item);
                            node.parentNode.appendChild(newNode);
                        });
                        node.parentNode.removeChild(node);
                    }
                });
            }
        }

        schemaFormDecoratorsProvider.defineAddOn(
            'bootstrapDecorator',
            'panel',
            'src/templates/angular-schema-form-panel.html', [
                sfBuilderProvider.builders.sfField,
                sfBuilderProvider.builders.ngModel,
                sfBuilderProvider.builders.ngModelOptions,
                sfBuilderProvider.builders.condition,
                sfBuilderProvider.builders.transclusion
            ].concat(repeatTransclusion)
        );

        schemaFormDecoratorsProvider.defineAddOn(
            'bootstrapDecorator',
            'panel-group',
            'src/templates/angular-schema-form-panel-group.html', [
                sfBuilderProvider.builders.sfField,
                sfBuilderProvider.builders.ngModel,
                sfBuilderProvider.builders.ngModelOptions,
                sfBuilderProvider.builders.condition,
                sfBuilderProvider.builders.simpleTransclusion
            ]
        );

    }
]);
