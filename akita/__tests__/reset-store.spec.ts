import { StoreConfig } from '../src/api/store-config';
import { EntityStore } from '../src/api/entity-store';
import { Store } from '../src/api/store';

@StoreConfig({
  name: 'todos',
  resettable: true
})
class TodosStore extends EntityStore<any, any> {
  constructor() {
    super();
  }
}

const todosstore = new TodosStore();

@StoreConfig({
  name: 'auth',
  resettable: true
})
class AuthStore extends Store<any> {
  constructor() {
    super({
      id: null,
      firstName: '',
      lastName: '',
      token: ''
    });
  }
}

const authStore = new AuthStore();

describe('Reset store', () => {
  it('should reset store state to its initial state - Store', () => {
    authStore.setState(() => {
      return {
        id: 1,
        firstName: 'Netanel',
        lastName: 'Basal',
        token: 'token'
      };
    });

    authStore.reset();
    expect(authStore._value()).toEqual({ id: null, firstName: '', lastName: '', token: '' });
  });

  it('should reset store state to its initial state - EntityStore', () => {
    todosstore.add({ id: 1 });
    const expected = {
      entities: {},
      ids: [],
      loading: true,
      error: null
    };
    todosstore.reset();
    expect(todosstore._value()).toEqual(expected);
  });
});
