global.IsWorkstation = function(data = {}) {
  let $model;

  const $ingredients = data.ingredients || {}
  const $shouldRepeat = (data.shouldRepeat != null) ? data.shouldRepeat : false;

  function getIngredientSlots() { return $model.getData().ingredientSlots; }
  function getIngredientSlot(code) { return getIngredientSlots()[code]; }
  function getRecipeList() { return $model.getData().recipeList; }
  function isWorkstation() { return getIngredientSlots() != null; }

  // TODO: We may want to validate the input here. Make sure the slot code is
  //       actually a slot this workstation has and that the ingredient fits
  //       into the slot.
  function setIngredient(slotCode, itemCode) { $ingredients[slotCode] = itemCode; }

  function determineCurrentRecipe() {
    return null;
  }

  // ===========================================================================

  function pack() {
    return {
      ingredients: $ingredients,
      shouldRepeat: $shouldRepeat,
    };
  }

  function attach(model) {
    $model = model;
    model.getIngredientSlots = getIngredientSlots;
    model.getIngredientSlot = getIngredientSlot;
    model.getRecipeList = getRecipeList;
    model.isWorkstation = isWorkstation;
    model.setIngredient = setIngredient;
    model.determineCurrentRecipe = determineCurrentRecipe;
  }

  return Object.freeze({
    pack,
    attach,
  });

}
