const getWidthHeight = (ref: React.MutableRefObject<HTMLDivElement | undefined>) => {
  const width = ref?.current?.offsetWidth ?? 0;
  const height = ref?.current?.offsetHeight ?? 0;
  return { width, height };
};

export default getWidthHeight;
