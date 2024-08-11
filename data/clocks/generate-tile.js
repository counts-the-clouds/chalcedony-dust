ClockRegistry.register('generate-tile', {

  duration: 60000,
  repeat: true,

  onComplete: () => {
    // When in a tile sequence (like the start of the tutorial) we need to
    // prevent drawing a tile when the tile shelf is full.
    if (TileShelf.isFull() && TileBag.isSequence()) {
      return ClockManager.pauseUntil(() => {
        return TileShelf.isFull() === false
      });
    }

    GameController.drawTile();
  }

});