window.EventView = (function() {

  let $event;
  let $returnState;

  function init() {
    // X.onClick('#clickAdvance', nextPage);
    // X.onClick('#eventView .continue-button', nextStage);
    X.loadDocument('#eventArea','/views/event-view.html');
  }

  function show(data) {
    log("Show",{ system:"EventView", data:data });

    X.removeClass('#eventView','hide');

  //   $event = TileEvent.unpack(data.event);
  //   $returnState = { };

  //   setLayout();
  //   showStage();
  }

  function isVisible() {
    return !X.hasClass('#eventView','hide');
  }

  // function completeEvent() {
  //   X.addClass('#eventView','hide');
  //   X.empty('#eventView #textArea');
  //   X.addClass('#clickAdvance','hide');
  //   X.addClass('#eventView .continue-button','hide');
  //   X.removeClass('#eventView .continue-button','show');

  //   ClientCommands.send('event.finished', $event.pack(), $returnState);

  //   $event.onClientFinish($returnState);
  //   $event = null;
  // }

  // function setLayout() {
  //   X.removeClass('#eventView','hide');
  // }

  // function showStage() {
  //   let stage = $event.getCurrentStage();
  //   if (stage.pages) { return showPage(); }

  //   throw `Unrecognized Stage Type`;
  // }

  // function showPage() {
  //   let page = $event.getCurrentPage();

  //   if (shouldShowContinue()) { enableContinueButton(); }
  //   if (shouldClickAdvance()) { enableClickAdvance(); }

  //   let container = X.first('#eventView #textArea');
  //   X.empty(container);

  //   container.appendChild(X.createElement(`<p class='event-text'>${page.text}</p>`));
  // }

  // // We should show the continue button when we are on the last page of the
  // // stage when we are on the last stage or when the next stage doesn't have
  // // pages.
  // function shouldShowContinue() {
  //   if ($event.getPageIndex() === $event.getCurrentStage().pages.length - 1) {
  //     let nextStage = $event.getNextStage();
  //     return nextStage == null || nextStage.pages == null;
  //   }
  //   return false;
  // }

  // // We should enable the click advance when we are not at the last page of the
  // // stage or when the next stage has pages.
  // function shouldClickAdvance() {
  //   if ($event.getPageIndex() < $event.getCurrentStage().pages.length - 1) { return true; }
  //   if ($event.getNextStage() && $event.getNextStage().pages != null) { return true; }
  //   return false;
  // }

  // function enableClickAdvance() {
  //   if (X.hasClass('#clickAdvance','hide')) {
  //     X.removeClass('#clickAdvance','hide');
  //     X.addClass('#eventView .continue-button','hide');
  //   }
  // }

  // // Adding the 'show' class to the continue button needs to be done in a short
  // // timeout so that the transition works.
  // function enableContinueButton() {
  //   if (X.hasClass('#eventView .continue-button','hide')) {
  //     X.removeClass('#eventView .continue-button','hide');
  //     X.addClass('#clickAdvance','hide');

  //     window.setTimeout(() => {
  //       X.addClass('#eventView .continue-button','show');
  //     },10);
  //   }
  // }

  // function nextStage() {
  //   $event.advancePage() ? showStage() : completeEvent();
  // }

  // function nextPage() {
  //   if ($event.advancePage()) { return showPage(); }
  //   throw `Event is complete, but this should have been called by the complete button I think?`
  // }

  return {
    init,
    show,
    isVisible,
  }

})();
