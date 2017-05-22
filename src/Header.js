import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

const Header = () => (
  <Grid>
    <Navbar className="AppHeader">
      <Row>
        <Col className="ColHeader">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"><i className="icon-logo_contaazul"></i></Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav></Nav>
        </Col>
      </Row>
    </Navbar>
  </Grid>
)

export default Header
