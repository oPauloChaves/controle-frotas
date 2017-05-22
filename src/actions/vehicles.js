// Thanks to: https://github.com/cloudmu/react-redux-starter-kit
import { callApi } from '../utils/api'

export const SELECT_VEHICLES_PAGE = 'SELECT_VEHICLES_PAGE'
export const INVALIDATE_VEHICLES_PAGE = 'INVALIDATE_VEHICLES_PAGE'

export const VEHICLES_REQUEST = 'VEHICLES_REQUEST'
export const VEHICLES_SUCCESS = 'VEHICLES_SUCCESS'
export const VEHICLES_FAILURE = 'VEHICLES_FAILURE'
export const VEHICLES_ADD = 'VEHICLES_ADD'

let API_ROOT = 'https://enigmatic-retreat-38913.herokuapp.com/api'
if (process.env.NODE_ENV !== 'production') {
  API_ROOT = 'http://localhost:8080/api'
}

export function selectVehiclesPage(page) {
  return {
    type: SELECT_VEHICLES_PAGE,
    page,
  }
}

export function invalidateVehiclesPage(page) {
  return {
    type: INVALIDATE_VEHICLES_PAGE,
    page,
  }
}


function vehiclesRequest(page) {
  return {
    type: VEHICLES_REQUEST,
    page,
  }
}

// This is a curried function that takes page as argument,
// and expects payload as argument to be passed upon API call success.
function vehiclesSuccess(page) {
  return function (payload) {
    return {
      type: VEHICLES_SUCCESS,
      page,
      vehicles: payload.items,
      totalCount: payload.total_count,
    }
  }
}

function vehiclesAddSuccess(page) {
  return vehicle => {
    return {
      type: VEHICLES_ADD,
      page,
      vehicle
    }
  }
}

// This is a curried function that takes page as argument,
// and expects error as argument to be passed upon API call failure.
function vehiclesFailure(page) {
  return function (error) {
    return {
      type: VEHICLES_FAILURE,
      page,
      error,
    }
  }
}

export function addVehicle(vehicle) {
  const url = `${API_ROOT}/vehicles`
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vehicle)
  }
  return callApi(url, config, vehiclesRequest(1), vehiclesAddSuccess(1), vehiclesFailure(1))
}

function fetchVehicles(page) {
  const url = `${API_ROOT}/vehicles/?page=${page}`
  return callApi(url, null, vehiclesRequest(page), vehiclesSuccess(page), vehiclesFailure(page))
}

function shouldFetchVehicles(state, page) {
  // Check cache first
  const vehicles = state.vehiclesByPage[page]
  if (!vehicles) {
    // Not cached, should fetch
    return true
  }

  if (vehicles.isFetching) {
    // Shouldn't fetch since fetching is running
    return false
  }

  // Should fetch if cache was invalidate
  return vehicles.didInvalidate
}

export function fetchVehiclesIfNeeded(page) {
  return (dispatch, getState) => {
    if (shouldFetchVehicles(getState(), page)) {
      return dispatch(fetchVehicles(page))
    }
  }
}
