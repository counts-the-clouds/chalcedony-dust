global.SlideWindow = function(options) {
  const $slideWindow = X.first(options.selector);
  const $slideSpace = $slideWindow.querySelector('.slide-space');
  const $slideContainer = $slideWindow.querySelector('.slide-container');
  const $scrollingPanel = $slideContainer.querySelector('.scrolling-panel');

  Validate.exists("Slide Space", $slideSpace);
  Validate.exists("Slide Container", $slideContainer);
  Validate.exists("Scrolling Panel", $scrollingPanel);

  let animationTimeout;

  build();

  function build() {
    $slideWindow.querySelector('.slide-button').addEventListener('click', toggle);

    ScrollingPanel.build($scrollingPanel);

    resize();
    reposition();
  }

  function isOpen() {
    return X.hasClass($slideWindow,'open');
  }

  function resize() {
    ScrollingPanel.resize($scrollingPanel)
  }

  function reposition() {
    const buttonHeight = 30;

    const containerHeight = $slideContainer.getBoundingClientRect().height;
    const spaceHeight = isOpen() ? 0 : containerHeight + buttonHeight - 30;
    const top = window.innerHeight - containerHeight - buttonHeight - 40;

    $slideSpace.style.height = `${spaceHeight}px`
    $slideWindow.style.top = `${top}px`;
  }

  function toggle() {
    return isOpen() ? close() : open();
  }

  function open() {
    if (animationTimeout) {
      clearTimeout(animationTimeout);
      animationTimeout = null;
    }

    X.addClass($slideSpace,'animating');
    X.addClass($slideWindow,'open');
    reposition();
    WindowManager.push($self);

    animationTimeout = setTimeout(() => {
      X.removeClass($slideSpace,'animating');
    },250);
  }

  function close() {
    if (animationTimeout) {
      clearTimeout(animationTimeout);
      animationTimeout = null;
    }

    X.addClass($slideSpace,'animating');
    X.removeClass($slideWindow,'open');
    reposition();
    WindowManager.remove($self);

    animationTimeout = setTimeout(() => {
      X.removeClass($slideSpace,'animating');
    },250);
  }

  function setHeader(header) {
    const headerElement = $slideContainer.querySelector('.content-header');
    headerElement.innerHTML = '';
    headerElement.appendChild(header);
  }

  function setContent(content) {
    const contentElement = $slideContainer.querySelector('.slide-content');
    contentElement.innerHTML = '';
    contentElement.appendChild(content);
  }

  const $self = Object.freeze({
    reposition,
    open,
    close,
    setHeader,
    setContent,
  });

  return $self;

}