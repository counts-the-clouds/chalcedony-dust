
// Initially I had this as it's own class, but this animation is a super one
// off kind of thing. It makes a lot more sense to make it a data object, which
// just happens to contain an animation.
//
// TODO: This should be made more dramatic, but this level of animation should
//       be fine for a prototype. The correct place to get the background for
//       the sequence is in the TileBag object. I'm pretty sure this is just a
//       one off version of whatever actual animations the TileBag is going to
//       have, and a temporary one at that, so I think it's fine to hard code a
//       duplicate value here for now.
//
// TriggerRegistry.register('tutorial.enable-tile-bag', data => {
//   setTimeout(() => {
//     X.addClass('#tileBag .wing','wing-below');
//     X.addClass('#tileBag .standard-body','body-below');
//     X.first('#tileBag .sequence-body').style['background-image'] = X.assetURL('tile-bag/forest-path-sequence.png');

//     TileBagComponent.show();

//     setTimeout(() => {
//       X.addClass('#tileBag .wing','wing-animate');
//       X.addClass('#tileBag .body','body-animate');
//     },10);

//     setTimeout(() => {
//       X.removeClass('#tileBag .wing','wing-below');
//       X.removeClass('#tileBag .body','body-below');
//     },20);

//     setTimeout(() => {
//       X.removeClass('#tileBag .wing','wing-animate');
//       X.removeClass('#tileBag .body','body-animate');
//       TileBagComponent.drawTile();
//     }, 1100);
//   },100);
// });

// TriggerRegistry.register('tutorial.enable-movement', tile => {
//   DungeonView.setMovementEnabled(true);
// });
