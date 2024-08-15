
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

// === Game ====================================================================

// Stages
global._tutorialStage = 'tutorial-stage';
global._baselineStage = 'baseline-stage';

// === Tiles ===================================================================

// Directions
global._n = 'n';
global._s = 's';
global._e = 'e';
global._w = 'w';

// Tile States
global._complete = 'complete';
global._incomplete = 'incomplete';


// Tile Placement Rules
global._noRotate = 'no-rotate';
global._noDiscard = 'no-discard';
global._placeNext = 'place-next';

// === Buried Treasure =========================================================

// Type
global._discoverResource = 'discover-resource'
global._discoverEvent = 'discover-event'

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
