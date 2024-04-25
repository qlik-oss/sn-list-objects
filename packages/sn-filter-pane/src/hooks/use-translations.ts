import type { stardust } from '@nebula.js/stardust';
import { useMemo } from 'react';
import registerLocale from '../locale/src';

interface UseTranslationsArgs {
  translator?: stardust.Translator;
}

const useTranslations = ({ translator }: UseTranslationsArgs): stardust.Translator | undefined => {
  // this should registers all.json file into translator objest and returns it!
  useMemo(() => {
    if (translator) {
      registerLocale(translator);
    }
  }, [translator]);

  return translator;
};

export default useTranslations;
