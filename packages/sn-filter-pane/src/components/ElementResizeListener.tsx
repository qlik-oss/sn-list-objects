import React, {
  useCallback, useRef, useEffect, RefObject,
} from 'react';

interface ElementResizeListenerProps {
  onResize: (event: Event) => void;
}

const ElementResizeListener = ({ onResize }: ElementResizeListenerProps) => {
  const rafRef = useRef(0);
  const objectRef: RefObject<HTMLObjectElement> = useRef(null);
  const onResizeRef = useRef(onResize);

  onResizeRef.current = onResize;

  const localOnResize = useCallback((e: Event) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      onResizeRef.current(e);
    });
  }, []);

  useEffect(() => {
    const obj = objectRef.current;
    obj?.contentDocument?.defaultView?.addEventListener('resize', localOnResize);
    return (() => {
      obj?.contentDocument?.defaultView?.removeEventListener('resize', localOnResize);
    });
  }, [localOnResize]);

  return (
    <object
      ref={objectRef}
      tabIndex={-1}
      type={'text/html'}
      data={'about:blank'}
      title={''}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 0,
      }}
    />
  );
};

export default ElementResizeListener;
