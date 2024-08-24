global.EmptyFeatureWindow = (function () {

  const roomNote = `This empty room could be made into something more useful.`
  const hallNote = `This empty hall could be made into something more useful.`

  async function open(feature) {
    const casement = FeatureWindows.openCasementWith(feature,`
      <div class='empty-feature-window'>
        <div class='banner'></div>
        <div class='note'></div>
        <ul class='construction-list'></ul>
      </div>`);

    if (casement) {
      casement.setBounds({ top:20, left:20, height:600, width:450 });
      casement.setBackground('rgb(15,15,15)')
      casement.setMinimumWidth(450);

      const content = casement.getCasementContent();
      setBannerImage(feature,content);
      setNote(feature,content);

      ConstructionHelper.availableFor(feature).forEach(construction => {
        content.querySelector('.construction-list').appendChild(buildConstructionItem(feature, construction));
      });

      casement.contentResized();
    }
  }

  function setBannerImage(feature, content) {
    content.querySelector('.banner').style['background-image'] = X.assetURL(
      (feature.getType() === TileType.room) ? 'ui/empty-room-banner.png' : 'ui/empty-hall-banner.png');
  }

  function setNote(feature, content) {
    content.querySelector('.note').textContent = feature.getType() === TileType.room ? roomNote : hallNote;
  }

  // TODO: The cost for a construction isn't static. Some rooms like the
  //       gallery has a cost that changes with every gallery built. There's no
  //       need for the room model to actually have any of the cost functions
  //       but we could put something in the ConstructionHelper to calculate it
  //       I think.
  function buildConstructionItem(feature, construction) {
    const constructionItem = X.createElement(`
      <li class='construction-item'>
        <div class='name'>${construction.displayName}</div>
        <div class='description'>${construction.description}</div>
        <div class='bottom-row'>
          ${CostPanel.build(construction.cost)}
          <div class='actions'>
            <a href='#' class='button button-primary button-big'>Build</a>
          </div>
        </div>
      </li>`);

    constructionItem.querySelector('a.button').addEventListener('click', () => {
      feature.startConstruction(construction.code);
      WindowManager.pop();
    });

    return constructionItem
  }

  return Object.freeze({
    open,
  });

})();
