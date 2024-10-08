global.EmptyFeatureWindow = (function () {

  const roomNote = `This empty room could be made into something more useful.`
  const hallNote = `This empty hall could be made into something more useful.`

  async function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const casement = FeatureWindows.openCasementWith(feature,build());
      casement.setBounds(getBounds());
      casement.setBackground('rgb(15,15,15)')
      casement.setMinimumWidth(450);

      const content = casement.getCasementContent();
      setBannerImage(feature,content);
      setNote(feature,content);

      Blueprint.availableFor(feature).forEach(blueprint => {
        content.querySelector('.construction-list').appendChild(buildBlueprintItem(feature, blueprint));
      });

      casement.contentResized();
    }
  }

  function build() {
    return `
      <div class='empty-feature-window'>
        <div class='banner'></div>
        <div class='note'></div>
        <ul class='construction-list'></ul>
      </div>`;
  }

  function getBounds() {
    const position = MouseMonitor.getPosition();
    const top = position.y - 100;
    const left = position.x - 225;
    return { top:top, left:left, height:600, width:450 }
  }

  function setBannerImage(feature, content) {
    content.querySelector('.banner').style['background-image'] = X.assetURL(
      (feature.getType() === TileType.room) ? 'features/empty-room-banner.png' : 'features/empty-hall-banner.png');
  }

  function setNote(feature, content) {
    content.querySelector('.note').textContent = feature.getType() === TileType.room ? roomNote : hallNote;
  }

  // TODO: The cost for a construction isn't static. Some rooms like the
  //       gallery has a cost that changes with every gallery built. There's no
  //       need for the room model to actually have any of the cost functions
  //       but we could put something in the ConstructionHelper to calculate it
  //       I think.
  function buildBlueprintItem(feature, blueprint) {
    const blueprintItem = X.createElement(`
      <li class='construction-item'>
        <div class='name'>${blueprint.getDisplayName()}</div>
        <div class='details'>${blueprint.getDetails({ feature })}</div>
        <div class='bottom-row'>
          ${CostPanel.build(blueprint.getCost(feature))}
          <div class='actions'>
            <a href='#' class='button button-primary button-big'>Build</a>
          </div>
        </div>
      </li>`);

    blueprintItem.querySelector('a.button').addEventListener('click', () => {
      feature.startConstruction(blueprint.getCode());
      WindowManager.pop();
    });

    return blueprintItem
  }

  return Object.freeze({
    open,
  });

})();
