import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import FormControl from 'react-bootstrap/lib/FormControl'

const FormActions = ({
  search,
  handleSearch,
  handleSearchInputChange
}) => (
  <Row className="AppFormAction">
    <Col xs={5} sm={3} md={2}>
      <Button
        href="#/carros/novo"
        bsStyle="success"
        block
        className="AppBtnNew"
      >Novo Carro</Button>
    </Col>
    <Col xs={7} smOffset={5} sm={4} mdOffset={7} md={3}>
      <FormGroup>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Pesquisar"
            value={search}
            onChange={handleSearchInputChange}
            onKeyUp={handleSearch}
          />
          <InputGroup.Button>
            <Button onClick={handleSearch}><Glyphicon glyph="search" /></Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </Col>
  </Row>
)

export default FormActions
