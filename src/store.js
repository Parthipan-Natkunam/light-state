let state = {};
let id = 0;
const listeners = [];
const notify = () => {
  listeners.forEach(listener => {
    listener.cb();
  });
};

class Store {
  createStore = initialState => {
    state =
      !!initialState &&
      typeof initialState === 'object' &&
      !(initialState instanceof Array)
        ? { ...initialState }
        : {};
  };

  getState = () => ({ ...state });

  getListenersLength = () => listeners.length;

  dispatch = action => {
    action(state);
    notify();
  };

  subscribe = callback => {
    listeners.push({ id: id++, cb: callback });
  };

  unsubscribe = callbackId => {
    const associatedCallback = listeners.filter(
      listener => listener.id === callbackId
    );
    if (associatedCallback && associatedCallback.length > 0) {
      const index = listeners.indexOf(associatedCallback[0]);
      listeners.splice(index, 1);
    }
  };
}

const storeInstance = new Store();
Object.freeze(storeInstance);

module.exports = storeInstance;
