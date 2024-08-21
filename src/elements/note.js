global.Note = (function() {

  let $heldNote;

  function clear() {
    $heldNote = null;

    const noteArea = X.first('#noteArea');
    X.removeClass(noteArea,'show');
    X.addClass(noteArea,'hide');
  }

  function show(code) {
    if ($heldNote) { clear(); }

    $heldNote = NoteRegistry.lookup(code);

    window.setTimeout(showHeldNote, ($heldNote.delay || 100));
  }

  function showHeldNote() {
    if ($heldNote) {
      const noteArea = X.first('#noteArea');
      X.empty(noteArea);
      noteArea.innerHTML = `<p class='note'>${$heldNote.text}</p>`

      X.removeClass(noteArea,'hide');
      window.setTimeout(() => { X.addClass(noteArea,'show'); },10);
    }
  }

  return Object.freeze({
    clear,
    show,
  });

})();
