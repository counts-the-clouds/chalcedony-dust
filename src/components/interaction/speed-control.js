global.SpeedControl = (function() {

  function init() {
    X.onClick('#speedControl .pause', () => { onClick(0); })
    X.onClick('#speedControl .speed-1', () => { onClick(1); })
    X.onClick('#speedControl .speed-2', () => { onClick(2); })
    X.onClick('#speedControl .speed-3', () => { onClick(3); })
  }

  function show() { X.removeClass('#speedControl','hide'); }
  function hide() { X.addClass('#speedControl','hide'); }
  function isVisible() { return !X.hasClass('#speedControl','hide'); }
  function onClick(speed) { ClockManager.setClockSpeed(speed); }

  function activate(speed) {
    X.removeClass('#speedControl .button','button-primary');
    X.removeClass('#speedControl .button','button-danger');
    (speed === 0) ? X.addClass('#speedControl .pause','button-danger') :
                    X.addClass(`#speedControl .speed-${speed}`,'button-primary');
  }

  return Object.freeze({
    init,
    show,
    hide,
    isVisible,
    activate,
  })

})();