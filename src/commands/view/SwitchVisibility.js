module.exports = {
  run(ed) {
    const body = ed.Canvas.getBody();
    body.classList.add(this.ppfx + 'dashed');
  },

  stop(ed) {
    const body = ed.Canvas.getBody();
    body.classList.remove(this.ppfx + 'dashed');
  }
};
