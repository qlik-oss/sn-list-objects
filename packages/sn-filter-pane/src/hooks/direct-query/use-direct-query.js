import { useEffect } from 'react';
import SoftPropertyHandler from './soft-property-handler';
import { canSetProperties, getDirectQueryOptions } from './dq-properties-utils';

export default function useDirectQuery({
  directQueryEnabled, layout, listBoxModel, constraints,
}) {
  // Detect e.g. analysis/edit mode switch.
  const constraintsAsString = Object.entries(constraints || {}).join(',');

  useEffect(() => {
    if (!directQueryEnabled || !layout || !listBoxModel) {
      return;
    }
    // When using an existing model, we need to send checkboxes through properties and not options.
    const softPropertyHandler = new SoftPropertyHandler(listBoxModel);
    listBoxModel.getProperties().then(async (oldProps = {}) => {
      const newProperties = { ...oldProps, checkboxes: true };
      if (canSetProperties(layout)) {
        await listBoxModel.setProperties(newProperties);
      } else {
        await softPropertyHandler.saveSoftProperties(oldProps, newProperties);
      }
    });
  }, [layout, directQueryEnabled, listBoxModel, constraintsAsString]);

  const options = directQueryEnabled ? getDirectQueryOptions() : undefined;
  return options;
}
