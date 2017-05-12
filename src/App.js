import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css'
import HomePage from './containers/Home'
import AboutPage from './containers/About'
import VehicleForm from './containers/Vehicle/Form'

const App = () => (
  <Router>
    <div className="container">
      <div className="row">
        <div className="col-md-offset-1 col-md-10 App-header">
          <div>
            <h1><Link to="/">ContaAzul</Link></h1>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          <Route exact path="/" component={HomePage}/>
          <Route path="/carros/novo" component={VehicleForm}/>
          <Route path="/sobre" component={AboutPage}/>
        </div>
      </div>
    </div>
  </Router>
)

export default App
