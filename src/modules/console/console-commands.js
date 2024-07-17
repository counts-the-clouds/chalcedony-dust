window.ConsoleCommands = (function() {

  const $commands = {
    help: () => { log("You cry out in vain, but no help will come."); }
  }

  function sendCommand(event) {
    const input = X.first('#commandInput');
    const command = input.value;

    if (command.length) {
      input.value = '';
      executeCommand(command);
    }
  }

  // TODO: Eventually we'll hook up some useful functions to this. For now we
  //       can just print the command to the log to show it works. We might
  //       could add a command history and autocomplete and shit too.
  function executeCommand(commandString) {
    log("Execute Command",{ system:"Console", data:commandString });

    const args = commandString.split(" ");
    const commandFunction = $commands[args[0]];
    if (typeof commandFunction === 'function') {
      commandFunction(args);
    }
  }

  return {
    sendCommand
  }

})();
