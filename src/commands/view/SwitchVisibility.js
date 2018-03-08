module.exports = {
  run(ed) {
    const body = ed.Canvas.getBody();
    body.className += ' ' + this.ppfx + 'dashed';
  },

  stop(ed) {
    const body = ed.Canvas.getBody();
    body.className = body.className.replace(this.ppfx + 'dashed', '');
  }
};
