import extend from 'extend';

interface StringExpression {
  qStringExpression: {
    qExpr: string
  }
}

export default {
  createDefaultListBox(dimensionDef: EngineAPI.IListObjectDef, title: string) {
    let newTitle : string | StringExpression = title;
    const listboxDef = extend(true, {}, dimensionDef);
    let i;
    listboxDef.qShowAlternatives = true;
    // listboxDef.qDirectQuerySimplifiedView = directQueryAdaptService.adaptationsEnabled();
    for (i = 0; i < listboxDef.qDef.qSortCriterias!.length; ++i) {
      listboxDef.qDef.qSortCriterias![i].qSortByState = 1;
    }
    if (!newTitle && dimensionDef.qDef.qLabelExpression) {
      newTitle = {
        qStringExpression: {
          qExpr: dimensionDef.qDef.qLabelExpression,
        },
      };
    } else if (
      !newTitle
      && (!dimensionDef.qDef.qFieldLabels
        || !dimensionDef.qDef.qFieldLabels.length
        || dimensionDef.qDef.qFieldLabels[0] === '')
    ) {
      [newTitle] = dimensionDef.qDef.qFieldDefs;
    } else {
      newTitle = newTitle
        || (dimensionDef.qDef.qFieldLabels && dimensionDef.qDef.qFieldLabels.length
          ? dimensionDef.qDef.qFieldLabels[0]
          : '');
    }

    return {
      qInfo: {
        qType: 'listbox',
      },
      qListObjectDef: listboxDef,
      newTitle,
      visualization: 'listbox',
    };
  },
};
