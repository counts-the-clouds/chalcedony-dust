global.Console = (function() {

  const $entryLimit = 1000;

  function init() {
    X.onCodeDown(KeyCodes.Backquote, () => true, toggleConsole);
    X.onCodeDown(KeyCodes.Enter, isVisible, ConsoleCommands.sendCommand);
    ScrollingPanel.build('#console .scrolling-panel');
  }

  function toggleConsole() {
    if (isVisible()) { return hide(); }

    X.removeClass('#console','hide');
    setTimeout(() => {
      ScrollingPanel.resize('#console .scrolling-panel');
    },1);
  }

  function hide() { X.addClass('#console','hide'); }
  function isVisible() { return !X.hasClass('#console','hide'); }

  // === Entry Elements ========================================================
  // We want this log() function to look just like the one in the Logger class
  // but delegate to the append() function so that log messages from the client
  // and the server and handled in the same way.
  function log(message, options={}) {
    if (Tests.running() === false) {
      options.time = TimeHelper.getTimeString();
      options.message = message;
      options.type = options.type || _info;
      append(options);
    }
  }

  function logError(message, error, options={}) {
    if (options.data == null) { options.data = {};}

    if (Tests.running()) {
      console.error('=== Error ===');
      console.error(message);
      console.error(error);
      console.error(options);
      return;
    }

    options.level = 1;
    options.type = _error;
    options.data.error = ErrorHelper.errorToString(error)

    log(message, options);

    console.error(message, options)
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

    if (Environment.isDevelopment) {
      if (logData.type === _error || logData.type === _warning) {
        Alert.showFromLog(logData)
      }
    }
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

  return Object.freeze({
    init,
    hide,
    isVisible,
    append,
    log,
    logError,
  });

})();

window.log = Console.log;
window.logError = Console.logError;
