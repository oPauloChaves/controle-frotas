export const ADD_VEHICLE = 'ADD_VEHICLE'

export const addVehicle = (vehicle) => ({
  type: ADD_VEHICLE,
  payload: vehicle
})

export default function vehicles(state = {}, action) {
  switch(action.type) {
    // Don't mutate the state, make use of imutability.
    // How? Return a new object using the spread operator.
    // By doing that is much easier for React to check wether the
    // state has changed or not.
    case ADD_VEHICLE:
      return {
        ...state,
        [action.payload.placa]: {
          ...action.payload
        }
      }
    default:
      return state
  }
}
