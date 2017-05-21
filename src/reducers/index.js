import { combineReducers } from 'redux'
import { selectedVehiclesPage, vehiclesByPage } from './vehicles'

export default combineReducers({
  selectedVehiclesPage,
  vehiclesByPage
})

