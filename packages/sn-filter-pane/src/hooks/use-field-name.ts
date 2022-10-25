import { useEffect, useState } from 'react';
import { IListLayout } from './types';

export default function useFieldName(layout: IListLayout) {
  const [fieldName, setFieldName] = useState('');

  useEffect(() => {
    setFieldName(layout?.title || layout?.qListObject?.qDimensionInfo?.qFallbackTitle);
  }, [layout?.title || layout?.qListObject?.qDimensionInfo?.qFallbackTitle]);

  return fieldName;
}
