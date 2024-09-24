global.AspectPanel = (function() {

  function build(aspects) {
    let html = `<div class='aspect-panel'>`;

    aspects.toSorted((a,b) => {
      return a.getCode().localeCompare(b.getCode())
    }).forEach(aspect => {
      html += `<div class='icon icon-small aspect-icon icon-for-${aspect.getCode()}' data-aspect-tooltip='${aspect.getCode()}'>`
      if (aspect.getLevel() > 1) { html += `<div class='aspect-level'>${aspect.getLevel()}</div>`; }
      html += `</div>`
    });

    return html + `</div>`;
  }

  return Object.freeze({
    build
  });

})();
