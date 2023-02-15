import { stardust } from '@nebula.js/stardust';
import { useEffect, useState } from 'react';

export interface ActiveOnly {
  begin?: (path: string | null, activeOnly: boolean) => Promise<undefined>;
  confirm?: (activeOnly: boolean) => Promise<undefined>;
}

export default function useHandleActive(
  isInSense: boolean,
  selections?: stardust.ObjectSelections & ActiveOnly,
) {
  const [selectionStates, setSelectionStates] = useState<
    { id: string; active: boolean }[] | []
  >([]);
  const [inSelection, setInSelection] = useState(false);

  useEffect(() => {
    const alreadyInSelection = inSelection;
    const newInSelection = !!selectionStates.find((state) => state.active);
    setInSelection(newInSelection);
    if (newInSelection && !alreadyInSelection && isInSense) {
      selections?.begin(null, true);
    } else if (!inSelection && isInSense) {
      selections?.confirm(true);
    }
  }, [selectionStates]);

  const updateActiveSelectionState = (id: string, active: boolean) => {
    setSelectionStates((currentSelectionStates) => {
      const newSelectionStates = [...currentSelectionStates];
      const stateToUpdate = newSelectionStates.find((state) => state.id === id);
      if (stateToUpdate) {
        stateToUpdate.active = active;
      } else {
        newSelectionStates.push({ id, active });
      }
      return newSelectionStates;
    });
  };

  const handleActive = (id: string, active: boolean) => {
    if (!active) {
      // If user is in selection and starts selecting in another Listbox, delay deactivate event from the first Listbox
      setTimeout(() => {
        updateActiveSelectionState(id, active);
      }, 200);
    } else {
      updateActiveSelectionState(id, active);
    }
  };

  return handleActive;
}
