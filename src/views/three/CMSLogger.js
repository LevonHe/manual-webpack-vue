export default class CMSLogger {
  constructor(elem) {
    this.elem = elem;
    this.lines = [];
  }

  log(content, indent) {
    this.lines.push({ content, indent });
  }

  render(x, y) {
    if (!this.elem.offsetParent) {
      return;
    }
    this.elem.offsetParent.style.opacity = 1;
    this.elem.innerHTML = '';
    this.lines.forEach((line, index) => {
      if (index === 0) {
        this.elem.innerHTML += `<p style="text-indent: ${line.indent}px; margin: 5px;"><span style="display: inline-block; margin-right: 5px; border: none; border-radius: 50%; width: 8px; height: 8px; background-color: #fff;"></span>${line.content}</p>`;
      } else {
        this.elem.innerHTML += `<p style="text-indent: ${line.indent}px; margin: 5px;">${line.content}</p>`;
      }
    });
    if (typeof x === 'string') {
      this.elem.offsetParent.style.left = x + '%';
      this.elem.offsetParent.style.top = y + '%';
    } else {
      this.elem.offsetParent.style.left = x + 'px';
      this.elem.offsetParent.style.top = y + 'px';
    }
    this.lines = [];
  }

  clear() {
    this.lines = [];
    if (!this.elem.offsetParent) {
      return;
    }
    this.elem.offsetParent.style.opacity = 0;
  }
}
