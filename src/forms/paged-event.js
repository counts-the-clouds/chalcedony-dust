global.PagedEvent = function(code) {

  const $code = code;

  let $pageIndex = 0;
  let $stageIndex = 0;

  let $context = {};
  let $stages;

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
  function getLayout() { return getEventData().layout || _defaultLayout; }
  function getImage() { return getEventData().image; }

  function getStages() {
    if ($stages) { return [...$stages]; }
    throw `The compile() function should be called before accessing event content.`
  }

  function onBefore() {
    if (typeof getEventData().onBefore === 'function') {
      try {
        $context = getEventData().onBefore($context);
      }
      catch(error) {
        logError(`Error in ${toString()}.onBefore()`,error,{ system:'PagedEvent' });
      }

      if ($context == null) {
        log('Context should not be null here. Did you forget to return the context object I just gave you?', {
          level: 1,
          type: _warning,
          system: 'PagedEvent',
          data: { code:$code },
        });
      }
    }
  }

  function onFinish(state) {
    if (typeof getEventData().onFinish === 'function') {
      try {
        getEventData().onFinish(state)
      }
      catch(error) {
        logError(`Error in ${toString()}.onFinish()`,error,{ system:'PagedEvent' });
      }
    }
  }

  // === Compilation ===========================================================

  function compile() {
    $stages = [];

    const weaver = Weaver($context);

    getEventData().stages.forEach(stage => {
      if (shouldIncludeStage(stage)) {
        const compiledStage = { ...stage };
        compiledStage.pages = [];

        stage.pages.forEach(page => {
          if (shouldIncludePage(page)) {
            page.text = weaver.weave(page.text)
            compiledStage.pages.push(page);
          }
        });

        $stages.push(compiledStage);
      }
    });
  }

  function shouldIncludeStage(stage) {
    console.log("Should Include Stage? ", stage);
    return true;
  }

  function shouldIncludePage(page) {
    console.log("Should Include Page? ", page);
    return true;
  }

  // ===========================================================================

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
    getLayout,
    getImage,
    getStages,
    onBefore,
    onFinish,
    compile,
    toString,
  });
}
