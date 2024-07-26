global.Flick = function(code) {

  const data = FlickRegistry.lookup(code);

  const $code = code;
  const $easing = data.easing;
  const $keyframes = data.keyframes;

  let $frameIndex = 0;
  let $animationID;
  let $animationTarget;
  let $initialState;

  function getCode() { return $code; }
  function getKeyframes() { return [...$keyframes]; }
  function getFrameIndex() { return $frameIndex; }
  function getAnimationID() { return $animationID; }
  function setAnimationID(id) { $animationID = id; }
  function getAnimationTarget() { return $animationTarget; }
  function getInitialState() { return $initialState; }

  function setFrameIndex(index) {
    if (index < 0 || index >= $keyframes.length) { throw "Frame index out of bounds."; }
    $frameIndex = index;
  }

  function getEasing() {
    if ($keyframes[$frameIndex].easing) { return asTweenEasing($keyframes[$frameIndex].easing) }
    if ($easing) { return asTweenEasing($easing); }
    return Tween.Easing.Linear.None;
  }

  function asTweenEasing(ease) {
    return Tween.Easing[ease[0]][ease[1]];
  }

  function setAnimationTarget(target) {
    $animationTarget = target;
    $initialState = {};

    let properties = new Set();

    $keyframes.forEach(keyframe => {
      Object.keys(keyframe).filter(key => !['time'].includes(key)).forEach(key => {
        properties.add(key);
      });
    });

    [...properties].forEach(key => {
      $initialState[key] = $animationTarget[key];
    });
  }

  return Object.freeze({
    getCode,
    getKeyframes,
    getFrameIndex,
    setFrameIndex,
    getAnimationID,
    setAnimationID,
    getAnimationTarget,
    setAnimationTarget,
    getInitialState,
    getEasing,
  });

}
