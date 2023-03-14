import updateForFrequencyMax from '../update-frequency-max';

describe('updateForFrequencyMax', () => {
  let itemData: any;

  it('should update correctly when histogram = false', () => {
    itemData = { histogram: false };
    updateForFrequencyMax(itemData);
    expect(itemData).toEqual({ histogram: false, frequencyMax: null });
  });

  it('should update correctly when histogram = false and frequencyMax = something', () => {
    itemData = { histogram: false, frequencyMax: 'abc' };
    updateForFrequencyMax(itemData);
    expect(itemData).toEqual({ histogram: false, frequencyMax: null });
  });

  it('should update correctly when histogram = true and qFrequencyMode = N', () => {
    itemData = { histogram: true, qListObjectDef: { qFrequencyMode: 'N', qDef: { } } };
    updateForFrequencyMax(itemData);
    expect(itemData.qListObjectDef.qFrequencyMode).toEqual('V');
    const exp = undefined;
    expect(itemData.frequencyMax).toEqual({ qValueExpression: `Max(AGGR(Count([${exp}]), [${exp}]))` });
  });

  it('should update correctly when histogram = true and qFrequencyMode = P', () => {
    itemData = { histogram: true, qListObjectDef: { qFrequencyMode: 'P', qDef: { } } };
    updateForFrequencyMax(itemData);
    expect(itemData.qListObjectDef.qFrequencyMode).toEqual('P');
    expect(itemData.frequencyMax).toEqual(null);
  });

  it('should update correctly when histogram = true and qFrequencyMode = R', () => {
    itemData = { histogram: true, qListObjectDef: { qFrequencyMode: 'R', qDef: { } } };
    updateForFrequencyMax(itemData);
    expect(itemData.qListObjectDef.qFrequencyMode).toEqual('R');
    expect(itemData.frequencyMax).toEqual(null);
  });

  it('should update correctly when histogram = true and qFrequencyMode = V', () => {
    itemData = { histogram: true, qListObjectDef: { qFrequencyMode: 'V', qDef: { } } };
    updateForFrequencyMax(itemData);
    expect(itemData.qListObjectDef.qFrequencyMode).toEqual('V');
    const exp = undefined;
    expect(itemData.frequencyMax).toEqual({ qValueExpression: `Max(AGGR(Count([${exp}]), [${exp}]))` });
  });

  it('should update correctly when histogram = true, qFrequencyMode = V, qFieldDefs: ["Dim1"]', () => {
    itemData = { histogram: true, qListObjectDef: { qFrequencyMode: 'V', qDef: { qFieldDefs: ['Dim1'] } } };
    updateForFrequencyMax(itemData);
    expect(itemData.qListObjectDef.qFrequencyMode).toEqual('V');
    const exp = 'Dim1';
    expect(itemData.frequencyMax).toEqual({ qValueExpression: `Max(AGGR(Count([${exp}]), [${exp}]))` });
  });

  it('should update correctly when histogram = true, qFrequencyMode = V, qFieldDefs: ["[Dim1]"]', () => {
    itemData = { histogram: true, qListObjectDef: { qFrequencyMode: 'V', qDef: { qFieldDefs: ['[Dim1]'] } } };
    updateForFrequencyMax(itemData);
    expect(itemData.qListObjectDef.qFrequencyMode).toEqual('V');
    expect(itemData.frequencyMax).toEqual({ qValueExpression: 'Max(AGGR(Count([[Dim1]]]), [[Dim1]]]))' });
  });

  it('should update correctly when histogram = true, qFrequencyMode = V, qFieldDefs: ["=[Dim1]"]', () => {
    itemData = { histogram: true, qListObjectDef: { qFrequencyMode: 'V', qDef: { qFieldDefs: ['=[Dim1]'] } } };
    updateForFrequencyMax(itemData);
    expect(itemData.qListObjectDef.qFrequencyMode).toEqual('V');
    expect(itemData.frequencyMax).toEqual({ qValueExpression: 'Max(AGGR(Count([=[Dim1]]]), [=[Dim1]]]))' });
  });
});
