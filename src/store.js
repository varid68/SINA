import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { autoRehydrate, persistStore } from 'redux-persist';

import reducers from './reducers';

const middleware = applyMiddleware(logger, thunk, promise());

const store = createStore(
  reducers,
  undefined,
  compose(middleware, autoRehydrate()),
);

persistStore(store, { storage: AsyncStorage });

export default store;
