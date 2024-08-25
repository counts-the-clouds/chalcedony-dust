global.ItemCommands = {

  addItem(code, count) {
    ItemRegistry.lookup(code);
    if (isNaN(count)) { count = 1; }
    if (count < 1) { throw `Positive numbers only please.`; }

    GameInventory.addItem(code,count);

    return `Added ${count} ${code}, inventory now has ${GameInventory.getItemCount(code)}`
  }

};