global.TileSegment = function(code, index, options={}) {

  const $code = code;
  const $index = index;
  const $form = options.form || (getExits().length === 0 ? _base : _incomplete);

  function getCode() { return $code; }
  function getIndex() { return $index; }
  function getForm() { return $form; }

  function getSegmentData() { return TileRegistry.lookup($code).segments[$index] }
  function getType() { return getSegmentData().type; }
  function getExits() { return getSegmentData().exits; }

  function pack() {
    return {
      code: $code,
      index: $index,
      form: $form,
    };
  }

  return Object.freeze({
    getCode,
    getIndex,
    getForm,
    getSegmentData,
    getType,
    getExits,
    pack,
  });
}

TileSegment.unpack = function(data) {
  return TileSegment(data.code, data.index, { form:data.form });
}
