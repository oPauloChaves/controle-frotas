import {
  SELECT_VEHICLES_PAGE,
  INVALIDATE_VEHICLES_PAGE,
  VEHICLES_REQUEST,
  VEHICLES_SUCCESS,
  VEHICLES_FAILURE,
  VEHICLES_ADD
} from '../actions/vehicles'

export function selectedVehiclesPage(state = 1, action) {
  switch (action.type) {
    case SELECT_VEHICLES_PAGE:
      return action.page;
    default:
      return state;
  }
}

function vehicles(state = {
  isFetching: false,
  didInvalidate: false,
  totalCount: 0,
  vehicles: [],
  error: null
}, action) {
  switch (action.type) {
    case INVALIDATE_VEHICLES_PAGE:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case VEHICLES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case VEHICLES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        totalCount: action.totalCount,
        vehicles: action.vehicles,
        error: null,
      });
    case VEHICLES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: action.error,
      });
    case VEHICLES_ADD:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true,
        error: null,
      });
    default:
      return state;
  }
}

export function vehiclesByPage(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_VEHICLES_PAGE:
    case VEHICLES_REQUEST:
    case VEHICLES_SUCCESS:
    case VEHICLES_FAILURE:
    case VEHICLES_ADD:
      return Object.assign({}, state, {
        [action.page]: vehicles(state[action.page], action)
      });
    default:
      return state;
  }
}
