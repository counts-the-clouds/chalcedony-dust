
// Set global constants here. Because they're actually just properties on the
// global object they're not actually immutable. Prefix them with an underscore
// to indicate that they shouldn't be set.

// === Logging Codes ===
global._info = "info";
global._success = "success";
global._warning = "warning";
global._error = "error";

// === Alert Positions ===
global._sideAlert = 'side';
global._centerAlert = 'center';
global._eventAlert = 'event';

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

global._keyDigit1 = 'Digit1';
global._keyDigit2 = 'Digit2';
global._keyDigit3 = 'Digit3';

global._keyNumpad1 = 'Numpad1';
global._keyNumpad2 = 'Numpad2';
global._keyNumpad3 = 'Numpad3';

global._keyCodeA = 'KeyA';
global._keyCodeD = 'KeyD';
global._keyCodeE = 'KeyE';
global._keyCodeQ = 'KeyQ';
global._keyCodeS = 'KeyS';
global._keyCodeW = 'KeyW';

global._keyCodeF11 = 'F11';

// === Game ====================================================================

// Stages
global._tutorial = 'tutorial';
global._baseline = 'baseline';

// === Tiles ===================================================================

// Directions
global._n = 'n';
global._s = 's';
global._e = 'e';
global._w = 'w';

// Tile States
global._complete = 'complete';
global._incomplete = 'incomplete';

// Edge Types
global._any = 'any';
global._forbidden = 'forbidden';
global._forestPath = 'forest-path'

global._stone = 'stone'
global._room = 'room'
global._hall = 'hall'
global._river = 'river'
global._lake = 'lake'

// Non-Edge Segment Types
global._core = 'core';
global._node = 'node';

// Tile Placement Rules
global._noRotate = 'no-rotate';
global._noDiscard = 'no-discard';
global._placeNext = 'place-next';

// === Dungeon =================================================================
global._chunkLength = 16;
global._tileSize = 128;
global._chunkSize = _tileSize * _chunkLength;

global._defaultScale = 47
global._scaleFactors = [2,1.980,1.825,1.713,1.676,1.641,1.570,1.535,1.501,1.467,1.434,1.401,1.368,1.336,1.305,1.273,
  1.243,1.212,1.183,1.154,1.125,1.096,1.068,1.041,1.000,0.987,0.961,0.935,0.910,0.882,0.860,0.836,0.813,0.767,0.745,
  0.723,0.702,0.681,0.660,0.640,0.621,0.602,0.583,0.565,0.547,0.530,0.513,0.500,0.480,0.465,0.450,0.435,0.421,0.407,
  0.393,0.381,0.368,0.356,0.344,0.333,0.323,0.312,0.303,0.293,0.285,0.276,0.268,0.261,0.253,0.247,0.241,0.235,0.229,
  0.225,0.220,0.216,0.213,0.209,0.207,0.205,0.203,0.201,0.200];

// === Events ==================================================================

// Layouts
global._defaultLayout = 'default-layout';
global._leftSquareImageLayout = 'left-square-image-layout';
