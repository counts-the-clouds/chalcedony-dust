global.Flick = function(code) {

  const data = FlickRegistry.lookup(code);

  const $code = code;
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

  // We might not be animating every property in every keyframe so when saving
  // off the initial state we first loop over all the keyframes, saving all the
  // animated properties into a set. We then get the initial properties off of
  // the animation target.
  //
  // It's possible some of the animatable properties can't be read this way. If
  // that's the case we'll have some other way of handling them.
  function setAnimationTarget(target) {
    $animationTarget = target;
    $initialState = {};

    let properties = new Set();

    $keyframes.forEach(keyframe => {
      Object.keys(keyframe.properties).forEach(key => {
        properties.add(key)
      });
    });

    [...properties].forEach(key => {
      $initialState[key] = $animationTarget[key];
    });
  }

  // When we start the animation we create an ease for the first keyframe. When
  // the first frame is finished playing we advance the frame index, and if
  // there's another frame we play that. If we've run out of frames we remove
  // this flick from the AnimationController.
  function start() {
    const keyframe = $keyframes[$frameIndex];
    Ease.ease.add($animationTarget, keyframe.properties, keyframe.options).once('complete', (thing) => {
      (++$frameIndex < $keyframes.length) ? start() : AnimationController.removeFlick($animationID);
    })
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
    start,
  });

}
