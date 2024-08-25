global.MinionWindow = (function() {

  let $slideWindow;

  function build() {
    $slideWindow = SlideWindow({ selector:'#minionsWindow' });
    updateHeader();
    updateMinions();
  }

  function updateHeader() {
    $slideWindow.setHeader(X.createElement(`<span class='minions-state empty'>There are no active lairs.</span>`))
  }

  function updateMinions() {
    $slideWindow.setContent(X.createElement(`<div class='empty'>&nbsp;</div>`))
  }

  function reposition() { $slideWindow.reposition(); }

  return Object.freeze({
    build,
    reposition,
  });

})();

