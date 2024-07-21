global.KeyboardMonitor = (function() {

  let $keyboardState;

  // Javascript makes it frusteratingly difficult to get the state of the
  // keyboard. This is an attempt to just globally monitor the keyboard events
  // to keep track of what keys might be down at any given time. It's not a
  // perfect solution. If the browser window loses focus, a key down may happen
  // without a key up even to ever clear that state.

  function clear() {
    $keyboardState = {
      keys: new Set(),
      modifiers:{
        alt: false,
        ctrl: false,
        shift: false,
        meta: false,
      }
    };
  }

  function start() {
    clear();
    window.addEventListener('keydown',onDown);
    window.addEventListener('keyup',onUp);
    window.addEventListener('blur',clear);
  }

  function stop() {
    $keyboardState = null;
    window.removeEventListener('keydown',onDown)
    window.removeEventListener('keyup',onUp)
  }

  // We return keys as an Array rather than as a Set, becuase I think that
  // would be less surprising for whatever is calling this.
  function getState() {
    return {
      keys: [...$keyboardState.keys],
      modifiers: $keyboardState.modifiers,
    };
  }

  function onDown(event) {
    setModifierState(event);
    if (!isModifier(event.code)) {
      $keyboardState.keys.add(event.code);
    }
  }

  function onUp(event) {
    setModifierState(event);
    $keyboardState.keys.delete(event.code);
  }

  function setModifierState(event) {
    $keyboardState.modifiers.alt = event.getModifierState("Alt");
    $keyboardState.modifiers.ctrl = event.getModifierState("Control");
    $keyboardState.modifiers.meta = event.getModifierState("Meta");
    $keyboardState.modifiers.shift = event.getModifierState("Shift");
  }

  // Tracking lock state is esentially impossible, so we ignore those keys. The
  // modifier keys are tracked with the getModifierState() function, rather
  // than relying on key up events which might never come.
  function isModifier(code) {
    if (code.includes("Alt")) { return true; }
    if (code.includes("Control")) { return true; }
    if (code.includes("Meta")) { return true; }
    if (code.includes("Shift")) { return true; }
    if (code.includes("Lock")) { return true; }
    return false;
  }

  return Object.freeze({
    clear,
    start,
    stop,
    getState,
  });

})();