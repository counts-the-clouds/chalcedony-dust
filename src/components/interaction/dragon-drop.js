window.DragonDrop = (function() {

  let dragContext;

  function startDrag(context) {
    console.log("Start Drag:",context);
  }

  return Object.freeze({
    startDrag
  });

})();
