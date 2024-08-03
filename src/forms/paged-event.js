global.PagedEvent = function(code) {

  const $code = code;

  let $pageIndex = 0;
  let $stageIndex = 0;

  function getCode() { return $code; }

  // === Stage and Page Progression ============================================

  function getPageIndex() { return $pageIndex; }
  function getStageIndex() { return $stageIndex; }

  // TODO: Rather than pulling from the event data directly, we'll probably
  //       need to do template replacement on the event text, then pull the
  //       page from this rendered version. Both pages and stage may have
  //       requirements as well that removes them from the rendered event.
  //
  function getCurrentStage() { return getStages()[$stageIndex]; }
  function getNextStage() { return getStages()[$stageIndex + 1]; }
  function getCurrentPage() { return getCurrentStage().pages[$pageIndex]; }

  function advancePage() {
    if ($pageIndex < getCurrentStage().pages.length - 1) {
      $pageIndex += 1;
      return true;
    }

    $pageIndex = 0;
    $stageIndex += 1;

    // We return true if there is another stage to show, otherwise we return
    // false and getCurrentStage() should return null now.
    return ($stageIndex < getStages().length)
  }

  function getEventData() { return EventRegistry.lookup($code); }
  function getStages() { return getEventData().stages; }

  function onFinish(state) {
    let finisher = getEventData().onFinish;
    if (typeof finisher === 'function') { finisher(state) }
  }

  function toString() {
    return `PagedEvent[${$code}]`
  }

  return Object.freeze({
    getCode,
    getPageIndex,
    getStageIndex,
    getCurrentStage,
    getNextStage,
    getCurrentPage,
    advancePage,
    getEventData,
    getStages,
    onFinish,
    toString,
  });
}
