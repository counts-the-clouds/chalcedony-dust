global.Trigger = function(code, triggerFunction) {

  const $code = code;
  const $triggerFunction = triggerFunction;

  function getCode() { return $code; }
  function getTriggerFunction() { return $triggerFunction; }

  return Object.freeze({
    getCode,
    getTriggerFunction,
  });
}

