global.WindowManager = (function() {

  let $windowStack = [];

  function init() {
    X.onCodeDown(_keyCodeEscape,true,() => {
      if (Console.isVisible()) { return Console.hide(); }
      if ($windowStack.length > 0) { return pop() }

      if (!MainMenu.isVisible()) {
        MainMenu.open();
        push(MainMenu);
      }
    });
  }

  function push(modal) {
    $windowStack.push(modal);
  }

  function pop() {
    $windowStack.pop().close();
  }

  return Object.freeze({
    init,
    push,
    pop,
  });

})();