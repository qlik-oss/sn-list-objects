const toPercent = (value: number) => `${Math.min(value * 100, 100)}%`;

const getSegmentsSizes = (qDimensionInfo: EngineAPI.INxDimensionInfo) => {
  const counts = qDimensionInfo.qStateCounts;
  const total = qDimensionInfo.qCardinal;
  const res = { green: '0', white: '0', grey: '0' };

  res.green = toPercent((counts.qSelected + counts.qLocked) / total);
  res.white = toPercent((counts?.qOption ?? 0) / total);
  res.grey = toPercent((counts.qAlternative) / total);

  return res;
};

export default getSegmentsSizes;
