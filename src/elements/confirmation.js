global.Confirmation = (function() {

  let $yesFunction;
  let $noFunction;
  let $previousSpeed;

  function init() {
    X.onClick('#confirmationDialog .no-button', noClicked);
    X.onClick('#confirmationDialog .yes-button', yesClicked);
  }

  // Options:
  //   text: string
  //   element: element
  //   onConfirm: function
  //   onCancel: function
  function show(options) {
    ClockManager.forcePause();
    $yesFunction = options.onConfirm;
    $noFunction = options.onCancel;

    if (options.element) {
      X.fill('#confirmationDialog .confirm-window .content', options.element);
    }
    if (options.text) {
      X.first('#confirmationDialog .confirm-window .content').innerHTML = `<div class='confirm-text'>${options.text}</div>`;
    }

    X.removeClass('#confirmationDialog','hide');
  }

  function hide() {
    ClockManager.unforcePause();
    X.addClass('#confirmationDialog','hide');
  }

  function noClicked() {
    if (typeof $noFunction === 'function') { $noFunction(); }
    hide()
  }

  function yesClicked() {
    if (typeof $yesFunction === 'function') { $yesFunction(); }
    hide()
  }

  return Object.freeze({
    init,
    show,
  });

})();