global.IsWorkstation = function(data = {}) {
  let $model;

  function getIngredientSlots() { $model.getData().ingredientSlots; }
  function getRecipeList() { $model.getData().recipeList; }
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
  }

  return Object.freeze({
    pack,
    attach,
  });

}
