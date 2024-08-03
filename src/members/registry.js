global.Registry = function(typeName) {
  const $typeName = typeName;
  const $registry = {};

  function register(code, data) {
    if ($registry[code]) {
      throw `The ${$typeName}[${code}] already exists.`
    }
    $registry[code] = data;
  }

  function lookup(code) {
    if ($registry[code] == null) {
      throw `Unknown ${$typeName}[${code}]`
    }
    return { ...$registry[code] };
  }

  function getSize() { return Object.keys($registry).length }

  function forEach(callback) {
    Object.keys($registry).forEach(code => {
      callback(code,lookup(code));
    });
  }

  return Object.freeze({
    register,
    lookup,
    getSize,
    forEach,
  });
}

global.AnimationRegistry = Registry('Animation');
global.ClockRegistry = Registry('Clock');
global.EventRegistry = Registry('PagedEvent');
global.GameStageRegistry = Registry('GameStage');
global.NoteRegistry = Registry('Note');
global.TileRegistry = Registry('Tile');
global.TileBagRegistry = Registry('TileBag');
global.TriggerRegistry = Registry('Trigger');
