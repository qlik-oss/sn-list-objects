// eslint-disable-next-line @typescript-eslint/ban-types
const ConditionalWrapper: Function = ({ condition, wrapper, children }: { condition: boolean, wrapper: (c: JSX.Element[]) =>
  JSX.Element, children: JSX.Element[] }) => (condition ? wrapper(children) : children);

export default ConditionalWrapper;
