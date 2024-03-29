import { IConfig, IEnv } from '../types/types';

export default function getData(env: IEnv) {
  const { translator } = env;

  return {
    dimensions: {
      min: 1,
      max: 1000,
    },
    measures: { min: 0, max: 0 },
    targets: [
      {
        path: '/qChildListDef',
        measures: { min: 0, max: 0 },
        dimensions: {
          min: 1,
          max: 1000,
          description(_: unknown, __: unknown, config: IConfig): string {
            return translator.get('Object.ListBox');
          },
        },
      },
    ],
  };
}
