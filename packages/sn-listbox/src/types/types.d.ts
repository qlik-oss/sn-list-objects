export interface IEnv {
  flags: {
    isEnabled: (flag?: string) => boolean;
  },
  sense?: ISense,
  translator?: stardust.Translator | undefined,
}
