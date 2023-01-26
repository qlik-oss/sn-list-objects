import extend from 'extend';

export default {
  createDefaultListBox(dimensionDef, title) {
    const listboxDef = extend(true, {}, dimensionDef);
    let i;
    listboxDef.qShowAlternatives = true;
    // listboxDef.qDirectQuerySimplifiedView = directQueryAdaptService.adaptationsEnabled();
    for (i = 0; i < listboxDef.qDef.qSortCriterias.length; ++i) {
      listboxDef.qDef.qSortCriterias[i].qSortByState = 1;
    }
    if (!title && dimensionDef.qDef.qLabelExpression) {
      title = {
        qStringExpression: {
          qExpr: dimensionDef.qDef.qLabelExpression,
        },
      };
    } else if (
      !title
      && (!dimensionDef.qDef.qFieldLabels
        || !dimensionDef.qDef.qFieldLabels.length
        || dimensionDef.qDef.qFieldLabels[0] === '')
    ) {
      title = dimensionDef.qDef.qFieldDefs[0];
    } else {
      title = title
        || (dimensionDef.qDef.qFieldLabels && dimensionDef.qDef.qFieldLabels.length
          ? dimensionDef.qDef.qFieldLabels[0]
          : '');
    }

    return {
      qInfo: {
        qType: 'listbox',
      },
      qListObjectDef: listboxDef,
      title,
      visualization: 'listbox',
    };
  },
};
