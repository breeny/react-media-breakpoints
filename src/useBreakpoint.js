import { useEffect, useState } from 'react';
import listeners from './listener';

function useBreakpoint(query) {
  const factory = listeners();
  const [ activeBreakpoint, setActiveBreakpoint ] = useState(null);

  const onListenerCallback = (breakpoint) => {
    setActiveBreakpoint(breakpoint);
  }

  useEffect(() => {
    factory.createListeners(onListenerCallback, query);
    return () => {
      factory.disposeListeners();
    }
  });

  return activeBreakpoint;
}

export default useBreakpoint;