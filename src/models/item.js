global.Item = function(code) {
  const $code = code;
  const $itemData = ItemRegistry.lookup($code);
  const $hasAspects = HasAspects($itemData);

  function getCode() { return $code; }
  function getName() { return $itemData.name; }

  // Actually not sure if I'm going to use all this yet, but the rules behind
  // the plural forms of mass nouns are complicated enough that items can't
  // just have plural names.

  function getFormattedName(quantity) {
    const number = EnglishHelper.numberInEnglish(quantity);
    if ($itemData.mass) { return `${number} ${getMassWord(quantity)} of ${getName()}`; }
    if (quantity === 1) { return `${EnglishHelper.a_an(getName())} ${getName()}`; }
    if ($itemData.pluralName) { return `${number} ${$itemData.pluralName}`; }
    return `${number} ${$itemData.name}s`
  }

  function getMassWord(quantity) {
    if ($itemData.mass == null) { return null; }
    if ($itemData.mass === 'pound') { return (quantity === 1) ? `pound` : `pounds`; }
    if ($itemData.mass === 'ounce') { return (quantity === 1) ? `ounce` : `ounces`; }
    throw `Unhandled mass term: ${$itemData.mass}`
  }

  function toString() { return `Item[${$code}]`; }

  // ===========================================================================

  const $self = {
    getCode,
    getName,
    getFormattedName,
    toString,
  };

  $hasAspects.attach($self)

  return Object.freeze($self);
}
