import { useRef, RefObject } from 'react';

const useScroll = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const executeScroll = () => {
    ref.current?.scrollIntoView();
  };
  return [ref, executeScroll] as [RefObject<T>, () => void];
};

export default useScroll;