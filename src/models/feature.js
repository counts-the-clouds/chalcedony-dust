global.Feature = function(data) {

  const $id = data.id || GameState.nextFeatureID();

  function getID() { return $id; }

  return Object.freeze({
    getID,
  });

}
