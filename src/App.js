import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css'
import HomePage from './containers/Home'
import AboutPage from './containers/About'

const App = () => (
  <Router>
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12">
          <div>
            <Route exact path="/" component={HomePage}/>
            <Route path="/about" component={AboutPage}/>
          </div>
        </div>
      </div>
    </div>
  </Router>
)

export default App
