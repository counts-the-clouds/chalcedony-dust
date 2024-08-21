global.HasAspects = function(data = {}) {

  const $aspectIDs = data.aspectIDs || [];

  function getAspects() {
    return $aspectIDs.map(id => AspectDataStore.get(id));
  }

  function addAspect(aspect) {
    const index = $aspectIDs.indexOf(aspect.getID());
    if (index >= 0) { throw `${aspect} already exists.` }
    $aspectIDs.push(aspect.getID());
  }

  function deleteAspect(aspect) {
    const index = $aspectIDs.indexOf(aspect.getID());
    if (index < 0) { throw `${aspect} does not exist.` }
    $aspectIDs.splice(index, 1);
  }

  // ===========================================================================

  function pack() {
    return {
      aspectIDs: $aspectIDs,
    };
  }

  function attach(model) {
    model.getAspects = getAspects;
    model.addAspect = addAspect;
    model.deleteAspect = deleteAspect;
  }

  return Object.freeze({
    pack,
    attach,
  });

}
