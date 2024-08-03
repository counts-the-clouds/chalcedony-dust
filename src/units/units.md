# Units
Units are stateful objects managed by the GameState. There should only be one
of each of these in a game. When the game is saved the units are serialized to
JSON with the unit's `pack()` function and loaded with an `unpack()` function. 
