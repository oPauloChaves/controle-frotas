import { createStore, compose } from 'redux'
import rootReducer from '../reducers'

// See: https://github.com/cloudmu/react-redux-starter-kit/
export default function configStore(initialState = {}) {
  let store

  if (module.hot) {
    store = createStore(
      rootReducer,
      initialState,
      compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    )
  } else {
    store = createStore(
      rootReducer,
      initialState
    )
  }

  return store
}
