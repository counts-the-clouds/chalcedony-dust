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

  function getSize() { return Object.keys($registry).length }

  // Get a shallow copy of all the data objects that satisfy the passed
  // criteria function()
  function filter(criteria) {
    const result = {};

    Object.keys($registry).forEach(key => {
      const copy = { ...$registry[key] };
      if (criteria(key,copy)) {
        result[key] = copy;
      }
    });

    return result;
  }

  function forEach(callback) {
    Object.keys($registry).forEach(code => {
      callback(code,lookup(code));
    });
  }

  return Object.freeze({
    register,
    unregister,
    lookup,
    filter,
    getSize,
    forEach,
  });
}

global.AnimationRegistry = Registry('Animation');
global.AspectRegistry = Registry('Aspect');
global.BlueprintRegistry = Registry('Blueprint');
global.ClockRegistry = Registry('Clock');
global.ConditionRegistry = Registry('Condition');
global.EventRegistry = Registry('PagedEvent');
global.ExtraRegistry = Registry('Extra');
global.HallRegistry = Registry('Hall');
global.ItemRegistry = Registry('Item');
global.MinionRegistry = Registry('Minion');
global.NoteRegistry = Registry('Note');
global.ResourceRegistry = Registry('Resource');
global.RoomRegistry = Registry('Room');
global.ShapeRegistry = Registry('Shape');
global.SpeciesRegistry = Registry('Species');
global.TileRegistry = Registry('Tile');
global.TriggerRegistry = Registry('Trigger');
