
global.LogType = Object.freeze({
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
});

global.AlertPosition = Object.freeze({
  side: 'side',
  center: 'center',
  event: 'event',
});

global.KeyCodes = Object.freeze({
  Backquote: 'Backquote',
  Enter: 'Enter',
  Escape: 'Escape',
  Space: 'Space',
  CapsLock: 'CapsLock',
  ShiftLeft: 'ShiftLeft',
  ShiftRight: 'ShiftRight',
  ControlLeft: 'ControlLeft',
  ControlRight: 'ControlRight',
  AltLeft: 'AltLeft',
  AltRight: 'AltRight',
  MetaLeft: 'MetaLeft',
  ContextMenu: 'ContextMenu',
  PageUp: 'PageUp',
  PageDown: 'PageDown',
  Home: 'Home',
  End: 'End',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Digit1: 'Digit1',
  Digit2: 'Digit2',
  Digit3: 'Digit3',
  Numpad1: 'Numpad1',
  Numpad2: 'Numpad2',
  Numpad3: 'Numpad3',
  A: 'KeyA',
  D: 'KeyD',
  E: 'KeyE',
  Q: 'KeyQ',
  S: 'KeyS',
  W: 'KeyW',
  F11: 'F11',
});

global.SystemFlags = Object.freeze({
  forbidDiscovery: 'buried-treasure.forbid-discovery',
  forceDiscovery: 'buried-treasure.force-discovery',
  currentEvent: 'event.current-event',
  disableMovement: 'dungeon-view.disable-movement',
  hideSpeedControl: 'dungeon-view.hide-speed-control',
});

global.GameStages = Object.freeze({
  tutorial: 'tutorial',
  baseline: 'baseline',
});

// There is a bit of overlap between the edge types and feature types but
// there's no reason they can't share the same enum.
global.TileType = Object.freeze({
  any: 'any',
  forbidden: 'forbidden',
  stone: 'stone',
  room: 'room',
  hall: 'hall',
  core: 'core',
  node: 'node',
  resource: 'resource',
});

global.PlacementRules = Object.freeze({
  noRotate: 'no-rotate',
  noDiscard: 'no-discard',
  placeNext: 'place-next',
});

global.FeatureState = Object.freeze({
  complete: 'complete',
  incomplete: 'incomplete',
});

global.EventType = Object.freeze({
  tileDrawn: 'tile-drawn',
  tilePlaced: 'tile-placed',
  tileDiscarded: 'tile-discarded',
  featureCompleted: 'feature-completed',
  resourceDiscovered: 'resource-discovered',
});

global.DiscoveryType = Object.freeze({
  resource: 'resource',
  event: 'event',
});

global.ConditionKeys = Object.freeze({
  featureTypeIs: 'feature-type-is',
});

global.EventLayouts = Object.freeze({
  defaultLayout: 'default-layout',
  leftSquareImageLayout: 'left-square-image-layout',
});
