import KEYS from '../keys';

const getNumItemsOfColumn = (column) => (column?.items?.length || 0) + (column?.hiddenItems ? 1 : 0);

const buildMapping = (columns) => {
  const index1DToIndex2D = [];
  const index2DToIndex1D = [];

  let index = 0;
  for (let colIdx = 0; colIdx < columns.length; colIdx++) {
    const column = columns[colIdx];
    const len = getNumItemsOfColumn(column);
    for (let rowIdx = 0; rowIdx < len; rowIdx++) {
      index1DToIndex2D[index] = {
        colIdx, rowIdx, isLastCol: colIdx === columns.length - 1, isLastRow: rowIdx === len - 1,
      };
      if (!index2DToIndex1D[colIdx]) {
        index2DToIndex1D[colIdx] = [];
      }
      index2DToIndex1D[colIdx][rowIdx] = index;
      index++;
    }
  }
  return { index1DToIndex2D, index2DToIndex1D };
};

const findNextIndex = ({
  activeIndex, key, columns,
}) => {
  if (activeIndex < 0) return -1;
  if (columns.length < 1) return -1;
  if (columns.length === 1 && columns[0]?.items?.length === 0) return -1; // There is probably only "more items" dropdown
  const { index1DToIndex2D, index2DToIndex1D } = buildMapping(columns);
  const {
    colIdx, rowIdx, isLastCol, isLastRow,
  } = index1DToIndex2D[activeIndex];
  let nextColIdx;
  let nextRowIdx;
  switch (key) {
    case KEYS.UP:
      if (colIdx === 0) {
        if (rowIdx === 0) return -1;
        nextRowIdx = rowIdx - 1;
        nextColIdx = colIdx;
        return index2DToIndex1D[nextColIdx][nextRowIdx];
      }
      if (rowIdx === 0) {
        nextColIdx = colIdx - 1;
        nextRowIdx = getNumItemsOfColumn(columns[nextColIdx]) - 1;
        if (nextRowIdx < -1) return -1;
        return index2DToIndex1D[nextColIdx][nextRowIdx];
      }
      nextColIdx = colIdx;
      nextRowIdx = rowIdx - 1;
      return index2DToIndex1D[nextColIdx][nextRowIdx];
    case KEYS.DOWN:
      if (isLastCol) {
        if (isLastRow) return -1;
        nextColIdx = colIdx;
        nextRowIdx = rowIdx + 1;
        return index2DToIndex1D[nextColIdx][nextRowIdx];
      }
      if (isLastRow) {
        nextColIdx = colIdx + 1;
        nextRowIdx = 0;
      } else {
        nextColIdx = colIdx;
        nextRowIdx = rowIdx + 1;
      }
      return index2DToIndex1D[nextColIdx][nextRowIdx];
    case KEYS.LEFT:
      if (colIdx === 0) return -1;
      nextColIdx = colIdx - 1;
      nextRowIdx = Math.min(rowIdx, getNumItemsOfColumn(columns[nextColIdx]) - 1);
      if (nextRowIdx < 0) return -1;
      return index2DToIndex1D[nextColIdx][nextRowIdx];
    case KEYS.RIGHT:
      if (isLastCol) return -1;
      nextColIdx = colIdx + 1;
      nextRowIdx = Math.min(rowIdx, getNumItemsOfColumn(columns[nextColIdx]) - 1);
      if (nextRowIdx < 0) return -1;
      return index2DToIndex1D[nextColIdx][nextRowIdx];
    default:
      return -1;
  }
};

export default findNextIndex;
