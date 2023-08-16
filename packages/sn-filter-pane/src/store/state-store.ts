import { Listener } from '.';

const createStore = <T>(createState: () => T) => {
  let state = createState();
  let listeners: Listener[] = [];

  const emitChange = () => {
    listeners.forEach((listener) => listener());
  };

  const setState = (nextState: T) => {
    if (!Object.is(nextState, state)) {
      state = { ...nextState };
    }
    emitChange();
  };

  const subscribe = (listener: Listener) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const getState = () => state;

  return { setState, subscribe, getState };
};

export default createStore;
