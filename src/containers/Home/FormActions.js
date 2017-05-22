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
    this.state = {
      search: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSearch(e) {
    if (e.keyCode === undefined || e.keyCode === 13) {
      console.log(`search: ${this.state.search}`)
    }
  }

  handleInputChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return (
      <Row>
        <Col xs={5} sm={3} md={2}>
          <Button href="#/carros/novo" bsStyle="success" block>Novo Carro</Button>
        </Col>
        <Col xs={7} smOffset={5} sm={4} mdOffset={7} md={3}>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Pesquisar"
                value={this.state.value}
                onChange={this.handleInputChange}
                onKeyUp={this.handleSearch}
              />
              <InputGroup.Button>
                <Button onClick={this.handleSearch}><Glyphicon glyph="search" /></Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Col>
      </Row>
    )
  }
}

export default FormActions
