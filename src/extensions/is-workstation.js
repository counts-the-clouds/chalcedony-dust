global.IsWorkstation = function(data = {}) {
  let $model;

  const $ingredients = data.ingredients || {}
  const $shouldRepeat = (data.shouldRepeat != null) ? data.shouldRepeat : false;

  function getIngredientSlots() { return $model.getData().ingredientSlots; }
  function getIngredientSlot(code) { return getIngredientSlots()[code]; }
  function getIngredients() { return { ...$ingredients }; }
  function getRecipeList() { return $model.getData().recipeList; }
  function isWorkstation() { return getIngredientSlots() != null; }

  function getArcaneTotals() {
    const totals = {}

    Object.values($ingredients).forEach(itemCode => {
      Item(itemCode).getArcaneAspects().forEach(aspect => {
        const aspectCode = aspect.getCode();
        if (totals[aspectCode] == null) { totals[aspectCode] = 0; }
        totals[aspectCode] += aspect.getLevel();
      });
    });

    Object.values(MinionRoster.getAssignments($model.getFeatureID())).forEach(minionCode => {
      Minion(minionCode).getArcaneAspects().forEach(aspect => {
        const aspectCode = aspect.getCode();
        if (totals[aspectCode] == null) { totals[aspectCode] = 0; }
        totals[aspectCode] += aspect.getLevel();
      });
    });

    return Object.keys(totals).map(code => {
      return Aspect(code, totals[code]);
    });
  }

  // TODO: We may want to validate the input here. Make sure the slot code is
  //       actually a slot this workstation has and that the ingredient fits
  //       into the slot.
  function setIngredient(slotCode, itemCode) {
    if (itemCode == null) { return delete $ingredients[slotCode]; }
    $ingredients[slotCode] = itemCode;
  }

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
    model.getIngredients = getIngredients;
    model.getRecipeList = getRecipeList;
    model.isWorkstation = isWorkstation;
    model.getArcaneTotals = getArcaneTotals;
    model.setIngredient = setIngredient;
    model.determineCurrentRecipe = determineCurrentRecipe;
  }

  return Object.freeze({
    pack,
    attach,
  });

}
