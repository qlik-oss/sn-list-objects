import { IEnv } from '../../types/types';
import { INxAppLayout } from '../types';

interface IIsDirectQueryEnabled {
  env: IEnv;
  appLayout: INxAppLayout;
}

export default function isDirectQueryEnabled({ env, appLayout }: IIsDirectQueryEnabled) {
  const { isEnabled = () => false } = env?.flags || {};
  return !!(appLayout?.qIsDirectQueryMode && (isEnabled('CLIENT_DIRECT_QUERY_EAP') || isEnabled('CLIENT_DIRECT_QUERY_GA')));
}
