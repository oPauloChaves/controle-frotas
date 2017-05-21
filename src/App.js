import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Header from './Header'
import HomePage from './containers/Home'
import VehicleForm from './containers/Vehicle/Form'

const App = () => (
  <Router>
    <div>
      <Header />
      <Grid>
        <Row>
          <Col mdOffset={1} md={10}>
            <Route exact path="/" component={HomePage}/>
            <Route path="/carros/novo" component={VehicleForm}/>
          </Col>
        </Row>
      </Grid>
    </div>
  </Router>
)

export default App
