window.Console = (function() {

  const $entryLimit = 1000;

  function init() {
    X.onCodeDown(_keyCodeBackquote, () => true, toggleConsole);
    X.onCodeDown(_keyCodeEnter, isVisible, ConsoleCommands.sendCommand);
    ScrollingPanel.build('#console .scrolling-panel');
  }

  function toggleConsole() {
    if (isVisible()) {
      return X.addClass('#console','hide');
    }

    X.removeClass('#console','hide');

    setTimeout(() => {
      ScrollingPanel.resize('#console .scrolling-panel');
    },1);
  }

  function isVisible() { return !X.hasClass('#console','hide'); }

  // === Entry Elements ========================================================
  // We want this log() function to look just like the one in the Logger class
  // but delegate to the append() function so that log messages from the client
  // and the server and handled in the same way.
  function log(message, options={}) {
    options.time = TimeHelper.getTimeString();
    options.message = message;
    options.type = options.type || _info;
    append(options);
  }

  function logError(message, options={}) {
    options.level = 1;
    options.type = _error;
    log(message, options);

    console.error(message,options)
  }

  function append(logData) {
    trimEntries()

    const entryElement = X.createElement(`<li class='entry type-${logData.type}'>
      <span class='time'>${logData.time}</span>
    </li>`)

    addSegment(entryElement, 'system', logData.system);
    addSegment(entryElement, 'message', logData.message);
    addDataSegment(entryElement, logData.data);

    X.addClass(entryElement, `level-${logData.level || 2}`)
    X.first('#console #log').appendChild(entryElement);
    ScrollingPanel.resize('#console .scrolling-panel');
  }

  function trimEntries() {
    if (X.first('#log').querySelectorAll('.entry').length > $entryLimit) {
      X.first('#log .entry').remove();
    }
  }

  function addSegment(element, classname, content) {
    if (content) {
      element.appendChild(X.createElement(`<span class='${classname}'>${content}</span>`));
    }
  }

  function addDataSegment(element, data) {
    if (data) {
      if (typeof data !== 'string') { data = JSON.stringify(data,null,1) }
      element.appendChild(X.createElement(`<span class='data'> ${data}</span>`));
    }
  }

  return {
    init,
    append,
    log,
    logError,
  };

})();

window.log = Console.log;
window.logError = Console.logError;
