const assert = require('assert');
const store = require('../src/store');

const dummyState = {
  property1: 'Cool',
  property2: 'Awesome',
  property3: [1, 2, 3, 4, 5, 6],
  property4: {
    subProp1: 1,
    subProp2: 2,
  },
  count: 0,
};

describe('Core Store Module', () => {
  describe('#createStore()', () => {
    it('should create a new store with passed object', () => {
      store.createStore(dummyState);
      const createdStore = store.getState();
      assert.equal(JSON.stringify(createdStore), JSON.stringify(dummyState));
    });
    it('should create an empty store if an array is passed', () => {
      store.createStore([1, 2, 3]);
      const createdStore = store.getState();
      assert.equal(JSON.stringify(createdStore), JSON.stringify({}));
    });
    it('should create an empty store if a falsy value is passed ', () => {
      store.createStore(undefined);
      const createdStore = store.getState();
      assert.equal(JSON.stringify(createdStore), JSON.stringify({}));
    });
  });

  describe('#getState()', () => {
    it('should return the current state', () => {
      assert(JSON.stringify(store.getState()), JSON.stringify(dummyState));
    });
  });

  describe('#subscribe()', () => {
    it('should add the callback to listeners array', () => {
      store.subscribe(() => {
        console.log('1st Subscription');
      });
      store.subscribe(() => {
        console.log('2nd Subscription');
      });
      assert(store.getListenersLength() === 2);
    });
  });

  describe('#unsubscribe()', () => {
    it('should remove the specified listener', () => {
      store.subscribe(() => {
        console.log('3rd Subscription');
      });
      store.unsubscribe(1);
      assert(store.getListenersLength() === 2);
    });
  });

  describe('#dispatch()', () => {
    it('should dispatch action to the store', () => {
      store.createStore(dummyState);
      store.dispatch(state => {
        state.count++;
      });
      assert(store.getState().count === 1);
    });
  });
});
