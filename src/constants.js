
// Set global constants here. Because they're actually just properties on the
// global object they're not actually immutable. Prefix them with an underscore
// to indicate that they shouldn't be set.

global._dungeonChunkSize = 16;

// === Return (and logging) Codes ===
global._info = "info";
global._success = "success";
global._warning = "warning";
global._error = "error";

// === Key Codes ===

global._keyCodeBackquote = 'Backquote';
global._keyCodeEnter = 'Enter';
global._keyCodeEscape = 'Escape';
global._keyCodeSpace = 'Space';

global._keyCodeCapsLock = 'CapsLock';
global._keyCodeShiftLeft = 'ShiftLeft';
global._keyCodeShiftRight = 'ShiftRight';
global._keyControlLeft = 'ControlLeft';
global._keyControlRight = 'ControlRight';
global._keyAltLeft = 'AltLeft';
global._keyAltRight = 'AltRight';
global._keyMetaLeft = 'MetaLeft';
global._keyContextMenu = 'ContextMenu';

global._keyCodePageUp = 'PageUp';
global._keyCodePageDown = 'PageDown';
global._keyCodeHome = 'Home';
global._keyCodeEnd = 'End';

global._keyCodeArrowUp = 'ArrowUp';
global._keyCodeArrowDown = 'ArrowDown';
global._keyCodeArrowLeft = 'ArrowLeft';
global._keyCodeArrowRight = 'ArrowRight';

global._keyCodeA = 'KeyA';
global._keyCodeD = 'KeyD';
global._keyCodeE = 'KeyE';
global._keyCodeQ = 'KeyQ';
global._keyCodeS = 'KeyS';
global._keyCodeW = 'KeyW';

global._keyCodeF11 = 'F11';

// === Directions ===
global._n = 'n';
global._s = 's';
global._e = 'e';
global._w = 'w';

// === Edge Types ===
global._any = 'any';
global._forbidden = 'forbidden';
global._forestPath = 'forest-path'

global._stone = 'stone'
global._room = 'room'
global._hall = 'hall'
global._river = 'river'
global._lake = 'lake'

// === Tile Placement Rules ===
global._placeOnOrigin = 'place-on-origin';
global._noRotate = 'no-rotate';
global._noDiscard = 'no-discard';
global._placeNext = 'place-next';

// === Tile Segments ===
global._base = 'base';
global._incomplete = 'incomplete';

// === Note Triggers ===
global._drawn = 'drawn';
