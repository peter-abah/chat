import { useRef, RefObject } from 'react';

const useScrollToBottom = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const executeScroll = () => {
    if (!ref.current) return;

    ref.current.scrollTop = ref.current.scrollHeight;
  };
  return [ref, executeScroll] as [RefObject<T>, () => void];
};

export default useScrollToBottom;