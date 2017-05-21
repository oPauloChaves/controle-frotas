import React, { Component } from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import FormControl from 'react-bootstrap/lib/FormControl'

class FormActions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row>
        <Col md={2}>
          <Button href="#/carros/novo" bsStyle="success">Novo Carro</Button>
        </Col>
        <Col mdOffset={7} md={3}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" placeholder="Pesquisar" />
              <InputGroup.Button>
                <Button><Glyphicon glyph="search" /></Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    )
  }
}

export default FormActions
