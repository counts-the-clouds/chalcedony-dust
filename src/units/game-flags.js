  global.GameFlags = (function() {

    let $flags;

    function reset() {
      $flags = {}
    }

    function has(key) { return $flags[key] != null; }
    function get(key) { return $flags[key]; }
    function set(key,value) { return $flags[key] = value; }
    function clear(key) { delete $flags[key]; }

    function pack() {
      return $flags;
    }

    function unpack(data) {
      $flags = data;
    }

    return Object.freeze({
      reset,
      has,
      get,
      set,
      clear,
      pack,
      unpack,
    });

  })();
