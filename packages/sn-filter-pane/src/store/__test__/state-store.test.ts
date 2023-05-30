import createStore from '../state-store';

describe('createStore', () => {
  it('returns an object with setState, subscribe and getState methods', () => {
    const store = createStore(() => ({ count: 0 }));

    expect(typeof store.setState).toBe('function');
    expect(typeof store.subscribe).toBe('function');
    expect(typeof store.getState).toBe('function');
  });

  it('returns the current state with getState method', () => {
    const initialState = { count: 0 };
    const store = createStore(() => initialState);

    expect(store.getState()).toEqual(initialState);
  });

  it('notifies subscribers when state changes', () => {
    const initialState = { count: 0 };
    const store = createStore(() => initialState);

    const listener1 = jest.fn();
    const listener2 = jest.fn();

    store.subscribe(listener1);
    store.subscribe(listener2);

    store.setState({ count: 1 });

    expect(listener1).toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();
  });

  it('notify subscribers even when state is set to the same value', () => {
    const initialState = { count: 0 };
    const store = createStore(() => initialState);

    const listener = jest.fn();

    store.subscribe(listener);

    store.setState(initialState);

    expect(listener).toHaveBeenCalled();
  });

  it('creates a new state object when state changes', () => {
    const initialState = { count: 0 };
    const store = createStore(() => initialState);

    const nextState = { count: 1 };

    store.setState(nextState);

    expect(store.getState()).toEqual(nextState);
    expect(store.getState()).not.toBe(nextState);
  });

  it('unsubscribes a listener correctly', () => {
    const initialState = { count: 0 };
    const store = createStore(() => initialState);

    const listener1 = jest.fn();
    const listener2 = jest.fn();

    const unsubscribe1 = store.subscribe(listener1);
    const unsubscribe2 = store.subscribe(listener2);

    unsubscribe1();

    store.setState({ count: 1 });

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();

    unsubscribe2();

    store.setState({ count: 2 });

    expect(listener2).toHaveBeenCalled();
  });
});
