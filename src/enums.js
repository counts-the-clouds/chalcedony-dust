
global.EventType = Object.freeze({
  tileDrawn: 'tile-drawn',
  tilePlaced: 'tile-placed',
  tileDiscarded: 'tile-discarded',
  featureCompleted: 'feature-completed',
  resourceDiscovered: 'resource-discovered',
});

global.ConditionKeys = Object.freeze({
  featureTypeIs: 'feature-type-is',
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
