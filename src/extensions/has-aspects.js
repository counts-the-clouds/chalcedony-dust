global.HasAspects = function(data = {}) {

  const $aspects = data.aspects || {};

  function getAspects() {
    return Object.keys($aspects).map(code => {
      return Aspect(code, $aspects[code]);
    });
  }

  function setAspect(code, value) { $aspects[code] = value;  }
  function hasAspect(code) { return $aspects[code] != null; }
  function getAspect(code) { return hasAspect(code) ? Aspect(code,$aspects[code]) : null; }
  function removeAspect(code) { if (hasAspect(code)) { delete $aspects[code]; } }

  // ===========================================================================

  function pack() {
    return {
      aspects: $aspects,
    };
  }

  function attach(model) {
    model.getAspects = getAspects;
    model.setAspect = setAspect;
    model.hasAspect = hasAspect;
    model.getAspect = getAspect;
    model.removeAspect = removeAspect;
  }

  return Object.freeze({
    pack,
    attach,
  });

}
