# Angular Schema Form Bootstrap Panel Decorator v1.0.0

> Adds support for Bootstrap's custom [panel component](https://getbootstrap.com/docs/3.3/components/#panels) in [Angular Schema Form](https://github.com/json-schema-form/angular-schema-form)

View the <a href="https://codepen.io/rthaut/full/xzReMB/">Live Demo on CodePen</a> for examples.

## Installation

Install `angular-schema-form-panel` via npm or bower:

```sh
npm install angular-schema-form-panel
```

```sh
bower install angular-schema-form-panel
```

## Usage

Include `angular-schema-form-panel.min.js` (or the un-minified `angular-schema-form-panel.js`) file in your HTML document(s):

```html
<script src="node_modules/angular-schema-form-panel/dist/angular-schema-form-panel.min.js"></script>
```

Add `schemaFormPanel` as an Angular dependency in your application module:

```js
var app = angular.module('myApp', [..., 'schemaForm', 'schemaFormPanel']);
```

Then use `panel` as the `type` in your form's JSON definition:

```js
$scope.form = [
    ...,
    {
        type: "panel",
        items: [...],
        ...options
    }
]
```

You can also make a panel accordion by using `panel-group` as the `type` (make sure the `items` of your `panel-group` are `panel` objects) in your form's JSON definition:

```js
$scope.form = [
    ...,
    {
        type: "panel-group",
        items: [
            {
                type: "panel",
                items: [...],
                ...options
            },
            {
                type: "panel",
                items: [...],
                ...options
            },
            {
                type: "panel",
                items: [...],
                ...options
            }
        ]
    }
]
```

## Options

You can use the following options on each `panel` object. All options are optional unless specified.

| Option Name    | Type     | Description |
| -------------- | -------- | ----------- |
| `items`        | `array`  | Specifies all items to include in the panel body. Technically optional but without it your panel will be empty. |
| `style`        | `string` | Specifies the panel's [contextual style](https://getbootstrap.com/docs/3.3/components/#panels-alternatives) (e.g. `success`, `info`, `danger`, etc.). <br> Defaults to `default`. |
| `title`        | `string` | Specifies the title displayed in the header of the panel. This is required for `collapsible` panels. |
| `footer`       | `string` | Specifies the HTML content added to the panel's footer. |
| `collapsible`  | `bool`   | Specifies if the panel can be collapsed. Remember to specify a `title` for `collapsible` panels. <br> Defaults to `false`. |
| `collapsed`    | `bool`   | Specifies if the panel should be collapsed initially. This only applies to `collapsible` panels. <br> Defaults to `false`. |
| `panelClass`   | `string` | Specifies additional class(es) to add to the main panel element. |
| `headingClass` | `string` | Specifies additional class(es) to add to the panel's heading element. |
| `bodyClass`    | `string` | Specifies additional class(es) to add to the panel's body element. |
| `footerClass`  | `string` | Specifies additional class(es) to add to the panel's footer element. |
| `list`         | `bool`   | Specifies if the `items` should be rendered as elements of a [list group](https://getbootstrap.com/docs/3.3/components/#panels-list-group). <br> Defaults to `false`. |
