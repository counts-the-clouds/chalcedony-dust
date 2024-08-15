global.OptionsOverlay = (function() {

  const $forbiddenCodes = [
    KeyCodes.F11,
    KeyCodes.Enter,
    KeyCodes.Backquote,
    KeyCodes.ContextMenu,
    KeyCodes.CapsLock,
    KeyCodes.PageUp,
    KeyCodes.PageDown,
    KeyCodes.Home,
    KeyCodes.End,
    KeyCodes.ShiftLeft,
    KeyCodes.ShiftRight,
    KeyCodes.ControlLeft,
    KeyCodes.ControlRight,
    KeyCodes.AltLeft,
    KeyCodes.AltRight,
    KeyCodes.MetaLeft,
  ];

  let $recordingState = {};
  let $isDirty = false;
  let $isBuilt = false;

  function init() {
    X.onClick('#keyBindingList .binding-input', startRecording);

    X.onClick('#optionsOverlay a.close-button', () => {
      WindowManager.pop();
    });

    X.onClick('#optionsOverlay a.save-button', () => {
      save();
      WindowManager.pop();
    });

    window.addEventListener('keydown', onKeyDown);
  }

  function build() {
    X.loadDocument('#optionsOverlay','views/options-overlay.html');
    ScrollingPanel.build('#optionsOverlay .scrolling-panel');
    buildKeyBindings();
  }

  function open() {
    if ($isBuilt === false) { OptionsOverlay.build(); }

    MainMenu.hide();
    X.removeClass('#optionsOverlay','hide');
    ScrollingPanel.resize('#optionsOverlay .scrolling-panel');
  }

  function close() {
    TabController.setActiveByName(X.first('#optionsOverlay .tab-control'),'stuff');
    X.addClass('#optionsOverlay','hide');
    MainMenu.show();
  }

  function save() {
    if ($isDirty) {
      WorldState.setOptions(pack()).then(saveSuccessful);
    }
  }

  function saveSuccessful() {
    Alert.show({
      message: 'Options Saved',
      position: AlertPosition.side,
      type: LogType.success,
      fadeTime: 1000,
    });
  }

  // === Key Bindings =========================================================

  function buildKeyBindings() {
    let listElement = X.first("#keyBindingList");

    WorldState.getKeyBindings().forEach(function(binding) {
      let item = X.createElement(`
        <li data-action="${binding.action}">
          <span class="binding-name">${binding.name}</span>
          <span class="binding-input b-1" data-code="${binding.codes[0] || ''}">${labelFor(binding.codes[0])}</span>
          <span class="binding-input b-2" data-code="${binding.codes[1] || ''}">${labelFor(binding.codes[1])}</span>
        </li>`);

      listElement.appendChild(item);
    });

    $isBuilt = true;
  }

  function labelFor(code) {
    if (code == null) { return "&nbsp;"; }
    if (code.startsWith('Key')) { return code.substring(3); }
    if (code.startsWith('Arrow')) { return code.substring(5); }
    if (code.startsWith('Digit')) { return code.substring(5); }
    if (code.startsWith('Numpad')) { return `NP ${code.substring(6)}`; }

    return code;
  }

  // Pack all the options, but mostly keybindings for now.
  function pack() {
    let options = { ... WorldState.getOptions() };
    let listItems = X("#keyBindingList li");

    for (let i=0; i<listItems.length; i++) {
      let listItem = listItems[i];
      let code1 = listItem.querySelector('.b-1').dataset.code;
      let code2 = listItem.querySelector('.b-2').dataset.code;

      // Nulls are saved as empty strings on the data attributes, but need to
      // be saved as actual nulls.
      code1 = code1 === '' ? null : code1;
      code2 = code2 === '' ? null : code2;

      options.keyBindings[i].codes[0] = code1
      options.keyBindings[i].codes[1] = code2
    }

    return options;
  }

  function isRecording() {
    return $recordingState.action != null
  }

  function startRecording(event) {
    if ($recordingState.action) { stopRecording(); }

    let inputElement = event.target;
    let listElement = event.target.closest('li');

    $recordingState = {
      action: listElement.dataset.action,
      inputElement: inputElement,
      listElement: listElement,
    }

    X.addClass(inputElement,'recording')
  }

  function stopRecording() {
    X.removeClass($recordingState.inputElement, 'recording');
    $recordingState = {};
  }

  // The keyboard listener is always present, but only acts if there's
  // something in the recording state.
  function onKeyDown(event) {
    if (isRecording()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      setKeybinding(event.code);
      stopRecording();
    }
  }

  // Pressing the escape key will remove whatever keybinding is set.
  function setKeybinding(code) {
    if (!$forbiddenCodes.includes(code)) {
      if (code === KeyCodes.Escape) { code = null; }

      $recordingState.inputElement.innerHTML = labelFor(code);
      $recordingState.inputElement.dataset.code = code || '';
      $isDirty = true;
    }
  }

  function toString() { return `OptionsOverlay` }

  return {
    init,
    build,
    open,
    close,
    toString,
  };

})();
