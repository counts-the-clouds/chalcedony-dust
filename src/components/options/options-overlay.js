global.OptionsOverlay = (function() {

  const $forbiddenCodes = [
    _keyCodeF11,
    _keyCodeEnter,
    _keyCodeBackquote,
    _keyContextMenu,
    _keyCodeCapsLock,
    _keyCodePageUp,
    _keyCodePageDown,
    _keyCodeHome,
    _keyCodeEnd,
    _keyCodeShiftLeft,
    _keyCodeShiftRight,
    _keyControlLeft,
    _keyControlRight,
    _keyAltLeft,
    _keyAltRight,
    _keyMetaLeft,
  ];

  let $recordingState = {};
  let $dirty = false;

  function init() {
    // X.onCodeDown(_keyCodeEscape, () => { return isOpen() && !isRecording() }, close);
    // X.onClick('#optionsOverlay a.close-button', close);
    // X.onClick('#optionsOverlay a.save-button', save);
    // X.onClick('#keyBindingList .binding-input', startRecording);

    // window.addEventListener('keydown', onKeyDown);
  }

  function build() {
  //   Template.load('#optionsOverlay','client/views/optionsOverlay/options-overlay.html').then(() => {
  //     ScrollingPanel.build('#optionsOverlay .scrolling-panel');
  //     buildKeyBindings();
  //   });
  }

  function show() {
  //   let mainMenu = X.first('#mainMenu');
  //   if (mainMenu) {
  //     X.addClass(mainMenu,'hide');
  //   }

  //   X.removeClass('#optionsOverlay','hide');
  //   ScrollingPanel.resize('#optionsOverlay .scrolling-panel');
  }

  function close() {
  //   X.addClass('#optionsOverlay','hide');
  //   X.removeClass('#mainMenu','hide');
  //   TabController.setActiveByName(X.first('#optionsOverlay .tab-control'),'stuff');
  }

  function isOpen() {
  //   return !X.hasClass('#optionsOverlay','hide');
  }

  // function save() {
  //   if ($dirty) {
  //     ClientCommands.send('options.save', pack()).then(response => {
  //       if (response.status === _success) { saveSuccessful(response.worldState.options); }
  //     });
  //   }

  //   close();
  // }

  // function saveSuccessful(options) {
  //   WorldState.options = options;

  //   new Alert({
  //     message: 'Options Saved',
  //     position: 'side',
  //     classname: 'success',
  //     fadeTime: 1000,
  //   }).display();
  // }

  // // === Key Bindings =========================================================

  // function buildKeyBindings() {
  //   let listElement = X.first("#keyBindingList");

  //   WorldState.options.keyBindings.forEach(function(binding) {
  //     let item = X.createElement(`
  //       <li data-action="${binding.action}">
  //         <span class="binding-name">${binding.name}</span>
  //         <span class="binding-input b-1" data-code="${binding.codes[0] || ''}">${labelFor(binding.codes[0])}</span>
  //         <span class="binding-input b-2" data-code="${binding.codes[1] || ''}">${labelFor(binding.codes[1])}</span>
  //       </li>`);

  //     listElement.appendChild(item);
  //   });
  // }

  // function labelFor(code) {
  //   if (code == null) { return "&nbsp;"; }
  //   if (code.startsWith('Key')) { return code.substring(3); }
  //   if (code.startsWith('Arrow')) { return code.substring(5); }
  //   if (code.startsWith('Digit')) { return code.substring(5); }
  //   if (code.startsWith('Numpad')) { return `NP ${code.substring(6)}`; }

  //   return code;
  // }

  // // Pack all the options, but mostly keybindings for now.
  // function pack() {
  //   let options = { ... WorldState.options };
  //   let listItems = X("#keyBindingList li");

  //   for (let i=0; i<listItems.length; i++) {
  //     let listItem = listItems[i];
  //     let code1 = listItem.querySelector('.b-1').dataset.code;
  //     let code2 = listItem.querySelector('.b-2').dataset.code;

  //     // Nulls are saved as empty strings on the data attributes, but need to
  //     // be saved as actual nulls.
  //     code1 = code1 === '' ? null : code1;
  //     code2 = code2 === '' ? null : code2;

  //     options.keyBindings[i].codes[0] = code1
  //     options.keyBindings[i].codes[1] = code2
  //   }

  //   return options;
  // }

  // function isRecording() {
  //   return $recordingState.action != null
  // }

  // function startRecording(event) {
  //   if ($recordingState.action) { stopRecording(); }

  //   let inputElement = event.target;
  //   let listElement = event.target.closest('li');

  //   $recordingState = {
  //     action: listElement.dataset.action,
  //     inputElement: inputElement,
  //     listElement: listElement,
  //   }

  //   X.addClass(inputElement,'recording')
  // }

  // function stopRecording() {
  //   X.removeClass($recordingState.inputElement, 'recording');
  //   $recordingState = {};
  // }

  // // The keyboard listener is always present, but only acts if there's
  // // something in the recording state.
  // function onKeyDown(event) {
  //   if (isRecording()) {
  //     event.preventDefault();
  //     setKeybinding(event.code);
  //     stopRecording();
  //   }
  // }

  // // Pressing the escape key will remove whatever keybinding is set.
  // function setKeybinding(code) {
  //   if (!$forbiddenCodes.includes(code)) {
  //     if (code === _keyCodeEscape) { code = null; }

  //     $recordingState.inputElement.innerHTML = labelFor(code);
  //     $recordingState.inputElement.dataset.code = code || '';
  //     $dirty = true;
  //   }
  // }

  return {
    init,
    build,
    show,
    isOpen,
  };

})();
