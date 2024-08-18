global.Registry = function(typeName) {
  const $typeName = typeName;
  const $registry = {};

  function register(code, data) {
    if ($registry[code]) {
      throw `The ${$typeName}[${code}] already exists.`
    }
    $registry[code] = data;
  }

  function unregister(code) {
    if (Tests.running() === false) { throw `Unregistering is only allowed by the specs to remove test fixtures.` }
    if (code.startsWith('test') === false) { throw `Test fixtures should start with test.` }
    if ($registry[code] == null) { throw `${typeName} with code ${code} does not exist.` }
    delete $registry[code];
  }

  // I'd like to return something actually immutable by using structuredClone(),
  // but some of the data objects contain functions which can't be serialized.
  // I just need to be careful to make copies of arrays and objects when using
  // data pulled from a registry.
  function lookup(code) {
    if ($registry[code] == null) {
      throw `Unknown ${$typeName}[${code}]`
    }
    return { ...$registry[code] };
  }

  function allCodes() { return Object.keys($registry) }
  function getSize() { return Object.keys($registry).length }

  function forEach(callback) {
    Object.keys($registry).forEach(code => {
      callback(code,lookup(code));
    });
  }

  return Object.freeze({
    register,
    unregister,
    lookup,
    allCodes,
    getSize,
    forEach,
  });
}

global.AnimationRegistry = Registry('Animation');
global.ClockRegistry = Registry('Clock');
global.EventRegistry = Registry('PagedEvent');
global.ExtraRegistry = Registry('Extra');
global.FeatureUpgradeRegistry = Registry('FeatureUpgrade');
global.ItemRegistry = Registry('Item');
global.NoteRegistry = Registry('Note');
global.ShapeRegistry = Registry('Shape');
global.TileRegistry = Registry('Tile');
global.TriggerRegistry = Registry('Trigger');
