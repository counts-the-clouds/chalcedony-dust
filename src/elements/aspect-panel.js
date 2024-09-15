global.AspectPanel = (function() {

  function build(aspects) {
    let html = `<div class='aspect-panel'>`;

    aspects.forEach(aspect => {
      html += `<div class='aspect-icon icon-for-${aspect.getCode()}'>`
      html += `<div class='aspect-tooltip'>${aspect.getName()}</div>`
      if (aspect.getLevel() > 1) { html += `<div class='aspect-level'>${aspect.getLevel()}</div>`; }
      html += `</div>`
    });

    return html + `</div>`;
  }

  return Object.freeze({
    build
  });

})();
