import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import { addVehicle } from '../../actions/vehicles'

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      combustivel: { value: 'Flex', validationState: null, msg: '', valid: true },
      imagem: { value: '', validationState: null, msg: '', valid: true },
      marca: { value: '', validationState: null, msg: '', valid: false },
      modelo: { value: '', validationState: null, msg: '', valid: false },
      placa: { value: '', validationState: null, msg: '', valid: false },
      valor: { value: '0', validationState: null, msg: '', valid: true }
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validate = this.validate.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: Object.assign({}, this.state[name], { value })
    })
  }

  validate(input, msg) {
    let value = this.state[input].value.trim()
    let validationState = msg ? 'error': null

    if (input === 'placa' && !/\w{3}-\d{4}$/.test(value)) {
      validationState = 'error'
    } else if ((input === 'modelo' || input === 'marca') && value === '') {
      validationState = 'error'
    } else if (input === 'valor' && value < 0) {
      try {
        if (value !== '' && parseFloat(value) < 0) {
          validationState = 'error'
        }
      } catch (err) {
        validationState = 'error'
      }
    }

    this.setState({
      [input]: {...this.state[input], validationState, msg, valid: !validationState}
    })
  }

  handleSubmit(event) {
    const { dispatch, history } = this.props
    let isValid = true
    let inputs = {}

    event.preventDefault()

    Object.keys(this.state).forEach(name => {
      if (isValid)
        isValid = this.state[name].valid
      inputs[name] = this.state[name].value
    })

    if (isValid) {
      dispatch(addVehicle(inputs))
        .then(res => {
          history.push('/')
        })
    }
  }

  render() {
    return (
      <Row>
        <Col mdOffset={3} md={6}>
          <h2 className="text-center header">Cadastrar novo veículo</h2>
          <form onSubmit={this.handleSubmit}>
            <FormGroup
              controlId="placa"
              validationState={this.state.placa.validationState}
            >
              <ControlLabel>Placa *</ControlLabel>
              <FormControl
                type="text"
                name="placa"
                autoFocus
                value={this.state.placa.value}
                onChange={this.handleInputChange}
                onBlur={() => this.validate('placa')}
                placeholder="AAA-9999"
              />
              <FormControl.Feedback />
              <HelpBlock>{this.state.placa.msg}</HelpBlock>
            </FormGroup>

            <FormGroup
              controlId="modelo"
              validationState={this.state.modelo.validationState}
            >
              <ControlLabel>Modelo *</ControlLabel>
              <FormControl
                type="text"
                name="modelo"
                value={this.state.modelo.value}
                onChange={this.handleInputChange}
                onBlur={() => this.validate('modelo')}
              />
              <FormControl.Feedback />
              <HelpBlock>{this.state.modelo.msg}</HelpBlock>
            </FormGroup>

            <FormGroup
              controlId="marca"
              validationState={this.state.marca.validationState}
            >
              <ControlLabel>Marca *</ControlLabel>
              <FormControl
                type="text"
                name="marca"
                value={this.state.marca.value}
                onChange={this.handleInputChange}
                onBlur={() => this.validate('marca')}
              />
              <FormControl.Feedback />
              <HelpBlock>{this.state.marca.msg}</HelpBlock>
            </FormGroup>

            <FormGroup
              controlId="combustivel"
              validationState={this.state.combustivel.validationState}
            >
            <ControlLabel>Combustível</ControlLabel>
              <FormControl
                componentClass="select"
                name="combustivel"
                value={this.state.combustivel.value}
                onChange={this.handleInputChange}
              >
                <option value="">Selecione o Combustível</option>
                <option value="Flex">Flex</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Alcool">Álcool</option>
              </FormControl>
              <FormControl.Feedback />
              <HelpBlock>{this.state.combustivel.msg}</HelpBlock>
            </FormGroup>

            <FormGroup
              controlId="imagem"
              validationState={this.state.imagem.validationState}
            >
              <ControlLabel>Foto</ControlLabel>
              <FormControl
                type="text"
                name="imagem"
                value={this.state.imagem.value}
                onChange={this.handleInputChange}
                placeholder="http://endereco.da.imagem"
              />
              <FormControl.Feedback />
              <HelpBlock>{this.state.imagem.msg}</HelpBlock>
            </FormGroup>

            <FormGroup
              controlId="valor"
              validationState={this.state.valor.validationState}
            >
              <ControlLabel>Valor</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>R$</InputGroup.Addon>
                <FormControl
                  type="text"
                  name="valor"
                  value={this.state.valor.value}
                  onChange={this.handleInputChange}
                  onBlur={() => this.validate('valor')}
                />
                <FormControl.Feedback />
                <HelpBlock>{this.state.valor.msg}</HelpBlock>
              </InputGroup>
            </FormGroup>

            <Button type="submit" bsStyle="primary" block>
              Salvar
            </Button>
          </form>
        </Col>
      </Row>
    )
  }
}

export default connect()(Form)
