const $ = Backbone.$;

module.exports = Backbone.View.extend({
  initialize() {
    const model = this.model;
    model.view = this;
    this.conf = model.config;
    this.pn = model.get('Panels');
    model.on('loaded', () => {
      this.pn.active();
      this.pn.disableButtons();
      model.runDefault();
      setTimeout(() => model.trigger('load'), 0);
    });
  },

  render() {
    const model = this.model;
    const el = this.$el;
    const conf = this.conf;
    const pfx = conf.stylePrefix;
    el.empty();

    let canvasDocumentTemplate = null;
    let contEl = $(conf.el || `body ${conf.container}`);

    // If the entire document serves as the template, we need to tranpose the canvas with the doc
    if (conf.fromDocument) {
      // Create a template from the original document except for elements to be ignored
      // and for the body because this is embedded from parsed components.
      // <style> tags from the head should not be copied because these are parsed by the
      // css parser and embedded into the document
      const mdoc = window.document;
      const tree = $(mdoc.documentElement).clone(true, true);
      const fromDocElements = tree
        .find('[data-gjs-from-doc-ignore]')
        .clone(true, true);
      tree.find('[data-gjs-from-doc-ignore], body, head > style').remove();
      canvasDocumentTemplate = tree.get(0).outerHTML;
      tree.remove();

      // now that the main document has been cloned it can be transposed with the iframe
      // therefore the main document's template (i.e. the document containing the canvas)
      // should be reset to a clean template
      // first reset the main document's doctype to HTML5
      var newDoctype = mdoc.implementation.createDocumentType('html', '', '');
      if (mdoc.doctype) {
        mdoc.doctype.parentNode.replaceChild(newDoctype, mdoc.doctype);
      } else {
        mdoc.insertBefore(newDoctype, mdoc.childNodes[0]);
      }

      // FIXME: the data-gjs-from-doc-ignore attribute should be renamed to
      // data-gjs-from-doc and they should be included in the template
      // now reset the html of the document
      // the body will be replaced later with the canvas
      $(mdoc.documentElement).html(`
        <head>
          <meta charset="utf8">
          <title></title>
        </head>
        <body></body>
      `);

      // re-insert grapes related elements such as grapes css
      $(mdoc.head).append(fromDocElements);

      // cleanup the html element itself
      Array.from(mdoc.documentElement.attributes).forEach(({ name }) => {
        $(mdoc.documentElement).removeAttr(name);
      });

      contEl = $(mdoc.body);
    }

    if (conf.width) contEl.css('width', conf.width);

    if (conf.height) contEl.css('height', conf.height);

    el.append(model.get('Canvas').render(canvasDocumentTemplate));
    el.append(this.pn.render());
    el.attr('class', `${pfx}editor ${pfx}one-bg ${pfx}two-color`);
    contEl
      .addClass(`${pfx}editor-cont`)
      .empty()
      .append(el);

    return this;
  }
});
