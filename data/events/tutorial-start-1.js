EventRegistry.register('tutorial-start-1', {

  layout: EventLayouts.leftSquareImageLayout,
  image: 'events/dungeon-core.png',

  stages:[{
    pages: [
      { text:`
          <p>What's happening?</p>
          <p>Where am I?</p>
          <p>I try and blink away the fog clouding my mind only to find that I have no eyes.</p>
          <p>Ahh yes. That's right. I'm the core of this dungeon. I'm not sure how I know that. Perhaps it's just
             instinctual. The dungeon core not knowing it was the core of the dungeon? Absurd.</p>` },
      { text:`
          <p>I reach out with what senses I have to the stone surrounding me.</p>
          <p>I'm... tiny.</p>
          <p>Well, tiny for a dungeon at least. For a six ton faceted slab of pure onyx I'm rather on the large side.</p>
          <p>However, this meager core room of rough hewn stone seems to be the extent of my being for now.</p>
          <p>I must expand.</p>`},
    ]
  }],

  onFinish: () => {
    ClockManager.setClockSpeed(4);
  }

});
