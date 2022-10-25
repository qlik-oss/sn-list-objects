interface ISense {
  isSmallDevice: () => boolean,
}

export interface IEnv {
  flags: {
    isEnabled: (flag?: string) => boolean;
  },
  sense?: ISense,
}

export interface IConstraints {
  active?: boolean;
  passive?: boolean;
  select?: boolean;
}
