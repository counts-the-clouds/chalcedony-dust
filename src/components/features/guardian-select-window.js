global.GuardianSelectWindow = (function() {

  function open(feature) {
    if (FeatureWindows.windowNotOpen(feature)) {
      const guardianNode = feature.getConstruction();
      const choices = guardianNode.getGuardianChoices();
      const choice_1 = Guardian({ code:choices[0] });
      const choice_2 = Guardian({ code:choices[1] });

      const html = `<div class='guardian-select-window'>
        <div class='choices'>
          ${buildChoice(1,choice_1)}
          ${buildChoice(2,choice_2)}
        </div>
      </div>`

      const casement = FeatureWindows.openCasementWith(feature,html,{ resizable:false });
      casement.setBounds(getBounds());
      casement.setBackground('rgb(15,15,15)')
      casement.setMinimumWidth(630);

      const content = casement.getCasementContent();
      content.querySelector('.choice-1').style['background-image'] = X.assetURL(choice_1.getSummonImage());
      content.querySelector('.choice-2').style['background-image'] = X.assetURL(choice_2.getSummonImage());
      content.addEventListener('click', event => handleClick(event, guardianNode, casement));
    }
  }

  function handleClick(event, guardianNode, casement) {
    const choice = event.target.closest('.choice');
    if (choice) {
      const guardian = Guardian({ code:choice.getAttribute('data-code') });

      Confirmation.show({
        text: `Choose ${guardian.getFirstName()} as your guardian?`,
        onConfirm: () => {
          guardianNode.setGuardian(guardian);
          casement.close();
          Panopticon.induce(EventType.guardianSummoned, { guardian });
          GameState.saveState();
        }
      });
    }
  }

  function buildChoice(index, guardian) {
    return `
      <div class='choice choice-${index}' data-code='${guardian.getCode()}'>
        <div class='frame'>
          <div class='name'>${guardian.getFullName()}</div>
          <div class='info'>
            <div class='gender'>${GenderHelper.Male(guardian.getGender())}</div>&nbsp;
            <div class='species'>${guardian.getSpecies().getName()}</div>
            <div class='aspects'>${AspectPanel.build(guardian.getArcaneAspects())}</div>
          </div>
          <div class='details'>${guardian.getSummonDetails()}</div>
        </div>
      </div>`
  }

  function getBounds() {
    const width = 830;
    const left = (window.innerWidth/2) - (width/2);
    return { top:60, left:left, height:640, width:width }
  }

  return Object.freeze({
    open
  });

})();
