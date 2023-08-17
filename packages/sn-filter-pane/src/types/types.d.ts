interface ISense {
  isSmallDevice: () => boolean,
}

export interface IEnv {
  flags?: {
    isEnabled: (flag?: string) => boolean;
  },
  sense?: ISense,
  translator?: stardust.Translator | undefined,
}

export interface IConstraints {
  active?: boolean;
  passive?: boolean;
  select?: boolean;
}

export interface IConfig {
  type: 'rows' | 'columns';
}
