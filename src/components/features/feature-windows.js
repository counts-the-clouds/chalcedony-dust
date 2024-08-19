global.FeatureWindows = (function() {

  async function open(feature) {
    if (feature.getState() !== FeatureState.complete) {
      throw `Unexpected state for feature window: ${feature} ${feature.getState()}`;
    }

    if (feature.getType() === TileType.node) {
      buildGuardianSelector(feature);
    }

    if (feature.getType() === TileType.resource) {
      buildResourceNode(feature);
    }

    if ([TileType.hall, TileType.room].includes(feature.getType())) {
      await openEmptyFeatureWindow(feature);
    }
  }

  async function openCasementFor(feature, viewPath) {
    if (Casement.getAssociatedCasements(feature.toString()).length === 0) {
      const casement = await Casement.fromPath(viewPath);
      casement.setAssociatedWith(feature.toString());
      casement.setTitle(feature.getDisplayName());
      return casement;
    }
  }

  async function buildGuardianSelector(feature) {
    // Working on adding guardians.
  }

  async function buildResourceNode(feature) {
    // Need another state type for a constructed node I think.
  }

  // === Empty Feature Window ==================================================

  async function openEmptyFeatureWindow(feature) {
    const casement = await openCasementFor(feature,'views/empty-feature-window.html');
    if (casement) {
      casement.setBounds({ top:20, left:20, height:600, width:450 });
      casement.setBackground('rgb(15,15,15)')
      casement.setMinimumWidth(450);

      ConstructionHelper.availableFor(feature).forEach(construction => {
        const constructionItem = buildConstructionItem(construction);
        constructionItem.querySelector('a.button').addEventListener('click', () => {
          console.log("Execute Build:",feature.toString(),construction.code);
        });

        casement.getCasementContent().querySelector('.construction-list').appendChild(constructionItem);
      });

      casement.contentResized();
    }
  }

  function buildConstructionItem(construction) {
    return X.createElement(`
      <li class='construction-item'>
        <div class='name'>${construction.displayName}</div>
        <div class='description'>${construction.description}</div>
        <div class='bottom-row'>
          ${CostPanel.build(construction.cost)}
          <div class='actions'>
            <a href='#' class='button button-primary button-small'>Build</a>
          </div>
        </div>
      </li>`);
  }

  return Object.freeze({
    open,
  });

})();