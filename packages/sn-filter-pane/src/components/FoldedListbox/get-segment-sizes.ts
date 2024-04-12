const toPercent = (value: number) => `${Math.min(value * 100, 100)}%`;

const getSegmentsSizes = (qDimensionInfo: EngineAPI.INxDimensionInfo) => {
  const counts = qDimensionInfo.qStateCounts;
  const total = qDimensionInfo.qCardinal;
  const res = {
    selected: '0', possible: '0', alternative: '0', selectedExcluded: '0', excluded: '0',
  };

  res.selected = toPercent((counts.qSelected + counts.qLocked) / total);
  res.selectedExcluded = toPercent((counts?.qSelectedExcluded ?? 0) / total);
  res.possible = toPercent((counts?.qOption ?? 0) / total);
  res.alternative = toPercent((counts.qAlternative) / total);
  res.excluded = toPercent((counts?.qExcluded ?? 0) / total);

  return res;
};

export default getSegmentsSizes;
