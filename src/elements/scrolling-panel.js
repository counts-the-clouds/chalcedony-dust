
const STEP_DISTANCE = 50;

const $$scrollingPanels = {};
let $$panelIndex = 0;
let $$activeGrab = null;

// <div class='scrolling-panel-frame'>
//   <div class='scrolling-panel' style='height=200px'>
//     <div class='scrolling-panel-content'>
//
global.ScrollingPanel = function(options) {
  const $id = options.id || nextID();
  const $wrappedContent = determineWrappedContent(options)

  let $scrollingPanel;
  let $scrollingPanelContent;
  let $scrollingPanelTrack;
  let $scrollingPanelThumb;

  function getID() { return $id; }
  function getWrappedContent() { return $wrappedContent; }

  function build() {
    $scrollingPanelThumb = X.createElement(`<div class='scrolling-panel-thumbwheel'></div>`);
    $scrollingPanelTrack = X.createElement(`<div class='scrolling-panel-track'></div>`);
    $scrollingPanelContent = X.createElement(`<div class='scrolling-panel-content'></div>`);

    $scrollingPanel = X.createElement(`<div class='scrolling-panel'></div>`);
    $scrollingPanel.dataset.scrollPosition = 0;
    $scrollingPanel.dataset.thumbPosition = 0;
    $scrollingPanel.appendChild($scrollingPanelContent);
    $scrollingPanel.appendChild($scrollingPanelTrack);

    const parent = $wrappedContent.parentNode;
    parent.removeChild($wrappedContent);
    parent.appendChild($scrollingPanel);

    $scrollingPanelTrack.appendChild($scrollingPanelThumb);
    $scrollingPanelContent.appendChild($wrappedContent);

    $scrollingPanel.addEventListener('wheel', event => {
      event.preventDefault();
      event.stopPropagation();
      (event.deltaY > 0) ? stepDown(STEP_DISTANCE) : stepUp(STEP_DISTANCE);
    });

      //     let didSomething = false;
  //
  //     if (event.code === KeyCodes.PageUp) {
  //       stepUp(scrollingPanel, stepDistance);
  //       didSomething=true; }
  //     if (event.code === KeyCodes.PageDown) {
  //       stepDown(scrollingPanel, stepDistance);
  //       didSomething=true; }
  //     if (event.code === KeyCodes.End) {
  //       scrollToBottom(scrollingPanel);
  //       didSomething=true; }
  //     if (event.code === KeyCodes.Home) {
  //       scrollToTop(scrollingPanel);
  //       didSomething=true; }
  //     if (event.code === KeyCodes.ArrowUp) {
  //       stepUp(scrollingPanel, stepDistance/5);
  //       didSomething=true; }
  //     if (event.code === KeyCodes.ArrowDown) {
  //       stepDown(scrollingPanel, stepDistance/5);
  //       didSomething=true; }
  //
  //     if (didSomething) {
  //       event.preventDefault();
  //       event.stopPropagation();
  //     }


    // window.addEventListener('mousedown', event => {
    //   if (event.target.matches('.scrolling-panel-track')) { trackClicked(event); }
    // });

    // window.addEventListener('mousedown', event => {
    //   if (event.target.matches('.scrolling-panel-thumbwheel')) { startDrag(event); }
    // });

    resize();
  }

  function resize() {
    if ($scrollingPanel.clientHeight === 0) { return; }

    let contentHeight = $scrollingPanelContent.scrollHeight;
    let visibleHeight = $scrollingPanel.clientHeight;

    if (visibleHeight >= contentHeight) {
      setThumbPosition(0);
      return hideTrack();
    }

    showTrack();

    let thumbHeight = (visibleHeight / contentHeight) * visibleHeight;
    if (thumbHeight < 50) {
      thumbHeight = 50;
    }

    let thumbExtent = visibleHeight - thumbHeight;
    let thumbPosition = $scrollingPanel.dataset.scrollPosition * thumbExtent;

    setThumbPosition(thumbPosition);
    setThumbExtent(thumbExtent);

    $scrollingPanelThumb.style['height'] = `${thumbHeight}px`;
  }

  function isActive() { return X.hasClass($scrollingPanelTrack,'off') === false; }
  function showTrack() { X.removeClass($scrollingPanelTrack,'off'); }
  function hideTrack() { X.addClass($scrollingPanelTrack,'off'); }

  function stepDown(distance) {
    if (isActive()) {
      let extent = getThumbExtent();
      let position = getThumbPosition() + distance;
      if (position > extent) {
        position = extent;
      }

      setThumbPosition(position);
    }
  }

  function stepUp(distance) {
    if (isActive()) {
      let position = getThumbPosition() - distance;
      if (position < 0) {
        position = 0;
      }

      setThumbPosition(position);
    }
  }

  function setThumbPosition(position) {
    $scrollingPanel.dataset.thumbPosition = position;
    $scrollingPanelThumb.style['top'] = `${position}px`;
    positionView();
  }

  function getThumbPosition() { return parseInt($scrollingPanel.dataset.thumbPosition || 0); }
  function setThumbExtent(extent) { $scrollingPanel.dataset.thumbExtent = extent; }
  function getThumbExtent() { return parseInt($scrollingPanel.dataset.thumbExtent || 1); }


  // Read the thumb-position and set view offset
  function positionView() {
    let thumbExtent = getThumbExtent();
    let thumbPosition = getThumbPosition();
    let scrollPosition = 1 - ((thumbExtent - thumbPosition) / thumbExtent);
    let contentOffset = 0;

    if (scrollPosition > 1) {
      scrollPosition = 1;
    }

    $scrollingPanel.dataset.scrollPosition = scrollPosition;

    if (scrollPosition > 0) {
      let contentHeight = $scrollingPanelContent.scrollHeight;
      let visibleHeight = $scrollingPanel.clientHeight;

      contentOffset = (contentHeight - visibleHeight) * -scrollPosition
    }

    $scrollingPanelContent.style['top'] = `${contentOffset}px`;
  }

  // ===========================================================================

  build()

  const $self = Object.freeze({
    getID,
    getWrappedContent,
    resize,
  });

  $$scrollingPanels[$id] = $self;

  return $self;
}



