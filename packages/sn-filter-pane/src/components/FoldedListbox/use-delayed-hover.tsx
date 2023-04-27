import React, { useEffect, useState } from 'react';

interface UseDelayedHoverProps {
  containerRef: React.RefObject<HTMLDivElement>,
}

const useDelayedHover = ({ containerRef }: UseDelayedHoverProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [delayedIsHovering, setDelayedIsHovering] = useState(false);
  const [isStillHovering, setIsStillHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const elementsAtPoint = document.elementsFromPoint(e.clientX, e.clientY);

      // Detect hover even when blocked by other element (blockUI in sense)
      const mouseOver = !!elementsAtPoint.find((el) => el === containerRef.current);
      setIsStillHovering(mouseOver);
    };

    document.addEventListener('mousemove', onMouseMove);
    return (() => document.removeEventListener('mousemove', onMouseMove));
  }, [containerRef.current]);

  useEffect(() => {
    if (isStillHovering) {
      setTimeout(() => {
        setDelayedIsHovering(false);
      }, 300);
      return;
    }
    setDelayedIsHovering(false);
  }, [isStillHovering, isHovering]);

  const onMouseEnter = () => {
    setDelayedIsHovering(true);
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    // Wrap in setTimeout to prevent React from missing the event on fast mouse movements
    setTimeout(() => setIsHovering(false));
  };

  return { onMouseEnter, onMouseLeave, delayedIsHovering };
};

export default useDelayedHover;
