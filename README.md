# [GrapesJS](http://grapesjs.com)

[![Build Status](https://travis-ci.org/artf/grapesjs.svg?branch=master)](https://travis-ci.org/artf/grapesjs)
[![Chat](https://img.shields.io/badge/chat-discord-7289da.svg)](https://discord.gg/QAbgGXq)
[![CDNJS](https://img.shields.io/cdnjs/v/grapesjs.svg)](https://cdnjs.com/libraries/grapesjs)
[![npm](https://img.shields.io/npm/v/grapesjs.svg)](https://www.npmjs.com/package/grapesjs)

<p align="center"><img src="http://grapesjs.com/img/grapesjs-front-page-m.jpg" alt="GrapesJS" width="500" align="center"/></p>

## FromDocument Fork

_Note: This is a temporary fork of GrapesJS that will probably be abandoned once the expose `baseCss` [PR](https://github.com/artf/grapesjs/pull/942) and subsequent `from-document` PR are both merged. For more information on the `from-document` feature, see below._

Grapes' `container` and `fromElement` options work well for templates that are neatly contained below the body element. However, if your template relies on styling based on classes or attributes added to the html, head, or body tags, it will not be compatible. Similarly, if your CSS depends on a hierarchical structure within the body tag, it may not work with Grapes as grapes injects a custom wrapper div (thereby conflicting with n-th element CSS query selectors). Finally, templates render differently based on the doctype of your document. Doctype support is therefore necessary.

The `fromDocument` feature resolves all of these issues, by allowing you to simply inject grapes into an existing document, no matter how complicated. Grapes will then transpose the document's content with the newly created iframe canvas, while respecting the document's doctype, and above-body elements (html, head). It will not duplicate grapes-specific elements as long as these elements are tagged with a special `gjs-from-doc` attribute (see the usage example below).

All tests pass and I've added additional tests as well for the new feauture.

_Without `fromDocument`_:
<p align="center"><img src="https://img.ziggi.org/lFL3OA6n.png" alt="without fromDocument" height="400" align="center"/></p>

_With `fromDocument`_:
<p align="center"><img src="https://img.ziggi.org/b3LatpzW.png" alt="without fromDocument" height="400" align="center"/></p>


## Intro

GrapesJS is a free and open source Web Builder Framework which helps building HTML templates, faster and easily, to be delivered in sites, newsletters or mobile apps. Mainly, GrapesJS was designed to be used inside a [CMS] to speed up the creation of dynamic templates. To better understand this concept check the image below

<br/>
<p align="center"><img src="http://grapesjs.com/img/gjs-concept.png" alt="GrapesJS - Style Manager" height="400" align="center"/></p>
<br/>

Generally any 'template system', that you'd find in various applications like CMS, is composed by the **structure** (HTML), **style** (CSS) and **variables**, which are then replaced with other templates and contents on server-side and rendered on client.

This demos show examples of what is possible to achieve:
Webpage Demo - http://grapesjs.com/demo.html
Newsletter Demo - http://grapesjs.com/demo-newsletter-editor.html





## Table of contents

* [Features](#features)
* [Download](#download)
* [Usage](#usage)
* [Development](#development)
* [Documentation](#documentation)
* [API](#api)
* [Testing](#testing)
* [Plugins](#plugins)
* [Support](#support)
* [Changelog](https://github.com/artf/grapesjs/releases)
* [Contributing](https://github.com/artf/grapesjs/blob/master/CONTRIBUTING.md)
* [License](#license)




## Features


* Blocks
<p align="center"><img src="http://grapesjs.com/img/sc-grapesjs-blocks-prp.jpg" alt="GrapesJS - Block Manager" height="400" align="center"/></p>

* Style Manager, for component styling<br/>
<p align="center"><img src="http://grapesjs.com/img/sc-grapesjs-style-2.jpg" alt="GrapesJS - Style Manager" height="400" align="center"/></p>

* Layer Manager, that comes handy with nested elements<br/>
<p align="center"><img src="http://grapesjs.com/img/sc-grapesjs-layers-2.jpg" alt="GrapesJS - Layer Manager" height="400" align="center"/></p>

* Code Viewer <br/>
<p align="center"><img src="http://grapesjs.com/img/sc-grapesjs-code.jpg" alt="GrapesJS - Code Viewer" height="300" align="center"/></p>

* Asset Manager, for uploading and managing images<br/>
<p align="center"><img src="http://grapesjs.com/img/sc-grapesjs-assets-1.jpg" alt="GrapesJS - Asset Manager" height="250" align="center"/></p>

* Local and remote storage

* Default built-in commands (basically for creating and managing different components)





## Download

* CDNs
  * UNPKG
    * `https://unpkg.com/grapesjs`
    * `https://unpkg.com/grapesjs/dist/css/grapes.min.css`
  * CDNJS
    * `https://cdnjs.cloudflare.com/ajax/libs/grapesjs/0.12.17/grapes.min.js`
    * `https://cdnjs.cloudflare.com/ajax/libs/grapesjs/0.12.17/css/grapes.min.css`
* NPM
  * `npm i grapesjs`
* GIT
  * `git clone https://github.com/artf/grapesjs.git`

For the development purpose you should follow instructions below.





## Usage

```html
<link rel="stylesheet" href="path/to/grapes.min.css">
<script src="path/to/grapes.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      components: '<div class="txt-red">Hello world!</div>',
      style: '.txt-red{color: red}',
  });
</script>
```

You could also grab the content directly from the element with `fromElement` property

```html
<div id="gjs">
  <div class="txt-red">Hello world!</div>
  <style>.txt-red{color: red}</style>
</div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      fromElement: true,
  });
</script>
```

For more practical example I suggest to look up the code inside this demo: http://grapesjs.com/demo.html

By default Grapes injects base CSS into the canvas. For example, it sets body margin to 0 and sets a default background color of white. This CSS is desired in most cases. However, if you wish to disable or define your own base CSS, you can do so with the `baseCss` config parameter. This is useful if for example your template is not based off a document with 0 as body margin:

```javascript
var editor = grapesjs.init({
    container : '#gjs',
    fromElement: true,
    baseCss: 'html, body { background-color: #ffffff; }'
});
```

If you work with complex templates that depend on elements and attributes above the body (e.g. a doctype, or a html element with classes), or that depend on the hierarchical level of elements inside the body (e.g. due to n-th element CSS selectors), you can also use the entire document as your template using the `fromDocument` property:

```html
<!doctype html>
<html class="myClass">
  <head>
    <!-- rest of your complicated template's head -->
  </head>
  <body class="someBodyClass">
    <!-- rest of your complicated template's body -->
    
    <!-- inject grapes resource at the end of the document
    the document will be transposed with the editor canvas
    grapes-specific elements can be flagged with the
    `data-gjs-from-doc` attribute such that they will not
    be used as part of the template. -->
    <link rel="stylesheet" href="dist/css/grapes.min.css" data-gjs-from-doc>
    <script src="dist/grapes.min.js" data-gjs-from-doc></script>
    <style data-gjs-from-doc>
      body,
      html {
        height: 100%;
        margin: 0;
      }
    </style>
    <script type="text/javascript" data-gjs-from-doc>
      grapesjs.init({
        fromDocument: true,
        exportWrapper: 1,
        wrappesIsBody: 0,
        forceClass: 0,
        avoidInline: 0,
        protectedCss: '',
        baseCss: '',
        domComponents: {
          wrapperClass: 'gjs-wrapper' // use class instead of ID to identify wrapper
        }
      });
    </script>
  </body>
</html>
```

The above snippet should work with almost any static HTML website.

## Development

GrapesJS uses [Webpack](https://github.com/webpack/webpack) as a module bundler and [Babel](https://github.com/babel/babel) as a compiler.

Clone the repository and install all the necessary dependencies

```sh
$ git clone https://github.com/artf/grapesjs.git
$ cd grapesjs
$ npm i
```

Start the dev server

```sh
$ npm start
```

Once the development server is started you should be able to reach the demo page (eg. `http://localhost:8080`)





## Documentation

Check the getting started guide here: [wiki]





## API

API References could be found here: [API-Reference]





## Testing

```sh
$ npm test
```





## Plugins

### Extensions
* [grapesjs-plugin-export](https://github.com/artf/grapesjs-plugin-export) - Export GrapesJS templates in a zip archive
* [grapesjs-plugin-filestack](https://github.com/artf/grapesjs-plugin-filestack) - Add Filestack uploader in Asset Manager
* [grapesjs-plugin-ckeditor](https://github.com/artf/grapesjs-plugin-ckeditor) - Replaces the built-in RTE with CKEditor
* [grapesjs-aviary](https://github.com/artf/grapesjs-aviary) - Add the Aviary Image Editor
* [grapesjs-blocks-basic](https://github.com/artf/grapesjs-blocks-basic) - Basic set of blocks
* [grapesjs-plugin-forms](https://github.com/artf/grapesjs-plugin-forms) - Set of form components and blocks
* [grapesjs-navbar](https://github.com/artf/grapesjs-navbar) - Simple navbar component
* [grapesjs-component-countdown](https://github.com/artf/grapesjs-component-countdown) - Simple countdown component
* [grapesjs-style-gradient](https://github.com/artf/grapesjs-style-gradient) - Add a gradient type input
* [grapesjs-blocks-flexbox](https://github.com/artf/grapesjs-blocks-flexbox) - Add the flexbox block
* [grapesjs-lory-slider](https://github.com/artf/grapesjs-lory-slider) - Slider component by using [lory](https://github.com/meandmax/lory)
* [grapesjs-tabs](https://github.com/artf/grapesjs-tabs) - Simple tabs component

### Presets
* [grapesjs-preset-webpage](https://github.com/artf/grapesjs-preset-webpage) - Webpage Builder
* [grapesjs-preset-newsletter](https://github.com/artf/grapesjs-preset-newsletter) - Newsletter Builder
* [grapesjs-mjml](https://github.com/artf/grapesjs-mjml) - Newsletter Builder with MJML components


Find out more about plugins here: [Creating plugins](https://github.com/artf/grapesjs/wiki/Creating-plugins)





## Support

If you like the project support it with a donation of your choice or become a backer/sponsor via [Open Collective](https://opencollective.com/grapesjs)

[![PayPalMe](http://grapesjs.com/img/ppme.png)](https://paypal.me/grapesjs)

<a href="https://opencollective.com/grapesjs/sponsors/0/website"><img src="https://opencollective.com/grapesjs/sponsors/0/avatar"></a>
<a href="https://opencollective.com/grapesjs/sponsors/1/website"><img src="https://opencollective.com/grapesjs/sponsors/1/avatar"></a>
<a href="https://opencollective.com/grapesjs/sponsors/2/website"><img src="https://opencollective.com/grapesjs/sponsors/2/avatar"></a>
<a href="https://opencollective.com/grapesjs/sponsors/3/website"><img src="https://opencollective.com/grapesjs/sponsors/3/avatar"></a>
<a href="https://opencollective.com/grapesjs/sponsors/4/website"><img src="https://opencollective.com/grapesjs/sponsors/4/avatar"></a>
<a href="https://opencollective.com/grapesjs/sponsors/5/website"><img src="https://opencollective.com/grapesjs/sponsors/5/avatar"></a>
<a href="https://opencollective.com/grapesjs/sponsors/6/website"><img src="https://opencollective.com/grapesjs/sponsors/6/avatar"></a>
<a href="https://opencollective.com/grapesjs/sponsors/7/website"><img src="https://opencollective.com/grapesjs/sponsors/7/avatar"></a>
<a href="https://opencollective.com/grapesjs/sponsors/8/website"><img src="https://opencollective.com/grapesjs/sponsors/8/avatar"></a>
<a href="https://opencollective.com/grapesjs/sponsors/9/website"><img src="https://opencollective.com/grapesjs/sponsors/9/avatar"></a>

<a href="https://opencollective.com/grapesjs/backers/0/website"><img src="https://opencollective.com/grapesjs/backers/0/avatar"></a>
<a href="https://opencollective.com/grapesjs/backers/1/website"><img src="https://opencollective.com/grapesjs/backers/1/avatar"></a>
<a href="https://opencollective.com/grapesjs/backers/2/website"><img src="https://opencollective.com/grapesjs/backers/2/avatar"></a>
<a href="https://opencollective.com/grapesjs/backers/3/website"><img src="https://opencollective.com/grapesjs/backers/3/avatar"></a>
<a href="https://opencollective.com/grapesjs/backers/4/website"><img src="https://opencollective.com/grapesjs/backers/4/avatar"></a>
<a href="https://opencollective.com/grapesjs/backers/5/website"><img src="https://opencollective.com/grapesjs/backers/5/avatar"></a>
<a href="https://opencollective.com/grapesjs/backers/6/website"><img src="https://opencollective.com/grapesjs/backers/6/avatar"></a>
<a href="https://opencollective.com/grapesjs/backers/7/website"><img src="https://opencollective.com/grapesjs/backers/7/avatar"></a>
<a href="https://opencollective.com/grapesjs/backers/8/website"><img src="https://opencollective.com/grapesjs/backers/8/avatar"></a>
<a href="https://opencollective.com/grapesjs/backers/9/website"><img src="https://opencollective.com/grapesjs/backers/9/avatar"></a>



## License

BSD 3-clause


[wiki]: <https://github.com/artf/grapesjs/wiki>
[API-Reference]: <https://github.com/artf/grapesjs/wiki/API-Reference>
[CMS]: <https://it.wikipedia.org/wiki/Content_management_system>
