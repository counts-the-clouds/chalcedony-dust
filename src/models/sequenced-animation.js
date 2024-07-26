global.SequencedAnimation = function (id, target) {

  const $id = id;
  const $target = target;
  const $keyframes = [];

  let $tween;
  let $frameIndex = 0;
  let $onComplete;

  function getID() { return $id; }
  function getTarget() { return $target; }
  function addKeyframe(properties, options) { $keyframes.push({ properties, options }); }

  function start() {
    const properties = new Set();

    $keyframes.forEach(frame => {
      Object.keys(frame.properties).forEach(key => {
        properties.add(key);
      });
    });

    const currentState = {};
    [...properties].forEach(key => {
      currentState[key] = target[key];
    });

    playFrame(currentState);
  }

  function playFrame(currentState) {
    const keyframe = $keyframes[$frameIndex];
    const duration = keyframe.options.duration || 1000;
    const easing = keyframe.options.easing || Easing.Linear.None;

    $tween = new Tween(currentState);
    $tween.to(keyframe.properties,duration);
    $tween.easing(easing);
    $tween.start();
    $tween.onUpdate(properties => {
      Object.keys(properties).forEach(key => {
        $target[key] = properties[key];
      })
    });

    $tween.onComplete(properties => {
      $frameIndex += 1;
      if ($frameIndex < $keyframes.length) { return playFrame(properties); }
      if (typeof $onComplete === 'function') { $onComplete($id) }
      AnimationController.onComplete($id);
    });
  }

  function update(time) {
    if ($tween) { $tween.update(); }
  }

  function onComplete(callback) {
    $onComplete = callback;
  }

  return Object.freeze({
    getID,
    getTarget,
    addKeyframe,
    start,
    update,
    onComplete,
  });

}