// Wrapped content could be found with an id, a selector, or the element.
// (id and selector options are different because id can be used as scrolling
// panel ID)
function determineWrappedContent(options) {
  if (options.id) { return X.first(options.id); }
  if (options.selector) { return X.first(options.selector); }
  if (options.element) { return element; }
  throw `Cannot find wrapped content in options`;
}

function nextID() {
  return `panel-${$$panelIndex++}`;
}

function resizeAll() {
  Object.values($$scrollingPanels).forEach(scrollingPanel => scrollingPanel.resize());
}



ScrollingPanel.init = function() {
  window.addEventListener('resize', resizeAll);
}

  /*


  function scrollToTop(scrollingPanel) {
    if (isActive(scrollingPanel)) {
      setThumbPosition(scrollingPanel, 0);
    }
  }

  function scrollToBottom(scrollingPanel) {
    if (isActive(scrollingPanel)) {
      setThumbPosition(scrollingPanel, getThumbExtent(scrollingPanel));
    }
  }

  function trackClicked(event) {
    let scrollingPanel = event.target.closest('.scrolling-panel');
    let thumb = scrollingPanel.querySelector('.scrolling-panel-thumbwheel');

    let clickAt = event.pageY;
    let thumbPosition = X.getPosition(thumb).top;
    let thumbHeight = thumb.clientHeight;

    if (clickAt < thumbPosition) {
      stepUp(scrollingPanel, thumbHeight);
    }

    if (clickAt > (thumbPosition + thumbHeight)) {
      stepDown(scrollingPanel, thumbHeight);
    }
  }

  function startDrag(event) {
    let body = X.first('body');
    let scrollingPanel = event.target.closest('.scrolling-panel');
    let scrollTop = body.scrollTop;

    activeGrab = {
      scrollingPanel: scrollingPanel,
      position: (event.pageY - X.getPosition(event.target).top + scrollTop)
    };

    body.addEventListener('mousemove', moveThumb);
    body.addEventListener('mouseup', stopDrag);
    body.addEventListener('mouseleave', stopDrag);
  }

  function stopDrag() {
    let body = X.first('body');

    body.removeEventListener('mousemove', moveThumb);
    body.removeEventListener('mouseup', stopDrag);
    body.removeEventListener('mouseleave', stopDrag);

    activeGrab = null;
  }

  function moveThumb(event) {
    let panelTop = X.getPosition(activeGrab.scrollingPanel).top;
    let scrollTop = X.first('body').scrollTop;
    let top = event.pageY - activeGrab.position - panelTop + scrollTop;
    let limit = getThumbExtent(activeGrab.scrollingPanel);

    if (top < 0) { top = 0; }
    if (top > limit) { top = limit; }

    setThumbPosition(activeGrab.scrollingPanel, top);
  }



  return {
    init,
    build,
    resize,
    scrollToTop,
    scrollToBottom,
  };

})();
*/

