global.IsWorkstation = function(data = {}) {
  let $model;

  function getIngredientSlots() { return $model.getData().ingredientSlots; }
  function getIngredientSlot(code) { return getIngredientSlots()[code]; }
  function getRecipeList() { return $model.getData().recipeList; }
  function isWorkstation() { return getIngredientSlots() != null; }

  // ===========================================================================

  function pack() {
    return {};
  }

  function attach(model) {
    $model = model;
    model.isWorkstation = isWorkstation;
    model.getRecipeList = getRecipeList;
    model.getIngredientSlots = getIngredientSlots;
    model.getIngredientSlot = getIngredientSlot;
  }

  return Object.freeze({
    pack,
    attach,
  });

}
