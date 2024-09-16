global.UpgradeBaseWindow = (function() {

  function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const room = feature.getConstruction();
      const background = room.getBackground();

      const casement = FeatureWindows.openCasementWith(feature, build(feature, room));
      casement.setTitle(room.getDisplayName());
      casement.setBounds(getBounds());
      casement.setBackground('rgb(15,15,15)');

      const content = casement.getCasementContent();
      content.querySelectorAll('.upgrade-button').forEach(button => {
        button.addEventListener('click', event => {
          executeUpgrade(event, feature, casement)
        });
      });

      if (background) {
        const backgroundElement = content.querySelector('.has-background');
        backgroundElement.style['background-image'] = X.assetURL(room.getBackground());
      }
    }
  }

  function build(feature, room) {
    const upgrades = feature.getPossibleUpgrades();

    let html = `<div class='upgrade-base-window'>`
    html += `<div class='banner has-background'></div>`
    html += `<div class='details'>${room.getDetails()}</div>`
    html += (upgrades.length > 0) ? `<ul class='construction-list'>` : `<div class='note'>No upgrades are currently available.</div>`;

    upgrades.forEach(code => {
      html += `<li>${buildUpgradeItem(feature, code)}</li>`
    });

    if (upgrades.length > 0) { html += `</ul>` }

    return `${html}</div>`
  }

  function buildUpgradeItem(feature, code) {
    const blueprint = Blueprint(code);

    return `
      <li class='construction-item'>
        <div class='name'>${blueprint.getDisplayName()}</div>
        <div class='item-details'>${blueprint.getDetails({ feature })}</div>
        <div class='bottom-row'>
          ${CostPanel.build(blueprint.getCost(feature))}
          <div class='actions'>
            <a href='#' class='upgrade-button button button-primary button-big' data-code='${code}'>Upgrade</a>
          </div>
        </div>
      </li>`;
  }

  function executeUpgrade(event, feature, casement) {
    feature.startConstruction(event.target.getAttribute('data-code'));
    casement.close();
  }

  function getBounds() {
    const position = MouseMonitor.getPosition();
    const top = position.y - 100;
    const left = position.x - 225;
    return { top, left, height:600, width:450 }
  }

  return Object.freeze({
    open,
  });

})();
